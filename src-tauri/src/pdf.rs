use crate::models::FormPayload;
use printpdf::*;
use std::{error::Error, fs::File, io::BufWriter, path::PathBuf};

// Semua konstanta konsisten menggunakan f32
const LEBAR_A4: f32 = 210.0;
const TINGGI_A4: f32 = 297.0;
const MARGIN_SISI: f32 = 25.0;
const MARGIN_ATAS: f32 = 20.0;
const TINGGI_BARIS: f32 = 7.0;

pub fn buat_pdf(data: FormPayload) -> Result<String, Box<dyn Error>> {
    let (doc, id_halaman, id_layer) =
        PdfDocument::new(&data.judul, Mm(LEBAR_A4), Mm(TINGGI_A4), "Layer 1");

    let halaman = doc.get_page(id_halaman);
    let layer = halaman.get_layer(id_layer);

    let font_biasa = doc.add_builtin_font(BuiltinFont::Helvetica)?;
    let font_tebal = doc.add_builtin_font(BuiltinFont::HelveticaBold)?;

    if data.opsi.paka_header {
        gambar_header(&layer, &data, &font_tebal, &font_biasa);
    }

    tulis_isi(&layer, &data, &font_biasa);

    if data.opsi.paka_nomor {
        layer.use_text(
            "Halaman 1",
            8.0,
            Mm(LEBAR_A4 - MARGIN_SISI - 20.0),
            Mm(10.0),
            &font_biasa,
        );
    }

    let nama_file = format!(
        "dokumen_{}_{}.pdf",
        data.nip,
        chrono::Local::now().format("%Y%m%d_%H%M%S"),
    );

    let path_output = dirs::document_dir()
        .unwrap_or_else(|| PathBuf::from("."))
        .join(&nama_file);

    doc.save(&mut BufWriter::new(File::create(&path_output)?))?;

    Ok(path_output.to_string_lossy().to_string())
}

fn gambar_header(
    layer: &PdfLayerReference,
    data: &FormPayload,
    font_tebal: &IndirectFontRef,
    font_biasa: &IndirectFontRef,
) {
    let y_judul = TINGGI_A4 - MARGIN_ATAS;
    let y_info = y_judul - 10.0;
    let y_divider = y_info - 6.0;

    layer.use_text(&data.judul, 18.0, Mm(MARGIN_SISI), Mm(y_judul), font_tebal);

    let info = format!(
        "Nama: {}  |  NIP: {}  |  Jabatan: {}  |  Tanggal: {}",
        data.nama, data.nip, data.jabatan, data.tanggal,
    );
    layer.use_text(&info, 9.0, Mm(MARGIN_SISI), Mm(y_info), font_biasa);

    gambar_garis(
        layer,
        MARGIN_SISI,
        y_divider,
        LEBAR_A4 - MARGIN_SISI,
        y_divider,
    );
}

fn tulis_isi(layer: &PdfLayerReference, data: &FormPayload, font_biasa: &IndirectFontRef) {
    let mut pos_y = TINGGI_A4 - MARGIN_ATAS - 30.0;

    for baris in data.isi.lines() {
        if pos_y < MARGIN_SISI {
            break;
        }

        layer.use_text(baris, 11.0, Mm(MARGIN_SISI), Mm(pos_y), font_biasa);

        pos_y -= TINGGI_BARIS;
    }
}

fn gambar_garis(layer: &PdfLayerReference, x1: f32, y1: f32, x2: f32, y2: f32) {
    let garis = Line {
        points: vec![
            (Point::new(Mm(x1), Mm(y1)), false),
            (Point::new(Mm(x2), Mm(y2)), false),
        ],
        is_closed: false,
    };
    layer.add_line(garis);
}
