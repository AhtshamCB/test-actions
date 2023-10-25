import {palette} from './palette';

/**
 * Roles for colors.  Prefer using these over the palette.  It makes it easier
 * to change things.
 *
 * The only roles we need to place in here are the ones that span through the app.
 *
 * If you have a specific use-case, like a spinner color.  It makes more sense to
 * put that in the <Spinner /> component.
 */
export const color = {
  /**
   * The palette is available to use, but prefer using the name.
   */
  palette,
  /**
   * A helper for making something see-thru. Use sparingly as many layers of transparency
   * can cause older Android devices to slow down due to the excessive compositing required
   * by their under-powered GPUs.
   */
  transparent: 'rgba(0, 0, 0, 0)',
  /**
   * The screen background.
   */
  background: palette.white,
  /**
   * The main tinting color, but darker.
   */
  secondary: '#0055BF',
  mainBlack: '#000',
  white: '#fff',
  redText: '#FF3400',
  red: '#F12D2D',
  blue: '#3486ec',
  blue1: '#0055BF',
  blue2: '#27C1B8',
  blue3: '#29EEE2',
  dark1: '#0B0D1C',
  dark2: '#374957',
  dark3: '#555865',
  dark4: '#8C8F9D',
  dark5: '#C2C4CD',
  dark6: '#E7E8EB',
  gray1: '#555865',
  gray2: '#F1F1F3',
  gray3: '#909090',
  gray4: '#F3F3F5',
  gray5: '#3F4253',
  gray6: '#E3E3E3',
  gray7: '#BDBDBD',
  gray8: '#9F9F9F',
  gray9: '#C8C8C8',
  gray10: '#F5F5F5',
  yellow: '#ffc700',
  yellow1: '#ffd26a',
  yellow2: '#fff8ec',
  yellow3: '#FFF4D6',
  yellow4: '#FD9435',
  lightBlue: '#00f4f8',
  primary: '#DB14FB',
  black1: '#151933',
  purple: '#F300FF',
  purple1: '#FBE4FF',
  purple2: '#FEEBFF',
  green: '#51C900',
  green1: '#9FFF54',
};
