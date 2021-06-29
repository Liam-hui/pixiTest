import React from 'react';
import { Link } from "react-router-dom";

import { StyledContainer } from './styles';

function Home() {
  return (
    <StyledContainer>
      <Link to="/test">Link</Link>
      Home
    </StyledContainer>
  );
}

export default Home;
