import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }
  
  *,
  *::before,
  *::after{
    box-sizing: inherit;
  }
  
  html {
    box-sizing: border-box;
    outline: 0;
    font-size: 62.5%; // 10 px
  }
  
  body {
    background-color: #312e38;
    color: #fff;
    -webkit-font-smoothing: antialiased;
  }
  
  body, input, button {
    font-family: "Roboto Slab", serif;
    font-size: 1.6rem;
  }
  
  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }
  
  button {
    cursor: pointer;
  }
`;


export default GlobalStyle;
