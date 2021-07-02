import styled from 'styled-components';

export const CardContainer = styled.div`
  width: 400px;
  height: 200px;
`;

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  // filter: grayscale(100%);
`;

export const CardCanvas = styled.div`
  width: 600px;
  height: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;



