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
import { translations } from "../translations";

interface GoogleJwtPayload {
    email: string;
}

const LoginPage: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const { isLogged, setIsLogged, setAccount, language } = useUser();

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
                navigate('/registration?mail=' + email);
            }
        } catch (error) {
            console.error("Error during Google login process:", error);
        }
    };

    const handleGoogleLoginError = () => {
        setErrorMessage(translations[language].loginFailed);
    };

    if (isLogged) {
        return (
            <Container style={{ margin: '10%' }}>
                <Form>
                    <div style={{ textAlign: 'center' }}>
                        <Heading level={2}>{translations[language].welcomeBack}</Heading>
                        <p>{translations[language].successfullyLogged}</p>
                    </div>
                </Form>
            </Container>
        );
    }

    return (
        <Container style={{ margin: '10%' }}>
            <Form>
                <div style={{ marginLeft: '-3rem' }}>
                    <Heading level={2}>{translations[language].login}</Heading>
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
