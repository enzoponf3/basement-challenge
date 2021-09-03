import * as React from "react";

import CartProduct from "./cartProduct/cartProduct";
import {CartProduct as CartProductType} from "./cartProduct/types";

interface Props {
  cart: any;
  onClose: () => void;
}

const Cart: React.FC<Props> = ({cart, onClose}) => {
  const printCheckout = () => {
    const products: CartProductType[] = cart.cart;

    console.log("------CHECKOUT-----");
    products.map((cartProduct) => {
      console.log(
        cartProduct.product.name,
        "---------",
        cartProduct.product.price,
        "x",
        cartProduct.quantity,
      );
    });
    console.log("Total billed: ", cart.price);
    console.log("----------------");
  };

  return (
    <div className="absolute flex-row md:w-min md:h-5/6 w-screen max-h-full border bg-black right-0 z-50">
      <div className="flex flex-row-reverse p-4 md:p-8">
        <button className="uppercase" onClick={onClose}>
          → Close
        </button>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center px-8">
        <span className="text-7xl md:text-8xl ">YOUR</span>
        <span className="text-7xl md:text-8xl stroke text-black">CART</span>
      </div>
      <div className=" flex-row h-96 p-4 md:h-80 md:px-8 overflow-y-scroll">
        {cart.cart.map((p: CartProductType) => (
          <CartProduct
            key={p.id}
            decrement={cart.decrementProduct}
            increment={cart.incrementProduct}
            product={p}
            selectSize={cart.selectSize}
          />
        ))}
      </div>
      <div className="flex flex-col md:flex-row justify-between md:border-t">
        <div className="flex justify-between items-center">
          <h5 className="p-4 text-2xl">TOTAL:</h5>
          <h5 className="p-4 text-2xl">${Math.round(cart.price * 100) / 100}</h5>
        </div>
        <button
          className="py-4 px-12 
          border-t md:border-l md:text-xl md:border-t-0 stroke text-5xl text-black"
          onClick={printCheckout}
        >
          CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default Cart;
