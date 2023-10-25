import {useOrientation} from '@app/hook';
import React from 'react';
import {LoginEducatorByTabletLandscape} from './login-educator-tablet-landscape';
import {LoginEducatorByTabletPortrait} from './login-educator-tablet-portrait';
//

export const LoginEducatorByTablet = ({navigation}) => {
  const orientation = useOrientation();
  return (
    <>
      {orientation === 'PORTRAIT' ? (
        <LoginEducatorByTabletPortrait navigation={navigation} />
      ) : (
        <LoginEducatorByTabletLandscape navigation={navigation} />
      )}
    </>
  );
};
