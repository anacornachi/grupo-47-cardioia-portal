import {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: #f5f7fa;
    color: #ffffff;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    width: 100%;
  }

  #root {
    width: 100%;
    min-height: 100vh;
  }
`;
