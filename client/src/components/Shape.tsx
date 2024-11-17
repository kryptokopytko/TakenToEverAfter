import styled from 'styled-components';

const StyledRectangle = styled.div<{
  width: string;
  height: string;
  color: string;
  oval: boolean;
}>`
  width: ${props => props.width};
  height: ${props => props.height};
  border: 2px solid ${({ theme, color }) => theme[color]};
  border-radius: ${({ oval }) => oval ? '50%' : '0'};
  background-color:  ${({ theme, color }) => color != 'secondary' ? theme.primary : theme.light};
`;

const Shape = ({ width = '100%', height = '100%', color = 'secondary', oval = false }) => {
  return <StyledRectangle width={width} height={height} color={color} oval={oval} />;
};

export default Shape;
