/* eslint-disable react/prop-types */

export const StartOfWork = (props) => {

    const handleChangeStartOfWork = (event) => {
        props.setStartOfWork(event.target.value);
    }

    return (
        <div className='mb-4 form-floating'>
            <select name="startOfWork" id='startOfWork' onChange={handleChangeStartOfWork} className='form-select'>
                <option value="08:00">08:00</option>
                <option value="08:30">08:30</option>
                <option value="09:00">09:00</option>
                <option value="09:30">09:30</option>
            </select>
            <label htmlFor="startOfWork">¿A qué hora has empezado a trabajar?</label>
        </div>
    )
}