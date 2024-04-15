import { START_OF_WORK_KEY } from "../constants";

export const useLocalStorageStartOfWork = () => {
    const startOfWorkStored = localStorage.getItem(START_OF_WORK_KEY) || '08:00';

    const setLocalStorageStartOfWork = (startOfWork) => {
        localStorage.setItem(START_OF_WORK_KEY, startOfWork);
    }

    return { startOfWorkStored, setLocalStorageStartOfWork }
}