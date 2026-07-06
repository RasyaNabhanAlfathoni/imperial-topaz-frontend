export interface News {
  id: number;
  judul: string;
  konten: string;
  slug: string;
  id_kategori_berita: number;
  thumbnail: string;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  kategori_berita?: NewsCategory;
}

export interface NewsCategory {
  id: number;
  kategori_berita: string;
  created_at: string;
  updated_at: string;
}
