import React, { useState, useEffect } from "react";
import { getExistingAgents, executeAITask } from "/Users/ragulraghunath/Desktop/Project/fluffy-palm-tree/ai_blueMoon/src/services/chatServices.ts";
import { Box, Button, Typography, Select, MenuItem, CircularProgress, FormControl, InputLabel, Paper, TextField } from "@mui/material";
import { motion } from "framer-motion";
import codeResponse from '/Users/ragulraghunath/Desktop/Project/fluffy-palm-tree/ai_blueMoon/src/component/codeResponse/codeResponse.tsx';
// import ReactMarkdown from "react-markdown";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { vs } from "react-syntax-highlighter/dist/cjs/styles/prism";
// import remarkGfm from "remark-gfm";
// import rehypeRaw from "rehype-raw";

// ✨ UI Styling Enhancements
const buttonGradient = "linear-gradient(90deg, #7b61ff, #d441ff)";
const glassBg = "rgba(255, 255, 255, 0.15)";

const MultiAgent = () => {
  const [task, setTask] = useState<string>("");
  const [role, setRole] = useState<string>("Software Architect");
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<{ role: string; text: string }[]>([]);
  const [existingAgents, setExistingAgents] = useState<any[]>([]);

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



// const assignTaskAndStream = async ({ agentId, task, role }: { agentId: string; task: string; role: string }) => {
//   setAiResponse(prev => [...prev, { role: "System", text: `📨 Assigning Task to ${role}...` }]);

//   const response = await fetch("http://localhost:3000/assign-task", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ agentId, task, role }) // ✅ Ensure correct JSON format
//   });

//   if (!response.ok) {
//       console.error(`❌ ${role} AI Task Failed.`);
//       setAiResponse(prev => [...prev, { role: "System", text: `⚠️ ${role} AI Task Failed.` }]);
//       return null;
//   }

//   const responseData = await response.json(); // ✅ Parse response
//   console.log(`📩 ${role} AI Response:`, responseData);

//   return responseData.response; // ✅ Extract & return AI response
// };



  return (
     <Box
          sx={{
            minHeight: "100vh",
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
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel sx={{ color: "#fff" }}>Select AI Agent</InputLabel>
          <Select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            sx={{
              bgcolor: glassBg,
              borderRadius: "8px",
              color: "#fff",
              "& .MuiSvgIcon-root": { color: "white" },
            }}
          >
            {existingAgents.map((agent, index) => (
              <MenuItem key={index} value={agent.name}>
                {agent.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
          onChange={(e) => setTask(e.target.value)}
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
      <Box
    sx={{
        background: "rgba(0, 0, 0, 0.2)",
        padding: "16px",
        borderRadius: "12px",
        maxHeight: "300px",
        overflowY: "auto",
        width: "100%",
    }}
>
    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#ff8c00" }}>
        🔥 AI Live Discussion:
    </Typography>

    <Box sx={{ p: 3, background: "rgba(0,0,0,0.7)", borderRadius: "12px", width: "100%", maxWidth: "800px" }}>
    <Typography variant="h5" sx={{ color: "#00D4FF", mb: 2, textAlign: "center", fontWeight: "bold" }}>
        🔥 AI Collaborative Discussion
    </Typography>

    {aiResponse.length === 0 ? (
        <Typography sx={{ color: "#ddd", mt: 2, textAlign: "center" }}>💬 AI Agents are discussing...</Typography>
    ) : (
        aiResponse.map((message, index) => (
            <Box 
                key={index} 
                sx={{ 
                    p: 2, 
                    mb: 2, 
                    borderRadius: "8px", 
                    background: message.role === "Software Architect"
                        ? "rgba(255, 87, 34, 0.2)"  // Orange for SA
                        : message.role === "Developer"
                        ? "rgba(0, 150, 136, 0.2)"  // Green for Dev
                        : "rgba(33, 150, 243, 0.2)", // Blue for QA
                    borderLeft: `5px solid ${
                        message.role === "Software Architect" ? "#FF5722" :
                        message.role === "Developer" ? "#009688" :
                        "#2196F3"
                    }`
                }}
            >
                <Typography 
                    sx={{ 
                        fontWeight: "bold", 
                        color: message.role === "Software Architect"
                            ? "#FF5722"
                            : message.role === "Developer"
                            ? "#009688"
                            : "#2196F3",
                        mb: 1 
                    }}
                >
                    {message.role}: 
                </Typography>

                {/* AI Response Display */}
                {codeResponse(message.text)}
            </Box>
        ))
    )}
</Box>

</Box>

    </Box>
  );
};

export default MultiAgent;
