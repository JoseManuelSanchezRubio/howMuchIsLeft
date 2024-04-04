import setting from '../assets/setting.png'

export const SettingsButton = () => {
    return (
        <div type="button" className="d-flex flex-row-reverse" data-bs-toggle="modal" data-bs-target="#formModal">
            <img src={setting} className='settings' />
        </div>
    )
}