import React from 'react';
import {useOrientation} from '@app/hook';
import {EmailVerificationTabletPortrait} from './email-verification-portrait-tablet';
import {EmailVerificationTabletLandscape} from './email-verification-landscape-tablet';

export const EmailVerificationByTablet = ({navigation, route}) => {
  const orientation = useOrientation();
  return (
    <>
      {orientation === 'PORTRAIT' ? (
        <EmailVerificationTabletPortrait
          navigation={navigation}
          route={route}
        />
      ) : (
        <EmailVerificationTabletLandscape
          navigation={navigation}
          route={route}
        />
      )}
    </>
  );
};
