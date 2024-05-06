/* eslint-disable react/prop-types */
import { useState } from 'react';
import arrow from '../assets/arrow.png';
import { getDaysUntilPayment } from '../handlers/getDaysUntilPayment';
import { parseDecimalToTime } from "../handlers/parseDecimalToTime";

export const RemainingTime = (props) => {
    const { totalHoursOfWork, todaysHoursRemaining, previousHoursWorked } = props;

    const [showContent, setShowContent] = useState(false);

    return (
        <div className='remaining-time'>
            <img src={arrow} className={`arrow ${showContent ? 'up' : 'down'}`} onClick={() => setShowContent(!showContent)} />
            {showContent ?
                <div className='box'>
                    <div className='fs-5'>Tiempo restante</div>
                    <div className='d-flex justify-content-center gap-4 gap-md-5'>
                        <div className='me-2 mt-2'>
                            <div>Nómina</div>
                            <div>{getDaysUntilPayment()} días</div>
                        </div>
                        <div className='me-2 mt-2'>
                            <div>Semana</div>
                            <div>{parseDecimalToTime(totalHoursOfWork - previousHoursWorked)} h.</div>
                        </div>
                        <div className='mt-2'>
                            <div>Día</div>
                            <div>{parseDecimalToTime(todaysHoursRemaining)} h.</div>
                        </div>
                    </div>
                </div> : null}
        </div>
    )
}