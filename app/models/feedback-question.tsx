interface FeedbackQuestion {
  feedbackQuestions: {
    answers: string[] | null;
    label: string;
    answerType: string;
    question: string;
  };
}

export interface FeedbackData {
  feedbackQuestions: FeedbackQuestion[];
}
