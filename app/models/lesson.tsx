export interface ListLessons {
  level: string;
  studentId?: string | null;
}

export interface DataListLessons {
  listLessons: {
    data: [
      {
        _id: string;
        name: string;
        status: string;
        order: string;
      },
    ];
    isPassedExam: boolean;
  };
}

export interface LessonId {
  lessonId: string;
}
export interface KidLessonInfo {
  kidLessonInfo: {
    _id: string;
    curriculumLevelId: string;
    status: string;
    name: string;
    order: number;
    value: string;
    currentPart: string;
    questionStatus: string;
  };
}

export interface Challenge {
  kidLessonInfo: {
    challenge: {
      guide: string;
      status: string;
      src: string;
      earned: number;
      earning: number;
    };
  };
}
export interface Introduction {
  kidLessonInfo: {
    introduction: {
      guide: string;
      status: string;
      src: {
        hashCode: string;
        videoId: string;
      };
    };
  };
}

export interface Questions {
  kidLessonInfo: {
    questions: [
      {
        _id: string;
        status: string;
        answerKey: string;
        answers: [Answers];
        earned: number;
        earning: number;
        order: number;
        question: string;
        rightAnswerKey: string;
      },
    ];
  };
}

export interface Answers {
  _id: string;
  key: string;
  value: string;
  oderLocal: number;
  keyLocal: string;
}

export interface Story {
  kidLessonInfo: {
    story: {
      status: string;
      src: {
        hashCode: string;
        videoId: string;
      };
    };
  };
}

export interface Game {
  kidLessonInfo: {
    game: {
      guide: string;
      status: string;
      src: string;
      earned: number;
      earning: number;
    };
  };
}

export interface PushLearningTime {
  isAdded: boolean;
}

export interface LevelId {
  levelId: string;
}

export interface StartExam {
  startExam: {
    _id: string;
    kidId: string;
    questions: QuestionsTestExam[];
  };
}

export interface QuestionsTestExam {
  _id: string;
  answers: [
    {
      _id: string;
      key: string;
      value: string;
    },
  ];
  background: {
    mobile: string;
    web: string;
  };
  question: string;
}

export interface SubmitExam {
  examId: string;
  questionId: string;
  answerKey: string;
}

export interface DataSubmitExam {
  submitExam: {
    examStatus: string;
    rightAnswerId: string;
    rightAnswerKey: string;
    success: boolean;
    totalRightAnswer: number;
  };
}

export interface CreateQuestionSession {
  createQuestionSession: {
    _id: string;
  };
}

export interface ListGame {
  listGame: {
    isEnabled: boolean;
    src: string;
    thumbnail: string;
  };
}
