import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";


export const AgentContext = createContext();


export const AgentProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const hostname = window.location.origin; 
    const [loading, setLoading] = useState(true);
    const {authUser} = useContext(AuthContext);
    console.log(authUser);
    console.log(hostname);
    

    useEffect(()=>{
        fetch(`http://localhost:4000/agents?hostname=${hostname}`)
        .then(res=>res.json())
        .then(data =>{
            const [agent] = data
            setUser(agent)
            setLoading(false)
            
            
        })
    },[])

    const agentValue = {
          user
    }
      
    return (
        <AgentContext value={agentValue}>
              {!loading && children}
            </AgentContext>
    );
};

export default AgentContext;