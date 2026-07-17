

import { createContext, use, useEffect, useState } from "react";
import AgentContext from "./AgentContext";

export const SettingsContext = createContext();

export default function SettingsProvider({ children }) {

    const [settings, setSettings] = useState(null);
      const {user} = use(AgentContext);
    console.log(user.agentId);
    const hostname = window.location.hostname;
    const subdomain = hostname.split('.')[0];


    useEffect(() => {

        fetch(`http://localhost:4000/settings?agentId=${user.agentId}`)
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