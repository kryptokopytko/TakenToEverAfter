import styled from "styled-components";
import GuestList from "../components/sections/GuestList";
import Budget from "../components/sections/Budget";
import ToDo from "../components/sections/ToDo/ToDo";
import Hero from "../components/sections/Hero/Hero";
import PhotoAlbum from "../components/sections/PhotoAlbum/PhotoAlbum";
import TableChart from "../components/sections/TableChart";
import ThemeConstructor from "../components/sections/ThemeConstructor/ThemeConstructor";
import Choices from "../components/sections/Choices";
import Printables from "../components/sections/Printables/Printables";

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
