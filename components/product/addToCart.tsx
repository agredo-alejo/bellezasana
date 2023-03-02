import { useAuth } from "@/context/authContext";
import { addProductToCheckout } from "@/utils/shopifyMutations";
import { getCheckoutSession } from "@/utils/shopifyQueries";
import { useRouter } from "next/router";
import React, { useState } from "react";

interface AddToCartProps {
   productId: string;
   quantity?: number;
}

function AddToCart({ productId, quantity = 1 }: AddToCartProps) {
   const { checkoutSession, currentUser, setCheckoutSession, accessToken } =
      useAuth();
   const router = useRouter();
   const [loading, setLoading] = useState(false);

   const addProduct = async () => {
      if (loading) return;
      if (!currentUser) {
         const url = `/auth/login?src=${encodeURIComponent(router.asPath)}`;
         router.push(url);
         return;
      }
      setLoading(true);
      // console.log(checkoutSession.id, productId, quantity, currentUser.email);

      const response = await addProductToCheckout(
         checkoutSession.id,
         productId,
         quantity,
         currentUser.email
      );

      setCheckoutSession(await getCheckoutSession(accessToken));
      setLoading(false);
      // console.log(response);
   };
   return (
      <button
         onClick={addProduct}
         className="px-8 py-2 mt-4 rounded bg-beige drop-shadow"
      >
         Agregar al carrito
      </button>
   );
}

export default AddToCart;
