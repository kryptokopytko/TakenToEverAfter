import React, { useState } from "react";
import Input from "../components/Input"; 
import Button, { ButtonContainer } from "../components/Button"; 
import { Heading, Label } from "../styles/typography";
import { Notification } from "../styles/page"; 
import { registerUser } from "../dummyDBApi"; 
import { Container, Form } from "../styles/form";

const RegistrationPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [weddingDate, setWeddingDate] = useState('');
    const [firstName1, setFirstName1] = useState('');
    const [firstName2, setFirstName2] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isRegistered, setIsRegistered] = useState(false);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value);
    const handleWeddingDateChange = (e: React.ChangeEvent<HTMLInputElement>) => setWeddingDate(e.target.value);
    const handleFirstName1Change = (e: React.ChangeEvent<HTMLInputElement>) => setFirstName1(e.target.value);
    const handleFirstName2Change = (e: React.ChangeEvent<HTMLInputElement>) => setFirstName2(e.target.value);
    
    const validateForm = (email: string, password: string, confirmPassword: string, firstName1: string, firstName2: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; 

        if (firstName1.length < 3 || firstName2.length < 3) {
            return "First names must each be at least 3 characters long.";
        }

        if (!emailRegex.test(email)) {
            return "Invalid email address format.";
        }

        if (!passwordRegex.test(password)) {
            return "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number.";
        }

        if (password !== confirmPassword) {
            return "Passwords do not match.";
        }

        return null; 
    };

    const handleRegister = async () => {
        const validationError = validateForm(email, password, confirmPassword, firstName1, firstName2);

        if (validationError) {
            setErrorMessage(validationError);
            return;
        }

        try {
            const success = await registerUser(email, password, weddingDate, firstName1, firstName2);
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
                        <Heading level={2}>Welcome,<br /> {firstName1} & {firstName2}</Heading>
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
                    placeholder="Enter your email"
                />

                <Label>Password</Label>
                <Input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Enter your password"
                />

                <Label>Confirm Password</Label>
                <Input
                    type="password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    placeholder="Confirm your password"
                />

                <Label>Wedding Date</Label>
                <Input
                    type="date"
                    value={weddingDate}
                    onChange={handleWeddingDateChange}
                    placeholder="Select wedding date"
                />

                <Label>First Name (Person 1)</Label>
                <Input
                    type="text"
                    value={firstName1}
                    onChange={handleFirstName1Change}
                    placeholder="Enter first name of person 1"
                />

                <Label>First Name (Person 2)</Label>
                <Input
                    type="text"
                    value={firstName2}
                    onChange={handleFirstName2Change}
                    placeholder="Enter first name of person 2"
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
