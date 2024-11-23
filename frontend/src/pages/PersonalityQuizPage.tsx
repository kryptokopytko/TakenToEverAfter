import React, { useState } from "react";
import { toxicPersonalitiesPol, questionsPol, toxicPersonalitiesEng, questionsEng, Answer, Result } from "../sections/PersonalityTest/personalities";
import Button from "../components/ui/Button";
import { Body, Subtitle } from "../styles/typography";
import styled from "styled-components";
import { useUser } from "../providers/UserContext";

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
    const { language } = useUser();
    const questions = language === 'english' ? questionsEng : questionsPol;
    const toxicPersonalities = language === 'english' ? toxicPersonalitiesEng : toxicPersonalitiesPol;

    const handleAnswerClick = (answers: Answer[]) => {
        const updatedResults = [...results];

        answers.forEach(({ personality, weight }) => {
            const personalityIndex = toxicPersonalities.findIndex(
                (p) => p.name === personality
            );

            if (personalityIndex > -1) {
                const existingResultIndex = updatedResults.findIndex(
                    (res) => res.personality === personalityIndex
                );

                if (existingResultIndex > -1) {
                    updatedResults[existingResultIndex].points += weight;
                } else {
                    updatedResults.push({ personality: personalityIndex, points: weight });
                }
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
        if (results.length === 0) return -1;

        const maxResult = results.reduce((max, result) =>
            result.points > max.points ? result : max
        );

        return maxResult.personality;
    };

    const finalPersonalityIndex = getFinalResult();

    return (
        <div style={{ minHeight: '51vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Container>
                {isCompleted ? (
                    <div>
                        <Subtitle level={2}>
                            {finalPersonalityIndex >= 0
                                ? toxicPersonalities[finalPersonalityIndex]?.name
                                : "Error"}
                        </Subtitle>
                        <p>
                            {language === 'english'
                                ? `Congratulations! You are most similar to `
                                : `Gratulacje! Jesteś najbardziej podobny do `}
                            <strong>
                                {finalPersonalityIndex >= 0
                                    ? toxicPersonalities[finalPersonalityIndex]?.name
                                    : "Error"}
                            </strong>.
                        </p>
                        <p>
                            {finalPersonalityIndex >= 0
                                ? toxicPersonalities[finalPersonalityIndex]?.description
                                : "Error"}
                        </p>
                    </div>
                ) : (
                    <div>
                        <Subtitle level={2}>
                            {language === 'english'
                                ? `Question ${currentQuestionIndex + 1} of ${questions.length}`
                                : `Pytanie ${currentQuestionIndex + 1} z ${questions.length}`}
                        </Subtitle>
                        <Body size="big">
                            {questions[currentQuestionIndex].question}
                        </Body>
                        <Container>
                            {questions[currentQuestionIndex].answers.map((answer, index) => (
                                <Button
                                    key={index}
                                    onClick={() => handleAnswerClick(answer.points)}
                                >
                                    <Body size="bold" color="primary">
                                        {answer.text}
                                    </Body>
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
