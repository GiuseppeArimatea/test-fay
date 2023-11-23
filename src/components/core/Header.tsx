import styled from "styled-components";
import CustomText from "../ui/CustomText";
import { useNavigate } from "react-router";
import { FiShoppingCart } from "react-icons/fi";
import { memo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Header = memo((): JSX.Element => {
  const navigate = useNavigate();
  const counterCart = useSelector<RootState, number>(
    (state) => state.products.counterCart
  );
  const redirectToHome = () => {
    navigate(`/`);
  };

  const goToCart = () => {
    navigate(`/cart`);
  };

  return (
    <OuterBoxHeader>
      <InnerBoxHeader>
        <CustomText
          fontWeight="bold"
          size="6rem"
          onClick={redirectToHome}
          cursor="pointer"
          color="white"
        >
          FAY
        </CustomText>

        <OuterBoxCart onClick={goToCart}>
          <BoxCounter>{counterCart}</BoxCounter> <FiShoppingCart />
        </OuterBoxCart>
      </InnerBoxHeader>
    </OuterBoxHeader>
  );
});

const OuterBoxHeader = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 1rem;

  svg {
    font-size: 4rem;
    stroke: white;
  }
`;

const InnerBoxHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60%;

  svg {
    font-size: 6rem;
    stroke: white;
    cursor: pointer;
  }
`;

const BoxCounter = styled.div`
  background: white;
  border-radius: 100%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0%;
  left: 100%;
  font-weight: bold;
  font-size: 1.7rem;
  border: 2px solid black;
`;

const OuterBoxCart = styled.div`
  position: relative;
`;
export default Header;
