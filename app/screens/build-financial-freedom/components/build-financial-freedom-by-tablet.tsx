import {useOrientation} from '@app/hook';
import React from 'react';

import {BuildFinancialFreedomLandscapeTablet} from './build-financial-freedom-landscape-tablet';
import {BuildFinancialFreedomPortraitTablet} from './build-financial-freedom-portrait-tablet.tsx';
//

export const BuildFinancialFreedomByTablet = () => {
  const orientation = useOrientation();
  return (
    <>
      {orientation === 'PORTRAIT' ? (
        <BuildFinancialFreedomPortraitTablet />
      ) : (
        <BuildFinancialFreedomLandscapeTablet />
      )}
    </>
  );
};
