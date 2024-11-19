import styled from 'styled-components';

const StyledRectangle = styled.div<{
  width: string;
  height: string;
  color: string;
  oval: boolean;
  x: string;
  y: string;
}>`
  width: ${props => props.width};
  height: ${props => props.height};
  position: absolute;
  left: ${props => props.x};
  top: ${props => props.y};
  border: 2px solid ${({ theme, color }) => theme[color]};
  border-radius: ${({ oval }) => (oval ? '50%' : '0')};
  background-color: ${({ theme, color }) =>
    color !== 'secondary' ? theme.primary : theme.light};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Shape: React.FC<{
  width?: string;
  height?: string;
  color?: string;
  oval?: boolean;
  x: string;
  y: string;
  label?: string;
}> = ({ width = '100%', height = '100%', color = 'secondary', oval = false, x, y, label }) => {
  return (
    <StyledRectangle width={width} height={height} color={color} oval={oval} x={x} y={y}>
      {label}
    </StyledRectangle>
  );
};

export default Shape;
