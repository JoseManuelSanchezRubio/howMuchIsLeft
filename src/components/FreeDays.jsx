/* eslint-disable react/prop-types */
import { useLocalStorageFreeDays } from "../hooks/useLocalStorageFreeDays";

export const FreeDays = (props) => {

    const { freeDays, setFreeDays } = props;

    const { setLocalStorageFreeDays } = useLocalStorageFreeDays();

    const handleChangeFreeDays = (event) => {
        const selectedDay = event.target.value;
        if (!freeDays.includes(selectedDay)) {
            setFreeDays([...freeDays, selectedDay]);
            setLocalStorageFreeDays([...freeDays, selectedDay])
        } else {
            setFreeDays(freeDays.filter(day => day !== selectedDay))
            setLocalStorageFreeDays(freeDays.filter(day => day !== selectedDay))
        }
    }

    return (
        <>
            <div className='mb-2 text-start text-md-center'>Días festivos o libres:</div>
            <div className='mb-4 d-flex flex-column align-items-start flex-md-row justify-content-md-around'>
                <div className="form-check">
                    <input type="checkbox" className='form-check-input' id="freeDays1" value='1' onChange={handleChangeFreeDays} checked={freeDays.includes('1')} />
                    <label htmlFor="freeDays1" className='form-check-label'>Lunes</label>
                </div>
                <div className="form-check">
                    <input type="checkbox" className='form-check-input' id="freeDays2" value='2' onChange={handleChangeFreeDays} checked={freeDays.includes('2')} />
                    <label htmlFor="freeDays2" className='form-check-label'>Martes</label>
                </div>
                <div className="form-check">
                    <input type="checkbox" className='form-check-input' id="freeDays3" value='3' onChange={handleChangeFreeDays} checked={freeDays.includes('3')} />
                    <label htmlFor="freeDays3" className='form-check-label'>Miércoles</label>
                </div>
                <div className="form-check">
                    <input type="checkbox" className='form-check-input' id="freeDays4" value='4' onChange={handleChangeFreeDays} checked={freeDays.includes('4')} />
                    <label htmlFor="freeDays4" className='form-check-label'>Jueves</label>
                </div>
                <div className="form-check">
                    <input type="checkbox" className='form-check-input' id="freeDays5" value='5' onChange={handleChangeFreeDays} checked={freeDays.includes('5')} />
                    <label htmlFor="freeDays5" className='form-check-label'>Viernes</label>
                </div>
            </div>
        </>
    )
}