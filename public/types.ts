export interface agenda {
  id: number;
  judul: string;
  waktu: string;
  tempat: string;
  detail_kegiatan: string;
  tag: string;
  created_at: string;
  updated_at: string;
}

export interface info {
  id: number;
  Info_1: string;
  Info_2: string;
  Info_3: string;
  Info_4: string;
  Info_5: string;
  created_at: string;
  updated_at: string;
}

export interface slide {
  reverse: any;
  length: number;
  id: number;
  judul: string;
  deskripsi: string;
  gambar: string;
  created_at: string;
  updated_at: string;
}

export interface penelitian {
  id: number;
  nama_penelitian: string;
  dosen_id: number;
  jenis_penelitian: string;
  file_penelitian: string;
  created_at: string;
  updated_at: string;
  name: string;
}

export interface pengabdian {
  id: number;
  judul: string;
  penulis: string;
  tahun: string;
  dokumentasi: string;
  created_at: string;
  updated_at: string;
}

export interface artikel {
  id: number;
  judul: string;
  detail: string;
  penulis: string;
  tanggal: string;
  thumbnail: string;
  gambar: string;
  file: string;
  created_at: string;
  updated_at: string;
}

export interface berita {
  id: number;
  judul: string;
  detail: string;
  penulis: string;
  tanggal: string;
  thumbnail: string;
  gambar: string;
  file: string;
  tag: string;
  created_at: string;
  updated_at: string;
}

export interface haki {
  id: number;
  name: string;
  tahun: number;
  judul: string;
  dosen_id: number;
  file_haki: string;
  created_at: string;
  updated_at: string;
}

export interface download {
  id: number;
  nama_berkas: string;
  keterangan: string;
  file: string;
  tag: string;
  created_at: string;
  updated_at: string;
}

export interface gallery {
  id: number;
  judul: string;
  foto: string;
  tahun: number;
  created_at: string;
  updated_at: string;
  thumnail: string;
}

export interface kehadiran {
  id: number;
  role_id: number;
  name: string;
  email: string;
  nip: string;
  nidn: string;
  jabatan: string;
  bidang: string;
  hadir: number;
  avatar: string;
  email_verified_at?: number;
  password: string;
  remember_token?: boolean;
  settings: Array<{ locale: string }>;
  created_at: string;
  updated_at: string;
}

export interface organisasi {
  id: number;
  judul: string;
  detail: string;
  logo: string;
  created_at: string;
  updated_at: string;
}

export interface pengumuman {
  id: number;
  judul: string;
  detail: string;
  gambar: string;
  file: string;
  tag: string;
  created_at: string;
  updated_at: string;
}

export interface profil {
  [x: string]: any;

  id: number;
  text: string;
  created_at: string;
  updated_at: string;
}

export interface tahun {
  id: number;
  tahun: number;
  created_at: string;
  updated_at: string;
}

export type AgendaCellProps = {
  key: number;
  hari: string;
  hariBulan: string;
  dylink: string;
  judul: string;
  tempat: string;
};
