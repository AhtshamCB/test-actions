export interface CreateGrade {
  username: string;
  avatar: string;
  password: string;
  gradeName: string;
}
export interface DataCreateGrade {
  createGrade: {
    _id: string;
    avatar: string;
    createdAt: string;
    gradeName: string;
  };
}
export interface GetGradeList {
  order?: string | null;
  page?: number | null;
  pageSize?: number | null;
  sort?: string | null;
  all?: boolean | null;
  gradeName?: string | null;
}
export interface GetGradeListFilter {
  sort: string | null;
  all: boolean;
}
export interface GradeList {
  grades: {
    page: string;
    totalPage: string;
    totalCount: string;
    totalLearningTime: string;
    data: {
      _id: string;
      avatar: string;
      createdAt: string;
      gradeName: string;
      username: string;
      learningTime: string;
      rank: number;
    };
  };
}
export interface GetSchoolDashboard {
  schoolDashboard: {
    totalCompletedLesson: number;
    totalDayInTraining: number;
    totalStudentJoined: string;
    totalClass: string;
    currentLevel: string;
  };
}
export interface GetStudentPerformance {
  schoolDashboard: {
    studentPerformance: StudentPerformance[];
  };
}
interface StudentPerformance {
  dateName: string;
  timeName: string;
  shortDay: string;
  value: number;
}
export interface OnlineStudent {
  onlineStudents: {
    _id: string;
    avatar: string;
    name: string;
  };
}
export interface DeleteGrade {
  gradeId: string;
  password: string;
}
export interface DataDeleteGrade {
  deleteGrade: {
    isSuccess: boolean;
  };
}
export interface UpdateGrade {
  gradeId: string;
  gradeName: string;
  password: string;
  avatar: string;
}
export interface GetDataUpdateGrade {
  updateGrade: {
    _id: string;
    avatar: string;
    createdAt: string;
    gradeName: string;
    username: string;
  };
}
export interface AddStudents {
  avatar: string;
  birthday: string | null;
  name: string;
  password: string;
  username: string;
}
export interface DataAddStudents {
  addStudent: {
    _id: string;
    avatar: string;
    birthday: string;
    name: string;
    password: string;
    username: string;
  };
}
export interface GetStudentList {
  gradeId: string | null;
  order: string | null;
  page?: number | null;
  pageSize?: number | null;
  sort: string | null;
  studentName?: string | null;
  all?: boolean | null;
}
export interface UpdateStudent {
  name: string;
  birthday: string;
  password: string;
  avatar: string | null;
  _id: string;
}
export interface DataUpdateStudent {
  updateChild: {
    name: string;
    birthday: string;
    password: string;
    avatar: string | null;
    _id: string;
  };
}
export interface StudentList {
  listStudent: {
    totalCount: string;
    totalPage: string;
    page: string;
    totalLearningTime: string;
    studentName: string;
    data: {
      _id: string;
      avatar: string;
      birthday: string;
      name: string;
      username: string;
      createdAt: string;
      gradeName: string;
      learningTime: string;
      rank: string;
    };
  };
}
export interface GetIdStudent {
  studentId: string;
  password: string;
}
export interface DeleteStudent {
  deleteStudent: {
    isSuccess: boolean;
  };
}
export interface SchoolLeaderboard {
  avatar: string;
  balance: string;
  name: string;
  studentId: string;
}
export interface DataSchoolLeaderboard {
  schoolLeaderBoard: [
    {
      avatar: string;
      balance: number;
      name: string;
      studentId: string;
    },
  ];
}
export interface UpdateSchoolSettings {
  title: string;
  firstName: string;
  lastName: string;
  educatorRole: string;
  schoolName: string;
  address: string;
  country: string;
}
export interface DataUpdateSchoolSettings {
  updateSchool: {
    _id: string;
    title: string;
    firstName: string;
    lastName: string;
    educatorRole: string;
    schoolName: string;
    address: string;
    country: string;
  };
}
export interface EducatorSubscriptionPlans {
  billInfo: string;
  discount: number;
  freeTrial: string;
  interval: string;
  intervalCount: number;
  name: string;
  price: number;
  totalPrice: number;
  key: string;
}
export interface GetLearningHour {
  schoolDashboard: {
    learningHours: {
      learningTimeStr: string;
      learningTime: string;
      name: string;
    };
  };
}

export interface SendNotification {
  message: string;
  to: string[];
}

export interface DataSendNotification {
  sendNotifications: {
    isSuccess: boolean;
  };
}

export interface LearningDashboardStudent {
  studentId: string;
  lang: string | null;
}

export interface GetDataLearningDashboardStudent {
  learningDashboard: {
    currentLevel: string;
    availableLevels: [string];
    levels: Level[];
    leaderBoard: Leaderboard[];
    summary: Summary;
    earningDetails: Earning;
    weeklyActivities: WeeklyActivities[];
  };
}
export interface Level {
  _id: string;
  id: string;
  key: string;
  name: string;
}
export interface Summary {
  earning: number;
  dayInTraining: number;
  completedLessons: number;
}

export interface Earning {
  balance: number;
  investments: {
    rate: number;
    balance: number;
    gameBalance: number;
  };
  spending: {
    rate: number;
    balance: number;
    gameBalance: number;
  };
  sharing: {
    rate: number;
    balance: number;
    gameBalance: number;
  };
}
export interface Leaderboard {
  childId: string;
  name: string;
  avatar: string;
  balance: number;
}

export interface WeeklyActivities {
  dateName: string;
  shortDay: string;
  timeName: string;
  value: number;
}
