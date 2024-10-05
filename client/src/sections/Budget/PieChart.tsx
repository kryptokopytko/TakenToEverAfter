import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../providers/ThemeContext';
import { Theme } from '../../styles/theme';

interface PieChartData {
  value: number;
  label: string;
}

interface PieChartProps {
  data: PieChartData[];
  size?: number;
}

const Svg = styled.svg`
  width: 100%;
  height: 100%;
  display: block;
`;

const Label = styled.text`
  font-size: 20px;
  text-anchor: middle;
  fill: black;
  font-family: 'Great Vibes', cursive; 
`;

const PieChart: React.FC<PieChartProps> = ({ data, size = 400 }) => {

  const total = data.reduce((acc, item) => acc + item.value, 0);
  const radius = size / 2;

  let cumulativeValue = 0;
  const { theme } = useTheme();

  return (
    <Svg style={{ height: '50rem' }} viewBox={`-90 -70 ${size + 140} ${size + 140}`} width={size} height={size}>
      {data.map((item, index) => {
        const startAngle = cumulativeValue / total;
        cumulativeValue += item.value;
        const endAngle = cumulativeValue / total;

        const [startX, startY] = getCoordinatesForPercent(startAngle, radius, size);
        const [endX, endY] = getCoordinatesForPercent(endAngle, radius, size);
        const largeArcFlag = item.value / total > 0.5 ? 1 : 0;

        const middleAngle = (startAngle + endAngle) / 2;
        const [labelX, labelY] = getCoordinatesForPercent(middleAngle, radius * 1.25, size);

        return (
          <g key={index}>
            <path
              d={`M ${radius},${radius} L ${startX},${startY} A ${radius},${radius} 0 ${largeArcFlag} 1 ${endX},${endY} Z`}
              fill={getRandomColor(theme)}
            />
            <Label x={labelX} y={labelY}>
              {item.label}
            </Label>
          </g>
        );
      })}
    </Svg>
  );
};

const getCoordinatesForPercent = (percent: number, radius: number, size: number) => {
  const x = size / 2 + radius * Math.cos(2 * Math.PI * percent - Math.PI / 2);
  const y = size / 2 + radius * Math.sin(2 * Math.PI * percent - Math.PI / 2);
  return [x, y];
};

function* generateModulo90() {
  let value = 0;

  while (true) {
    yield value;
    value = (value + 35) % 80 + 15;
  }
}

const generator = generateModulo90();

const getRandomColor = (theme: Theme) => {
  return `hsl(${theme.hue}, ${theme.saturation}%, ${generator.next().value as number}%)`;
};

export default PieChart;
