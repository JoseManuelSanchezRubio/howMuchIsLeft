/* eslint-disable react/prop-types */

import { useLocalStorageFreeDays } from "../hooks/useLocalStorageFreeDays";

export const SettingsModal = (props) => {
    const { setStartOfWork, freeDays, setFreeDays } = props;

    const { setLocalStorageFreeDays } = useLocalStorageFreeDays();

    const handleChangeStartOfWork = (event) => {
        setStartOfWork(event.target.value);
    }

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

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}