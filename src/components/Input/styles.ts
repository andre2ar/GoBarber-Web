import styled from "styled-components";

export const Container = styled.div`
  background: #232129;
  border-radius: 10px;
  border: 2px solid #232129;
  padding: 1.6rem;
  width: 100%;
  color: #666360;
  
  display: flex;
  align-items: center;
  
  & + div {
      margin-top: .8rem;
  }
  
  input {  
    flex: 1;
    background: transparent;
    border: none;
    color: #f4ede8;
    
    &::placeholder {
     color: #666360;
    }
  }
  
  svg {
    margin-right: 1.6rem;
  }
`;
