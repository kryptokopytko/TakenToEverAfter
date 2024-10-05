import styled from "styled-components";
import GuestList from "../sections/GuestList";
import Budget from "../sections/Budget";
import ToDo from "../sections/ToDo/ToDo";
import Hero from "../sections/Hero/Hero";
import PhotoAlbum from "../sections/PhotoAlbum/PhotoAlbum";
import TableChart from "../sections/TableChart";
import ThemeConstructor from "../sections/ThemeConstructor/ThemeConstructor";
import Choices from "../sections/Choices";
import Printables from "../sections/Printables/Printables";

const SectionsContainer = styled.div`
  width: 100%;
  position:relative;
  overflow: hidden;
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
    <SectionsContainer>
      <Hero />
      <div id="guest-list">
        <GuestList isHomePage={true} />
      </div>
      <div id="budget">
        <Budget isHomePage={true} />
      </div>
      <div id="to-do">
        <ToDo isHomePage={true} />
      </div>
      <div id="choices">
        <Choices isHomePage={true} />
      </div>
      <div id="photo-album">
        <PhotoAlbum isHomePage={true} />
      </div>
      <div id="table-chart">
        <TableChart isHomePage={true} />
      </div>
      <div id="theme-constructor">
        <ThemeConstructor isHomePage={true} />
      </div>
      <div id="printables">
        <Printables isHomePage={true} />
      </div>
    </SectionsContainer>
  );
};

export default Home;
