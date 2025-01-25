import React, { useEffect, useState } from "react";
import Button, { ButtonContainer } from "../components/ui/Button";
import { Subtitle } from "../styles/typography";
import { Container } from "../styles/form";
import { getInvitationDetailsByConfirmationUrl, getPreferencesByConfirmationUrl, saveAnswer, updateGuestConfirmation, updatePlusOne } from "../API/DbApi/DBApi";
import Input from "../components/ui/Input";
import DropdownSelector from "../components/ui/Dropdown/Dropdown";
import Invitation from "../sections/Printables/Invitation";
import { translations } from "../translations";
import { useUser } from "../providers/UserContext";
import { Guest, Language, Theme, InvitationDetails, Question } from "../types";
import { useTheme } from "../providers/ThemeContext";
import { useParams } from "react-router-dom";
import Checkbox from "../components/ui/Checkbox";

interface GuestResponseProps { }

const GuestResponsePage: React.FC<GuestResponseProps> = ({ }) => {
    const { language, setLanguage } = useUser();
    const { setTheme } = useTheme();
    const [responses, setResponses] = useState<Record<number, "yes" | "no">>({});
    const [answers, setAnswers] = useState<Record<number, Record<number, string>>>({});
    const [hasPlusOnes, setHasPlusOnes] = useState<Record<number, boolean>>({});
    const [plusOnes, setPlusOnes] = useState<Record<number, string>>({});
    const [invitationId, setInvitationId] = useState<number | null>(null);
    const [guestList, setGuestList] = useState<Guest[]>([]);
    const [invitationDetails, setInvitationDetails] = useState<InvitationDetails | null>(null);
    const { uniqueUrl } = useParams();
    const [questions, setQuestions] = useState<Question[]>([]);

    useEffect(() => {
        const getPreferences = async () => {
            if (uniqueUrl) {
                try {
                    const preferences = await getPreferencesByConfirmationUrl(uniqueUrl);
                    setLanguage(preferences.language as Language);
                    setTheme(preferences.theme as Theme);

                    const { invitation, guests, questions } = await getInvitationDetailsByConfirmationUrl(uniqueUrl);
                    setInvitationId(invitation.invitationId);
                    setInvitationDetails({
                        brideName: invitation.brideName,
                        groomName: invitation.groomName,
                        weddingDate: invitation.date,
                        mainText: invitation.mainText,
                        additionalText: invitation.additionalText,
                        guestText: invitation.guestText,
                    });
                    setGuestList(guests);
                    setQuestions(questions);
                    
                    const initialResponses: Record<number, "yes" | "no"> = {};
                    const initialDietaryPreferences: Record<number, string> = {};
                    const initialHasPlusOnes: Record<number, boolean> = {};
                    
                    guests.forEach((guest: Guest) => {
                        initialResponses[guest.id] = "yes";
                        initialDietaryPreferences[guest.id] = "no_preference";
                        initialHasPlusOnes[guest.id] = false;
                    });
                    setResponses(initialResponses);
                    setHasPlusOnes(initialHasPlusOnes);
                } catch (error) {
                    console.error('Error fetching preferences or invitation details:', error);
                }
            }
        };
    
        getPreferences();
    }, [uniqueUrl]);

    const handleResponse = (guestId: number, decision: "yes" | "no") => {
        setResponses((prev) => ({ ...prev, [guestId]: decision }));
    };

    const handleAnswerChange = (questionId: number, guestId: number, answer: string) => {
        setAnswers((prev) => {
            const newAnswers = { ...prev };
            if (!newAnswers[guestId]) {
                newAnswers[guestId] = {}; 
            }
            newAnswers[guestId][questionId] = answer;
            return newAnswers;
        });
    };

    const handlePlusOneChange = (guestId: number, value: string) => {
        setPlusOnes((prev) => ({ ...prev, [guestId]: value }));
    };

    const handleHasPlusOneChange = (guestId: number) => {
        setHasPlusOnes((prev) => ({ ...prev, [guestId]: !prev[guestId] }));
    };
    
    const handleSavingResponse = async () => {
        const hasMissingPlusOne = guestList.find(guest => hasPlusOnes[guest.id] && !plusOnes[guest.id]);
        if (hasMissingPlusOne) {
            alert(translations[language].missingPlusOne.replace("{name}", hasMissingPlusOne.name));
            return;
        }

        const hasMissingAnswer = guestList.find((guest) => {
            return responses[guest.id] == "yes" && questions.some((question) => !answers[guest.id]?.[question.id]);
        });
        
        if (hasMissingAnswer) {
            alert(
                translations[language].missingAnswer.replace(
                    "{name}",
                    hasMissingAnswer.name
                )
            );
            return;
        }
        
        try {
            for (const guest of guestList) {
                await updateGuestConfirmation(guest.id, responses[guest.id]);
                if (guest.hasPlusOne) {
                    await updatePlusOne(guest.id, hasPlusOnes[guest.id], plusOnes[guest.id]);
                    console.log("Plus one updated for ", guest.name);
                }

                if (responses[guest.id] == "yes") {
                    for (const question of questions) {
                        await saveAnswer(question.id, guest.id, answers[guest.id][question.id]);
                    }
                }
            }
            
            alert(translations[language].thankYou);
        } catch (error) {
            console.error("Error saving responses:", error);
            alert(translations[language].error);
        }
    };

    return (
        <Container>
            <Invitation 
                {...(invitationId && { invitationId })} 
                guestList={guestList}
                {...(invitationDetails && { details: invitationDetails })}
                {...(invitationDetails?.mainText && { mainText: invitationDetails.mainText })}
                {...(invitationDetails?.additionalText && { additionalText: invitationDetails.additionalText })}
                {...(invitationDetails?.guestText && { guestText: invitationDetails.guestText })}
            >
                <Subtitle level={2}>{translations[language].question}</Subtitle>
                {guestList.map((guest, index) => (
                    <div style={{ textAlign: 'center' }} key={index}>
                        <Subtitle level={3}>{guest.name}</Subtitle>

                        <ButtonContainer>
                            <Button
                                minWidth="10rem"
                                isPressed={responses[guest.id] === "yes"}
                                onClick={() => handleResponse(guest.id, "yes")}
                            >
                                {translations[language].yes}
                            </Button>
                            <Button
                                minWidth="10rem"
                                isPressed={responses[guest.id] === "no"}
                                onClick={() => handleResponse(guest.id, "no")}
                            >
                                {translations[language].no}
                            </Button>
                        </ButtonContainer>
                        {responses[guest.id] === "yes" && (
                            <>
                                {guest.hasPlusOne && (
                                    <>
                                        <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                                            <Checkbox
                                                checked={hasPlusOnes[guest.id]}
                                                onChange={() => handleHasPlusOneChange(guest.id)}
                                            />
                                            {translations[language].hasPlusOne}
                                        </div>
                                        {hasPlusOnes[guest.id] && (
                                            <>
                                                <Subtitle level={3}>{translations[language].namedPartner}:</Subtitle>
                                                <Input
                                                    size="medium"
                                                    variant="tertiary"
                                                    value={plusOnes[guest.id] || ""}
                                                    onChange={(e) => handlePlusOneChange(guest.id, e.target.value)}
                                                    placeholder={translations[language].namedPartner}
                                                />
                                            </>
                                        )}
                                  </>
                                )}
                                {questions.length && (
                                    questions.map((question, index) => {
                                        return (
                                            <div style={{ marginTop: "2rem", marginLeft: "2.5rem" }} key={index}>
                                                <DropdownSelector
                                                    options={question.type == "choice"?
                                                        question.options!.map(option => ({label: option, value: option}))
                                                        : [{label: translations[language].yes, value: "yes"},
                                                        {label: translations[language].no, value: "no"}]
                                                    }
                                                    title={question.text}
                                                    onOptionSelect={(option) => handleAnswerChange(question.id, guest.id, option as string)}
                                                />
                                            </div>
                                        )
                                }))}
                            </>
                        )}

                </div>
                ))}
                <ButtonContainer>
                    <Button 
                        minWidth='10rem' 
                        onClick={() => handleSavingResponse()}>{translations[language].save}
                    </Button>
                </ButtonContainer>
            </Invitation >

        </Container>
    );
};

export default GuestResponsePage;
