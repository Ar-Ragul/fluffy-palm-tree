import React, { useState, useEffect } from "react";
import { createAI_Agent, getExistingAgents } from "/Users/ragulraghunath/Desktop/Project/fluffy-palm-tree/ai_blueMoon/src/services/chatServices.ts";
import { TextField, Button, Box, Typography, Paper, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";

function AgentHiring () {
  const [agentName, setAgentName] = useState("");
  const [agentRole, setAgentRole] = useState("");
  const [agentDescription, setAgentDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [existingAgents, setExistingAgents] = useState<any[]>([]);

  // Fetch existing agents on component mount
  useEffect(() => {
    const fetchAgents = async () => {
      const agents = await getExistingAgents();
      setExistingAgents(agents);
    };
    fetchAgents();
  }, []);

  // Handle Create Agent
  const handleCreateAgent = async () => {
    if (!agentName.trim() || !agentRole.trim() || !agentDescription.trim()) {
      alert("Please fill all fields before creating an agent.");
      return;
    }

    setLoading(true);
    try {
      const response = await createAI_Agent(agentName, agentRole, agentDescription);
      if (response) {
        setExistingAgents((prev) => [...prev, response]);
        setAgentName("");
        setAgentRole("");
        setAgentDescription("");
      }
    } catch (error) {
      console.error("⚠️ Error creating AI Agent:", error);
    }
    setLoading(false);
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
      {/* Animated Heading */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Typography variant="h3" sx={{ mb: 3, fontWeight: "bold", textAlign: "center" }}>
          Hire New AI Agents
        </Typography>
      </motion.div>

      {/* Agent Creation Form */}
      <Paper
        elevation={10}
        sx={{
          p: 4,
          width: "40%",
          backdropFilter: "blur(10px)",
          background: "rgba(255, 255, 255, 0.2)",
          borderRadius: "16px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.4)",
          mb: 3,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          ✨ Define New AI Agent
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          label="Agent Name"
          placeholder="Enter AI agent name (e.g., DevOps AI, AI Analyst)"
          value={agentName}
          onChange={(e) => setAgentName(e.target.value)}
          sx={{
            mb: 2,
            bgcolor: "rgba(255, 255, 255, 0.2)",
            borderRadius: "8px",
            input: { color: "white" },
          }}
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Agent Role"
          placeholder="Define agent's role (e.g., AI Security Analyst)"
          value={agentRole}
          onChange={(e) => setAgentRole(e.target.value)}
          sx={{
            mb: 2,
            bgcolor: "rgba(255, 255, 255, 0.2)",
            borderRadius: "8px",
            input: { color: "white" },
          }}
        />
        <TextField
          fullWidth
          variant="outlined"
          multiline
          minRows={3}
          label="Agent Description"
          placeholder="Describe what this AI agent will do..."
          value={agentDescription}
          onChange={(e) => setAgentDescription(e.target.value)}
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
            background: "linear-gradient(90deg, #007BFF, #00D4FF)",
            fontWeight: "bold",
            color: "#fff",
            borderRadius: "8px",
            textTransform: "none",
            py: 1.5,
            "&:hover": { background: "linear-gradient(90deg, #0056b3, #0099cc)" },
          }}
          onClick={handleCreateAgent}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create AI Agent"}
        </Button>
      </Paper>

      {/* Existing AI Agents */}
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
          👥 Existing AI Agents:
        </Typography>
        {existingAgents.length > 0 ? (
          existingAgents.map((agent, index) => (
            <Typography key={index} sx={{ color: "#ddd" }}>
              ⚡ <strong>{agent.name}</strong> - {agent.role} <br />
              <em>{agent.description}</em>
            </Typography>
          ))
        ) : (
          <Typography sx={{ color: "#ddd" }}>No agents created yet.</Typography>
        )}
      </Paper>
    </Box>
  );
};

export default AgentHiring;
