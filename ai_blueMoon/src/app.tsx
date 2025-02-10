import React, { useState } from "react";
import { Chatbot } from '/Users/ragulraghunath/Desktop/Project/fluffy-palm-tree/ai_blueMoon/src/component/chatbot/chatbot.tsx'
import { Agent } from '/Users/ragulraghunath/Desktop/Project/fluffy-palm-tree/ai_blueMoon/src/component/agent/agent.tsx'
import { Button, Box } from "@mui/material";

function App() {
  const [view, setView] = useState<"chatbot" | "agent">("chatbot");

  return (
    <Box>
      {view === "chatbot" ? <Chatbot /> : <Agent />}
      <Button variant="contained" onClick={() => setView(view === "chatbot" ? "agent" : "chatbot")}>
        Switch to {view === "chatbot" ? "AI Agent" : "Chatbot"}
      </Button>
    </Box>
  );
}

export default App;
