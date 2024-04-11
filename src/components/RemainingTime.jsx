/* eslint-disable react/prop-types */
import { useState } from 'react';
import arrow from '../assets/arrow.png';
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
                    <div className='d-flex justify-content-center'>
                        <div className='px-4 me-2 mt-2'>
                            <div>Semana</div>
                            <div>{parseDecimalToTime(totalHoursOfWork - previousHoursWorked)} h.</div>
                        </div>
                        <div className='px-4 ms-2 mt-2'>
                            <div>Día</div>
                            <div>{parseDecimalToTime(todaysHoursRemaining)} h.</div>
                        </div>
                    </div>
                </div> : null}
        </div>
    )
}