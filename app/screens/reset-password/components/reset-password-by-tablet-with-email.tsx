import React from 'react';
//
import {ResetPasswordTabletPortraitWithEmail} from './reset-password-tablet-portrait-with-email';
import {ResetPasswordTabletLandscapeWithEmail} from './reset-password-tablet-landscape-with-email';
import {useOrientation} from '@app/hook';

export const ResetPasswordTabletWithEmail = ({navigation, route}) => {
  const orientation = useOrientation();
  return (
    <>
      {orientation === 'PORTRAIT' ? (
        <ResetPasswordTabletPortraitWithEmail
          navigation={navigation}
          route={route}
        />
      ) : (
        <ResetPasswordTabletLandscapeWithEmail
          navigation={navigation}
          route={route}
        />
      )}
    </>
  );
};
