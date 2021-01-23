import styled from "styled-components";
import { shade } from "polished";

export const Container = styled.button`
  background: #ff9000;
  height: 5.6rem;
  border-radius: 10px;
  border: none;
  padding: 0 1.6rem;
  color: #312e38;
  width: 100%;
  font-weight: 500;
  margin-top: 1.6rem;
  transition: background-color 0.2s;
  
  &:hover {
    background: ${shade(0.2, '#ff9000')};
  }
`;
