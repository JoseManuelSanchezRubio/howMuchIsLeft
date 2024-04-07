import { useEffect } from "react";
import { THEME_KEY } from "../constants";

export const useLocalStorageTheme = () => {
    const themeStored = localStorage.getItem(THEME_KEY);

    const setLocalStorageTheme = (theme) => {
        localStorage.setItem(THEME_KEY, theme);
    }

    useEffect(() => {
        if (!themeStored) {
            return;
        }
        document.body.style.backgroundColor = themeStored;
    }, [themeStored])

    return { themeStored, setLocalStorageTheme }
}