import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "../../redux/interface/products";
import {
  fetchCartProducts,
  fetchProducts,
} from "../../redux/reducers/products";
import { RootState } from "../../redux/store";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import ProductCard from "../../components/core/ProductCard";
import styled from "styled-components";

export const Homepage = memo((): JSX.Element => {
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();
  const products = useSelector<RootState, Product[]>(
    (state) => state.products.data
  );

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCartProducts());
  }, [dispatch]);

  return (
    <div>
      <h1 className="title">SHOP</h1>
      <CardContainer>
        {products?.map((product) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </CardContainer>
    </div>
  );
});

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  margin-top: 5rem;
`;
