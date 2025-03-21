import React, { useState, useEffect } from "react";
import { sendMessageToAI } from "../../services/chatServices";
import { TextField, Button, Box, Typography, Paper, CircularProgress } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { motion } from "framer-motion";
import './dasboard.css';

interface Message {
  sender: "user" | "ai";
  text: string;
}

export function Dashboard() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [aiTyping, setAiTyping] = useState("");

  const handleSend = async () => {
    if (!prompt.trim()) return;
    setLoading(true);

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: prompt }]);

    // Simulate AI typing effect
    setAiTyping("🤖 AI is typing...");
    
    const aiResponse = await sendMessageToAI(prompt);
    
    setAiTyping(""); // Clear typing effect

    // Add AI response
    setMessages((prev) => [...prev, { sender: "ai", text: aiResponse }]);

    setPrompt("");
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      setPrompt(e.currentTarget.value);
    }
  };

  return (
    <>
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
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}>
          💬 AI BlueMoon
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
        <Box
          sx={{
            height: 250,
            overflowY: "auto",
            p: 2,
            borderRadius: "12px",
            mb: 2,
            fontSize: "16px",
            color: "#ddd",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {messages.map((msg, index) => (
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
          {aiTyping && <Typography sx={{ fontStyle: "italic", color: "#bbb" }}>{aiTyping}</Typography>}
        </Box>

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={prompt}
          onChange={handleChange}
          sx={{
            mb: 2,
            bgcolor: "rgba(255, 255, 255, 0.2)",
            borderRadius: "8px",
            input: { color: "white" },
            label: { color: "#bbb" },
            "&:focus-within": { boxShadow: "0 0 10px rgba(255, 255, 255, 0.3)" },
          }}
        />

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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
        </motion.div>
      </Paper>
    </Box>
    
   
{/* <div class="parent">
    <div class="div1">Ragul</div>
    <div class="div2">Ragul</div>
    <div class="div3">Ragul</div>
    <div class="div4">Ragul</div>
    <div class="div5">Ragul</div>
    <div class="div6">Ragul</div>
    <div class="div7">Ragul</div>
    <div class="div8">Ragul</div>
</div> */}
    </>
    
  );
}

