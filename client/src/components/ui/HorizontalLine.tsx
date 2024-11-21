import React from "react";
import styled from "styled-components";


const Line = styled.div`
  width: 100%;
  display:flex;
  margin: 2rem 0;
  border-bottom: 2px solid ${({ theme }) => theme.secondary};
`;

const HorizontalLine: React.FC = () => {
    return <Line />;
};

export default HorizontalLine;
