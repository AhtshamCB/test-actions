import AsyncStorage from '@react-native-async-storage/async-storage';

export const ASYNC_STORAGE_KEY = {
  ACCESS_TOKEN: 'ACCESS_TOKEN',
};

export const saveAccessToken = async token => {
  try {
    if (token) {
      await AsyncStorage.setItem(ASYNC_STORAGE_KEY.ACCESS_TOKEN, token);
    } else {
      AsyncStorage.removeItem(ASYNC_STORAGE_KEY.ACCESS_TOKEN);
    }
  } catch (e) {
    console.error(
      '🚀 ~ file: async-storage.ts ~ line 11 ~ saveAccessToken ~ e',
      e,
    );
    // saving error
  }
};
export const loadAccessToken = async () => {
  try {
    const token = await AsyncStorage.getItem(ASYNC_STORAGE_KEY.ACCESS_TOKEN);
    return token;
  } catch (e) {
    console.log(
      '🚀 ~ file: async-storage.ts ~ line 20 ~ loadAccessToken ~ e',
      e,
    );
    // saving error
  }
};
