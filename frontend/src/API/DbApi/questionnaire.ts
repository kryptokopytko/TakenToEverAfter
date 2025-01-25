import { RawQuestion } from "../../types";
import api from "./axiosInstance";

export const getQuestionnaire = async () => {
    try {
      const questionsResponse = await api.get(`/questionnaire/questions`, {
        withCredentials: true
      });
  
      const questions = questionsResponse.data.map((question: any) => {
        return {
          id: question.id,
          text: question.text,
          type: question.type,
          options: question.options 
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

  export const updateQuestions = async (
    updatedQuestions: RawQuestion[]
  ) => {
    try {
      const response = await api.post("/questionnaire/update-questions/", updatedQuestions, { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error("There was an error updating the questions:", error);
      return null;
    }
  };
  
  export const saveAnswer = async (
    questionId: number,
    guestId: number,
    answer: string
  ) => {
    try {
      const response = await api.post(
        "/questionnaire/save-answer/",
        {
          questionId,
          guestId,
          answer,
        },
        { withCredentials: true }
      );
      
      return response.data;
    } catch (error) {
      console.error("There was an error saving the answer:", error);
      return null;
    }
  };