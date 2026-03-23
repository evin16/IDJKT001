import 'virtual:uno.css';
import './styles.css';
import { invoke } from "@tauri-apps/api/core";

// BAGIAN 1: Import & Elemen DOM
const ELEMENTS = {
  // Input fields
  nama: document.getElementById('f-nama'),
  nip: document.getElementById('f-nip'),
  tanggal: document.getElementById('f-tanggal'),
  jabatan: document.getElementById('f-jabatan'),
  judul: document.getElementById('f-judul'),
  isi: document.getElementById('f-isi'),
  pakaHeader: document.getElementById('f-header'),
  pakaNomor: document.getElementById('f-nomor'),

  // Elemen error message
  errNama: document.getElementById('err-nama'),
  errNip: document.getElementById('err-nip'),
  errJudul: document.getElementById('err-judul'),

  // Tombol dan status
  btnGenerate: document.getElementById('btn-generate'),
  btnReset: document.getElementById('btn-reset'),
  statusMsg: document.getElementById('status-msg'),
  statusDot: document.getElementById('status-dot'),
}

//  BAGIAN 2: State Management
const STATE = {
  isLoading: false,
  isBackendReady: false,
  lastOutputPath: null,
}

//  BAGIAN 3: Fungsi Validasi
function validasiNama(nilai) {
  const namaBersih = nilai.trim()
  if (namaBersih.length === 0) {
    return '⚠ Nama tidak boleh kosong'
  }
  if (namaBersih.length < 3) {
    return '⚠ Nama minimal 3 karakter'
  }
  return null // valid!
}

function validasiNip(nilai) {
  const nipBersih = nilai.trim()
  if (nipBersih.length === 0) {
    return '⚠ NIP tidak boleh kosong'
  }
  // Regex: ^ = awal, \d = digit, {10,20} = 10–20 karakter, $ = akhir
  const polaNip = /^\d{10,20}$/
  if (!polaNip.test(nipBersih)) {
    return '⚠ NIP harus angka, 10–20 digit'
  }
  return null
}

function validasiNip(nilai) {
  const nipBersih = nilai.trim()
  if (nipBersih.length === 0) {
    return '⚠ NIP tidak boleh kosong'
  }
  // Regex: ^ = awal, \d = digit, {10,20} = 10–20 karakter, $ = akhir
  const polaNip = /^\d{10,20}$/
  if (!polaNip.test(nipBersih)) {
    return '⚠ NIP harus angka, 10–20 digit'
  }
  return null
}

function setErrorField(inputEl, errEl, pesan) {
  if (pesan) {
    // Ada error
    errEl.textContent = pesan
    errEl.classList.remove('hidden')
    inputEl.setAttribute('data-error', 'true')  // trigger CSS Panda
  } else {
    // Tidak ada error — bersihkan
    errEl.textContent = ''
    errEl.classList.add('hidden')
    inputEl.removeAttribute('data-error')
  }
}

function setStatusMsg(pesan, tipe) {
  const { statusMsg } = ELEMENTS

  statusMsg.textContent = pesan
  statusMsg.classList.remove('hidden', 'text-phosphor', 'text-[#ef4444]')

  // Warna berbeda berdasarkan tipe pesan
  const warnaClass = tipe === 'success'
    ? 'text-phosphor'
    : 'text-[#ef4444]'

  statusMsg.classList.add(warnaClass)
}

function setLoadingState(isLoading) {
  STATE.isLoading = isLoading
  ELEMENTS.btnGenerate.disabled = isLoading
  ELEMENTS.btnGenerate.textContent = isLoading
    ? '⏳ MEMPROSES...'
    : '▶ GENERATE PDF'
}

function kumpulkanDataForm() {
  const { nama, nip, tanggal, jabatan, judul, isi, pakaHeader, pakaNomor } = ELEMENTS

  return {
    nama: nama.value.trim(),
    nip: nip.value.trim(),
    tanggal: tanggal.value || new Date().toISOString().split('T')[0],
    jabatan: jabatan.value.trim() || '-', // default '-' jika kosong
    judul: judul.value.trim(),
    isi: isi.value.trim(),
    opsi: {
      // Kirim kondisi checkbox sebagai boolean
      pakaHeader: pakaHeader.checked,
      pakaNomor: pakaNomor.checked,
    },
  }
}

//  BAGIAN 6: Handler Utama — Generate PDF
async function handleGeneratePdf() {
  const errNama = validasiNama(ELEMENTS.nama.value)
  const errNip = validasiNip(ELEMENTS.nip.value)
  const errJudul = validasiJudul(ELEMENTS.judul.value)

  setErrorField(ELEMENTS.nama, ELEMENTS.errNama, errNama)
  setErrorField(ELEMENTS.nip, ELEMENTS.errNip, errNip)
  setErrorField(ELEMENTS.judul, ELEMENTS.errJudul, errJudul)

  const adaError = errNama || errNip || errJudul
  if (adaError) {
    setStatusMsg('⚠ Perbaiki field yang bermasalah', 'error')
    return
  }

  setLoadingState(true)

  try {
    const dataForm = kumpulkanDataForm()

    const pathPdf = await invoke('generate_pdf', { payload: dataForm })

    STATE.lastOutputPath = pathPdf
    setStatusMsg(`✅ PDF tersimpan: ${pathPdf}`, 'success')

  } catch (err) {
    console.error('[generate_pdf] error:', err)
    setStatusMsg(`❌ Gagal buat PDF: ${err}`, 'error')

  } finally {
    setLoadingState(false)
  }
}

function handleReset() {
  [ELEMENTS.nama, ELEMENTS.nip, ELEMENTS.jabatan,
  ELEMENTS.judul, ELEMENTS.isi].forEach(el => { el.value = '' })

  [
    [ELEMENTS.nama, ELEMENTS.errNama],
    [ELEMENTS.nip, ELEMENTS.errNip],
    [ELEMENTS.judul, ELEMENTS.errJudul],
  ].forEach(([input, err]) => setErrorField(input, err, null))

  ELEMENTS.statusMsg.classList.add('hidden')
  STATE.lastOutputPath = null
}

//  BAGIAN 7: Inisialisasi Aplikasi
async function init() {
  ELEMENTS.tanggal.value = new Date().toISOString().split('T')[0]

  try {
    await invoke('ping') // command sederhana di Rust
    ELEMENTS.statusDot.classList.replace('bg-[#374151]', 'bg-phosphor')
    STATE.isBackendReady = true
  } catch {
  }

  ELEMENTS.btnGenerate.addEventListener('click', handleGeneratePdf)
  ELEMENTS.btnReset.addEventListener('click', handleReset)
}

init()





