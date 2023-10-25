export interface ActiveKidsInfo {
  kids: {
    activeFor: ActiveFor;
    childs: Childs[];
  };
}

export interface Childs {
  _id: string;
  address: string;
  avatar: string;
  birthday: string;
  balance: string;
  email: string;
  firstName: string;
  gender: string;
  activeFor: ActiveFor;
  lastName: string;
  memberType: string;
  name: string;
  username: string;
}
export interface ActiveFor {
  _id: string;
  enrollExpireTime: string;
  isEnroll: boolean;
  isRecurring: string;
  memberType: string;
  info: Info;
  isSubscribed: boolean;
  cancelAtPeriodEnd: boolean;
  membershipName: string;
  isNewKid: boolean;
  subscriptionStatus: string;
}

export interface Info {
  avatar: string;
  birthday: string;
  gender: string;
  name: string;
  username: string;
}
