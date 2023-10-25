import {horizontalScale, verticalScale} from '@app/theme';
import {I18nManager, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  mainWrap: {
    justifyContent: 'center',
  },
  container: {
    flexShrink: 1,
    borderWidth: 0.5,
    borderColor: '#EEEEEE',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  flex1: {
    flex: 1,
  },
  flexShrink: {
    flexShrink: 1,
  },
  wrapTop: {
    justifyContent: 'flex-end',
  },
  dropdownTabletContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    maxWidth: 280,
  },
  dropdownPhoneContainer: {
    width: 130,
    maxWidth: 150,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    marginVertical: 5,
    fontSize: 16,
    writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
  },
  item: {
    padding: 17,
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    fontSize: 16,
    textAlign: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: horizontalScale(5),
  },
  rightIconView: {
    marginTop: verticalScale(0),
  },
  input: {
    borderWidth: 0.5,
    borderColor: '#DDDDDD',
    paddingHorizontal: 8,
    marginBottom: 8,
    margin: 6,
    height: 45,
  },
  fullScreen: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
