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

export interface slide {
  id: number;
  judul: string;
  deskripsi: string;
  gambar: string;
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

