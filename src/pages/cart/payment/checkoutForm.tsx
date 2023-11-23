import { useState, FormEvent, FC } from "react";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CustomButton from "../../../components/ui/CustomButton";
import CustomText from "../../../components/ui/CustomText";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "../../../redux/interface/products";
import { RootState } from "../../../redux/store";
import {
  fetchDeleteFromCart,
  setSummaryCart,
} from "../../../redux/reducers/products";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useNavigate } from "react-router";

interface Address {
  shipping: string;
  billing: string;
}

const CheckoutForm: FC = (): JSX.Element => {
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const cartProducts = useSelector<RootState, Product[]>(
    (state) => state.products.cart
  );

  const [addresses, setAddresses] = useState<Address>({
    shipping: "",
    billing: "",
  });

  const [addressErrors, setAddressErrors] = useState<Address>({
    shipping: "",
    billing: "",
  });

  const validateInputs = () => {
    let isValid = true;
    const newErrors: Address = { shipping: "", billing: "" };

    if (!addresses.shipping.trim()) {
      newErrors.shipping = "Inserisci l'indirizzo di spedizione";
      isValid = false;
    }

    if (!addresses.billing.trim()) {
      newErrors.billing = "Inserisci l'indirizzo di fatturazione";
      isValid = false;
    }

    setAddressErrors(newErrors);
    return isValid;
  };

  const goToSummary = () => {
    navigate(`/summary`);
  };

  const handlePayment = async (e: FormEvent) => {
    e.preventDefault();
    const isValid = validateInputs();

    if (!stripe || !elements || !isValid) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      return;
    }

    const { error } = await stripe.createToken(cardElement);

    if (error) {
      return;
    } else {
      dispatch(
        setSummaryCart({ products: cartProducts, totalPrice: showTotalPrice() })
      );

      cartProducts.forEach((product) => {
        dispatch(fetchDeleteFromCart(product.id));
      });

      goToSummary();
    }
  };

  const showTotalPrice = () => {
    const totalPrice = cartProducts.reduce((acc, product) => {
      return acc + (product.price || 0);
    }, 0);

    return totalPrice;
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "2rem",
        color: "#ffffff",
        "::placeholder": {
          color: "#ffffff",
        },
      },
      invalid: {
        color: "#9e2146",
      },
    },
  };

  return (
    <FormContainer onSubmit={handlePayment}>
      <CustomText size="2rem" margin="0.625rem 0">
        Indirizzo di spedizione:
      </CustomText>
      <Input
        type="text"
        value={addresses.shipping}
        onChange={(e) =>
          setAddresses({ ...addresses, shipping: e.target.value })
        }
        style={addressErrors.shipping ? { border: "0.0625rem solid red" } : {}}
      />
      {addressErrors.shipping && (
        <ErrorText>{addressErrors.shipping}</ErrorText>
      )}

      <CustomText size="2rem" margin="0.625rem 0">
        Indirizzo di fatturazione:
      </CustomText>
      <Input
        type="text"
        value={addresses.billing}
        onChange={(e) =>
          setAddresses({ ...addresses, billing: e.target.value })
        }
        style={addressErrors.billing ? { border: "0.0625rem solid red" } : {}}
      />
      {addressErrors.billing && <ErrorText>{addressErrors.billing}</ErrorText>}

      <CustomText size="2rem" margin="3rem 0 2rem 0">
        Dati Carta di credito:
      </CustomText>
      <CardElement options={cardElementOptions} />

      <CustomText tag="p" fontWeight="bold" size="2rem" margin="0.625rem 0">
        Il prezzo totale è di: {showTotalPrice()}€
      </CustomText>
      <CustomButton text="Acquista" disabled={!stripe} />
    </FormContainer>
  );
};

const Checkout: FC = (): JSX.Element => {
  const stripePromise = loadStripe(
    "pk_test_51OFGV1LHZ1mCDnucRxBtViuKAioazM8LwaPExSVs8mDDidbSPauPeDbNU2fkduKzEJFHdVjZzLWBh7TMNwNCFEUc00EmBRj44M"
  );

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

const FormContainer = styled.form`
  button {
    margin-top: 1rem;
  }
`;

const ErrorText = styled.p`
  color: red;
  margin-top: 0.3125rem;
`;

const Input = styled.input`
  padding: 0.6rem;
  width: 50%;
`;

export default Checkout;
