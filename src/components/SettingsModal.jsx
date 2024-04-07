/* eslint-disable react/prop-types */
import { FreeDays } from "./FreeDays";
import { StartOfWork } from "./StartOfWork";
import { Theme } from "./Theme";

export const SettingsModal = (props) => {
    const { setStartOfWork, freeDays, setFreeDays } = props;

    return (
        <div className="modal fade" id="formModal" tabIndex="-1" aria-labelledby="formModalLabel" aria-hidden="true" data-bs-theme="dark">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="formModalLabel">Ajustes adicionales</h1>
                    </div>
                    <div className="modal-body">
                        <form>

                            <StartOfWork setStartOfWork={setStartOfWork} />

                            <FreeDays freeDays={freeDays} setFreeDays={setFreeDays} />

                            <Theme />

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}