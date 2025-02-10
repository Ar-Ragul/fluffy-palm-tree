import React, { useState } from "react";
import { sendMessageToAI } from "/Users/ragulraghunath/Desktop/Project/fluffy-palm-tree/ai_blueMoon/src/services/chatServices.ts";
import { TextField, Button, Box, Typography, Paper, CircularProgress } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { motion } from "framer-motion";

const Chatbot: React.FC<{ switchView: () => void }> = ({ switchView }) => {
  const [query, setQuery] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<{ user: string; bot: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery((e.target as HTMLInputElement).value || "");
  };

  const handleSend = async () => {
    if (!query.trim()) return;
    setLoading(true);

    try {
      const botResponse = await sendMessageToAI(query);
      setChatHistory([...chatHistory, { user: query, bot: botResponse }]);
    } catch (error) {
      setChatHistory([...chatHistory, { user: query, bot: "⚠️ Error connecting to chatbot." }]);
    } finally {
      setQuery("");
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
        Switch to AI Agent
      </Button>

      {/* Animated Heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}>
          💬 AI Chatbot
        </Typography>
      </motion.div>

      {/* Chat Box */}
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
        {/* Chat History */}
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
          {chatHistory.length === 0 ? (
            "Type a message to start chatting..."
          ) : (
            chatHistory.map((chat, index) => (
              <div key={index}>
                <Typography sx={{ fontWeight: "bold", color: "#00D4FF" }}>You: {chat.user}</Typography>
                <Typography sx={{ mb: 1 }}>🤖 {chat.bot}</Typography>
              </div>
            ))
          )}
        </Box>

        {/* Input Field */}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
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

export default Chatbot;
