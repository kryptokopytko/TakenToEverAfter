import React, { useState } from "react";
import { ButtonContainer } from "../components/ui/Button";
import { Heading } from "../styles/typography";
import { Notification } from "../styles/page";
import { isRegistrated, getUserByEmail, login } from "../API/DbApi/DBApi";
import { Container, Form } from "../styles/form";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useUser } from "../providers/UserContext";

interface GoogleJwtPayload {
    email: string;
}

const LoginPage: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const { isLogged, setIsLogged, setAccount } = useUser();

    const handleGoogleLoginSuccess = async (response: CredentialResponse) => {
        if (!response.credential) {
            throw new Error("Credential is missing from the Google login response.");
        }
        
        const decodedToken = jwtDecode<GoogleJwtPayload>(response.credential);
        const email = decodedToken.email;

        try {
          const isUserRegistered = await isRegistrated(email);
          if (isUserRegistered) {
            const response = await getUserByEmail(email);
            await login(email);
            setIsLogged(true);
            setAccount(response);
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
