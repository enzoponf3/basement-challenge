import * as React from "react";
import type {NextPage} from "next";
import {GetStaticProps} from "next";
import Image from "next/image";

import logo from "../public/logo.svg";
import isotype from "../public/isotype.svg";
import asterisk from "../public/asterisk.svg";
import asteriskTwo from "../public/asterisk-2.svg";
import headerImg from "../public/header.svg";
import footerImg from "../public/footer.svg";
import hd from "../public/hd-4k.svg";
import ProductCard from "../product/productCard";
import {Product} from "../product/types";
import Modal from "../modal/modal";
import Cart from "../cart/cart";
import useCart from "../cart/hooks";

interface Props {
  products: Product[];
}

const Home: NextPage<Props> = ({products}) => {
  const [modalIsOpen, setModalIsOpen] = React.useState<boolean>(false);
  const cart = useCart();

  const openModal = () => {
    const body = document.querySelector("body");

    if (body) {
      body.style.overflow = "hidden";
      setModalIsOpen(true);
    }
  };

  const closeModal = () => {
    const body = document.querySelector("body");

    if (body) {
      body.style.overflow = "auto";
      setModalIsOpen(false);
    }
  };

  return (
    <div className="h-full flex-col bg-black">
      {modalIsOpen && (
        <Modal>
          <Cart cart={cart} onClose={closeModal} />
        </Modal>
      )}
      <div className="sticky bg-black z-10 bg-opacity-100 top-0">
        <nav className=" flex justify-between p-4 mb-4">
          <div className="md:hidden sm:inline">
            <Image alt="basement" src={isotype} />
          </div>
          <div className="md:inline sm: hidden">
            <Image alt="Basement" src={logo} />
          </div>
          <div className="lg:inline hidden">
            <Image alt="hd - 4k" src={hd} />
          </div>
          <button
            className="rounded-full border-2 py-1 px-6 br-6"
            type="button"
            onClick={openModal}
          >
            Cart({cart.cart.length})
          </button>
        </nav>
      </div>
      <header className="m-auto text-white text-center p-4">
        <div className="hidden absolute z-10 top-80 mt-10 right-20 lg:inline">
          <Image alt="asterirsk" className="animate-rotateright" src={asterisk} />
        </div>
        <div className="hidden absolute z-10 top-96 mt-20 lg:inline">
          <Image alt="asterirsk" src={asteriskTwo} />
        </div>
        <Image alt="basement supply" src={headerImg} />
        <div className=" absolute overflow-hidden w-full overflow-hide left-0 mt-8 border-t-2 border-b-2 ">
          <p className="animate-textspin w-max py-4 text-4xl">
            A man can’t have enough base­ment. swag —  A man can’t have enough base­ment.swag  —  A
            man can’t have enough base­ment. swag  —  A man can’t have enough base­ment. swag  —  A
            man can’t have enough base­ment. swag{" "}
          </p>
        </div>
      </header>
      <main className="h-max mt-36 p-8">
        <div className="grid lg:grid-cols-3 gap-8 md:grid-cols-2 sm:grid-cols-1">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              addToCart={() => cart.addProduct(product)}
              product={product}
            />
          ))}
        </div>
      </main>
      <footer className="flex justify-center p-8">
        <Image alt="wear everyday" src={footerImg} />
      </footer>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const products: Product[] = await import("../product/mock.json").then((res) => res.default);

  return {
    props: {
      products,
    },
  };
};

export default Home;
