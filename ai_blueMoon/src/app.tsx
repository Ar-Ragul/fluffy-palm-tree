import React, { useState } from "react";
import Chatbot from '/Users/ragulraghunath/Desktop/Project/fluffy-palm-tree/ai_blueMoon/src/component/chatbot/chatbot.tsx'
import  Agent  from '/Users/ragulraghunath/Desktop/Project/fluffy-palm-tree/ai_blueMoon/src/component/agent/agent.tsx'
import { Button, Box } from "@mui/material";

function App() {
  const [view, setView] = useState<string>("agent");

  return (
    <Box sx={{ textAlign: "center", width: "100vw", height: "100vh" }}>
      {view === "chatbot" ? <Chatbot switchView={() => setView("agent")} /> : <Agent switchView={() => setView("chatbot")} />}
    </Box>
  );
}

export default App;
