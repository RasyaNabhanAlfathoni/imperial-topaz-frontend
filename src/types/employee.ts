export interface Employee {
  id: number;
  nama_lengkap: string;
  email: string;
  no_telepon: string;
  id_jabatan: number;
  alamat: string;
  foto: string;
  created_at: string;
  updated_at: string;
  jabatan?: Position;
}

export interface Position {
  id: number;
  nama_jabatan: string;
  created_at: string;
  updated_at: string;
}
