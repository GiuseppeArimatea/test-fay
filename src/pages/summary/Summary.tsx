import { useDispatch, useSelector } from "react-redux";
import { Product, SummaryInfo } from "../../redux/interface/products";
import { RootState } from "../../redux/store";
import CustomText from "../../components/ui/CustomText";
import styled from "styled-components";
import { FC, memo, useEffect } from "react";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { resetCounter } from "../../redux/reducers/products";

export const Summary: FC = memo((): JSX.Element => {
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();
  const summaryInfo = useSelector<RootState, SummaryInfo>(
    (state) => state.products.summaryCart
  );
  const counterCart = useSelector<RootState, number>(
    (state) => state.products.counterCart
  );

  useEffect(() => {
    if (counterCart > 0) {
      dispatch(resetCounter());
    }
  }, [counterCart, dispatch]);

  return (
    <OuterBoxSummary>
      <h1 className="title">Summary</h1>

      {summaryInfo?.products?.length > 0 && (
        <>
          <CustomText tag="h2" fontWeight="bold" size="5rem" margin="8rem 0">
            Il tuo ordine e' stato effettuato con successo!
          </CustomText>
          <OuterBoxCards>
            {summaryInfo?.products?.map((product: Product) => {
              return (
                <Card key={product.id}>
                  <img src={product?.thumbnail} alt={product?.name} />
                  <CustomText tag="h3" fontWeight="bold">
                    {product.name}
                  </CustomText>
                </Card>
              );
            })}
          </OuterBoxCards>

          <CustomText tag="h3" fontWeight="bold" size="3rem" margin="4rem 0">
            Hai speso: {summaryInfo?.totalPrice}€
          </CustomText>
        </>
      )}
    </OuterBoxSummary>
  );
});

const OuterBoxSummary = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 12.5rem;
    height: 12.5rem;
  }
`;

const OuterBoxCards = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  margin: 0.625rem;
`;
