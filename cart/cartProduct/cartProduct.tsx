import * as React from "react";
import Image from "next/image";

import {CartProduct as CartProductType} from "./types";

interface Props {
  product: CartProductType;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  selectSize: (id: string, size: string) => void;
}

const CartProduct: React.FC<Props> = ({product, increment, decrement, selectSize}) => {
  return (
    <div className="flex border p-2 mb-4">
      <div className="flex justify-center w-1/3 bg-gradient-to-t from-gradient">
        <Image alt={product.id} height={128} src={`${product.product.image}`} width={112} />
      </div>
      <div className="flex flex-col justify-between px-4 w-2/3">
        <h3 className="uppercase text-xl md:text-2xl">{product.product.name}</h3>
        <div className="flex justify-between end">
          <div>
            <div className="flex text-md md:text-lg mb-2">
              QUANTITY:
              <div className="ml-3 border rounded-xl">
                <button className="px-2" onClick={() => decrement(product.id)}>
                  -
                </button>
                <span>{product.quantity}</span>
                <button className="px-2" onClick={() => increment(product.id)}>
                  +
                </button>
              </div>
            </div>
            <div className="text-md md:text-lg">
              SIZE:{" "}
              {product.product.options
                .find((opt) => opt.label === "size")
                ?.values.map((s) => (
                  <button
                    key={s}
                    className={
                      s == product.size
                        ? " rounded border-2 w-6 h-6 md:w-8 md:h-8 rounded-2xl"
                        : "rounded w-6 h-6 md:w-8 md:h-8 rounded-2xl"
                    }
                    onClick={() => selectSize(product.id, s)}
                  >
                    {s}
                  </button>
                ))}
            </div>
          </div>
          <h3 className="mt-auto text-xl md:text-2xl">${product.product.price}</h3>
        </div>
      </div>
      <div />
    </div>
  );
};

export default CartProduct;
