import React, { useState, useEffect } from "react";
import { createAI_Agent, executeAITask, getExistingAgents } from "/Users/ragulraghunath/Desktop/Project/fluffy-palm-tree/ai_blueMoon/src/services/chatServices.ts";
import { Box, Button, Typography, Select, MenuItem, CircularProgress, FormControl, InputLabel, Paper, TextField } from "@mui/material";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const MultiAgent = () => {
  const [task, setTask] = useState<string>("");
  const [role, setRole] = useState<string>("Software Architect");
  const [mssg, setMssg] = useState<string>("");
  const [agentId, setAgentId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string>("");
  const [existingAgents, setExistingAgents] = useState<any[]>([]);

    // Fetch existing agents on component mount
    useEffect(() => {
        const fetchAgents = async () => {
            const agents = await getExistingAgents();
            setExistingAgents(agents);
        };
        fetchAgents();
    }, []);

  const handleCreateAgent = async () => {
    setLoading(true);
    try {
      const res = await createAI_Agent(role);
      console.log("🌍 AI Agent Response:", res.agentId.typeof);
      setMssg(res.message);
      setAgentId(res.agentId);
      const agents = await getExistingAgents();
      setExistingAgents(agents);
    } catch (error) {
      setMssg("⚠️ Failed to create AI Agent.");
    }
    setLoading(false);
  };

  const handleRoleChange = (event: any) => {
    setRole(event.target.value);
  };

  const handleExecuteTask = async () => {
    if (!task) return;
    setLoading(true);
    setAiResponse("🔄 AI Agents are discussing...");

    try {
      const response = await executeAITask(task);
      setAiResponse(response.aiResponse[0].text.value || "⚠️ No valid response.");
    } catch (error) {
      setAiResponse("⚠️ Error executing AI task.");
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        background: "linear-gradient(135deg, #121212 0%, #000000 100%)",
        color: "#fff",
        position: "relative",
        px: 3,
      }}
    >
      {/* Animated Heading */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Typography variant="h3" sx={{ mb: 3, fontWeight: "bold", textAlign: "center" }}>
          🤖 AI Multi-Agent Assistant
        </Typography>
      </motion.div>

      {/* Role Selection & AI Agent Creation */}
      <Paper
        elevation={10}
        sx={{
          p: 4,
          width: "50%",
          backdropFilter: "blur(10px)",
          background: "rgba(255, 255, 255, 0.2)",
          borderRadius: "16px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.4)",
          mb: 3,
        }}
      >
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel sx={{ color: "#fff" }}>Select Role</InputLabel>
          <Select
            value={role}
            onChange={handleRoleChange}
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.2)",
              borderRadius: "8px",
              color: "#fff",
              "& .MuiSvgIcon-root": { color: "white" },
            }}
          >
            <MenuItem value="Software Architect">Software Architect</MenuItem>
            <MenuItem value="Developer">Developer</MenuItem>
            <MenuItem value="General Assistant">General Assistant</MenuItem>
          </Select>
        </FormControl>

        <Button
          sx={{
            width: "100%",
            background: "linear-gradient(90deg, #007BFF, #00D4FF)",
            color: "#fff",
            fontWeight: "bold",
            borderRadius: "8px",
            textTransform: "none",
            px: 3,
            py: 1.5,
            "&:hover": { background: "linear-gradient(90deg, #0056b3, #0099cc)" },
          }}
          variant="contained"
          onClick={handleCreateAgent}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create AI Agent"}
        </Button>
        {mssg && (
          <Typography sx={{ mt: 2, color: "#ddd" }}>
            {mssg} <strong>AgentId:</strong> {agentId}
          </Typography>
        )}
      </Paper>

      {/* Task Execution */}
      <Paper
        elevation={10}
        sx={{
          p: 4,
          width: "50%",
          backdropFilter: "blur(10px)",
          background: "rgba(255, 255, 255, 0.2)",
          borderRadius: "16px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.4)",
          mb: 3,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          📌 Define AI Task
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Enter a task for AI agents..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          sx={{
            mb: 3,
            bgcolor: "rgba(255, 255, 255, 0.2)",
            borderRadius: "8px",
            input: { color: "white" },
          }}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{
            background: "linear-gradient(90deg, #FF5722, #FF9800)",
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

      {/* AI Task Execution Response */}
      {aiResponse && (
        <Paper
          elevation={10}
          sx={{
            p: 4,
            width: "50%",
            backdropFilter: "blur(10px)",
            background: "rgba(255, 255, 255, 0.2)",
            borderRadius: "16px",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.4)",
            mt: 3,
          }}
        >
          <Typography variant="h6">🚀 AI Execution Result:</Typography>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              code({ node, inline, className, children, ...props }) {
                return !inline ? (
                  <SyntaxHighlighter style={vs} language="javascript" PreTag="div" {...props}>
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code {...props}>{children}</code>
                );
              },
            }}
          >
            {aiResponse}
          </ReactMarkdown>
        </Paper>
      )}
      <Paper elevation={10} sx={{ p: 4, width: "50%", background: "rgba(255, 255, 255, 0.2)", borderRadius: "16px", mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>👥 Existing AI Agents:</Typography>
                {existingAgents.length > 0 ? (
                    existingAgents.map((agent, index) => (
                        <Typography key={index} sx={{ color: "#ddd" }}>⚡ <strong>{agent.name}</strong> - {agent.instructions}</Typography>
                    ))
                ) : (
                    <Typography sx={{ color: "#ddd" }}>No agents created yet.</Typography>
                )}
            </Paper>
    </Box>
  );
};

export default MultiAgent;
