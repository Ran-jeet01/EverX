interface ProductDataType {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}
interface ReqProduct {
  title: string;
  price: string | number;
  image: string;
}
type ProductResponse = ProductDataType[];

export type { ProductDataType, ProductResponse, ReqProduct };
