import {useRef, useEffect, useState, useMemo} from 'react';
import {useTranslation} from 'react-i18next';

const OTP_RESEND_CD = 2;

export const useOtpCD = () => {
  const {t} = useTranslation();
  const timer = useRef<NodeJS.Timer>();
  const totalSec = useRef(OTP_RESEND_CD);

  const [resendCD, setResendCD] = useState<number>(0);

  const showTimeOut = useMemo(() => resendCD > 0, [resendCD]);
  const timeOutText = useMemo(
    () =>
      `${t('resend')} ${String(~~(resendCD / 60)).padStart(2, '0')}:${String(
        resendCD % 60,
      ).padStart(2, '0')}`,
    [resendCD, t],
  );

  useEffect(() => {
    startTimer();
    return () => {
      _clearTimer();
    };
  }, []);

  const _clearTimer = () => {
    if (timer && timer.current) {
      clearInterval(timer.current);
      timer.current = undefined;
    }
  };
  const startTimer = () => {
    _clearTimer();
    totalSec.current = OTP_RESEND_CD;
    setResendCD(totalSec.current);
    timer.current = setInterval(() => {
      totalSec.current--;
      if (totalSec.current <= 0 && timer.current) {
        clearInterval(timer.current);
      }
      setResendCD(totalSec.current);
    }, 1000);
  };
  return {
    startTimer,
    showTimeOut,
    timeOutText,
  };
};
