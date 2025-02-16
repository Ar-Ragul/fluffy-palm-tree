import React, { useState, useEffect } from "react";
import {  executeAITask } from '/Users/ragulraghunath/Desktop/Project/fluffy-palm-tree/ai_blueMoon/src/services/chatServices.ts';
import codeResponse from '/Users/ragulraghunath/Desktop/Project/fluffy-palm-tree/ai_blueMoon/src/component/codeResponse/codeResponse.tsx';
import { TextField, Button, Box, Typography, Paper, CircularProgress, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { motion } from "framer-motion";


const Agent: React.FC<{ switchView: () => void }> = ({ switchView }) => {
  const [task, setTask] = useState("");
  const [role, setRole] = useState("Software Architect");
  const [loading, setLoading] = useState(false);
  const [aiTaskResponse, setAiTaskResponse] =useState("");
  // Handle Role Change
  const handleRoleChange = (event: any) => {
    setRole(event.target.value);
  };

  // Architect Executes AI Task
const handleExecuteTask = async () => {
    if (!task) return;
    setLoading(true);
    setAiTaskResponse("🔄 AI is processing...");

    try {
        const result = await executeAITask(task); // ✅ No need to JSON.parse
        console.log("🌍 AI Task Response:", result); // ✅ Debugging Line

        // Ensure response structure is correct
        if (result.aiResponse && result.aiResponse.length > 0) {
            setAiTaskResponse(result.aiResponse[0].text.value);
        } else {
            setAiTaskResponse("⚠️ No response from AI.");
        }
    } catch (error) {
        console.error("❌ AI Task Execution Error:", error);
        setAiTaskResponse("⚠️ Error executing AI task.");
    } finally {
        setLoading(false);
    }
};

useEffect(() => {
  console.log("🆕 UI Updated - New AI Task Response:", aiTaskResponse);
}, [aiTaskResponse]); 


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
      }}
    >
      {/* Switch to Chatbot Button - Top Right */}
      <Button
        onClick={switchView}
        sx={{
          position: "absolute",
          top: 20,
          right: 20,
          background: "linear-gradient(90deg, #007BFF, #00D4FF)",
          color: "#fff",
          fontWeight: "bold",
          borderRadius: "8px",
          textTransform: "none",
          px: 3,
          py: 1,
          "&:hover": { background: "linear-gradient(90deg, #0056b3, #0099cc)" },
        }}
        endIcon={<SwapHorizIcon />}
      >
        Switch to Chatbot
      </Button>

      {/* Animated Heading */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Typography variant="h3" sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}>
          🤖 AI Blue Moon Agent Assistant
        </Typography>
      </motion.div>

      {/* Role Selector */}
      <FormControl fullWidth sx={{ mb: 3, maxWidth: "50%" }}>
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

      {/* Architect's Task Submission */}
      {role === "Software Architect" && (
        <Paper
          elevation={10}
          sx={{
            p: 4,
            width: "40%",
            backdropFilter: "blur(12px)",
            background: "rgba(255, 255, 255, 0.15)",
            borderRadius: "16px",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.4)",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            📌 Architect: Define Task
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter task description..."
            value={task}
            onChange={(e) => setTask(e.target?.value)}
            sx={{
              mb: 3,
              bgcolor: "rgba(255, 255, 255, 0.2)",
              borderRadius: "8px",
              input: { color: "white" },
            }}
          />
          <Button
          variant="contained"
          sx={{
            background: "linear-gradient(90deg, #FF5722, #FF9800)",
            fontWeight: "bold",
            color: "#fff",
            borderRadius: "8px",
            textTransform: "none",
            py: 1.5,
            my: 3,
          }}
          onClick={handleExecuteTask}
          disabled={loading}
        >
          {loading ? "AI Processing..." : "Execute Task with AI"}
        </Button>
        </Paper>
      )}


      {/* AI Task Execution Response */}
      {aiTaskResponse && (
        <Paper
          elevation={10}
          sx={{
            overflowY: "auto",
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
          <Typography sx={{ mt: 2, color: "#ddd" }}>{loading ? "🔄 Thinking..." : aiTaskResponse ? codeResponse(aiTaskResponse) : "Type a query to start..."}</Typography>
        </Paper>
      )}
    </Box>

    
  );
};

export default Agent;
