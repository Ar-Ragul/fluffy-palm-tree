import React, { useState, useEffect } from "react";
import { getExistingAgents } from "/Users/ragulraghunath/Desktop/Project/fluffy-palm-tree/ai_blueMoon/src/services/chatServices.ts";
import { Box, Button, Typography, Paper, TextField } from "@mui/material";
import {AgentGrid} from "/Users/ragulraghunath/Desktop/Project/fluffy-palm-tree/ai_blueMoon/src/component/multiAgent/agentCard.tsx";
import { motion } from "framer-motion";
import  AIDiscussion  from "/Users/ragulraghunath/Desktop/Project/fluffy-palm-tree/ai_blueMoon/src/component/multiAgent/aiDiscussion.tsx";



// ✨ UI Styling Enhancements
const buttonGradient = "linear-gradient(90deg, #7b61ff, #d441ff)";
const glassBg = "rgba(255, 255, 255, 0.15)";



const MultiAgent = () => {
  const [task, setTask] = useState<string>("");
  const [role, setRole] = useState<string>("Software Architect");
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<{ role: string; text: string }[]>([]);
  const [existingAgents, setExistingAgents] = useState<any[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const fetchAgents = async () => {
      const agents = await getExistingAgents();
      
      // ✅ Remove duplicates by using a Map (keyed by agent name)
      const uniqueAgents = Array.from(
          new Map(agents.map(agent => [agent.name, agent])).values()
      );

      setExistingAgents(uniqueAgents);
  };

  fetchAgents();
  //   const ws = new WebSocket("ws://localhost:3000");
  //   setSocket(ws);

  //   ws.onopen = () => {
  //     console.log("WebSocket connection established");
  // };

  // ws.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     switch (data.type) {
  //         case "TASK_UPDATE":
  //             // Update the response with incremental text
  //             setAiResponse(prev => {
  //                 const lastMessage = prev[prev.length - 1];
  //                 if (lastMessage && lastMessage.role === data.data.role) {
  //                     // Append the new text to the last message
  //                     return [
  //                         ...prev.slice(0, -1),
  //                         { role: data.data.role, text: lastMessage.text + data.data.response }
  //                     ];
  //                 } else {
  //                     // Add a new message
  //                     return [...prev, { role: data.data.role, text: data.data.response }];
  //                 }
  //             });
  //             break;

  //         case "TASK_COMPLETED":
  //             setAiResponse(prev => [...prev, { role: data.data.role, text: data.data.response }]);
  //             break;

  //         case "TASK_FAILED":
  //             setAiResponse(prev => [...prev, { role: "System", text: `Error: ${data.data.error}` }]);
  //             break;

  //         default:
  //             console.log("Unknown message type:", data.type);
  //     }
  // };

  // ws.onclose = () => {
  //     console.log("WebSocket connection closed");
  // };

  // return () => {
  //     ws.close();
  // };
}, []);

const handleExecuteTask = async () => {
  setAiResponse([{ role: "System", text: "🔄 AI Agents are discussing..." }]);

  const architectAgent = existingAgents.find(agent => agent.name === "Software Architect");
  const developerAgent = existingAgents.find(agent => agent.name === "Developer");
  const qaAgent = existingAgents.find(agent => agent.name === "QA");

  if (!architectAgent || !developerAgent || !qaAgent) {
      setAiResponse([{ role: "System", text: "⚠️ Missing AI Agents for execution." }]);
      return;
  }

  // ✅ Step 1: Assign Task to Software Architect
  const architectResponse = await assignTaskAndFetch(architectAgent.id, task, "Software Architect");
  if (!architectResponse) return;

  setAiResponse(prev => [...prev, { role: "Software Architect", text: architectResponse }]);

  // ✅ Step 2: Assign Architect's Response to Developer
  const developerResponse = await assignTaskAndFetch(developerAgent.id, architectResponse, "Developer");
  if (!developerResponse) return;

  setAiResponse(prev => [...prev, { role: "Developer", text: developerResponse }]);

  // ✅ Step 3: Assign Developer's Response to QA
  const qaResponse = await assignTaskAndFetch(qaAgent.id, developerResponse, "QA");
  if (!qaResponse) return;

  setAiResponse(prev => [...prev, { role: "QA", text: qaResponse }]);

  setAiResponse(prev => [...prev, { role: "System", text: "✅ AI Discussion Completed." }]);
};

const assignTaskAndFetch = async (agentId: string, task: string, role: string) => {
  try {
      const response = await fetch(`http://localhost:3000/assign-task`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ agentId, task, role })
      });

      if (!response.ok) {
          console.error(`❌ AI Task Failed for ${role}`);
          return null;
      }

      const data = await response.json();
      return data.response;
  } catch (error) {
      console.error(`❌ AI Task Error for ${role}:`, error);
      return null;
  }
};


  return (
     <Box
          sx={{
            minHeight: "500vh",
            width: "100vw",
            background: "radial-gradient(circle, rgba(18,18,18,1) 20%, rgba(26,26,46,1) 80%)",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#E0E0E0",
            fontFamily: "Montserrat, sans-serif", // ✅ Apply Montserrat
          }}
        >
      {/* 🔹 Animated AI Office Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Typography variant="h3" sx={{ mb: 3, fontWeight: "bold", textAlign: "center", color: "#c084fc" }}>
          AI Office - Collaborative Discussion
        </Typography>
      </motion.div>

      {/* 🔹 AI Role Selection */}
      <Paper
        elevation={10}
        sx={{
          p: 4,
          width: "50%",
          backdropFilter: "blur(12px)",
          background: glassBg,
          borderRadius: "16px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.4)",
          mb: 3,
        }}
      >
        <Box sx={{ width: "100%", mb: 3 }}>
  <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "#fff" }}>
    Select AI Agent
  </Typography>
  <AgentGrid existingAgents={existingAgents} role={role} setRole={setRole} />
</Box>
      </Paper>

      {/* 🔹 Task Input Panel */}
      <Paper
        elevation={10}
        sx={{
          p: 4,
          width: "50%",
          backdropFilter: "blur(12px)",
          background: glassBg,
          borderRadius: "16px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.4)",
          mb: 3,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          📌 Define Task
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Enter the task for AI agents..."
          value={task}
          onChange={(e) => {
            if (e.target) {
              setTask((e.target as HTMLInputElement).value);
            }
          }}
          sx={{
            mb: 3,
            bgcolor: glassBg,
            borderRadius: "8px",
            input: { color: "white" },
          }}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{
            background: buttonGradient,
            fontWeight: "bold",
            color: "#fff",
            borderRadius: "8px",
            textTransform: "none",
            py: 1.5,
          }}
          onClick={handleExecuteTask}
          disabled={loading}
        >
          {loading ? "AI Processing..." : "Execute Task with AI"}
        </Button>
      </Paper>

      {/* 🔹 Live AI Discussion Panel */}
      <AIDiscussion aiResponse={aiResponse} />

    </Box>
  );
};

export default MultiAgent;
