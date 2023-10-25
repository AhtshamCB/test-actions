import React from 'react';
//
import {useOrientation} from '@app/hook';
import {ResetPasswordTabletPortraitWithNewPassword} from './reset-password-tablet-portrait-with-new-password';
import {ResetPasswordTabletLandscapeWithNewPassword} from './reset-password-tablet-landscape-with-new-password';

export const ResetPasswordTabletWithNewPassword = ({navigation, route}) => {
  const orientation = useOrientation();
  return (
    <>
      {orientation === 'PORTRAIT' ? (
        <ResetPasswordTabletPortraitWithNewPassword
          navigation={navigation}
          route={route}
        />
      ) : (
        <ResetPasswordTabletLandscapeWithNewPassword
          navigation={navigation}
          route={route}
        />
      )}
    </>
  );
};
