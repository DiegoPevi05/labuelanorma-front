export interface UserIt {
  name:string;
  email:string;
  role:string;
  id:string;
}

export interface Category {
  name:string;
  featured:Featured[];
  sections : SectionsCat[]
}

interface Featured {
  name:string;
  herf:string;
  imageSrc:string;
  imageAlt:string;
}

interface SectionsCat {
  name: string;
  categories: CategorySubCat[];
}

interface CategorySubCat {
  id: string;
  name: string;
  href: string;
}

export interface ItemCart {
  product: productCart;
  quantity:number;
}

export interface productCart{
  id:string;
  name:string;
  price:number;
  image: {
    src:string;
    alt:string;
  };
  size:string;
}


export interface StoreNavIt {
  pages:StoreNavPagIt[];
}

interface StoreNavPagIt {
  name:string;
  href:string;
}


export interface ProductIt {
  id:number;
  name:string;
  section:string;
  category:string;
  price:number;
  breadcrumbs : ProductBreadcrumbsIt[];
  defaultImage:string;
  images: ProductImagesIt[];
  sizes: ProductSizesIt[];
  description:string;
  highlights:string[];
  details:string;
  createdAt: string,
}

interface ProductBreadcrumbsIt {
  id:number;
  name:string;
  href:string;
}

interface ProductImagesIt{
  src:string;
  alt:string;
}

interface ProductSizesIt {
  name:string;
  inStock:boolean;
}

export interface FilterProductProps {
  section: string;
  category: string;
  featured: string;
  order: string;
  page: number;
}

export interface ItemShopCart {
  product:{
    id:number;
    name:string;
    price:number;
    image:{
      src:string;
      alt:string;
    }
    size:ProductSizesIt;
  }
  quantity:number;
}


