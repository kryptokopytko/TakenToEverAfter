import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import Input from "../components/ui/Input";
import Button, { ButtonContainer } from "../components/ui/Button";
import { Heading, Label } from "../styles/typography";
import { Notification } from "../styles/page";
import { registerUser } from "../API/DbApi/DBApi";
import { Container, Form } from "../styles/form";
import { useUser } from "../providers/UserContext";
import { translations } from "../translations";

const RegistrationPage: React.FC = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const userEmail = searchParams.get('mail');
    const { language } = useUser();

    const [email, setEmail] = useState(userEmail ? userEmail : '');
    const [weddingDate, setWeddingDate] = useState('');
    const [groomName, setGroomName] = useState('');
    const [brideName, setBrideName] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isRegistered, setIsRegistered] = useState(false);

    const handleEmailChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => setEmail(e.target.value);

    const handleWeddingDateChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => setWeddingDate(e.target.value);

    const handleGroomNameChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => setGroomName(e.target.value);

    const handleBrideNameChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => setBrideName(e.target.value);

    const validateForm = (email: string, groomName: string, brideName: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (groomName.length < 3 || brideName.length < 3) {
            return translations[language].nameTooShort;
        }

        if (!emailRegex.test(email)) {
            return translations[language].invalidEmail;
        }

        return null;
    };

    const handleRegister = async () => {
        const validationError = validateForm(email, groomName, brideName);

        if (validationError) {
            setErrorMessage(validationError);
            return;
        }

        try {
            const success = await registerUser(groomName, brideName, email, weddingDate, language);
            if (success) {
                setIsRegistered(true);
                setErrorMessage(null);
            } else {
                setErrorMessage(translations[language].registrationFailed);
            }
        } catch (error) {
            setErrorMessage(translations[language].registrationError);
        }
    };

    if (isRegistered) {
        return (
            <Container>
                <Form>
                    <div style={{ textAlign: 'center' }}>
                        <Heading level={2}>{translations[language].welcome},<br /> {groomName} & {brideName}</Heading>
                        <p>
                            {translations[language].registrationSuccess}
                            {weddingDate ? ` ${translations[language].weddingDateMessage} ${weddingDate}.` : ""}
                        </p>
                    </div>
                </Form>
            </Container>
        );
    }

    return (
        <Container>
            <Form>
                <div >
                    <Heading level={2}>{translations[language].register}</Heading>
                </div>

                <Label>Email</Label>
                <Input
                    type="email"

                    value={email}
                    onChange={handleEmailChange}
                    placeholder={userEmail ? userEmail : translations[language].emailPlaceholder}
                    readonly
                />

                <Label>{translations[language].weddingDate}</Label>
                <Input
                    type="date"
                    value={weddingDate}
                    onChange={handleWeddingDateChange}
                    placeholder={translations[language].weddingDatePlaceholder}
                />

                <Label>{translations[language].brideName}</Label>
                <Input
                    type="text"
                    value={brideName}
                    onChange={handleBrideNameChange}
                    placeholder={translations[language].brideNamePlaceholder}
                />

                <Label>{translations[language].groomName}</Label>
                <Input
                    type="text"
                    value={groomName}
                    onChange={handleGroomNameChange}
                    placeholder={translations[language].groomNamePlaceholder}
                />

                {errorMessage && (
                    <Notification>
                        {errorMessage}
                    </Notification>
                )}

                <ButtonContainer>
                    <Button onClick={handleRegister}>{translations[language].register}</Button>
                </ButtonContainer>
            </Form>
        </Container>
    );
};

export default RegistrationPage;
