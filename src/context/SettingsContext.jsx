

import { createContext, useEffect, useState } from "react";

export const SettingsContext = createContext();

export default function SettingsProvider({ children }) {

    const [settings, setSettings] = useState(null);
    const hostname = window.location.hostname;
    const subdomain = hostname.split('.')[0];


    useEffect(() => {

        fetch(`http://localhost:4000/settings?domain=${subdomain}`)
            .then(res => res.json())
            .then(data => setSettings(data));

    }, []);

    return (
        <SettingsContext.Provider
            value={{ settings }}
        >
            {children}
        </SettingsContext.Provider>
    );
}