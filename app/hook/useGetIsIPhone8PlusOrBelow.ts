import DeviceInfo from 'react-native-device-info';

export const isIPhone8PlusOrBelow = () => {
  const deviceType = DeviceInfo.getModel();
  return (
    deviceType === 'iPhone 8 Plus' ||
    deviceType === 'iPhone 8' ||
    deviceType === 'iPhone 7 Plus' ||
    deviceType === 'iPhone 7' ||
    deviceType === 'iPhone SE (1st generation)'
  );
};
