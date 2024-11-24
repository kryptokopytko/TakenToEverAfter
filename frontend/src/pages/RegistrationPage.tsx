import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import Input from "../components/ui/Input";
import Button, { ButtonContainer } from "../components/ui/Button";
import { Heading, Label } from "../styles/typography";
import { Notification } from "../styles/page";
import { registerUser } from "../dummyDBApi";
import { Container, Form } from "../styles/form";

const RegistrationPage: React.FC = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const userEmail = searchParams.get('mail');
    
    const [email, setEmail] = useState(userEmail? userEmail : '');
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
            return "First names must each be at least 3 characters long.";
        }

        if (!emailRegex.test(email)) {
            return "Invalid email address format.";
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
            const success = await registerUser(groomName, brideName, email, weddingDate, );
            if (success) {
                setIsRegistered(true);
                setErrorMessage(null);
            } else {
                setErrorMessage("Registration failed. Please try again.");
            }
        } catch (error) {
            setErrorMessage("An error occurred during registration. Please try again.");
        }
    };

    if (isRegistered) {
        return (
            <Container>
                <Form>
                    <div style={{ textAlign: 'center' }}>
                        <Heading level={2}>Welcome,<br /> {groomName} & {brideName}</Heading>
                        <p>Registration Successful! 
                            {weddingDate ? 'Your wedding date is set for ' + weddingDate : <></>}</p>
                    </div>
                </Form>
            </Container>
        );
    }

    return (
        <Container>
            <Form>
                <div style={{ marginBottom: '-2rem' }}>
                    <Heading level={2}>Register</Heading>
                </div>

                <Label>Email</Label>
                <Input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder={userEmail? userEmail : "Enter your email"}
                />

                <Label>Wedding Date</Label>
                <Input
                    type="date"
                    value={weddingDate}
                    onChange={handleWeddingDateChange}
                    placeholder="Select wedding date"
                />

                <Label>First Name (Groom)</Label>
                <Input
                    type="text"
                    value={groomName}
                    onChange={handleGroomNameChange}
                    placeholder="Enter first name of groom"
                />

                <Label>First Name (Bride)</Label>
                <Input
                    type="text"
                    value={brideName}
                    onChange={handleBrideNameChange}
                    placeholder="Enter first name of bride"
                />

                {errorMessage && (
                    <Notification>
                        {errorMessage}
                    </Notification>
                )}

                <ButtonContainer>
                    <Button onClick={handleRegister}>Register</Button>
                </ButtonContainer>
            </Form>
        </Container>
    );
};

export default RegistrationPage;
