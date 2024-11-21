import React, { useState } from "react";
import Input from "../components/ui/Input";
import Button, { ButtonContainer } from "../components/ui/Button";
import { Heading, Label } from "../styles/typography";
import { Notification } from "../styles/page";
import { loginUser } from "../dummyDBApi";
import { Container, Form } from "../styles/form";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleLogin = async () => {
        if (email.trim() === "" || password.trim() === "") {
            setErrorMessage("Email and password fields cannot be empty.");
            return;
        }

        try {
            const success = await loginUser(email, password);
            if (success) {
                setIsLoggedIn(true);
                setErrorMessage(null);
            } else {
                setErrorMessage("Invalid credentials. Please try again.");
            }
        } catch (error) {
            setErrorMessage("An error occurred during login. Please try again.");
        }
    };

    if (isLoggedIn) {
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

                {errorMessage && (
                    <Notification>
                        {errorMessage}
                    </Notification>
                )}

                <ButtonContainer>
                    <Button onClick={handleLogin}>Login</Button>
                </ButtonContainer>
            </Form>
        </Container>
    );
};

export default LoginPage;
