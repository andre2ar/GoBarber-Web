import styled from "styled-components";
import { shade } from "polished";

import signInBackgroundImage from '../../assets/sign-in-background.png';

export const Container = styled.div`
  height: 100vh;
  
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  width: 100%;
  max-width: 70rem;
  
  form {
    margin: 8rem 0;
    width: 34rem;
    text-align: center;
    
    h1 {
      margin-bottom: 2.4rem;
    }
    
    input {
      background: #232129;
      border-radius: 10px;
      border: 2px solid #232129;
      padding: 1.6rem;
      width: 100%;
      color: #f4ede8;
      
      &::placeholder {
        color: #666360;
      }
      
      & + input {
        margin-top: .8rem;
      }
    }
    
    button {
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
    }
    
    a {
      color: #f4ede8;
      display: block;
      margin-top: 2.4rem;
      text-decoration: none;
      transition: color 0.2s;
      
      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }
  
  > a {
    color: #ff9000;
    margin-top: 2.4rem;
    text-decoration: none;
    transition: color 0.2s;
    
    display: flex;
    align-items: center;
    
    svg {
      margin-right: 1.6rem;
    }
    
    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }  
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackgroundImage}) no-repeat center;
  background-size: cover;
`;
