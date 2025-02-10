import React, { useState, useEffect } from "react";
import { sendAgentQuery,fetchArchitectTask } from "/Users/ragulraghunath/Desktop/Project/fluffy-palm-tree/ai_blueMoon/src/services/chatServices.ts";
import { TextField, Button, Box, Typography, Paper, CircularProgress, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow as theme } from "react-syntax-highlighter/dist/esm/styles/prism";


const Agent: React.FC<{ switchView: () => void }> = ({ switchView }) => {
  const [query, setQuery] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [role, setRole] = useState<string>("General Assistant");
  const [loading, setLoading] = useState<boolean>(false);
  const [architectTask, setArchitectTask] = useState<string | null>(null);

  useEffect(() => {
    if (role === "Developer") {
      fetchArchitectTask().then(setArchitectTask);
    }
  }, [role]);

  const renderResponse = (text: string) => {
    const regex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = text.split(regex);

    return parts.map((part, index) => {
      if (index % 3 === 2) {
        const language = parts[index - 1] || "plaintext"; // Use "plaintext" if language is missing
        return (
          <SyntaxHighlighter key={index} language={language} style={theme}>
            {part.trim()}
          </SyntaxHighlighter>
        );
      }
      return <Typography key={index} sx={{ mb: 1 }}>{part}</Typography>;
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery((e.target as HTMLInputElement).value || "");
  };
  const handleRoleChange = (event: any) => {
    setRole(event.target.value);
  };

  const handleSend = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResponse("");

    try {
      const agentResponse = await sendAgentQuery(query,role);
      setResponse(agentResponse);
    } catch (error) {
      setResponse("⚠️ Error connecting to the AI agent.");
    } finally {
      setLoading(false);
    }
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
      }}
    >
      {/* Switch Button - Top Right */}
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
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}>
          🤖 AI Agent Assistant
        </Typography>
      </motion.div>

      {/* Glassmorphic Chat Box */}
      <Paper
        elevation={10}
        sx={{
          width: "40%",
          p: 4,
          backdropFilter: "blur(10px)",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "16px",
          boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.3)",
        }}
      >
         <FormControl fullWidth sx={{ mb: 2 }}>
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
            <MenuItem value="General Assistant">General Assistant</MenuItem>
            <MenuItem value="Developer">Software Architect</MenuItem>
            <MenuItem value="Developer">Developer</MenuItem>
            <MenuItem value="Travel Guide">Travel Guide</MenuItem>
            <MenuItem value="Chef">Chef</MenuItem>
            <MenuItem value="Fitness Coach">Fitness Coach</MenuItem>
          </Select>
        </FormControl>

        {role === "Developer" && architectTask && (
        <Paper elevation={6} sx={{ p: 2, mb: 2, bgcolor: "rgba(255, 255, 255, 0.1)", borderRadius: "8px", color: "#fff" }}>
          <Typography variant="body1">📌 Architect's Task:</Typography>
          <Typography sx={{ fontWeight: "bold" }}>{architectTask}</Typography>
        </Paper>
      )}
        {/* AI Response Box */}
        <Box
          sx={{
            height: 250,
            overflowY: "auto",
            bgcolor: "rgba(0, 0, 0, 0.3)",
            p: 2,
            borderRadius: 2,
            mb: 2,
            fontSize: "16px",
            color: "#ddd",
          }}
        >
          {loading ? "🔄 Thinking..." : response ? renderResponse(response) : "Type a query to start..."}
        </Box>

        {/* Input Field */}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Ask something..."
          value={query}
          onChange={handleInputChange}
          sx={{
            mb: 2,
            bgcolor: "rgba(255, 255, 255, 0.2)",
            borderRadius: "8px",
            input: { color: "white" },
          }}
        />

        {/* Send Button */}
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
          endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
          onClick={handleSend}
          disabled={loading}
        >
          {loading ? "Thinking..." : "Send"}
        </Button>
      </Paper>

      <Typography variant="body2" sx={{ mt: 3, opacity: 0.7 }}>
        by PR Square
      </Typography>
    </Box>
  );
};

export default Agent;
