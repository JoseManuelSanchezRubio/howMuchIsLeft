import { useMemo, useState } from 'react';
import './App.css';
import questionMark from './assets/question-mark.png';
import { Footer } from './components/Footer';
import { RemainingTime } from './components/RemainingTime';
import { SettingsButton } from './components/SettingsButon';
import { SettingsModal } from './components/SettingsModal';
import { FRIDAY_HOURS, NORMAL_DAILY_HOURS } from './constants';
import { useLocalStorageFreeDays } from './hooks/useLocalStorageFreeDays';
import { useLocalStorageStartOfWork } from './hooks/useLocalStorageStartOfWork';

const App = () => {

  const currentDate = useMemo(() => new Date(), []);

  const { startOfWorkStored } = useLocalStorageStartOfWork();
  const [startOfWork, setStartOfWork] = useState(startOfWorkStored);
  const [startOfWorkHours, startOfWorkMinutes] = startOfWork.split(':');

  const { freeDaysStored } = useLocalStorageFreeDays();
  const [freeDays, setFreeDays] = useState(freeDaysStored);

  const isFridayFree = freeDays.includes('5');
  const dayOfTheWeek = currentDate.getDay();

  const totalHoursOfWork = useMemo(() => {
    let total = 4 * NORMAL_DAILY_HOURS + FRIDAY_HOURS;

    if (isFridayFree) {
      total -= (freeDays.length - 1) * NORMAL_DAILY_HOURS + FRIDAY_HOURS;
    } else {
      total -= freeDays.length * NORMAL_DAILY_HOURS;
    }

    return total;
  }, [freeDays.length, isFridayFree]);

  const endTime = useMemo(() => {
    if (dayOfTheWeek === 5) {
      return {
        hours: (Number(startOfWorkHours) + FRIDAY_HOURS).toString(),
        minutes: startOfWorkMinutes,
      }
    } else {
      return {
        hours: (Number(startOfWorkHours) + NORMAL_DAILY_HOURS).toString(),
        minutes: startOfWorkMinutes,
      }
    }
  }, [dayOfTheWeek, startOfWorkHours, startOfWorkMinutes]);

  const startOfWorkDate = useMemo(() => {
    const startOfWorkDate = new Date();
    startOfWorkDate.setHours(startOfWorkHours);
    startOfWorkDate.setMinutes(startOfWorkMinutes);
    return startOfWorkDate;
  }, [startOfWorkHours, startOfWorkMinutes]);

  const endOfWorkDate = useMemo(() => {
    const endOfWorkDate = new Date();
    endOfWorkDate.setHours(endTime.hours);
    endOfWorkDate.setMinutes(endTime.minutes);
    return endOfWorkDate;
  }, [endTime])

  const secondsWorkedToday = currentDate.getTime() - startOfWorkDate.getTime();
  const hoursWorkedToday = secondsWorkedToday / (1000 * 60 * 60);

  const previousHoursWorked = useMemo(() => {

    let timeToRest = 0
    if (isFridayFree) {
      timeToRest += ((freeDays.length - 1) * NORMAL_DAILY_HOURS) + FRIDAY_HOURS;
    } else {
      timeToRest += freeDays.length * NORMAL_DAILY_HOURS;
    }

    const hoursWorked = Math.max(NORMAL_DAILY_HOURS * (dayOfTheWeek - 1), timeToRest);

    return hoursWorked + hoursWorkedToday - timeToRest;
  }, [dayOfTheWeek, freeDays.length, hoursWorkedToday, isFridayFree]);

  const mainContent = useMemo(() => {
    if (dayOfTheWeek === 6 || dayOfTheWeek === 0) {
      return <span className='fs-1'>¿Quieres trabajar el fin de semana o qué? &#128514;</span>
    }

    if (freeDays.length === 5) {
      return <span className='fs-1'>Ya te gustaría &#128514;</span>
    }

    if (currentDate > endOfWorkDate || currentDate < startOfWorkDate || freeDays.includes(dayOfTheWeek.toString())) {
      return (
        <>
          <span className='lh-base fs-1'>¿Qué haces aquí? Estás fuera del horario de trabajo</span>
          <span><img src={questionMark} title="El porcentaje solo se muestra en horario laboral" className='question-mark' /></span>
        </>
      )

    }

    if (totalHoursOfWork - previousHoursWorked <= 0) {
      return <span className='fs-1'>¡Buen finde! &#128526;</span>
    }

    const timeLeft = (totalHoursOfWork - previousHoursWorked) / totalHoursOfWork * 100;
    const todaysHoursRemaining = dayOfTheWeek === 5 ? FRIDAY_HOURS - hoursWorkedToday : NORMAL_DAILY_HOURS - hoursWorkedToday;

    return (
      <>
        <div className='percentage'>{timeLeft.toFixed(2)} %</div>
        <RemainingTime totalHoursOfWork={totalHoursOfWork} todaysHoursRemaining={todaysHoursRemaining} previousHoursWorked={previousHoursWorked} />
      </>
    )
  }, [currentDate, dayOfTheWeek, endOfWorkDate, freeDays, previousHoursWorked, hoursWorkedToday, startOfWorkDate, totalHoursOfWork]);

  return (
    <div className='text-center'>
      <SettingsButton />

      <main className='container'>{mainContent}</main>

      <SettingsModal setStartOfWork={setStartOfWork} freeDays={freeDays} setFreeDays={setFreeDays} />

      <Footer />

    </div>
  )

}

export default App
