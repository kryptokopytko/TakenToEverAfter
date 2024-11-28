import styled from "styled-components";
import GuestList from "../sections/GuestList/GuestList";
import Budget from "../sections/Budget/Budget";
import ToDo from "../sections/ToDo/ToDo";
import Hero from "../sections/Hero/Hero";
import FavouritePhotos from "../sections/PhotoAlbum/FavouritePhotos";
import TableChart from "../sections/TableChart/TableChart";
import ThemeConstructor from "../sections/ThemeConstructor/ThemeConstructor";
import Choices from "../sections/Choices";
import Printables from "../sections/Printables/Printables";
import { guests, expenses, initialTasks, initialChoices } from "../exampleData";
import { handleDecision, handleInvite } from "../DBApi";


const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.primary};
`
const SectionsContainer = styled.div`
  width: 100%;
  margin: 0 -3rem;
  margin-top: -3rem;
  position: relative;
  overflow: hidden;
  max-width: 1500px;
  & > * {
    padding: 3rem;
    width: calc(100% - 6rem);
  }
   & > *:nth-child(even) {
    background-color: ${({ theme }) => theme.light}; 
  }

  & > *:nth-child(odd) {
    background-color: ${({ theme }) => theme.primary}; 
  }
`


const Home = () => {

  return (
    <Container>
      <SectionsContainer>
        <Hero />
        <div id="guest-list">
          <GuestList
            guests={guests}
            handleInvite={handleInvite}
            handleDecision={handleDecision}
            isHomePage={true} />
        </div>
        <div id="budget">
          <Budget isHomePage={true} expenses={expenses} />
        </div>
        <div id="to-do">
          <ToDo isHomePage={true} initialTasks={initialTasks} />
        </div>
        <div id="choices">
          <Choices isHomePage={true} initialChoices={initialChoices} />
        </div>
        <div id="photo-album">
          <FavouritePhotos isHomePage={true} />
        </div>
        <div id="table-chart">
          <TableChart />
        </div>
        <div id="theme-constructor">
          <ThemeConstructor isHomePage={true} />
        </div>
        <div id="printables">
          <Printables isHomePage={true} />
        </div>
      </SectionsContainer>
    </Container>
  );
};

export default Home;
