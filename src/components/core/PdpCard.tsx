import CustomButton from "../ui/CustomButton";
import CustomText from "../ui/CustomText";
import styled from "styled-components";
import { Product } from "../../redux/interface/products";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { fetchAddToCart, resetState } from "../../redux/reducers/products";

interface Props {
  selectedProduct: Product;
  isAvailable: boolean;
}
const PdpCard = (props: Props) => {
  const { selectedProduct, isAvailable } = props;
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();

  const added = useSelector<RootState, boolean>(
    (state) => state.products.added
  );
  const errorMessage = useSelector<RootState, boolean>(
    (state) => state.products.error
  );

  const AddToCart = () => {
    if (selectedProduct) {
      dispatch(fetchAddToCart(selectedProduct));
    }
  };

  useEffect(() => {
    if (added || errorMessage) {
      setTimeout(() => {
        dispatch(resetState());
      }, 2500);
    }
  }, [added, errorMessage, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, [dispatch]);

  return (
    <ProductContainer>
      <img src={selectedProduct?.thumbnail} alt={selectedProduct?.name} />
      <BoxInfo>
        <CustomText
          tag="h2"
          fontWeight="bold"
          size="1.5rem"
          margin="0 0 0.625rem 0"
          color="#a5a5a5"
        >
          Nuova collezione
        </CustomText>
        <CustomText tag="h2" margin="0 0 0.625rem 0" size="1.8rem">
          {selectedProduct?.name}
        </CustomText>

        <CustomText
          tag="h2"
          fontWeight="bold"
          size="1.5rem"
          margin="0 0 0.625rem 0"
          color="#a5a5a5"
        >
          Modello
        </CustomText>
        <CustomText tag="h2" margin="0 0 0.625rem 0" size="1.8rem">
          {selectedProduct?.sku}
        </CustomText>

        <CustomText
          tag="h2"
          fontWeight="bold"
          size="1.5rem"
          margin="0 0 0.625rem 0"
          color="#a5a5a5"
        >
          Prezzo
        </CustomText>
        <CustomText tag="p" margin="0 0 0.625rem 0" size="1.8rem">
          {selectedProduct?.price}€
        </CustomText>

        <CustomText
          tag="h2"
          fontWeight="bold"
          size="1.5rem"
          margin="0 0 0.625rem 0"
          color="#a5a5a5"
        >
          Descrizione
        </CustomText>
        <CustomText tag="p" margin="0 0 0.625rem 0" size="1.4rem">
          {selectedProduct?.description}
        </CustomText>

        <CustomText
          tag="h2"
          fontWeight="bold"
          size="1.5rem"
          margin="0 0 0.3125rem 0"
          color="#a5a5a5"
        >
          Disponibilita'
        </CustomText>

        {isAvailable ? <AvailableFlag /> : <NotAvailableFlag />}

        <BoxButton>
          <CustomButton
            text="Aggiungi al Carrello"
            onClick={AddToCart}
            disabled={!isAvailable}
          />

          {added && !errorMessage && (
            <Notification>
              Il prodotto è stato aggiunto al carrello
            </Notification>
          )}

          {errorMessage && (
            <NotificationMessage>
              Il prodotto è gia' stato aggiunto al carrello
            </NotificationMessage>
          )}
        </BoxButton>
      </BoxInfo>
    </ProductContainer>
  );
};
export default PdpCard;

const ProductContainer = styled.div`
  display: flex;
  width: 50%;
  margin: 45px auto;

  img {
    height: 43.75rem;
    width: 45rem;
    object-fit: cover;
  }

  @media (min-width: 800px) and (max-width: 2000px) {
    width: 70%;
    margin: 1.5625rem auto;
  }
`;

const BoxInfo = styled.div`
  display: flex;
  width: 50%;
  height: 43.75rem;
  justify-content: space-between;
  margin-left: 3.125rem;
  flex-direction: column;

  button {
    width: 12.5rem;
  }

  @media (max-width: 1200px) {
    display: flex;
    width: 100%;
    height: auto;
    justify-content: space-between;
    flex-direction: column;
    margin-left: 0;
    margin-top: 1rem;

    button {
      margin-bottom: 1rem;
      width: 12.5rem;
    }
  }
`;

const AvailableFlag = styled.div`
  height: 1.25rem;
  width: 1.25rem;
  border-radius: 100%;
  background-color: #4caf50;
`;

const NotAvailableFlag = styled.div`
  height: 1.25rem;
  width: 1.25rem;
  border-radius: 100%;
  background-color: red;
`;

const Notification = styled.div`
  background-color: #4caf50;
  color: white;
  padding: 0.9375rem;
  border-radius: 5px;
  opacity: 0;
  animation: fadeInOut 3s ease-in-out;
  @keyframes fadeInOut {
    0% {
      opacity: 0;
    }
    25% {
      opacity: 1;
    }
    75% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

const NotificationMessage = styled.div`
  background-color: red;
  color: white;
  padding: 0.9375rem;
  border-radius: 5px;
  opacity: 0;
  animation: fadeInOut 3s ease-in-out;
  @keyframes fadeInOut {
    0% {
      opacity: 0;
    }
    25% {
      opacity: 1;
    }
    75% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

const BoxButton = styled.div`
  display: flex;
`;
