use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct FormPayload {
    pub nama:    String,
    pub nip:     String,
    pub tanggal: String,
    pub jabatan: String,
    pub judul:   String,
    pub isi:     String,
    pub opsi:    OpsiPdf,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct OpsiPdf {
    pub paka_header: bool,
    pub paka_nomor:  bool,
}
