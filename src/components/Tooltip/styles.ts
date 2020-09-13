import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  
  span {
    background: #ff9000;
    padding: 0.8rem;
    border-radius: 4px;
    font-size: 1.4rem;
    font-weight: 500;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.4s;
    
    position: absolute;
    bottom: calc(100% + 1.2rem);
    left: 50%;
    transform: translateX(-50%);
    
    color: #312e38;
    
    &::before {
      content: '';
      border-style: solid;
      border-color:#ff9000 transparent;
      border-width: .6rem .6rem 0 .6rem;
      top: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  } 
  
  &:hover span {
    opacity: 1;
    visibility: visible;
  } 
`;


