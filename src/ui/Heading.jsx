import { styled, css } from "styled-components";

// const test = `text-align:cente;`;
const test = css`
  text-align: center;
`;

// const Heading = styled.h1`
//   font-size: 30px;
//   font-weight: 600;
//   background-color: yellow;
//   ${test};
// `;

const Heading = styled.h1`
  ${(prop) =>
    prop.$type === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      background-color: yellow;
    `}

  ${(prop) =>
    prop.$type === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}

    ${(prop) =>
    prop.$type === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}

    ${(prop) =>
    prop.$type === "h4" &&
    css`
      font-size: 2rem;
      font-weight: 600;
      text-align: center;
    `}

    
  line-height: 1.4;
  ${test}
`;

export default Heading;
