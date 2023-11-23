import React, { memo } from "react";
import CustomText from "./CustomText";
import styled from "styled-components";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  color?: string;
  fontSize?: string;
  padding?: string;
}

const CustomButton: React.FC<ButtonProps> = memo(
  ({
    text,
    onClick,
    disabled = false,
    color = "white",
    fontSize = "1rem",
    padding = "1.5rem",
  }) => {
    return (
      <BoxButton
        color={color}
        onClick={onClick}
        disabled={disabled}
        padding={padding}
        type="submit"
      >
        <CustomText size={fontSize} margin="0" cursor="pointer" color="black">
          {text}
        </CustomText>
      </BoxButton>
    );
  }
);

const BoxButton = styled.button<{
  color: string;
  disabled: boolean;
  padding: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1.5rem;
  background-color: ${(props) => (props.disabled ? "gray" : props.color)};
  padding: ${(props) => props.padding};
  cursor: pointer;
  border-radius: 0.3125rem;
  border: 0;
  margin-right: 0.3125rem;

  p {
    font-weight: bold;
  }

  &:hover {
    background-color: ${(props) => (props.disabled ? "none" : "#3498db")};

    p {
      color: ${(props) => (props.disabled ? "black" : "white")};
    }
  }
`;

export default CustomButton;
