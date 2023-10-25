/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  Platform,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Text as RNText,
} from 'react-native';
import {useSelector} from 'react-redux';
import {selector} from '@app/redux';
import {useTranslation} from 'react-i18next';
import {useIsFocused} from '@react-navigation/native';
import {isTablet} from 'react-native-device-info';
import Tooltip from 'react-native-walkthrough-tooltip';
import {LinearGradientText} from 'react-native-linear-gradient-text';

//
import {
  ButtonLinearGradient,
  Header,
  PopupSwitchPlan,
  PopupCancelSubscription,
  Text,
  PopupConfirm,
  ButtonBorder,
} from '@app/components';

import {
  useMembership,
  useGetStatusMembership,
  useKids,
  usePrivatePlan,
  useOrientation,
  isIPhone8PlusOrBelow,
} from '@app/hook';
import {
  capitalizeFirstLetter,
  capitalizeWords,
  formatDate,
  formatDayMonthYear,
} from '@app/utils/general';
import {
  MEMBER_SHIP_STATUS,
  MEMBER_SHIP_TITLE_CONDITION,
} from '@app/utils/contants';
import {DidYouKnow, FinishIcon, FreeTrialIcon, HintIcon} from '@app/svg';
import {
  color,
  horizontalScale,
  moderateScale,
  typography,
  verticalScale,
} from '@app/theme';

import {useSubscription} from '../hook/useSubscription';

const NEXT_ICON = require('@app/components/images/next-icon.png');

export function MemberShip({navigation, isFromTabbar}) {
  const {t, i18n} = useTranslation();
  const isFocused = useIsFocused();
  const orientation = useOrientation();

  useEffect(() => {
    getPrivatePlan();
  }, []);

  const [toolTipVisible, setToolTipVisible] = useState<number>();
  const {getPrivatePlan, dataPrivatePlan, loadingGetPrivatePlan} =
    usePrivatePlan();
  const {accessToken, childId, activeKidInfo, userInfo} = useSelector(
    selector.user,
  );
  const {orientationOpenApp} = useSelector(selector.config);
  const [isVisibleCancelPlan, setIsVisibleCancelPlan] =
    useState<boolean>(false);
  const [isVisibleSwitchPlanMonthly, setIsVisibleSwitchPlanMonthly] =
    useState<boolean>(false);
  const [isVisibleSwitchPlanYearly, setIsVisibleSwitchPlanYearly] =
    useState<boolean>(false);
  const [isVisibleSwitchPlanQuarterly, setIsVisibleSwitchPlanQuarterly] =
    useState<boolean>(false);
  const [membershipId, setMemberShipId] = useState<string>('');
  const [isGetUser, setIsGetUser] = useState<boolean>(false);
  const [isVisibleSubscribeAgain, setIsVisibleSubscribeAgain] =
    useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [toolTipSubscribeAgainVisible, setToolTipSubscribeAgainVisible] =
    useState<boolean>(false);
  const [toolTipMonthlyPlanVisible, setToolTipMonthlyPlanVisible] =
    useState<boolean>(false);
  const [toolTipQuarterlyPlanVisible, setToolTipQuarterlyPlanVisible] =
    useState<boolean>(false);
  const resultYearly = dataPrivatePlan?.privatePlan?.commitmentLevel[2];
  const resultMonthly = dataPrivatePlan?.privatePlan?.commitmentLevel[0];
  const resultQuarterly = dataPrivatePlan?.privatePlan?.commitmentLevel[1];

  useEffect(() => {
    getActiveKids();
    getPrivatePlan();
  }, [isGetUser]);

  useEffect(() => {
    if (isFocused) {
      getActiveKids();
      getPrivatePlan();
    }
  }, [isFocused]);

  useEffect(() => {
    getActiveKids();
    getPrivatePlan();
  }, [childId]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getPrivatePlan();
    getActiveKids();
    setTimeout(() => {
      setRefreshing(false);
    }, 100);
  }, []);

  const {getTitleOfDateExpire} = useGetStatusMembership(
    activeKidInfo?.activeFor,
  );

  const {getActiveKids, loadingActiveKids} = useKids(accessToken);

  const {checkIsActivePackage, getMembershipStringLevel} = useSubscription();

  const onCompletedUpdateChildMembership = () => {
    setIsVisibleSwitchPlanMonthly(false);
    setIsVisibleSwitchPlanYearly(false);
    setIsVisibleSwitchPlanQuarterly(false);
    setIsGetUser(!isGetUser);
  };

  const onCompletedCancelSubscription = () => {
    setIsVisibleCancelPlan(false);
    setIsGetUser(!isGetUser);
  };

  const onCompletedSubscribeAgain = () => {
    setIsVisibleSubscribeAgain(false);
    setIsGetUser(!isGetUser);
  };

  const {
    updateChildMembership,
    cancelSubscription,
    subscribeAgain,
    loadingUpdateChildMembership,
    loadingSubscribeAgain,
    loadingCancelSubscription,
  } = useMembership(
    accessToken,
    membershipId,
    onCompletedUpdateChildMembership,
    onCompletedCancelSubscription,
    onCompletedSubscribeAgain,
  );
  const onConfirmChangeToYearly = async () => {
    await setMemberShipId(resultYearly?._id);
    await updateChildMembership();
    await (onCompletedUpdateChildMembership &&
      onCompletedUpdateChildMembership());
  };

  const onConfirmChangeToQuarterly = async () => {
    await setMemberShipId(resultQuarterly?._id);
    await updateChildMembership();
    await (onCompletedUpdateChildMembership &&
      onCompletedUpdateChildMembership());
  };

  const onConfirmChangeToMonthly = async () => {
    await setMemberShipId(resultMonthly?._id);
    await updateChildMembership();
    await (onCompletedUpdateChildMembership &&
      onCompletedUpdateChildMembership());
  };

  const onConfirmCancel = async () => {
    await cancelSubscription();
    await (onCompletedCancelSubscription && onCompletedCancelSubscription());
  };

  const onSubscribeAgain = async () => {
    await subscribeAgain();
    await (onCompletedSubscribeAgain && onCompletedSubscribeAgain());
  };

  const {memberShipStatus} = useGetStatusMembership(activeKidInfo?.activeFor);

  const renderPrivatePlan = () => {
    switch (memberShipStatus) {
      case MEMBER_SHIP_STATUS.SUBSCRIBED:
        return (
          <View style={CONTAINER_MEMBERSHIP_VIEW}>
            {dataPrivatePlan?.privatePlan?.commitmentLevel?.map((item, i) => {
              const {
                name,
                billInfo,
                key,
                price,
                discount,
                isCanUpgrade,
                interval,
              } = item;
              const isActivePlan = checkIsActivePackage({
                activeFor: activeKidInfo?.activeFor,
                memberType: key,
              });
              const planStyle = {
                borderColor: isActivePlan ? color.purple : color.white,
                borderWidth: [
                  'monthly',
                  'yearly',
                  'quarterly',
                  'lifetime',
                ].includes(activeKidInfo?.activeFor?.memberType)
                  ? 1
                  : 0,
                width: isTablet()
                  ? orientation === 'PORTRAIT'
                    ? '49%'
                    : '49%'
                  : '100%',
                height: isTablet()
                  ? orientation === 'PORTRAIT'
                    ? '100%'
                    : '100%'
                  : Platform.OS === 'ios'
                  ? isIPhone8PlusOrBelow()
                    ? verticalScale(280)
                    : isActivePlan
                    ? verticalScale(250)
                    : verticalScale(180)
                  : verticalScale(280),
              };

              return (
                <View style={[TABLE_VIEW, ELEVATION, planStyle]} key={key}>
                  {isActivePlan && (
                    <View style={FINISH_ICON_VIEW}>
                      <FinishIcon props={undefined} />
                    </View>
                  )}
                  <View style={CONTENT_CONTAINER_VIEW}>
                    <View style={DIRECTION_HEADER_VIEW}>
                      <LinearGradientText
                        colors={['#DB14FB', '#FFC700']}
                        text={capitalizeWords(name)}
                        start={{x: 0.0, y: 0.9}}
                        textStyle={MONTHLY_YEARLY_TEXT}
                      />
                      {activeKidInfo?.activeFor?.subscriptionStatus ===
                        'trialing' &&
                        isActivePlan && (
                          <View
                            style={{paddingHorizontal: horizontalScale(10)}}>
                            <FreeTrialIcon
                              width={isTablet() ? 35 : 30}
                              height={isTablet() ? 35 : 30}
                            />
                          </View>
                        )}
                    </View>
                    <View style={DIRECTION_VIEW}>
                      <Text
                        text={`${price}`}
                        style={[
                          PRICE_TITLE,
                          {
                            fontSize: isTablet()
                              ? orientationOpenApp === 'LANDSCAPE'
                                ? moderateScale(29)
                                : moderateScale(36)
                              : moderateScale(45),
                          },
                        ]}
                      />
                      <Text
                        // text={`/${t('mo')}`}
                        text={interval ? `/${t('mo')}` : ''}
                        style={COMMON_TITLE}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        text={billInfo}
                        style={[
                          PER_TITLE,
                          {
                            fontSize: isTablet()
                              ? orientation === 'PORTRAIT'
                                ? orientationOpenApp === 'LANDSCAPE'
                                  ? moderateScale(9)
                                  : moderateScale(9.5)
                                : moderateScale(9.5)
                              : moderateScale(15),
                          },
                        ]}
                      />
                      {discount && (
                        <Text
                          text={` (${discount})`}
                          style={[
                            SALE_OFF_TEXT,
                            {
                              fontSize: isTablet()
                                ? orientation === 'PORTRAIT'
                                  ? orientationOpenApp === 'LANDSCAPE'
                                    ? moderateScale(9)
                                    : moderateScale(9.5)
                                  : moderateScale(9.5)
                                : moderateScale(15),
                            },
                          ]}
                        />
                      )}
                      <Tooltip
                        contentStyle={{height: 'auto', width: 'auto'}}
                        isVisible={toolTipVisible === i}
                        content={
                          <Text
                            style={[
                              TEXT_TOOLTIP,
                              {
                                fontSize:
                                  orientationOpenApp === 'LANDSCAPE'
                                    ? moderateScale(8)
                                    : moderateScale(10),
                              },
                            ]}>
                            <Text> {`${t('subscription_tooltip')} `} </Text>
                          </Text>
                        }
                        placement="bottom"
                        onClose={() => setToolTipVisible(null)}>
                        <TouchableOpacity
                          style={{
                            paddingHorizontal: horizontalScale(10),
                          }}
                          onPress={() => setToolTipVisible(i)}>
                          <HintIcon width={15} height={15} fill={color.gray3} />
                        </TouchableOpacity>
                      </Tooltip>
                    </View>
                    {isActivePlan ? (
                      <ButtonBorder
                        disabled={key === 'lifetime'}
                        text={getMembershipStringLevel({
                          membershipType: key,
                          titleCondition:
                            MEMBER_SHIP_TITLE_CONDITION.CANCEL_LEVEL,
                        })}
                        containerStyle={[
                          BUTTON_PAYMENT_VIEW,
                          {
                            height: isTablet()
                              ? orientationOpenApp === 'LANDSCAPE'
                                ? verticalScale(60)
                                : verticalScale(40)
                              : verticalScale(40),
                          },
                        ]}
                        textStyle={[
                          TEXT_CONFIRM,
                          {
                            color: color.purple,
                            fontSize: isTablet()
                              ? orientationOpenApp === 'LANDSCAPE'
                                ? moderateScale(9)
                                : moderateScale(10)
                              : moderateScale(14),
                          },
                        ]}
                        onPress={() => setIsVisibleCancelPlan(true)}
                        isIcon
                        image={NEXT_ICON}
                        imageStyle={{
                          marginLeft: horizontalScale(5),
                          tintColor: color.purple,
                        }}
                      />
                    ) : (
                      <>{isCanUpgrade ? <View /> : <View />}</>
                    )}

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: isTablet()
                          ? verticalScale(10)
                          : verticalScale(5),
                      }}>
                      <Text
                        text={
                          isActivePlan
                            ? getTitleOfDateExpire(
                                activeKidInfo?.activeFor?.enrollExpireTime,
                              )
                            : ''
                        }
                        style={[
                          PER_TITLE,
                          {
                            fontSize: isTablet()
                              ? orientationOpenApp === 'LANDSCAPE'
                                ? moderateScale(8)
                                : moderateScale(9.5)
                              : isIPhone8PlusOrBelow()
                              ? moderateScale(12)
                              : moderateScale(11),
                            textAlign: 'center',
                          },
                        ]}
                      />
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        );

      case MEMBER_SHIP_STATUS.STILL_ACTIVE:
        return (
          <View style={CONTAINER_MEMBERSHIP_VIEW}>
            {dataPrivatePlan?.privatePlan?.commitmentLevel?.map(item => {
              const {
                name,
                billInfo,
                key,
                price,
                discount,
                isCanUpgrade,
                interval,
              } = item;
              const isActivePlan = checkIsActivePackage({
                activeFor: activeKidInfo?.activeFor,
                memberType: key,
              });

              const planStyle = {
                borderColor: isActivePlan ? color.purple : color.white,
                borderWidth: isActivePlan ? 1 : 0,
                width: isTablet()
                  ? orientation === 'PORTRAIT'
                    ? '49%'
                    : '49%'
                  : '100%',
                height: isTablet()
                  ? orientation === 'PORTRAIT'
                    ? '100%%'
                    : '100%%'
                  : Platform.OS === 'ios'
                  ? verticalScale(185)
                  : verticalScale(280),
              };

              return (
                <View style={[TABLE_VIEW, ELEVATION, planStyle]} key={key}>
                  {isActivePlan && (
                    <View style={FINISH_ICON_VIEW}>
                      <FinishIcon props={undefined} />
                    </View>
                  )}
                  <View style={CONTENT_CONTAINER_VIEW}>
                    <View style={DIRECTION_HEADER_VIEW}>
                      <LinearGradientText
                        colors={['#DB14FB', '#FFC700']}
                        text={capitalizeWords(name)}
                        start={{x: 0.0, y: 0.9}}
                        textStyle={MONTHLY_YEARLY_TEXT}
                      />
                      {activeKidInfo?.activeFor?.subscriptionStatus ===
                        'trialing' &&
                        isActivePlan && (
                          <View
                            style={{paddingHorizontal: horizontalScale(10)}}>
                            <FreeTrialIcon
                              width={isTablet() ? 35 : 30}
                              height={isTablet() ? 35 : 30}
                            />
                          </View>
                        )}
                    </View>
                    <View style={DIRECTION_VIEW}>
                      <Text
                        text={`${price}`}
                        style={[
                          PRICE_TITLE,
                          {
                            fontSize: isTablet()
                              ? orientationOpenApp === 'LANDSCAPE'
                                ? moderateScale(29)
                                : moderateScale(36)
                              : moderateScale(45),
                          },
                        ]}
                      />
                      <Text
                        // text={`/${t('mo')}`}
                        text={interval ? `/${t('mo')}` : ''}
                        style={COMMON_TITLE}
                      />
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        text={billInfo}
                        style={[
                          PER_TITLE,
                          {
                            fontSize: isTablet()
                              ? orientation === 'PORTRAIT'
                                ? orientationOpenApp === 'LANDSCAPE'
                                  ? moderateScale(8.5)
                                  : moderateScale(9.5)
                                : moderateScale(9.5)
                              : moderateScale(15),
                            textAlign: 'center',
                          },
                        ]}
                      />
                      {discount && (
                        <Text
                          text={` (${discount})`}
                          style={[
                            SALE_OFF_TEXT,
                            {
                              fontSize: isTablet()
                                ? orientation === 'PORTRAIT'
                                  ? orientationOpenApp === 'LANDSCAPE'
                                    ? moderateScale(8.5)
                                    : moderateScale(9.5)
                                  : moderateScale(9.5)
                                : moderateScale(15),
                            },
                          ]}
                        />
                      )}
                    </View>
                    {isActivePlan ? (
                      <View />
                    ) : (
                      <>{isCanUpgrade ? <View /> : <View />}</>
                    )}

                    <View
                      style={{
                        marginTop: isTablet()
                          ? verticalScale(10)
                          : verticalScale(5),
                        width: isTablet()
                          ? orientation === 'PORTRAIT'
                            ? orientationOpenApp === 'LANDSCAPE'
                              ? horizontalScale(100)
                              : horizontalScale(140)
                            : 'auto'
                          : 'auto',
                      }}>
                      <Text
                        text={
                          isActivePlan
                            ? getTitleOfDateExpire(
                                activeKidInfo?.activeFor?.enrollExpireTime,
                              )
                            : ''
                        }
                        style={[
                          PER_TITLE,
                          {
                            fontSize: isTablet()
                              ? orientationOpenApp === 'LANDSCAPE'
                                ? moderateScale(8)
                                : moderateScale(9.5)
                              : isIPhone8PlusOrBelow()
                              ? moderateScale(12)
                              : moderateScale(11),
                            textAlign: 'center',
                          },
                        ]}
                      />
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        );

      case MEMBER_SHIP_STATUS.NOT_SUBSCRIBED:
        return (
          <View style={CONTAINER_MEMBERSHIP_VIEW}>
            {dataPrivatePlan?.privatePlan?.commitmentLevel?.map(item => {
              const {
                name,
                billInfo,
                key,
                price,
                discount,
                freeTrial,
                interval,
              } = item;
              const isActivePlan = checkIsActivePackage({
                activeFor: activeKidInfo?.activeFor,
                memberType: key,
              });

              const planStyle = {
                borderColor: isActivePlan ? color.purple : color.white,
                borderWidth: isActivePlan ? 1 : 0,
                width: isTablet()
                  ? orientation === 'PORTRAIT'
                    ? '49%'
                    : '49%'
                  : '100%',
                height: isTablet()
                  ? orientation === 'PORTRAIT'
                    ? '100%%'
                    : '100%%'
                  : Platform.OS === 'ios'
                  ? verticalScale(250)
                  : verticalScale(280),
              };

              return (
                <View style={[TABLE_VIEW, ELEVATION, planStyle]} key={key}>
                  {isActivePlan && (
                    <View style={FINISH_ICON_VIEW}>
                      <FinishIcon props={undefined} />
                    </View>
                  )}
                  <View style={CONTENT_CONTAINER_VIEW}>
                    <LinearGradientText
                      colors={['#DB14FB', '#FFC700']}
                      text={capitalizeWords(name)}
                      start={{x: 0.0, y: 0.9}}
                      textStyle={MONTHLY_YEARLY_TEXT}
                    />
                    <View style={DIRECTION_VIEW}>
                      <Text
                        text={`${price}`}
                        style={[
                          PRICE_TITLE,
                          {
                            fontSize: isTablet()
                              ? orientationOpenApp === 'LANDSCAPE'
                                ? moderateScale(29)
                                : moderateScale(36)
                              : moderateScale(40),
                          },
                        ]}
                      />
                      <Text
                        // text={`/${t('mo')}`}
                        text={interval ? `/${t('mo')}` : ''}
                        style={COMMON_TITLE}
                      />
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        text={billInfo}
                        style={[
                          PER_TITLE,
                          {
                            fontSize: isTablet()
                              ? orientation === 'PORTRAIT'
                                ? orientationOpenApp === 'LANDSCAPE'
                                  ? moderateScale(8.5)
                                  : moderateScale(9.5)
                                : moderateScale(9.5)
                              : moderateScale(15),
                            textAlign: 'center',
                          },
                        ]}
                      />
                      {discount && (
                        <Text
                          text={` (${discount})`}
                          style={[
                            SALE_OFF_TEXT,
                            {
                              fontSize: isTablet()
                                ? orientation === 'PORTRAIT'
                                  ? orientationOpenApp === 'LANDSCAPE'
                                    ? moderateScale(8.5)
                                    : moderateScale(9.5)
                                  : moderateScale(9.5)
                                : moderateScale(15),
                            },
                          ]}
                        />
                      )}
                    </View>
                    <ButtonLinearGradient
                      text={
                        activeKidInfo?.activeFor?.isNewKid
                          ? freeTrial
                          : getMembershipStringLevel({
                              membershipType: key,
                              titleCondition:
                                MEMBER_SHIP_TITLE_CONDITION.SUBSCRIBE_LEVEL,
                            })
                      }
                      style={[
                        BUTTON_PAYMENT_VIEW,
                        {
                          flexDirection: 'row',
                          height: isTablet()
                            ? orientationOpenApp === 'LANDSCAPE'
                              ? verticalScale(60)
                              : verticalScale(40)
                            : verticalScale(45),
                        },
                      ]}
                      textStyle={[
                        TEXT_CONFIRM,
                        {
                          fontSize: isTablet()
                            ? orientationOpenApp === 'LANDSCAPE'
                              ? moderateScale(9)
                              : moderateScale(10)
                            : moderateScale(14),
                        },
                      ]}
                      onPress={() => {}}
                      isIcon
                      image={NEXT_ICON}
                      imageStyle={{marginLeft: horizontalScale(5)}}
                    />
                  </View>
                </View>
              );
            })}
          </View>
        );

      default:
        break;
    }
  };

  if (
    loadingActiveKids ||
    loadingGetPrivatePlan ||
    loadingUpdateChildMembership ||
    loadingCancelSubscription ||
    loadingSubscribeAgain
  ) {
    return (
      <View style={LOADING_VIEW}>
        <ActivityIndicator size="large" color={color.gray3} />
        <Text text={'Loading ...'} />
      </View>
    );
  }

  return (
    <View style={CONTAINER_VIEW}>
      {isFromTabbar !== undefined && (
        <Header
          title={`${t('membership')}`}
          onBackPress={() => navigation.goBack()}
          style={{backgroundColor: color.white}}
        />
      )}

      <ScrollView
        style={[CONTAINER, {marginTop: isFromTabbar === undefined ? -20 : 20}]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View
          style={{
            marginTop:
              Platform.OS === 'ios' ? verticalScale(30) : verticalScale(-10),
          }}>
          {renderPrivatePlan()}
        </View>
        {isTablet() && (
          <View
            style={[
              IMAGE_FOOTER_VIEW,
              {
                marginTop:
                  orientation === 'PORTRAIT'
                    ? verticalScale(50)
                    : orientationOpenApp === 'LANDSCAPE'
                    ? verticalScale(50)
                    : verticalScale(50),
              },
            ]}>
            <View style={IMAGE_FOOTER_VIEW_CONTENT}>
              <View style={IMAGE_DIRECTION}>
                <View style={IMAGE_FOOTER_VIEW_COTENT_BODY}>
                  <DidYouKnow />
                  <Text
                    text={`${t('did_you_know')}`}
                    style={[
                      DID_YOU_KNOW_TEXT,
                      {
                        width: horizontalScale(30),
                      },
                    ]}
                  />
                </View>
                <View
                  style={{
                    width:
                      orientation === 'PORTRAIT'
                        ? orientationOpenApp === 'LANDSCAPE'
                          ? horizontalScale(235)
                          : horizontalScale(310)
                        : orientationOpenApp === 'LANDSCAPE'
                        ? horizontalScale(325)
                        : horizontalScale(430),
                    height:
                      orientation === 'PORTRAIT'
                        ? orientationOpenApp === 'LANDSCAPE'
                          ? verticalScale(70)
                          : verticalScale(45)
                        : orientationOpenApp === 'LANDSCAPE'
                        ? verticalScale(60)
                        : verticalScale(45),
                    backgroundColor: color.purple1,
                    justifyContent: 'center',
                    right: horizontalScale(5),
                  }}>
                  <Text
                    text={`${t('did_you_know_content')}`}
                    style={[
                      DID_YOU_KNOW_CONTENT_TEXT,
                      {
                        width:
                          orientation === 'PORTRAIT'
                            ? orientationOpenApp === 'LANDSCAPE'
                              ? horizontalScale(220)
                              : horizontalScale(280)
                            : orientationOpenApp === 'LANDSCAPE'
                            ? horizontalScale(320)
                            : horizontalScale(430),
                      },
                    ]}
                  />
                </View>
              </View>
            </View>
          </View>
        )}
        <PopupCancelSubscription
          isVisible={isVisibleCancelPlan}
          backgroundStyle={{
            height: isTablet()
              ? orientationOpenApp === 'LANDSCAPE'
                ? i18n.language === 'en'
                  ? verticalScale(160)
                  : verticalScale(200)
                : i18n.language === 'en'
                ? verticalScale(130)
                : orientation === 'PORTRAIT'
                ? verticalScale(145)
                : verticalScale(140)
              : i18n.language === 'en'
              ? verticalScale(120)
              : verticalScale(200),
          }}
          name={
            i18n.language === 'en'
              ? `${userInfo?.me?.firstName},`
              : `Bạn ${userInfo?.me?.firstName} ơi!`
          }
          nameStyle={{
            fontSize: isTablet()
              ? orientationOpenApp === 'LANDSCAPE'
                ? moderateScale(30)
                : moderateScale(40)
              : moderateScale(36),
          }}
          title={`${t('we_are_sorry', {
            kidName: activeKidInfo?.activeFor?.info?.name,
          })}`}
          titleStyle={{
            fontSize: isTablet()
              ? i18n.language === 'en'
                ? moderateScale(14)
                : orientationOpenApp === 'LANDSCAPE'
                ? moderateScale(12)
                : moderateScale(13)
              : moderateScale(15.5),
          }}
          subtitle={`${t('important')}: `}
          subtitleStyle={{
            marginTop: verticalScale(20),
            fontSize: isTablet()
              ? orientationOpenApp === 'LANDSCAPE'
                ? moderateScale(10)
                : moderateScale(11)
              : moderateScale(14),
          }}
          description={`${t('by_canceling_your_subscription')} `}
          descriptionStyle={{
            fontSize: isTablet()
              ? orientationOpenApp === 'LANDSCAPE'
                ? moderateScale(10)
                : moderateScale(11)
              : moderateScale(14),
          }}
          nextDescription={
            i18n.language === 'en'
              ? `${formatDate(activeKidInfo?.activeFor?.enrollExpireTime)}`
              : `${formatDayMonthYear(
                  activeKidInfo?.activeFor?.enrollExpireTime,
                )}`
          }
          nextDescriptionStyle={[
            DATE_EXPIRED_TEXT,
            {
              fontSize: isTablet()
                ? orientationOpenApp === 'LANDSCAPE'
                  ? moderateScale(10)
                  : moderateScale(11)
                : moderateScale(14),
            },
          ]}
          onClose={() => setIsVisibleCancelPlan(false)}
          onConfirm={onConfirmCancel}
        />
        {/* <PopupSwitchPlan
          isVisible={isVisibleSwitchPlanMonthly}
          titleStyle={{
            fontSize: isTablet() ? moderateScale(36) : moderateScale(30),
            color: color.purple,
          }}
          moneyStyle={{
            fontSize: isTablet() ? moderateScale(18) : moderateScale(22),
          }}
          title={`${resultMonthly?.price}`}
          money={`/${t('month')}`}
          subtitle={`${t('important')}: `}
          subtitleStyle={{
            fontSize: isTablet() ? moderateScale(11) : moderateScale(14),
          }}
          description={`${t('switch_to_monthly_subscription_today', {
            totalPrice: resultMonthly?.totalPrice,
            date: formatDayMonthYear(
              activeKidInfo?.activeFor?.enrollExpireTime,
            ),
          })} `}
          descriptionStyle={{
            fontSize: isTablet() ? moderateScale(11) : moderateScale(14),
          }}
          nextDescription={`${
            i18n.language === 'en'
              ? formatDate(activeKidInfo?.activeFor?.enrollExpireTime)
              : ''
          } `}
          nextDescriptionStyle={DATE_EXPIRED_TEXT}
          switchToText={`${t('yes_i_agree')}`}
          cancelText={`${t('no_thanks')}`}
          onClose={() => setIsVisibleSwitchPlanMonthly(false)}
          onConfirm={onConfirmChangeToMonthly}
        /> */}
        {/* <PopupSwitchPlan
          isVisible={isVisibleSwitchPlanQuarterly}
          title={`${resultQuarterly?.price}`}
          money={`/${t('month')}`}
          titleStyle={{
            fontSize: isTablet() ? moderateScale(36) : moderateScale(30),
            color: color.purple,
          }}
          moneyStyle={{
            fontSize: isTablet() ? moderateScale(18) : moderateScale(22),
            color: color.black1,
          }}
          subtitle={`${t('important')}: `}
          subtitleStyle={{
            fontSize: isTablet() ? moderateScale(9) : moderateScale(13),
          }}
          description={`${t('switch_to_quarterly_subscription_today', {
            totalPrice: resultQuarterly?.totalPrice,
            date: `${formatDayMonthYear(
              activeKidInfo?.activeFor?.enrollExpireTime,
            )}`,
          })} `}
          descriptionStyle={{
            fontSize: isTablet() ? moderateScale(9) : moderateScale(13),
          }}
          dateExpired={`${
            i18n.language === 'en'
              ? formatDate(activeKidInfo?.activeFor?.enrollExpireTime)
              : formatDayMonthYear(activeKidInfo?.activeFor?.enrollExpireTime)
          }. `}
          dateExpiredStyle={DATE_EXPIRED_TEXT}
          nextDiscountText={`${t('you_are')} `}
          nextDiscountStyle={{
            fontSize: isTablet() ? moderateScale(9) : moderateScale(13),
          }}
          nextDescriptionStyle={{
            fontSize: isTablet() ? moderateScale(9) : moderateScale(13),
          }}
          discount={resultQuarterly?.discount?.toLowerCase()}
          discountStyle={{
            fontSize: isTablet() ? moderateScale(9) : moderateScale(13),
          }}
          nextDescription={` ${t('compared_to_membership_subscription', {
            membershipName:
              i18n.language === 'en'
                ? activeKidInfo?.activeFor?.membershipName?.toLowerCase()
                : activeKidInfo?.activeFor?.membershipName?.toLowerCase() ===
                  'monthly'
                ? t('monthly')
                : t('quarterly'),
          })}`}
          switchToText={`${t('yes_i_agree')}`}
          cancelText={`${t('no_thanks')}`}
          onClose={() => setIsVisibleSwitchPlanQuarterly(false)}
          onConfirm={onConfirmChangeToQuarterly}
        /> */}
        {/* <PopupSwitchPlan
          isVisible={isVisibleSwitchPlanYearly}
          title={`${resultYearly?.price}`}
          money={`/${t('month')}`}
          titleStyle={{
            fontSize: isTablet() ? moderateScale(36) : moderateScale(30),
            color: color.purple,
          }}
          moneyStyle={{
            fontSize: isTablet() ? moderateScale(18) : moderateScale(22),
          }}
          subtitle={`${t('important')}: `}
          subtitleStyle={{
            fontSize: isTablet() ? moderateScale(11) : moderateScale(14),
          }}
          description={`${t('switch_to_yearly_subscription_today', {
            totalPrice: resultYearly?.totalPrice,
            date: formatDayMonthYear(
              activeKidInfo?.activeFor?.enrollExpireTime,
            ),
          })} `}
          descriptionStyle={{
            fontSize: isTablet() ? moderateScale(11) : moderateScale(14),
          }}
          dateExpired={`${
            i18n.language === 'en'
              ? formatDate(activeKidInfo?.activeFor?.enrollExpireTime)
              : ''
          } `}
          dateExpiredStyle={DATE_EXPIRED_TEXT}
          nextDiscountText={`${t('you_are')} `}
          nextDiscountStyle={{
            fontSize: isTablet() ? moderateScale(11) : moderateScale(14),
          }}
          nextDescriptionStyle={{
            fontSize: isTablet() ? moderateScale(11) : moderateScale(14),
          }}
          discount={resultYearly?.isBestValue}
          discountStyle={{
            fontSize: isTablet() ? moderateScale(11) : moderateScale(14),
          }}
          nextDescription={` ${t('compared_to_monthly_subscription')}`}
          switchToText={`${t('yes_i_agree')}`}
          cancelText={`${t('no_thanks')}`}
          onClose={() => setIsVisibleSwitchPlanYearly(false)}
          onConfirm={onConfirmChangeToYearly}
        /> */}
        {/* <PopupConfirm
          isVisible={isVisibleSubscribeAgain}
          title={`${t('if_you_select_yes_below', {
            memberType:
              i18n.language === 'en'
                ? capitalizeFirstLetter(activeKidInfo?.activeFor?.memberType)
                : activeKidInfo?.activeFor?.memberType === 'monthly'
                ? `${t('monthly_subscribed')}`
                : `${t('quarterly_subscribed')}`,
          })}`}
          titleStyle={[
            TITLE_POPUP,
            {
              fontSize: isTablet()
                ? orientationOpenApp === 'LANDSCAPE'
                  ? moderateScale(10)
                  : moderateScale(11)
                : moderateScale(14),
            },
          ]}
          subtitle={
            i18n.language === 'en'
              ? `${formatDate(activeKidInfo?.activeFor?.enrollExpireTime)}`
              : `${formatDayMonthYear(
                  activeKidInfo?.activeFor?.enrollExpireTime,
                )}`
          }
          subtitleStyle={[
            SUBTITLE_POPUP,
            {
              fontSize: isTablet()
                ? orientationOpenApp === 'LANDSCAPE'
                  ? moderateScale(10)
                  : moderateScale(11)
                : moderateScale(13),
            },
          ]}
          onClose={() => {
            setIsVisibleSubscribeAgain(false);
          }}
          onConfirm={onSubscribeAgain}
        /> */}
      </ScrollView>
    </View>
  );
}

const CONTAINER_VIEW: ViewStyle = {
  flex: 1,
  backgroundColor: color.white,
};
const CONTAINER: ViewStyle = {
  flex: 1,
  padding: 15,
  backgroundColor: color.gray4,
  marginTop: 20,
};
const CONTENT_CONTAINER_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: isTablet() ? verticalScale(20) : verticalScale(15),
};
const CONTAINER_MEMBERSHIP_VIEW: ViewStyle = {
  flexDirection: isTablet() ? 'row' : 'column',
  justifyContent: 'space-between',
};
const DIRECTION_HEADER_VIEW: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
};
const PRICE_TITLE: TextStyle = {
  fontFamily: typography.promptBold,
  fontWeight: '500',
  marginTop: isTablet() ? verticalScale(22) : 0,
  color: color.dark1,
};
const COMMON_TITLE: TextStyle = {
  fontFamily: typography.promptBold,
  fontWeight: '500',
  fontSize: isTablet() ? moderateScale(18) : moderateScale(23),
  color: color.dark1,
  textAlignVertical: 'center',
  marginTop: isTablet()
    ? verticalScale(47)
    : Platform.OS === 'android'
    ? verticalScale(17)
    : isIPhone8PlusOrBelow()
    ? verticalScale(26)
    : verticalScale(23),
};
const PER_TITLE: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  color: color.gray3,
};
const FINISH_ICON_VIEW: ViewStyle = {
  position: 'absolute',
  zIndex: 2,
  top: -10,
  right: 10,
};
const MONTHLY_YEARLY_TEXT: TextStyle = {
  fontFamily: typography.promptBold,
  fontSize: isTablet() ? moderateScale(30) : moderateScale(30),
  fontWeight: '700',
  color: color.black1,
};
const SALE_OFF_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  color: color.purple,
  textAlignVertical: 'center',
};
const BUTTON_PAYMENT_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 50,
  width: isTablet() ? 280 : 260,
  marginTop: isTablet() ? verticalScale(20) : verticalScale(20),
};
const TEXT_CONFIRM: TextStyle = {
  textAlign: 'center',
  color: color.white,
  fontFamily: typography.promptBold,
  fontWeight: '700',
};
const TABLE_VIEW: ViewStyle = {
  backgroundColor: color.white,
  borderRadius: 8,
  alignItems: 'center',
  marginTop: Platform.OS === 'ios' ? 20 : 25,
};
const ELEVATION: ViewStyle = {
  shadowColor: '#52006A',
  shadowOffset: {
    width: 0,
    height: 6,
  },
  shadowOpacity: 0.37,
  shadowRadius: 7.49,
  elevation: 4,
};
const DIRECTION_VIEW: ViewStyle = {
  flexDirection: 'row',
  marginTop: isTablet() ? verticalScale(-20) : 0,
};
const DATE_EXPIRED_TEXT: TextStyle = {
  fontFamily: typography.promptBold,
  fontWeight: '700',
  fontSize: isTablet() ? moderateScale(11) : moderateScale(14),
};
const TITLE_POPUP: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
};
const SUBTITLE_POPUP: TextStyle = {
  fontSize: isTablet() ? moderateScale(11) : moderateScale(13),
  fontFamily: typography.promptBold,
  fontWeight: '700',
};
const LOADING_VIEW: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: color.white,
};
const IMAGE_FOOTER_VIEW: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
};
const DID_YOU_KNOW_TEXT: TextStyle = {
  fontFamily: typography.promptMedium,
  fontWeight: '600',
  fontSize: moderateScale(8),
  flex: 1,
  textAlign: 'center',
};
const DID_YOU_KNOW_CONTENT_TEXT: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  textAlign: 'left',
  fontSize: moderateScale(8),
  color: color.purple,
  marginLeft: horizontalScale(10),
};
const IMAGE_FOOTER_VIEW_CONTENT: ViewStyle = {
  width: 100,
  height: 100,
  borderRadius: 10000,
  backgroundColor: color.purple,
};
const IMAGE_DIRECTION: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
};
const IMAGE_FOOTER_VIEW_COTENT_BODY: ViewStyle = {
  width: 100,
  height: 100,
  borderRadius: 10000,
  backgroundColor: color.purple1,
  marginLeft: horizontalScale(5),
  justifyContent: 'center',
  alignItems: 'center',
};

const TEXT_TOOLTIP: TextStyle = {
  fontFamily: typography.promptRegular,
  fontWeight: '400',
  color: color.black1,
  textAlign: 'left',
};
