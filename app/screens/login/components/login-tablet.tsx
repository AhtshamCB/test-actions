import {useOrientation} from '@app/hook';
import React from 'react';
import {LoginByTabletLandscape} from './login-tablet-landscape';
import {LoginByTabletPortrait} from './login-tablet-portrait';
//

export const LoginByTablet = ({navigation}) => {
  const orientation = useOrientation();
  return (
    <>
      {orientation === 'PORTRAIT' ? (
        <LoginByTabletPortrait navigation={navigation} />
      ) : (
        <LoginByTabletLandscape navigation={navigation} />
      )}
    </>
  );
};
