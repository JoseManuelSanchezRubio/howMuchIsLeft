import { useState } from "react";
import { useLocalStorageTheme } from "../hooks/useLocalStorageTheme";

export const Theme = () => {

    const { themeStored, setLocalStorageTheme } = useLocalStorageTheme();

    const [theme, setTheme] = useState(themeStored);

    const handleChangeColor = (event) => {
        event.preventDefault();
        const color = event.target.value;
        document.body.style.backgroundColor = color;
        setLocalStorageTheme(color);
        setTheme(color);
    }

    return (
        <>
            <div className="mb-2">Color de fondo:</div>
            <div className="d-flex justify-content-around">
                <button className={`color-button gray ${theme === '#212529' ? 'active' : null}`} value='#212529' onClick={handleChangeColor}></button>
                <button className={`color-button blue ${theme === '#131a2c' ? 'active' : null}`} value='#131a2c' onClick={handleChangeColor}></button>
                <button className={`color-button green ${theme === '#112b27' ? 'active' : null}`} value='#112b27' onClick={handleChangeColor}></button>
                <button className={`color-button purple ${theme === '#31183b' ? 'active' : null}`} value='#31183b' onClick={handleChangeColor}></button>
                <button className={`color-button red ${theme === '#422020' ? 'active' : null}`} value='#422020' onClick={handleChangeColor}></button>
            </div>
        </>
    )
}