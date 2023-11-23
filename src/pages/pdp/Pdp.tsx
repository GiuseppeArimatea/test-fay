import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "../../redux/interface/products";
import {
  fetchCartProducts,
  fetchProducts,
} from "../../redux/reducers/products";
import { RootState } from "../../redux/store";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useParams } from "react-router";
import PdpCard from "../../components/core/PdpCard";

export const Pdp = memo((): JSX.Element => {
  const { id } = useParams();
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();
  const products = useSelector<RootState, Product[]>(
    (state) => state.products.data
  );

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const isAvailable = selectedProduct?.availability || false;

  useEffect(() => {
    if (!products?.length) {
      dispatch(fetchProducts());
      dispatch(fetchCartProducts());
    }
  }, [dispatch, products?.length]);

  useEffect(() => {
    if (id && products?.length) {
      const copyProduct = [...products];
      const singleProduct = copyProduct.find((item) => item.id === id);
      if (singleProduct) {
        setSelectedProduct(singleProduct);
      }
    }
  }, [id, products]);

  return (
    <div>
      <h1 className="title">PRODUCT</h1>
      {selectedProduct && (
        <PdpCard selectedProduct={selectedProduct} isAvailable={isAvailable} />
      )}
    </div>
  );
});
