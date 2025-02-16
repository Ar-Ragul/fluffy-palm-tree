import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Chatbot from '/Users/ragulraghunath/Desktop/Project/fluffy-palm-tree/ai_blueMoon/src/component/chatbot/chatbot.tsx'
import  Agent  from '/Users/ragulraghunath/Desktop/Project/fluffy-palm-tree/ai_blueMoon/src/component/agent/agent.tsx'
import { Button, Box } from "@mui/material";

function Home() {
  const navigate = useNavigate();
  const [view, setView] = useState<string>("agent");
  const handleClick =() => {
    return navigate("/multiagent");
  }

  return (
    <>
    <Box sx={{ textAlign: "center", width: "100vw", height: "100vh" }}>
      {view === "chatbot" ? <Chatbot switchView={() => setView("agent")} /> : <Agent switchView={() => setView("chatbot")} />}
    </Box>
    <Button onClick={handleClick}>Multiagent</Button>
    </>
  );
}

export default Home;
