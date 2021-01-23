import styled, {keyframes} from "styled-components";
import { shade } from "polished";

import signUpBackgroundImage from '../../assets/sign-up-background.png';

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
`;

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(5rem);    
  }
  to {
    opacity: 1;
    transform: translateX(0);    
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  animation: ${appearFromRight} 1s;
  
  form {
    margin: 8rem 0;
    width: 34rem;
    text-align: center;
    
    h1 {
      margin-bottom: 2.4rem;
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
    color: #f4ede8;
    margin-top: 2.4rem;
    text-decoration: none;
    transition: color 0.2s;
    
    display: flex;
    align-items: center;
    
    svg {
      margin-right: 1.6rem;
    }
    
    &:hover {
      color: ${shade(0.2, '#f4ede8')};
    }  
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signUpBackgroundImage}) no-repeat center;
  background-size: cover;
`;
