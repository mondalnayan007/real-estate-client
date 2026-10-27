
import { createContext, useEffect, useState } from "react";

export const AgentContext = createContext();

const MAIN_DOMAINS = [
    "bdproperties.site",
    "www.bdproperties.site",
    "localhost",
    "127.0.0.1",
];

export const AgentProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const hostname = window.location.hostname.toLowerCase();

        // Main domain-e agent API call korbe na
        if (MAIN_DOMAINS.includes(hostname)) {
            setUser(null);
            setLoading(false);
            return;
        }

        const fetchAgent = async () => {
            try {
                const response = await fetch(
                    `/backend/agents?hostname=${encodeURIComponent(
                        window.location.origin
                    )}`
                );

                const data = await response.json();

                if (!response.ok) {
                    console.error("Agent API error:", data);
                    setUser(null);
                    return;
                }

                if (Array.isArray(data)) {
                    setUser(data[0] ?? null);
                } else if (
                    data &&
                    data.success === true &&
                    Array.isArray(data.data)
                ) {
                    setUser(data.data[0] ?? null);
                } else {
                    console.error("Unexpected agent response:", data);
                    setUser(null);
                }
            } catch (error) {
                console.error("Failed to fetch agent:", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchAgent();
    }, []);

    return (
        <AgentContext.Provider value={{ user }}>
            {!loading && children}
        </AgentContext.Provider>
    );
};

export default AgentContext;
