import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Heading, Subtitle } from "../styles/typography";
import { Container, MenuContainer } from "../styles/page";
import Invitation from "../sections/Printables/Invitation";
import Input from "../components/ui/Input";
import Button, { ButtonContainer } from "../components/ui/Button";
import { exportToPDF } from "../sections/Printables/exportToPdf";
import Checkbox from "../components/ui/Checkbox";
import { useUser } from "../providers/UserContext";
import { translations } from "../translations";
import useFunctionsProxy from "../API/FunctionHandler";
import { RawQuestion } from "../types";

interface PrintablesPageProps {
}

const InputWrapper = styled.div`
  margin-bottom: 1rem;
`;

const Invites = styled.div`
    display: flex;
    flex-direction: column;
`;

const QuestionsContainer = styled.div`
  margin-top: 2rem;
`;

const QuestionWrapper = styled.div`
  position: relative;
`;

const RemoveButton = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.2rem;
  padding: 0.2rem 0.5rem;
  line-height: 1;
`;

const OptionWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;


const AddOptionButton = styled(Button)`
  margin-top: 0.5rem;
`;


const PrintablesPage: React.FC<PrintablesPageProps> = ({
}) => {
    const { guests, language, invitations, questions, accountDetails } = useUser();
    const [mainText, setMainText] = useState(translations[language].exampleMainText);
    const [additionalText, setAdditionalText] = useState(translations[language].exampleAdditionalText);
    const [guestText, setGuestText] = useState(translations[language].exampleGuestText);
    const [showAllInvites, setShowAllInvites] = useState(false);
    const [deliveredInvites, setDeliveredInvites] = useState<number[]>([]);
    const [updatedQuestions, setUpdatedQuestions] = useState<RawQuestion[]>([]);
    const FunctionsProxy = useFunctionsProxy();

    useEffect(() => {
        setMainText(accountDetails.invitationMainText || translations[language].exampleMainText);
        setAdditionalText(accountDetails.invitationAdditionalText || translations[language].exampleAdditionalText);
        setGuestText(accountDetails.invitationGuestText || translations[language].exampleGuestText);
    }, [language, accountDetails]);

    useEffect(() => {
        const handedOut = invitations
            .filter((invitation) => invitation.handedOut)
            .map((invitation) => invitation.id);
        setDeliveredInvites(handedOut);
    }, [invitations]);

    useEffect(() => {
        setUpdatedQuestions(questions as RawQuestion[]);
    }, [questions]);

    const handleExportPDF = () => {
        const inviteIds = guests.map((_, index) => `invite-${index}`);
        exportToPDF(inviteIds);
    };

    function toggleHandedOut(invitationId: number) {
        const handedOut = deliveredInvites.includes(invitationId);
        console.log(handedOut);
        handedOut ?
            setDeliveredInvites(prev => prev.filter((invite) => invite != invitationId))
            : setDeliveredInvites(prev => [...prev, invitationId]);
        FunctionsProxy.changeInvitationStatus(invitationId, !handedOut);
    }

    const handleAddQuestion = (type: "choice" | "yes/no") => {
        setUpdatedQuestions([...updatedQuestions, { text: "", type, options: type === "choice" ? [""] : undefined }]);
    };

    const handleRemoveQuestion = (index: number) => {
        setUpdatedQuestions(updatedQuestions.filter((_, i) => i !== index));
    };

    const handleQuestionChange = (index: number, value: string) => {
        const newQuestions = [...updatedQuestions];
        newQuestions[index].text = value;
        setUpdatedQuestions(newQuestions);
    };

    const handleOptionChange = (qestionIndex: number, optionIndex: number, value: string) => {
        const newQuestions = [...updatedQuestions];
        if (newQuestions[qestionIndex].options) {
            newQuestions[qestionIndex].options[optionIndex] = value;
        }
        setUpdatedQuestions(newQuestions);
    };

    const handleAddOption = (qestionIndex: number, length: number) => {
        const newQuestions = [...updatedQuestions];
        if (newQuestions[qestionIndex].options && newQuestions[qestionIndex].options.length == length) {
            newQuestions[qestionIndex].options = [...newQuestions[qestionIndex].options, ""];
        }
        setUpdatedQuestions(newQuestions);
    };

    const handleRemoveOption = (questionIndex: number, optionIndex: number) => {
        setUpdatedQuestions(
            updatedQuestions.map((question, qIndex) =>
                qIndex === questionIndex
                    ? {
                        ...question,
                        options: question.options?.filter((_, oIndex) => oIndex !== optionIndex)
                    }
                    : question
            )
        );
    };


    const updateInvitationText = async () => {
        const hasChanges =
            mainText !== translations[language].exampleMainText ||
            additionalText !== translations[language].exampleAdditionalText ||
            guestText !== translations[language].exampleGuestText;

        if (hasChanges) {
            try {
                const updatedAccountDetails = { ...accountDetails };

                if (mainText !== translations[language].exampleMainText) {
                    updatedAccountDetails.invitationMainText = mainText;
                }

                if (additionalText !== translations[language].exampleAdditionalText) {
                    updatedAccountDetails.invitationAdditionalText = additionalText;
                }

                if (guestText !== translations[language].exampleGuestText) {
                    updatedAccountDetails.invitationGuestText = guestText;
                }

                await FunctionsProxy.updateAccountDetails(updatedAccountDetails);
            } catch (error) {
                console.error('Error saving account details:', error);
            }
        }
    };

    const handleSave = async () => {
        await updateInvitationText();
        try {
            await FunctionsProxy.updateQuestions(updatedQuestions);
        } catch (error) {
            console.error("Error saving questions:", error);
        }
    };

    return (

        <Container>
            <MenuContainer>
                <Heading level={2}>{translations[language].customizeInvitationText}</Heading>

                <Subtitle level={3}>{translations[language].mainText}</Subtitle>
                <InputWrapper>
                    <Input
                        size="long"
                        value={mainText}
                        onChange={(e) => setMainText(e.target.value)}
                        placeholder={translations[language].mainText}
                    />
                </InputWrapper>

                <Subtitle level={3}>{translations[language].guestText}</Subtitle>
                <InputWrapper>
                    <Input
                        size="long"
                        value={guestText}
                        onChange={(e) => setGuestText(e.target.value)}
                        placeholder={translations[language].guestText}
                    />
                </InputWrapper>

                <Subtitle level={3}>{translations[language].additionalText}</Subtitle>
                <InputWrapper>
                    <Input
                        size="long"
                        value={additionalText}
                        onChange={(e) => setAdditionalText(e.target.value)}
                        placeholder={translations[language].additionalText}
                    />
                </InputWrapper>

                <QuestionsContainer>
                    <Subtitle level={3}>{translations[language].questionsForGuests}</Subtitle>
                    {updatedQuestions.map((question, questionIndex) => (
                        <InputWrapper key={questionIndex}>
                            <QuestionWrapper>
                                <Input
                                    size="long"
                                    value={question.text}
                                    onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
                                    placeholder={translations[language].questionPlaceholder}
                                />
                                <RemoveButton onClick={() => handleRemoveQuestion(questionIndex)}>✖</RemoveButton>
                            </QuestionWrapper>

                            {question.type === "choice" && (
                                <div>
                                    {question.options?.map((option, optionIndex) => (
                                        <OptionWrapper key={optionIndex}>
                                            <Input
                                                type="text"
                                                value={option}
                                                onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                                                placeholder={translations[language].optionPlaceholder}
                                            />
                                            <RemoveButton onClick={() => handleRemoveOption(questionIndex, optionIndex)}>✖</RemoveButton>
                                        </OptionWrapper>
                                    ))}
                                    <AddOptionButton onClick={() => handleAddOption(questionIndex, question.options!.length)}>
                                        {translations[language].addOption}
                                    </AddOptionButton>
                                </div>
                            )}

                            {question.type === "yes/no" && (
                                <Subtitle level={4}>{translations[language].yesNoType}</Subtitle>
                            )}

                        </InputWrapper>
                    ))}

                    <Subtitle level={3}>{translations[language].addQuestion}</Subtitle>
                    <ButtonContainer>
                        <Button onClick={() => handleAddQuestion("choice")}>
                            {translations[language].withOptions}
                        </Button>
                        <Button onClick={() => handleAddQuestion("yes/no")}>
                            {translations[language].yesNo}
                        </Button>
                    </ButtonContainer>
                </QuestionsContainer>

                <Button onClick={handleSave}>{translations[language].save}</Button>
                <Button onClick={() => setShowAllInvites(!showAllInvites)}>
                    {showAllInvites ? translations[language].showSingleInvite : translations[language].showAllInvites}
                </Button>
                {showAllInvites ?
                    <Button onClick={handleExportPDF}>{translations[language].exportToPDF}</Button> : <></>}
            </MenuContainer>
            {showAllInvites ? (
                <Invites>
                    {invitations.filter(invitation => guests.some(guest => guest.invitationId == invitation.id))
                        .map((invitation, index) => (
                            <div id={`invite-${index}`} key={index}>
                                <Invitation
                                    mainText={mainText}
                                    additionalText={additionalText}
                                    guestText={guestText}
                                    invitationId={invitation.id}
                                />
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: '2rem' }}>
                                    <Checkbox
                                        checked={deliveredInvites.includes(invitation.id)}
                                        onChange={() =>
                                            toggleHandedOut(invitation.id)
                                        }
                                    />
                                    {translations[language].delivered}
                                </div>
                            </div>
                        ))}
                </Invites>
            ) : (
                <div id="invite-single">
                    <Invitation
                        mainText={mainText}
                        additionalText={additionalText}
                        guestText={guestText}
                    />
                </div>
            )}
        </Container>
    );
};

export default PrintablesPage;
