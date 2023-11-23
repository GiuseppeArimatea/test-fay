import { memo } from "react";
import { Product } from "../../redux/interface/products";
import styled from "styled-components";
import CustomText from "../ui/CustomText";
import CustomButton from "../ui/CustomButton";
import { useNavigate } from "react-router-dom";

interface Props {
  data: Product;
}

const ProductCard = memo((props: Props): JSX.Element => {
  const navigate = useNavigate();
  const id = props.data.id;

  const navigateToItemPage = () => {
    navigate(`/pdp/${id}`);
  };

  return (
    <OuterBoxCard>
      <img src={props.data.thumbnail} alt={props.data.name} />
      <Row>
        <Column>
          <CustomText tag="h3" fontWeight="bold">
            {props.data.name}
          </CustomText>
          <CustomText tag="p" fontWeight="bold">
            Prezzo: {props.data.price}€
          </CustomText>
        </Column>

        <Column>
          <CustomButton
            text="Dettagli"
            fontSize="1rem"
            padding="1rem"
            color="#4caf50"
            onClick={navigateToItemPage}
          />
        </Column>
      </Row>
    </OuterBoxCard>
  );
});

const OuterBoxCard = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  margin: 2rem;
  background-color: #ffffff21;
  img {
    width: 21.875rem;
    height: 25rem;
    object-fit: cover;
  }
`;

const Row = styled.div`
  display: flex;
  width: auto;
  align-items: center;
  justify-content: space-between;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;

  h3,
  p,
  button {
    margin: 0.3125rem;
  }
`;

export default ProductCard;
