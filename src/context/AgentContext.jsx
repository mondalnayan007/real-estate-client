
import { createContext, useEffect, useState } from "react";

export const AgentContext = createContext();

export const AgentProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const hostname = window.location.origin;

    useEffect(() => {
        const fetchAgent = async () => {
            try {
                const response = await fetch(
                    `/backend/agents?hostname=${encodeURIComponent(hostname)}`
                );

                const data = await response.json();

                if (!response.ok) {
                    console.error("Agent API error:", data);
                    setUser(null);
                    return;
                }

                if (Array.isArray(data)) {
                    setUser(data[0] ?? null);
                } else if (data && data.success === true && Array.isArray(data.data)) {
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
    }, [hostname]);

    const agentValue = { user };

    return (
        <AgentContext.Provider value={agentValue}>
            {!loading && children}
        </AgentContext.Provider>
    );
};

export default AgentContext;
