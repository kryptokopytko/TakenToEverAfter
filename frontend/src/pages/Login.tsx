import React, { useState } from "react";
import { ButtonContainer } from "../components/ui/Button";
import { Heading } from "../styles/typography";
import { Notification } from "../styles/page";
import { getUserByEmail } from "../dummyDBApi";
import { Container, Form } from "../styles/form";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { isRegistrated } from "../dummyDBApi";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useUser } from "../providers/UserContext";

const LoginPage: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const { isLogged, setIsLogged, setNames } = useUser();

    const handleGoogleLoginSuccess = async (response: CredentialResponse) => {
        const email = jwtDecode(response.credential!).email;

        try {
          const isUserRegistered = await isRegistrated(email);
          if (isUserRegistered) {
            const response = await getUserByEmail(email);
            console.log("LOGIN: ", response);
            setIsLogged(true);
            setNames([response.groom_name, response.bride_name])
            setErrorMessage(null);
          } else {
            navigate('/registration?mail=' + email );
          }
        } catch (error) {
          console.error("Error during Google login process:", error);
        }
    };

    const handleGoogleLoginError = () => {
        setErrorMessage("Google login failed. Please try again.");
    };

    if (isLogged) {
        return (
            <Container>
                <Form>
                    <div style={{ textAlign: 'center' }}>
                        <Heading level={2}>Welcome back!</Heading>
                        <p>You have successfully logged in.</p>
                    </div>
                </Form>
            </Container>
        );
    }

    return (
        <Container>
            <Form>
                <div style={{ marginLeft: '-3rem' }}>
                    <Heading level={2}>Login</Heading>
                </div>

                {errorMessage && (
                    <Notification>
                        {errorMessage}
                    </Notification>
                )}

                <ButtonContainer>
                    <GoogleLogin
                        onSuccess={handleGoogleLoginSuccess}
                        onError={handleGoogleLoginError}
                    />
                </ButtonContainer>
                
               
            </Form>
        </Container>
    );
};

export default LoginPage;
