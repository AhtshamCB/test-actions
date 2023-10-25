import moment from 'moment';

export const validateEmail = email => {
  if (!email) {
    return false;
  }
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

export const validateName = (name: string) => {
  if (!name) {
    return false;
  }
  return String(name)
    .toLowerCase()
    .match(
      /^(([A-Za-z]+[\\-\\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\\-\\']?)*([A-Za-z]+)?$/g,
    );
};

export const leftTrim = (str: string) => {
  if (!str) {
    return str;
  }
  return str.replace(/^\s+/g, '');
};

export const convertToLetterAndSpaceOnly = (text: string) => {
  return text?.replace(/[^A-Za-z\s]/g, '') || '';
};

export const validatePassword = (password: string) => {
  if (!password) {
    return password;
  }
  return password.replace(
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/g,
    '',
  );
};

export const capitalizeFirstLetter = string => {
  return string?.charAt(0)?.toUpperCase() + string?.slice(1);
};

export const removeWhiteSpace = string => {
  return string?.replace(/\s/g, '');
};

export const formatDate = string => {
  return moment(string).format('MMMM Do, YYYY');
};

export const formatDayMonthYear = string => {
  return moment(string).format('DD/MM/YYYY');
};

export function removeVietnameseTones(str) {
  const accents =
    'àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵ';
  const unaccents =
    'aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyy';

  // Replace each accented character with its unaccented counterpart
  for (let i = 0; i < accents.length; i++) {
    const regex = new RegExp(accents[i], 'g');
    str = str.replace(regex, unaccents[i]);
  }

  return str;
}

export const checkUsernameInput = (str: string) => {
  if (!str) {
    return str;
  }
  return str.replace(/^[a-zA-Z0-9]{1,}$/g, '');
};

export function time_convert(num) {
  const hours = Math.floor(num / 60);
  const minutes = num % 60;
  if (hours > 0 && minutes > 0) {
    return `${hours}h ${minutes} min`;
  } else if (hours > 0 && minutes === 0) {
    return `${hours}h`;
  } else if (hours === 0 && minutes > 0) {
    return `${minutes} min`;
  } else if (hours === 0 && minutes === 0) {
    return `${0}`;
  }
}

export const amountFormat = eaning => {
  return `$${Number(eaning).toLocaleString('en-US') || 0}`;
};

export const convertFormatString = dateString => {
  const date = moment(dateString, 'DD/MM/YYYY');
  const formattedDate = date.format('YYYY-MM-DD');
  return formattedDate;
};

export const formatDateHeader = date => {
  return moment(date).format('dddd, DD MMMM');
};

export const capitalizeWords = str => {
  return str?.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export const isValidWorkingMailAddress = (email: string) => {
  const match = /^\w+[-\.\w]*@(\w+[-\.\w]*?\.\w{2,4})$/.exec(email);
  if (!match) {
    return false;
  }

  const forbiddenDomains = [
    'gmail.com',
    'yahoo.com',
    'google.com',
    'apple.com',
    'me.com',
    'icloud.com',
    'mac.com',
  ];
  if (forbiddenDomains.includes(match[1].toLowerCase())) {
    return false;
  }

  return true;
};
