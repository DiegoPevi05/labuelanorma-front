export interface UserIt {
  name:string;
  email:string;
  role:string;
  id:string;
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
  categories:StoreNavCatIt[];
  pages:StoreNavPagIt[];
}

interface StoreNavPagIt {
  name:string;
  href:string;
}

interface StoreNavCatIt {
  id:string;
  name:string;
  featured:StoreNavCatFetIt[];
  sections:StoreNavCatSecIt[];
}

interface StoreNavCatFetIt{
  name:string;
  href:string;
  imageSrc:string;
  imageAlt:string;
}

interface StoreNavCatSecIt {
  id:string;
  name:string;
  categories:StoreNavCatSecItemsIt[];
}

interface StoreNavCatSecItemsIt {
  name:string;
  href:string
}

export interface ProductIt {
  id:number;
  name:string;
  section:string;
  category:string;
  price:number;
  breadcrumbs : ProductBreadcrumbsIt[];
  defaultImage:ProductImagesIt;
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
  size: string;
  orderOption: string;
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
    size:string;
  }
  quantity:number;
}


