import styled, { css } from "styled-components";

interface ToastProps {
    type?: 'success' | 'error' | 'info';
    hasDescription: boolean;
}

export const Container = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  overflow: hidden;  
  padding: 3rem;
`;

const toastTypeVariations = {
    info: css`
      background: #ebf8ff;
      color: #3172b7;
    `,
    success: css`
      background: #e6fffa;
      color: #2e656a;
    `,
    error: css`
      background: #fddede;
      color: #c53030;
    `,
};

export const Toast = styled.div<ToastProps>`
  width: 36rem;
  
  position: relative;
  padding: 1.6rem 3rem 1.6rem 1.6rem;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0,0,0,0.2);
  
  display: flex;
  
  & + div {
    margin-top: .8rem;
  }
  
  ${props => toastTypeVariations[props.type || 'info']}
  
  > svg {
    margin: 4px 12px 0 0;
  }
  
  div {
    flex: 1;
    
    p {
      margin-top: .4rem;
      font-size: 1.4rem;
      opacity: 0.8;
      line-height: 2rem;
    }
  }
  
  button {
    position: absolute;
    right: 1.6rem;
    top: 1.9rem;
    opacity: 0.6;
    border: none;
    background: transparent;
    color: inherit;
  }
  
  ${props => !props.hasDescription && css`
    align-items: center;
    
    svg {
      margin-top: 0;
    }
  `}
`;
