import React, { useState } from "react";
import { toxicPersonalities, questions, Answer, Result } from "../sections/PersonalityTest/personalities";
import Button from "../components/Button";
import { Body, Subtitle } from "../styles/typography";
import styled from "styled-components";


const Container = styled.div`
  margin: 1rem;
  padding: 1rem 2rem;
  padding-bottom: 2rem;
  background-color: ${({ theme }) => theme.primary};
  display: grid;
  grid-template-columns: 1fr;
  text-align: center;
`;


const PersonalityQuizPage: React.FC = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [results, setResults] = useState<Result[]>([]);
    const [isCompleted, setIsCompleted] = useState(false);

    const handleAnswerClick = (answers: Answer[]) => {
        
        const updatedResults = [...results];
        answers.forEach(({ personality, weight }) => {
            const resultIndex = updatedResults.findIndex(
                (res) => res.personality === personality
            );
            if (resultIndex > -1) {
                updatedResults[resultIndex].points += weight;
            } else {
                updatedResults.push({ personality, points: weight });
            }
        });
        setResults(updatedResults);

        
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setIsCompleted(true);
        }
    };

    const getFinalResult = () => {
        const maxResult = results.reduce((max, result) =>
            result.points > max.points ? result : max
        );
        const personalityDetails = toxicPersonalities.find(
            (personality) => personality.name === maxResult.personality
        );
        return {
            name: maxResult.personality,
            description: personalityDetails?.description || "Brak opisu.",
        };
    };


    return (
        <div style={{ minHeight: '51vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Container>
                {isCompleted ? (
                    <div>
                        <Subtitle level={2}>{getFinalResult().name}</Subtitle>
                        <p>
                            Gratulacje! Jesteś najbardziej podobny do{" "}
                            <strong>{getFinalResult().name}</strong>.
                        </p>
                        <p>{getFinalResult().description}</p>
                    </div>
                ) : (
                    <div>
                        <Subtitle level={2}>Pytanie {currentQuestionIndex + 1} z {questions.length}</Subtitle>
                        <Body size='big'>{questions[currentQuestionIndex].question}</Body>
                        <Container>
                            {questions[currentQuestionIndex].answers.map((answer, index) => (
                                <Button
                                    key={index}
                                    onClick={() => handleAnswerClick(answer.points)}
                                >
                                    <Body size='bold' color='primary'>{answer.text}</Body>
                                </Button>
                            ))}
                        </Container>
                    </div>
                )}

            </Container>
        </div>
    );
};

export default PersonalityQuizPage;