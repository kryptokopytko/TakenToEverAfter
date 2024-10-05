import styled from "styled-components";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import { fontStyles } from "../../styles/typography";
import { darken } from "polished";

export const StyledCalendar = styled(Calendar)`
  background-color: ${({ theme }) => theme.primary};
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  width: 100%;
  border: 2px solid ${({ theme }) => theme.secondary};
  font-family: ${fontStyles.bodyFont};
  .react-calendar__navigation {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;

    button {
      color: ${({ theme }) => theme.body};
      background: none;
      border: none;
      font-size: 2.5rem;
      cursor: pointer;
      font-family: ${fontStyles.labelFont};
      &:hover {
        color: ${({ theme }) => theme.tertiary};
        background-color: ${({ theme }) => theme.primary};
      }
    }
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    font-size: 2.2rem;
    font-weight: bold;
    color: ${({ theme }) => theme.secondary};
    padding-bottom: 0.5rem;
    font-family: ${fontStyles.labelFont};
    text-decoration: none;
    text-transform: lowercase;
    border-bottom: 1px solid ${({ theme }) => theme.secondary};
  }

  .react-calendar__tile {
    max-width: 100%;
    min-height: 5rem;
    font-size: 1rem;
    text-align: center;
    cursor: pointer;
    color: ${({ theme }) => theme.body};

    &:hover {
      background: ${({ theme }) => theme.light};
      color: ${({ theme }) => theme.body};
    }

    &.highlight {
      background-color: ${({ theme }) => theme.tertiary};
      color: ${({ theme }) => theme.primary};
      font-weight: bold;
    }

    &--now {
      background: ${({ theme }) => theme.body};
      color: ${({ theme }) => theme.primary};
    }

    &--active {
      background: ${({ theme }) => theme.secondary} !important;
      color: ${({ theme }) => theme.body};
      font-weight: bold;
      border: 2px solid ${({ theme }) => theme.body};
    }
  }

  .react-calendar__tile--hover {
    background: ${({ theme }) => theme.light};
    color: ${({ theme }) => theme.body};
  }

  .react-calendar__month-view__days__day--weekend {
    color: ${({ theme }) => darken(0.4, theme.secondary)};
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: ${({ theme }) => theme.dark};
  }
`;
