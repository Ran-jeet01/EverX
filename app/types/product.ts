interface ProductDataType {
  id: string; // Changed from number to string (UUID)
  name: string; // Changed from title to name
  price: number;
  description: string | null;
  category: string;
  image: string | null;
  stock: number;
  status: string;
}

interface ReqProduct {
  name: string;
  price: string | number;
  image: string | null;
  category: string;
  stock: number;
  description?: string;
}
interface ProductResponse {
  products: ProductDataType[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export type { ProductDataType, ProductResponse, ReqProduct };
