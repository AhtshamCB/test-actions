import Toast from 'react-native-toast-message';

export const showToastMessage = (
  message: string | string[],
  type: 'info' | 'success' | 'error',
  moreProps?: any,
) => {
  if (message) {
    let messageToShow = '';
    if (Array.isArray(message)) {
      messageToShow = message.join('\n');
    } else {
      messageToShow = message;
    }
    Toast.show({
      type: type || 'info',
      position: 'top',
      text1: messageToShow,
      visibilityTime: 4000,
      autoHide: true,
      ...moreProps,
    });
  }
};
