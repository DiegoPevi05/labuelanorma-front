import { Link } from 'react-router-dom';
import {ProductIt} from "../../interfaces/global";

interface ProductCardProps {
  product:ProductIt;
}

const ProductCard = (productCardProps:ProductCardProps) => {
  const { product } = productCardProps;
  return (
    <div key={product.id} className="group relative red-orange-gradient p-2 rounded-md">
      <div className="aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 h-70 sm:h-80">
        <img
          key={product.id}
          src={product.defaultImage.src}
          alt={product.defaultImage.alt}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <h3 className="text-sm text-primary">
          <Link to={`/store/product/${product.id}`} state={{productDetail: product}}>
            <span aria-hidden="true" className="absolute inset-0" />
            {product.name}
          </Link>
        </h3>
        <p className="text-sm font-medium text-primary">{"PEN "+product.price}</p>
      </div>
    </div>
  )

}

interface ProductListProps {
  products: ProductIt[]
}

const ProductList = (productListProps:ProductListProps) => {
  const {products} = productListProps;

  return (
    <div className="flex flex-col w-full items-center sm:justify-start sm:items-start">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-4">
          {products.map((product,index) => (
            <ProductCard key={"product_"+index} product={product}/>
          ))}
        </div>
    </div>
  )
}
export default ProductList;
