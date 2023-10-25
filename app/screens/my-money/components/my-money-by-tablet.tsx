import {useOrientation} from '@app/hook';
import React from 'react';

import {MyMoneyLandscapeTablet} from './my-money-landscape-tablet';
import {MyMoneyPortraitTablet} from './my-money-portrait-tablet';
//

export const MyMoneyByTablet = ({navigation}) => {
  const orientation = useOrientation();
  return (
    <>
      {orientation === 'PORTRAIT' ? (
        <MyMoneyPortraitTablet navigation={navigation} />
      ) : (
        <MyMoneyLandscapeTablet navigation={navigation} />
      )}
    </>
  );
};
