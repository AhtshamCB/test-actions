import {Dimensions, Platform} from 'react-native';
const {width: ScreenWidth, height: ScreenHeight} = Dimensions.get('screen');
/**
 * NOTE TO DEVS:
 *
 * Spacing should be consistent and whitespace thought of as a first class technique up
 * there with color and typefaces.
 *
 * Which type of scale you use is based on the design.
 *
 * If you've got simpler app, you may only need 6 items.  Or maybe you want a spacing scale
 * to be named:
 *
 * export const spacing = {
 *   tiny: 4,
 *   small: 8,
 *   medium: 12,
 *   large: 24,
 *   huge: 64
 * }
 *
 * Whatever you choose, try to stick with these, and not freestyle it everywhere.
 *
 * Feel free to delete this block.
 */
export const spacing = {
  tiny: 4,
  small: 6,
  base: 8,
  medium: 12,
  double: 16,
  input: 20,
  large: 24,
  largeX1: 28,
  largeX2: 30,
  section: 32,
  paddingH: 14,
  mediumSection: 40,
  largeSection: 48,
  largeSectionX1: 50,
  doubleSection: 64,
};
/**
 * The available spacing.
 *
 * Here's the rough guideline.  Customize this for you usage.  It's ok to put exceptions
 * within the components themselves if they are truly exceptions.
 *
 * 0 = none    - nothing. only here to bust out of a zero-based array.
 * 1 = tiny    - elements contextually close to each other
 * 2 = smaller - for groups of closely related items or perhaps borders
 * 3 = small   - ?
 * 4 = medium  - ?
 * 5 = medium+ - ?
 * 6 = large   - between groups of content that aren't related?
 * 7 = huge    - ?
 * 8 = massive - an uncomfortable amount of whitespace
 */
// export const spacing = [0, 4, 8, 12, 16, 24, 32, 48, 64]

export const screenDimension = {width: ScreenWidth, height: ScreenHeight};

const {width, height} = Dimensions.get('window');
const vh = height / 100;
const vw = width / 100;

export const sizeWidth = size => {
  return size * vw;
};

export const sizeHeight = size => {
  return size * vh;
};

export const sizeFont = size => {
  let sizeWidth = vw;

  if (Platform.OS === 'android') {
    sizeWidth = (vw * 85) / 100;
  }
  return size * sizeWidth;
};
