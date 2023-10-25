import {Answers} from '@app/models';

export enum QUIZ_ORDER_ANSWER_MAP {
  A = 1,
  B = 2,
  C = 3,
  D = 4,
}

export type AnswerKey = 'A' | 'B' | 'C' | 'D';

const shuffleAnswersByOrder = (questions: Answers[]) => {
  // Create a new array to store the shuffled questions
  const shuffledQuestions = [...questions];

  // Shuffle the array using the Fisher-Yates algorithm
  for (let i = shuffledQuestions?.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledQuestions[i], shuffledQuestions[j]] = [
      shuffledQuestions[j],
      shuffledQuestions[i],
    ];
  }

  // Return the shuffled array
  return shuffledQuestions?.map((item, index) => {
    const orderLocal = index + 1;
    const keyLocal = mapOrderToAnswer(orderLocal);
    return {...item, orderLocal, keyLocal};
  });
};

const mapOrderToAnswer = (order: number): AnswerKey => {
  switch (order) {
    case QUIZ_ORDER_ANSWER_MAP.A:
      return 'A';
    case QUIZ_ORDER_ANSWER_MAP.B:
      return 'B';
    case QUIZ_ORDER_ANSWER_MAP.C:
      return 'C';
    case QUIZ_ORDER_ANSWER_MAP.D:
      return 'D';
    default:
      throw new Error(`Invalid order: ${order}`);
  }
};

export {shuffleAnswersByOrder, mapOrderToAnswer};
