import * as React from "react";
import {v4 as uid} from "uuid";

import {Product} from "../product/types";

import {CartProduct} from "./cartProduct/types";

const useCart = () => {
  const getMemoryCart = () => {
    let memoryCart;

    if (typeof window !== "undefined") {
      memoryCart = window.localStorage.getItem("basementCart");

      if (!memoryCart) {
        const emptyCart: CartProduct[] = [];

        window.localStorage.setItem("basementCart", JSON.stringify(emptyCart));
        memoryCart = window.localStorage.getItem("basementCart");
      }
    }

    return JSON.parse(memoryCart || "[]") as CartProduct[];
  };

  const [cart, setCart] = React.useState<CartProduct[]>(getMemoryCart);
  const price = React.useMemo(
    () => cart.reduce((price, product) => price + product.quantity * product.product.price, 0),
    [cart],
  );

  React.useEffect(() => {
    window.localStorage.setItem("basementCart", JSON.stringify(cart));
  }, [cart]);

  const updateCart = (id: string, product: CartProduct) => {
    const updatedCart = [...cart];
    const productIndex = cart.findIndex((p) => p.id === id);

    updatedCart.splice(productIndex, 1, product);
    setCart(updatedCart);
  };

  const addProduct = (product: Product, size: string = "") => {
    const newProd: CartProduct = {
      id: uid(),
      product,
      quantity: 1,
      size,
    };

    setCart((cart) => cart.concat(newProd));
  };

  const incrementProduct = (idProduct: string) => {
    const selectedProd = cart.find((p) => p.id === idProduct);

    if (selectedProd) {
      selectedProd.quantity = selectedProd.quantity + 1;
      updateCart(idProduct, selectedProd);
    }
  };

  const decrementProduct = (idProduct: string) => {
    const selectedProd = cart.find((p) => p.id === idProduct);

    if (selectedProd) {
      selectedProd.quantity = selectedProd.quantity - 1;
      updateCart(idProduct, selectedProd);
      if (selectedProd.quantity === 0) {
        setCart(cart.filter((p) => p.id !== idProduct));
      }
    }
  };

  const selectSize = (idProduct: string, size: string) => {
    const selectedProd = cart.find((p) => p.id === idProduct);

    if (selectedProd) {
      selectedProd.size = size;
      updateCart(idProduct, selectedProd);
    }
  };

  return {
    cart,
    price,
    addProduct,
    selectSize,
    incrementProduct,
    decrementProduct,
  };
};

export default useCart;
