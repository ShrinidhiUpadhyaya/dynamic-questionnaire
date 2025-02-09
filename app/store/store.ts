import { create } from "zustand";

interface QuestionStore {
  currentQuestionIndex: number;
  totalQuestions: number;
  setCurrentQuestionIndex: (index: number) => void;
  setTotalQuestions: (total: number) => void;
}

const useQuestionStore = create<QuestionStore>((set) => ({
  currentQuestionIndex: 0,
  totalQuestions: 0,
  setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
  setTotalQuestions: (total) => set({ totalQuestions: total }),
}));

export default useQuestionStore;
