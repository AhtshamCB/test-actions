import {TextStyle} from 'react-native';
import {color} from '../../theme';

/**
 * All text will start off looking like this.
 */
const BASE: TextStyle = {
  // fontFamily: typography.primary,
  color: color.text,
  fontSize: 15,
};

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const presets = {
  /**
   * The default text styles.
   */
  default: BASE,

  /**
   * A bold version of the default text.
   */
  bold: {...BASE, fontWeight: 'bold'} as TextStyle,

  /**
   * Large headers.
   */
  header: {...BASE, fontSize: 24, fontWeight: 'bold'} as TextStyle,

  /**
   * Field labels that appear on forms above the inputs.
   */
  fieldLabel: {...BASE, fontSize: 13, color: color.dim} as TextStyle,

  /**
   * A smaller piece of secondary information.
   */
  secondary: {...BASE, fontSize: 9, color: color.dim} as TextStyle,

  /**
   * Bold , Size 15, Color Black
   */
  B15Black: {
    // fontFamily: typography.bold,
    color: color.mainBlack,
    fontSize: 15,
  } as TextStyle,

  /**
   * Bold , Size 14, Color Black
   */
  B14Black: {
    // fontFamily: typography.bold,
    color: color.mainBlack,
    fontSize: 14,
  } as TextStyle,

  /**
   * Bold , Size 14, Color Black
   */
  B14White: {
    // fontFamily: typography.bold,
    color: color.palette.white,
    fontSize: 14,
  } as TextStyle,

  /**
   * Bold , Size 15, Color White
   */
  btWhiteText: {
    // fontFamily: typography.bold,
    color: color.palette.white,
    fontSize: 15,
  } as TextStyle,

  /**
   * Medium , Size 15, Color White
   */
  M15White: {
    // fontFamily: typography.medium,
    color: color.palette.white,
    fontSize: 15,
  } as TextStyle,

  /**
   * Medium , Size 20, Color White
   */
  M20White: {
    // fontFamily: typography.medium,
    color: color.palette.white,
    fontSize: 20,
  } as TextStyle,

  /**
   * Regular , Size 14, Color White
   */
  R14White: {
    // fontFamily: typography.regular,
    color: color.palette.white,
    fontSize: 14,
  } as TextStyle,

  /**
   * Regular , Size 12, Color White
   */
  R12White: {
    // fontFamily: typography.regular,
    color: color.palette.white,
    fontSize: 14,
  } as TextStyle,

  /**
   * Regular , Size 12, Color White
   */
  R1276: {
    // fontFamily: typography.regular,
    color: color.palette.gray76,
    fontSize: 12,
  } as TextStyle,

  /**
   * Medium , Size 10, Color 2B
   */
  M102B: {
    // fontFamily: typography.medium,
    color: color.palette.mineShaft,
    fontSize: 10,
  } as TextStyle,

  /**
   * Regular , Size 18, Color main
   */
  R18MainOrange: {
    // fontFamily: typography.regular,
    color: color.mainOrange,
    fontSize: 18,
  } as TextStyle,

  /**
   * Medium , Size 12, Color 2B
   */
  M122B: {
    // fontFamily: typography.medium,
    color: color.palette.mineShaft,
    fontSize: 12,
  } as TextStyle,

  /**
   * Medium , Size 14, Color 50
   */
  M1450: {
    // fontFamily: typography.medium,
    color: color.palette.gray50,
    fontSize: 14,
  } as TextStyle,

  /**
   * Montserrat Medium , Size 16, Color 2B
   */
  M_M162B: {
    // fontFamily: typography.Mmedium,
    color: color.palette.mineShaft,
    fontSize: 16,
  } as TextStyle,

  /**
   * Montserrat Medium , Size 14, Color 8E
   */
  M_M148E: {
    // fontFamily: typography.Mmedium,
    color: color.palette.gray8E,
    fontSize: 14,
  } as TextStyle,

  /**
   * Montserrat Medium , Size 8, Color White
   */
  M_M8White: {
    // fontFamily: typography.Mmedium,
    color: color.palette.white,
    fontSize: 8,
  } as TextStyle,

  /**
   * Montserrat Medium , Size 20, Color White
   */
  M_M20White: {
    // fontFamily: typography.Mmedium,
    color: color.palette.white,
    fontSize: 20,
  } as TextStyle,

  /**
   * Montserrat Medium , Size 12, Color White
   */
  M_M12White: {
    // fontFamily: typography.Mmedium,
    color: color.palette.white,
    fontSize: 12,
  } as TextStyle,

  /**
   * Montserrat Medium , Size 16, Color White
   */
  M_B16White: {
    // fontFamily: typography.Mbold,
    color: color.palette.white,
    fontSize: 16,
  } as TextStyle,

  /**
   * Montserrat Medium , Size 20, Color White
   */
  M_B20White: {
    // fontFamily: typography.Mbold,
    color: color.palette.white,
    fontSize: 20,
  } as TextStyle,

  /**
   * Currency font
   * LucidaGrande, Size 12, Color White
   */
  peso: {
    // fontFamily: typography.LucidaGrande,
    color: color.palette.white,
    fontSize: 12,
  } as TextStyle,

  /**
   * Error text preset
   * Lato, Size 12, Color red
   */
  errorText: {
    // fontFamily: typography.regular,
    color: color.palette.error,
    fontSize: 12,
    textAlign: 'center',
  } as TextStyle,
};

/**
 * A list of preset names.
 */
export type TextPresets = keyof typeof presets;
