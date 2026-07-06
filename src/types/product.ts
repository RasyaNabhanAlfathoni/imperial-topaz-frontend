export interface Product {
  id: number;
  nama_produk: string;
  deskripsi: string;
  harga_per_pcs: number;
  id_kategori_produk: number;
  foto1?: string;
  foto2?: string;
  foto3?: string;
  foto4?: string;
  foto5?: string;
  created_at: string;
  updated_at: string;
  kategori_produk?: Category;
}

export interface Category {
  id: number;
  kategori_produk: string;
  created_at: string;
  updated_at: string;
}
