import { memo, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import CustomText from "../../components/ui/CustomText.tsx";
import { Product } from "../../redux/interface/products";
import { RootState } from "../../redux/store";
import CartCard from "../../components/core/CartCard";
import { fetchCartProducts, resetState } from "../../redux/reducers/products";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import Checkout from "./payment/checkoutForm.tsx";

export const CartPage = memo((): JSX.Element => {
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();
  const cartProducts = useSelector<RootState, Product[]>(
    (state) => state.products.cart
  );
  const eliminetedFromCart = useSelector<RootState, boolean>(
    (state) => state.products.eliminatedFromCart
  );

  const fetchCartProductsCallback = useCallback(() => {
    dispatch(fetchCartProducts());
  }, [dispatch]);

  const resetStateCallback = useCallback(() => {
    dispatch(resetState());
  }, [dispatch]);

  useEffect(() => {
    fetchCartProductsCallback();
  }, [fetchCartProductsCallback]);

  useEffect(() => {
    if (eliminetedFromCart) {
      fetchCartProductsCallback();
      resetStateCallback();
    }
  }, [eliminetedFromCart, fetchCartProductsCallback, resetStateCallback]);

  return (
    <OuterBoxPage>
      <h1 className="title">CART</h1>

      <CustomText
        tag="h1"
        fontWeight="bold"
        size="3rem"
        margin="0rem 0 0.3125rem 0"
      >
        Il tuo carrello {!cartProducts.length && "è vuoto"}
      </CustomText>
      <OuterBoxInfo>
        {cartProducts.length > 0 && (
          <>
            <CardBox>
              {cartProducts.map((product: Product) => (
                <CartCard product={product} key={product.id} />
              ))}
            </CardBox>
            <BoxTotalPrice>
              <CustomText
                tag="h1"
                fontWeight="bold"
                size="2.5rem"
                margin="0rem 0"
              >
                Procedi con il tuo ordine
              </CustomText>
              <CustomText
                tag="p"
                fontWeight="bold"
                size="2rem"
                margin="0.5rem 0"
              >
                La quantità è: {cartProducts.length}{" "}
                {cartProducts.length === 1 ? "prodotto" : "prodotti"}
              </CustomText>
              <Checkout />
            </BoxTotalPrice>
          </>
        )}
      </OuterBoxInfo>
    </OuterBoxPage>
  );
});

const OuterBoxPage = styled.div`
  width: 60%;
  margin: 0 auto;
  margin-top: 4rem;

  @media (min-width: 800px) and (max-width: 2000px) {
    margin-top: 1rem;
  }
`;

const CardBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 70%;
`;

const OuterBoxInfo = styled.div`
  display: flex;
  flex-direction: row;
`;

const BoxTotalPrice = styled.div`
  display: flex;
  width: 30%;
  flex-direction: column;
  height: max-content;
`;
