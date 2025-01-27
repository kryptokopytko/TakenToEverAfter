import { useUser } from "../../providers/UserContext";
import { translations } from "../../translations";
import { Heading } from "../../styles/typography";

const QuestionAnswerList = () => {
  const { guests, questions, answers, language } = useUser();

  const getAnswerStatistics = (questionId: number, type: "choice" | "yes/no", option: string) => {
    const guestsWithAnswer = guests.filter((guest) => {
      const answer = answers.find(
        (a) => a.questionId === questionId && a.guestId === guest.id
      );

      if (type == "choice")
        return answer?.answer === option;

      return answer?.answer == translations.english[option].toLowerCase() || answer?.answer == translations.polish[option].toLowerCase();
    });

    return guestsWithAnswer;
  };

  return (
    <div>
      <Heading level={2}>{translations[language].questionsAndAnswers}</Heading>
      <div style={{ display: 'flex', marginTop: '-3rem' }}>
        {questions.map((question) => (
          <div key={question.id} style={{ margin: "2rem" }}>
            <h3>{question.text}</h3>
            <ul>
              {(question.type == "choice" ? question.options! : ["yes", "no"])
                .map((option) => {
                  const guestsWithAnswer = getAnswerStatistics(question.id, question.type, option);
                  return (
                    <li key={option}>
                      {question.type == "choice" ? option : translations[language][option]}: {guestsWithAnswer.length}
                      <ul>
                        {guestsWithAnswer.map((guest) => (
                          <li key={guest.id}>{guest.name}</li>
                        ))}
                      </ul>
                    </li>
                  );
                })}

            </ul>
          </div>
        ))}</div>
    </div>
  );
};

export default QuestionAnswerList;
