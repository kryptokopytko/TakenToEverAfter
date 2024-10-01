import styled from "styled-components";
import Navbar from "../layout/Navbar/Navbar";
import GuestList from "./GuestList";
import Budget from "./Budget";
import ToDo from "./ToDo/ToDo";
import Hero from "./Hero/Hero";
import PhotoAlbum from "./PhotoAlbum/PhotoAlbum";
import Footer from "../layout/Footer/Footer";
import TableChart from "./TableChart";
import ThemeConstructor from "./ThemeConstructor/ThemeConstructor";
import Choices from "./Choices";
import Printables from "./Printables/Printables";

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

const sections = ['Home', 'Hero', 'Guest List', 'Budget', 'To Do', 'Choices', 'Photo Album', 'TableChart', 'Theme Constructor'];

const Home = () => {

  return (
    <div>
      <Navbar isLogged={true} names={['Smurf', 'Smurfette']} sections={sections} weddingDate="26.04.2025" />
      <SectionsContainer>
        <Hero />
        <div id="guest-list">
          <GuestList />
        </div>
        <div id="budget">
          <Budget />
        </div>
        <div id="to-do">
          <ToDo />
        </div>
        <div id="choices">
          <Choices />
        </div>
        <div id="photo-album">
          <PhotoAlbum />
        </div>
        <div id="table-chart">
          <TableChart />
        </div>
        <div id="theme-constructor">
          <ThemeConstructor />
        </div>
        <div id="printables">
          <Printables />
        </div>
      </SectionsContainer>

      <Footer sections={sections} />
    </div>
  );
};

export default Home;
