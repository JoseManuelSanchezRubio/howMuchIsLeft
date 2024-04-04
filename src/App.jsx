import { useMemo, useState } from 'react';
import './App.css';
import questionMark from './assets/question-mark.png';
import { Footer } from './components/Footer';
import { SettingsButton } from './components/SettingsButon';
import { SettingsModal } from './components/SettingsModal';

const App = () => {

  const NORMAL_DAILY_HOURS = 9;
  const FRIDAY_HOURS = 7;

  const currentDate = useMemo(() => new Date(), [])
  const dayOfTheWeek = currentDate.getDay();
  const [startOfWork, setStartOfWork] = useState('08:00');
  const [startOfWorkHours, startOfWorkMinutes] = startOfWork.split(':');
  const [freeDays, setFreeDays] = useState([]);
  const isFridayFree = freeDays.includes('5');

  const totalHoursOfWork = useMemo(() => {
    let total = 4 * NORMAL_DAILY_HOURS + FRIDAY_HOURS;

    if (isFridayFree) {
      total -= (freeDays.length - 1) * NORMAL_DAILY_HOURS - FRIDAY_HOURS;
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

  const hoursWorked = useMemo(() => {
    const diff = currentDate.getTime() - startOfWorkDate.getTime();
    const hoursDiff = diff / (1000 * 60 * 60);


    let timeToRest = 0
    if (isFridayFree) {
      timeToRest += ((freeDays.length - 1) * NORMAL_DAILY_HOURS) + FRIDAY_HOURS;
    } else {
      timeToRest += freeDays.length * NORMAL_DAILY_HOURS;
    }

    return (NORMAL_DAILY_HOURS * (dayOfTheWeek - 1)) + hoursDiff - timeToRest;
  }, [currentDate, dayOfTheWeek, freeDays.length, isFridayFree, startOfWorkDate]);


  const timeLeft = useMemo(() => {
    if (dayOfTheWeek === 6 || dayOfTheWeek === 7) {
      return <span>¿Quieres trabajar el fin de semana o qué? &#128514;</span>
    }

    if (freeDays.length === 5) {
      return <span>Ya te gustaría &#128514;</span>
    }

    if (currentDate > endOfWorkDate || currentDate < startOfWorkDate || freeDays.includes(dayOfTheWeek.toString())) {
      return (
        <>
          <span className='lh-base'>¿Qué haces aquí? Estás fuera del horario de trabajo</span>
          <span><img src={questionMark} title="El porcentaje solo se muestra en horario laboral" className='question-mark' /></span>
        </>
      )

    }

    if (totalHoursOfWork - hoursWorked <= 0) {
      return <span>¡Buen finde! &#128526;</span>
    }

    const timeLeft = (totalHoursOfWork - hoursWorked) / totalHoursOfWork * 100;

    return `${timeLeft.toFixed(2)} %`;
  }, [dayOfTheWeek, freeDays, currentDate, endOfWorkDate, startOfWorkDate, totalHoursOfWork, hoursWorked]);

  return (
    <div className='text-center'>
      <SettingsButton />

      <h1 className='container main-content'>{timeLeft}</h1>

      <SettingsModal setStartOfWork={setStartOfWork} freeDays={freeDays} setFreeDays={setFreeDays} />

      <Footer />

    </div>
  )

}

export default App
