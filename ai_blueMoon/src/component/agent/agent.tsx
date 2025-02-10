import React, { useState } from "react";
import { executeAgentQuery } from '/Users/ragulraghunath/Desktop/Project/fluffy-palm-tree/ai_blueMoon/src/services/chatServices.ts'
import { TextField, Button, Box, Typography, Paper, CircularProgress } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { motion } from "framer-motion";

export function Agent() {
  const [query, setQuery] = useState("");
  const [responses, setResponses] = useState<{ sender: "user" | "ai"; text: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!query.trim()) return;
    setLoading(true);

    setResponses((prev) => [...prev, { sender: "user", text: query }]);

    const agentResponse = await executeAgentQuery(query);
    setResponses((prev) => [...prev, { sender: "ai", text: agentResponse }]);

    setQuery("");
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
        background: "linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)",
        color: "#fff",
      }}
    >
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}>
          🛠 AI Agent
        </Typography>
      </motion.div>

      <Paper
        elevation={10}
        sx={{
          width: 450,
          p: 4,
          backdropFilter: "blur(12px)",
          background: "rgba(255, 255, 255, 0.07)",
          borderRadius: "16px",
          boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.4)",
        }}
      >
        <Box sx={{ height: 250, overflowY: "auto", p: 2, borderRadius: "12px", mb: 2 }}>
          {responses.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                padding: "10px",
                borderRadius: "8px",
                backgroundColor: msg.sender === "user" ? "#007BFF" : "rgba(255, 255, 255, 0.1)",
                alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                color: msg.sender === "user" ? "white" : "#ddd",
                maxWidth: "75%",
              }}
            >
              {msg.text}
            </motion.div>
          ))}
        </Box>

        <TextField
          fullWidth
          placeholder="Ask the AI agent..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ mb: 2, bgcolor: "rgba(255, 255, 255, 0.2)", borderRadius: "8px", input: { color: "white" } }}
        />

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            fullWidth
            variant="contained"
            sx={{ background: "linear-gradient(90deg, #007BFF, #00D4FF)", fontWeight: "bold", color: "#fff" }}
            endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
            onClick={handleSend}
            disabled={loading}
          >
            {loading ? "Processing..." : "Ask Agent"}
          </Button>
        </motion.div>
      </Paper>
    </Box>
  );
}
