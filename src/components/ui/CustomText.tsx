import { ReactNode } from "react";
import styled from "styled-components";

interface Props {
  children: ReactNode;
  size?: string;
  color?: string;
  fontWeight?: string;
  margin?: string;
  onClick?: () => void;
  cursor?: string;
  tag?: string;
}

const CustomText = ({
  children,
  size = "1rem",
  color = "white",
  fontWeight = "normal",
  margin = "0",
  onClick,
  cursor = "default",
  tag = "p",
}: Props) => {
  return (
    <Text
      as={tag}
      size={size}
      color={color}
      fontWeight={fontWeight}
      margin={margin}
      onClick={onClick}
      cursor={cursor}
    >
      {children}
    </Text>
  );
};

const Text = styled.p<{
  size: string;
  color: string;
  fontWeight: string;
  margin: string;
  cursor: string;
}>`
  font-size: ${(props) => props.size};
  color: ${(props) => props.color};
  font-weight: ${(props) => props.fontWeight};
  margin: ${(props) => props.margin};
  text-align: left;

  &:hover {
    cursor: ${(props) => props.cursor};
  }
`;

export default CustomText;
