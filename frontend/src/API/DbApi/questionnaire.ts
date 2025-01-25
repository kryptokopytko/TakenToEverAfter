import api from "./axiosInstance";

export const sendResponse = (guestName: string, response: "yes" | "no") => {};

export const getQuestionnaire = async () => {
    try {
      const questionsResponse = await api.get(`/questionnaire/questions`, {
        withCredentials: true
      });
  
      const questions = questionsResponse.data.map((question: any) => {
        return {
          id: question.id,
          content: question.content,
          type: question.type,
          options: question.options ? question.options.map((option: any) => ({
            id: option.id,
            name: option.name
          })) : []
        };
      });
  
      const answersResponse = await api.get(`/questionnaire/answers`, {
        withCredentials: true
      });
  
      const answers = answersResponse.data.map((answer: any) => {
        return {
          id: answer.id,
          questionId: answer.question.id,
          guestId: answer.guest.id,
          answer: answer.answer
        };
      });
  
      return {
        questions,
        answers
      };
    } catch (error) {
      console.error('Error fetching questionnaire:', error);
      throw error;
    }
  };
  