import { memo } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { fetchDeleteFromCart } from "../../redux/reducers/products";
import { FiTrash } from "react-icons/fi";
import CustomText from "../ui/CustomText";
import { Product } from "../../redux/interface/products";
import styled from "styled-components";

interface Props {
  product: Product;
}

const CartCard = memo((props: Props): JSX.Element => {
  const { product } = props;
  const dispatch = useDispatch<ThunkDispatch<RootState, void, never>>();

  const handleDeleteFromCart = () => {
    dispatch(fetchDeleteFromCart(product.id));
  };

  return (
    <OuterBoxCard>
      <InnerBoxCard>
        <BoxImg src={product.thumbnail} alt="" loading="lazy" />
        <BoxInfo>
          <Column>
            <CustomText fontWeight="bold" size="1.4rem">
              {product.name}
            </CustomText>
            <CustomText fontWeight="bold" size="1.4rem">
              Prezzo: {product.price}€
            </CustomText>
          </Column>

          <BoxIcon onClick={handleDeleteFromCart}>
            <FiTrash />
          </BoxIcon>
        </BoxInfo>
      </InnerBoxCard>
    </OuterBoxCard>
  );
});

const OuterBoxCard = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 2rem;
  margin-bottom: 2rem;
  border: 0.25rem solid white;
  height: max-content;
`;

const BoxImg = styled.img`
  height: 18.75rem;
`;

const InnerBoxCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 18.75rem;
`;

const BoxIcon = styled.button`
  display: flex;
  background-color: transparent;
  border: 0;
  cursor: pointer;

  svg {
    font-size: 2rem;
    fill: white;
  }
`;

const BoxInfo = styled.div`
  background-color: transparent;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 0.5rem;
  justify-content: space-between;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export default CartCard;
