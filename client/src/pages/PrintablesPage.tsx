import styled from "styled-components";
import { Heading } from "../styles/typography";
import Printables from "../sections/Printables/Printables";
import { Container, MenuContainer } from "../styles/page";
import Invitation from "../sections/Invitation";

interface PrintablesPageProps {
    bridesName: string;
    groomsName: string;
    bridesSurname: string;
    groomsSurname: string;
    date: string;
    time: string;
    location: string[];
}

const PrintablesPage: React.FC<PrintablesPageProps> = ({ bridesName, groomsName, bridesSurname, groomsSurname, time, date, location }) => {

    return (
        <Container>
            <MenuContainer>
                asdf
            </MenuContainer>
            <Invitation
                bridesName={bridesName}
                groomsName={groomsName}
                bridesSurname={bridesSurname}
                groomsSurname={groomsSurname}
                guests={["Papa Smurf", "Vanity Smurf", "Brainy Smurf"]}
                date={date}
                time={time}
                location={location}
                additionalText="Come 15 minutes before the start of the ceremony"
            />
        </Container>
    );
};


export default PrintablesPage;
