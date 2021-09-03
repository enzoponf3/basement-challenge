import * as React from "react";
import Image from "next/image";

import {Product} from "./types";

interface Props {
  product: Product;
  addToCart: (product: Product) => void;
}

const ProductCard: React.FC<Props> = ({product, addToCart}) => {
  return (
    <div onClick={() => addToCart(product)}>
      <div className="pointer-events-none md:pointer-events-auto relative flex justify-center align-center group relative py-6 border-b-4 bg-gradient-to-t from-gradient cursor-pointer">
        <Image
          alt={product.name}
          decoding="async"
          height={512}
          loading="lazy"
          src={`${product.image}`}
          width={460}
        />
        <div className="absolute flex justify-center items-center w-full h-full top-0 opacity-0 transition-opacity bg-black bg-opacity-50 group-hover:opacity-100">
          <div className="absolute p-10 m-auto z-20">
            <span className=" text-4xl text-black stroke">ADD TO CART</span>
          </div>
          <div className="absolute m-auto my-auto">
            <Image
              alt="sphere"
              className="m-auto"
              decoding="async"
              height={125}
              loading="lazy"
              src="/sphere.svg"
              width={125}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between py-4 text-xl">
        <span>{product.name}</span>
        <span>${product.price}</span>
      </div>
    </div>
  );
};

export default ProductCard;
