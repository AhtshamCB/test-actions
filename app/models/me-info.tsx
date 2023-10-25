export interface MeInfo {
  me: {
    _id: string;
    address: string;
    avatar: string;
    birthday: string;
    country: string;
    email: string;
    firstName: string;
    gender: string;
    id: Childs[];
    lastName: string;
    memberType: string;
    name: string;
    isSubscribed: string;
    paymentCard: {
      memberType: string;
      paymentMethodId: string;
    };
    subscriptionStatus: string;
    role: string;
    status: string;
    username: string;
    school: {
      address: string;
      schoolName: string;
      educatorRole: string;
      title: string;
      studentLimit: number;
      accessStatus: string;
      subscriptionPlan: string;
      interval: string;
      expireTime: string;
    };
    grade: {
      gradeName: string;
      gradeId: string;
      accessStatus: string;
      schoolName: string;
    };
    student: {
      name: string;
      kidId: string;
      schoolName: string;
    };
    kid: {
      kidId: string;
      name: string;
    };
    parent: {
      parentId: string;
    };
  };
}

interface Childs {
  _id: string;
  name: string;
  avatar: string;
  gender: string;
  birthday: string;
  memberType: string;
  status: string;
  isEnroll: number;
}

export interface SelfChangePassword {
  oldPassword: string;
  newPassword: string;
}

export interface DataSelfChangePassword {
  selfChangePassword: {
    isUpdated: boolean;
  };
}
