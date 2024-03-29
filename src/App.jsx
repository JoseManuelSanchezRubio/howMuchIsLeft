import { useMemo, useState } from 'react';
import './App.css';
import setting from './assets/setting.png';


function App() {

  const currentDate = new Date();
  const dayOfTheWeek = currentDate.getDay();
  const [startOfWork, setStartOfWork] = useState('08:00');
  const [startOfWorkHours, startOfWorkMinutes] = startOfWork.split(':');
  const [freeDays, setFreeDays] = useState([]);
  const isFridayFree = freeDays.includes('5');

  const totalHoursOfWork = useMemo(() => {
    let total = 4 * 9 + 7;

    if (isFridayFree) {
      total -= (freeDays.length - 1) * 9 - 7;
    } else {
      total -= freeDays.length * 9;
    }

    return total;
  }, [freeDays.length, isFridayFree]);

  const endTime = useMemo(() => {
    if (dayOfTheWeek === 5) {
      return {
        hours: (Number(startOfWorkHours) + 7).toString(),
        minutes: startOfWorkMinutes,
      }
    } else {
      return {
        hours: (Number(startOfWorkHours) + 9).toString(),
        minutes: startOfWorkMinutes,
      }
    }
  }, [dayOfTheWeek, startOfWorkHours, startOfWorkMinutes]);

  const startOfWorkDate = new Date();
  startOfWorkDate.setHours(startOfWorkHours);
  startOfWorkDate.setMinutes(startOfWorkMinutes);

  const endOfWorkDate = new Date();
  endOfWorkDate.setHours(endTime.hours);
  endOfWorkDate.setMinutes(endTime.minutes);

  const hoursWorked = useMemo(() => {
    const diff = currentDate.getTime() - startOfWorkDate.getTime();
    const hoursDiff = diff / (1000 * 60 * 60);


    let timeToRest = 0
    if (isFridayFree) {
      timeToRest += ((freeDays.length - 1) * 9) + 7;
    } else {
      timeToRest += freeDays.length * 9;
    }

    return (9 * (dayOfTheWeek - 1)) + hoursDiff - timeToRest;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dayOfTheWeek, freeDays.length, isFridayFree, startOfWorkDate]);


  const timeLeft = useMemo(() => {
    if (dayOfTheWeek === 6 || dayOfTheWeek === 7) {
      return <span>¿Quieres trabajar el fin de semana o qué? &#128514;</span>
    }

    if (freeDays.length === 5) {
      return <span>Ya te gustaría &#128514;</span>
    }

    if (currentDate > endOfWorkDate || currentDate < startOfWorkDate || freeDays.includes(dayOfTheWeek.toString())) {
      return '¿Qué haces aquí? Estás fuera del horario de trabajo.'
    }

    if (totalHoursOfWork - hoursWorked <= 0) {
      return <span>¡Buen finde! &#128526;</span>
    }

    const timeLeft = (totalHoursOfWork - hoursWorked) / totalHoursOfWork * 100;

    return `${timeLeft.toFixed(2)} %`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dayOfTheWeek, freeDays, hoursWorked, totalHoursOfWork]);



  // HANDLERS
  const handleChangeStartOfWork = (event) => {
    setStartOfWork(event.target.value);
  }

  const handleChangeFreeDays = (event) => {
    const selectedDay = event.target.value;
    if (!freeDays.includes(selectedDay)) {
      setFreeDays([...freeDays, selectedDay])
    } else {
      setFreeDays(freeDays.filter(day => day !== selectedDay))
    }
  }

  return (
    <div className='text-center'>
      <picture type="button" className="d-flex flex-row-reverse" data-bs-toggle="modal" data-bs-target="#formModal">
        <img src={setting} className='settings' />
      </picture>

      <h1 className='container main-content'>{timeLeft}</h1>

      <div className="modal fade" id="formModal" tabIndex="-1" aria-labelledby="formModalLabel" aria-hidden="true" data-bs-theme="dark">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="formModalLabel">Ajustes adicionales</h1>
            </div>
            <div className="modal-body">
              <form>
                <div className='mb-4 form-floating'>
                  <select name="startOfWork" id='startOfWork' onChange={handleChangeStartOfWork} className='form-select'>
                    <option value="08:00">08:00</option>
                    <option value="08:30">08:30</option>
                    <option value="09:00">09:00</option>
                    <option value="09:30">09:30</option>
                  </select>
                  <label htmlFor="startOfWork">¿A qué hora has empezado a trabajar?</label>
                </div>

                <div className='mb-2 text-start text-md-center'>Días festivos o libres:</div>
                <div className='d-flex flex-column align-items-start flex-md-row justify-content-md-around'>
                  <div className="form-check">
                    <input type="checkbox" className='form-check-input' id="freeDays1" value='1' onChange={handleChangeFreeDays} />
                    <label htmlFor="freeDays1" className='form-check-label'>Lunes</label>
                  </div>
                  <div className="form-check">
                    <input type="checkbox" className='form-check-input' id="freeDays2" value='2' onChange={handleChangeFreeDays} />
                    <label htmlFor="freeDays2" className='form-check-label'>Martes</label>
                  </div>
                  <div className="form-check">
                    <input type="checkbox" className='form-check-input' id="freeDays3" value='3' onChange={handleChangeFreeDays} />
                    <label htmlFor="freeDays3" className='form-check-label'>Miércoles</label>
                  </div>
                  <div className="form-check">
                    <input type="checkbox" className='form-check-input' id="freeDays4" value='4' onChange={handleChangeFreeDays} />
                    <label htmlFor="freeDays4" className='form-check-label'>Jueves</label>
                  </div>
                  <div className="form-check">
                    <input type="checkbox" className='form-check-input' id="freeDays5" value='5' onChange={handleChangeFreeDays} />
                    <label htmlFor="freeDays5" className='form-check-label'>Viernes</label>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>

      <footer className='text-secondary'>Copyright © {new Date().getFullYear()} - JSANCHEZ</footer>

    </div>
  )

}

export default App
