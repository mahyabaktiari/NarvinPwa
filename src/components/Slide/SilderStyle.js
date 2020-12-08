import styled from "styled-components";

export const SlideSection = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${(props) => props.url});
  background-size: 50% auto;
  background-repeat: no-repeat;
  background-position: center;
  height: 265px;
  ::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    // background-color: rgba(0, 0, 0, 0.5);
  }
`;
export const Pagination = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50px;
  background-color: ${(props) => props.bgColor};
  margin: 2px;
  cursor: pointer;
`;
export const Button = styled.button`
  background-color: white;
  color: #cd0448;
  cursor: pointer;
  outline: none;
  border: none;
  margin: 5px;
`;
export const Flex = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${(props) => (props.background ? "#1e1e1e" : "")};
`;
export const H1 = styled.h1`
  position: relative;
  text-transform: uppercase;
  color: white;
  z-index: 1;
`;
