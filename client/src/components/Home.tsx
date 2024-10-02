import styled from "styled-components";
import Navbar from "./layout/Navbar/Navbar";
import GuestList from "./sections/GuestList";
import Budget from "./sections/Budget";
import ToDo from "./sections/ToDo/ToDo";
import Hero from "./sections/Hero/Hero";
import PhotoAlbum from "./sections/PhotoAlbum/PhotoAlbum";
import Footer from "./layout/Footer/Footer";
import TableChart from "./sections/TableChart";
import ThemeConstructor from "./sections/ThemeConstructor/ThemeConstructor";
import Choices from "./sections/Choices";
import Printables from "./sections/Printables/Printables";

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

const sections = ['Home', 'Hero', 'Guest List', 'Budget', 'To Do', 'Choices', 'Photo Album', 'Table Chart', 'Theme Maker', 'Printables'];

const Home = () => {

  return (
    <div>
      <Navbar isLogged={true} names={['Smurf', 'Smurfette']} sections={sections} weddingDate="26.04.2025" />


      <SectionsContainer>
        <Hero />
        <div id="guest-list">
          <GuestList manageSectionButton={true} />
        </div>
        <div id="budget">
          <Budget manageSectionButton={true} />
        </div>
        <div id="to-do">
          <ToDo manageSectionButton={true} />
        </div>
        <div id="choices">
          <Choices manageSectionButton={true} />
        </div>
        <div id="photo-album">
          <PhotoAlbum manageSectionButton={true} />
        </div>
        <div id="table-chart">
          <TableChart manageSectionButton={true} />
        </div>
        <div id="theme-constructor">
          <ThemeConstructor manageSectionButton={true} />
        </div>
        <div id="printables">
          <Printables manageSectionButton={true} />
        </div>
      </SectionsContainer>

      <Footer sections={sections} />
    </div>
  );
};

export default Home;
