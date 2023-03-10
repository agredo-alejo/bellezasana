import CarritoVacio from "@/components/cart/carritoVacio";
import CartProducts from "@/components/cart/cartProducts";
import { useAuth } from "@/context/authContext";
import Layout from "@/shared/layout";
import Head from "next/head";
import React, { useEffect, useState } from "react";

function Cart() {
   const { currentUser, checkoutSession } = useAuth();
   const [products, setProducts] = useState([]);
   const [showProducts, setShowProducts] = useState(false);

   useEffect(() => {
      if (!checkoutSession) return;
      const lineItems = checkoutSession?.lineItems?.edges;
      if (!lineItems) return;
      setProducts(lineItems.map((item: any) => item.node));
   }, [checkoutSession]);

   useEffect(() => {
      setShowProducts(currentUser && products.length > 0);
   }, [currentUser, products]);

   return (
      <div className="w-full flex flex-col items-center h-full max-h-[100vh] overflow-hidden  ">
         <Head>
            <title>Carrito de compras</title>
            <meta name="description" content="Belleza Sana" />
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <Layout>
            {showProducts ? (
               <CartProducts products={products} />
            ) : (
               <CarritoVacio />
            )}
         </Layout>
      </div>
   );
}

export default Cart;
