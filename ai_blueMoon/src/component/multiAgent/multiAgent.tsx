import React, { useState, useEffect } from "react";
import { getExistingAgents, executeAITask } from "/Users/ragulraghunath/Desktop/Project/fluffy-palm-tree/ai_blueMoon/src/services/chatServices.ts";
import { Box, Button, Typography, Select, MenuItem, CircularProgress, FormControl, InputLabel, Paper, TextField } from "@mui/material";
import { motion } from "framer-motion";
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
  const [aiResponse, setAiResponse] = useState<string[]>([]);
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
  setAiResponse(["🔄 AI Agents are discussing..."]);

  const selectedAgent = existingAgents.find(agent => agent.name === role);
  if (!selectedAgent) {
      setAiResponse(["⚠️ No valid AI Agent found."]);
      return;
  }

  const agentId = selectedAgent.id;

  // ✅ Use Fetch with POST to start the AI stream
  const response = await fetch(`http://localhost:3000/assign-task`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({ agentId, task })
  });

  if (!response.ok) {
      console.error("❌ AI Streaming Error: Request failed.");
      setAiResponse(["⚠️ AI Task Execution Failed."]);
      return;
  }

  // ✅ Read the streamed response
  const reader = response.body?.getReader();
  if (!reader) {
      console.error("❌ AI Streaming Error: Response body is null.");
      setAiResponse(["⚠️ AI Task Execution Failed."]);
      return;
  }
  const decoder = new TextDecoder();

  while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      console.log("📩 Streamed Chunk:", chunk);

      try {
          const data = JSON.parse(chunk.replace("data: ", "").trim());
          setAiResponse((prev) => [...prev, data.text]); // ✅ Append streamed message
      } catch (err) {
          console.error("⚠️ JSON Parsing Error:", err);
      }
  }
};



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

    {aiResponse.length === 0 ? (
        <Typography sx={{ color: "#ddd", mt: 2 }}>💬 AI Agents are discussing...</Typography>
    ) : (
        aiResponse.map((message, index) => (
            <Typography key={index} sx={{ mt: 1, color: "#fff", fontSize: "14px" }}>
                {message}
            </Typography>
        ))
    )}
</Box>

    </Box>
  );
};

export default MultiAgent;
