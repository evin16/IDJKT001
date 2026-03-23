use printpdf::*;
use std::{fs::File, io::BufWriter, path::PathBuf, error::Error};
use crate::models::FormPayload;

const LEBAR_A4:     f64 = 210.0;  // mm
const TINGGI_A4:    f64 = 297.0;  // mm
const MARGIN_SISI:  f64 = 25.0;   // mm dari kiri/kanan
const MARGIN_ATAS:  f64 = 20.0;   // mm dari atas
const TINGGI_BARIS: f64 = 7.0;    // jarak antar baris teks

pub fn buat_pdf(data: FormPayload) -> Result<String, Box<dyn Error>> {

    // ── Langkah 1: Buat dokumen PDF baru ──────────────
    let (doc, id_halaman, id_layer) = PdfDocument::new(
        &data.judul,        // judul PDF (metadata)
        Mm(LEBAR_A4),
        Mm(TINGGI_A4),
        "Layer 1",
    );

    // ── Langkah 2: Siapkan layer untuk menggambar ─────
    let halaman = doc.get_page(id_halaman);
    let layer   = halaman.get_layer(id_layer);

    // ── Langkah 3: Load font bawaan ───────────────────
    // Builtin font tidak butuh file TTF eksternal
    let font_biasa = doc.add_builtin_font(BuiltinFont::Helvetica)?;
    let font_tebal = doc.add_builtin_font(BuiltinFont::HelveticaBold)?;

    // ── Langkah 4: Gambar elemen layout ───────────────
    if data.opsi.paka_header {
        gambar_header(&layer, &data, &font_tebal, &font_biasa);
    }

    // ── Langkah 5: Tulis isi dokumen ──────────────────
    tulis_isi(&layer, &data, &font_biasa);

    // ── Langkah 6: Tambah nomor halaman ───────────────
    if data.opsi.paka_nomor {
        layer.use_text("Halaman 1", 8.0,
            Mm(LEBAR_A4 - MARGIN_SISI - 20.0),
            Mm(10.0),
            &font_biasa,
        );
    }

    // ── Langkah 7: Tentukan nama dan path file ────────
    let nama_file = format!(
        "dokumen_{}_{}.pdf",
        data.nip,
        chrono::Local::now().format("%Y%m%d_%H%M%S"),
    );

    // Simpan di folder Documents pengguna (sesuai OS)
    let path_output = dirs::document_dir()
        .unwrap_or_else(|| PathBuf::from("."))
        .join(&nama_file);

    // ── Langkah 8: Simpan ke disk ─────────────────────
    doc.save(&mut BufWriter::new(
        File::create(&path_output)?
    ))?;

    // ── Langkah 9: Kembalikan path ke JavaScript ──────
    Ok(path_output.to_string_lossy().to_string())
}

fn gambar_header(
    layer:      &PdfLayerReference,
    data:       &FormPayload,
    font_tebal: &IndirectFontRef,
    font_biasa: &IndirectFontRef,
) {
    // Posisi Y mulai dari TINGGI_A4 - MARGIN_ATAS
    let y_judul  = TINGGI_A4 - MARGIN_ATAS;
    let y_info   = y_judul - 10.0;
    let y_divider= y_info  -  6.0;

    // Judul dokumen — ukuran font besar
    layer.use_text(&data.judul, 18.0,
        Mm(MARGIN_SISI), Mm(y_judul), font_tebal);

    // Info identitas di bawah judul
    let info = format!(
        "Nama: {}  |  NIP: {}  |  Jabatan: {}  |  Tanggal: {}",
        data.nama, data.nip, data.jabatan, data.tanggal,
    );
    layer.use_text(&info, 9.0,
        Mm(MARGIN_SISI), Mm(y_info), font_biasa);

    // Garis pemisah header dan isi
    gambar_garis(layer, MARGIN_SISI, y_divider, LEBAR_A4 - MARGIN_SISI, y_divider);
}

/// Tulis isi dokumen baris per baris
/// Otomatis berhenti saat mendekati margin bawah
fn tulis_isi(
    layer:     &PdfLayerReference,
    data:      &FormPayload,
    font_biasa:&IndirectFontRef,
) {
    // Mulai dari bawah header, sisakan space
    let mut pos_y = TINGGI_A4 - MARGIN_ATAS - 30.0;

    for baris in data.isi.lines() {
        // Berhenti jika sudah melewati margin bawah
        if pos_y < MARGIN_SISI { break; }

        layer.use_text(baris, 11.0,
            Mm(MARGIN_SISI), Mm(pos_y), font_biasa);

        pos_y -= TINGGI_BARIS; // geser ke bawah untuk baris berikutnya
    }
}

/// Helper: gambar garis horizontal
/// Dipisah supaya tidak ada "magic" di fungsi lain
fn gambar_garis(layer: &PdfLayerReference, x1: f64, y1: f64, x2: f64, y2: f64) {
    let garis = Line {
        points: vec![
            (Point::new(Mm(x1), Mm(y1)), false),
            (Point::new(Mm(x2), Mm(y2)), false),
        ],
        is_closed:        false,
        has_fill:         false,
        has_stroke:       true,
        is_clipping_path: false,
    };
    layer.add_shape(garis);
}