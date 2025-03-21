import React, {useEffect, useRef} from "react";
import { Box, Typography, Avatar } from "@mui/material";
import codeResponse from '/Users/ragulraghunath/Desktop/Project/fluffy-palm-tree/ai_blueMoon/src/component/codeResponse/codeResponse.tsx';

interface Message {
    role: string;
    text: string;
    timestamp?: string; // Optional timestamp
  }
  
  interface AIDiscussionProps {
    aiResponse: Message[];
  }
  
  // Reusable styles
  const styles = {
    container: {
      background: "rgba(0, 0, 0, 0.2)",
      padding: "16px",
      borderRadius: "12px",
      maxHeight: "200vh",
      // overflowY: "auto",
      width: "100%",
    },
    discussionBox: {
      p: 3,
      background: "rgba(0,0,0,0.7)",
      borderRadius: "12px",
      width: "100%",
      maxWidth: "800px",
      margin: "0 auto", // Center the box
    },
    messageContainer: (role: string) => ({
      display: "flex",
      flexDirection: role === "Software Architect" ? "row" : "row-reverse",
      alignItems: "flex-start",
      gap: "8px",
      mb: 2,
      animation: "fadeIn 0.5s ease-in-out", // Animation for message appearance
    }),
    messageBubble: (role: string) => ({
      p: 2,
      borderRadius: "12px",
      maxWidth: "70%",
      background:
        role === "Software Architect"
          ? "rgba(255, 87, 34, 0.2)" // Orange for SA
          : role === "Developer"
          ? "rgba(0, 150, 136, 0.2)" // Green for Dev
          : "rgba(33, 150, 243, 0.2)", // Blue for QA
      borderLeft: `5px solid ${
        role === "Software Architect" ? "#FF5722" : role === "Developer" ? "#009688" : "#2196F3"
      }`,
      position: "relative",
      "&::before": {
        content: '""',
        position: "absolute",
        top: "10px",
        [role === "Software Architect" ? "left" : "right"]: "-10px",
        borderWidth: "10px",
        borderStyle: "solid",
        borderColor: `transparent transparent transparent ${
          role === "Software Architect" ? "rgba(255, 87, 34, 0.2)" : role === "Developer" ? "rgba(0, 150, 136, 0.2)" : "rgba(33, 150, 243, 0.2)"
        }`,
        transform: role === "Software Architect" ? "rotate(0deg)" : "rotate(180deg)",
      },
    }),
    roleText: (role: string) => ({
      fontWeight: "bold",
      color:
        role === "Software Architect"
          ? "#FF5722"
          : role === "Developer"
          ? "#009688"
          : "#2196F3",
      mb: 1,
    }),
    avatar: (role: string) => ({
      width: "40px",
      height: "40px",
      backgroundColor:
        role === "Software Architect"
          ? "#FF5722"
          : role === "Developer"
          ? "#009688"
          : "#2196F3",
      color: "#fff",
      fontSize: "16px",
      fontWeight: "bold",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }),
  };
  
  // Reusable Message Component
  const MessageItem: React.FC<{ message: Message }> = React.memo(({ message }) => {
    return (
      <Box sx={styles.messageContainer(message.role)}>
        {/* Avatar */}
        <Avatar sx={styles.avatar(message.role)}>
          {message.role.charAt(0)}
        </Avatar>
  
        {/* Message Bubble */}
        <Box sx={styles.messageBubble(message.role)}>
          <Typography sx={styles.roleText(message.role)}>
            {message.role}:
          </Typography>
          {/* Render AI Response */}
          {codeResponse(message.text)}
          {/* Optional Timestamp */}
          {message.timestamp && (
            <Typography variant="caption" sx={{ color: "#ccc", mt: 1, display: "block" }}>
              {message.timestamp}
            </Typography>
          )}
        </Box>
      </Box>
    );
  });
  
  const AIDiscussion: React.FC<AIDiscussionProps> = ({ aiResponse }) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);
  
    // Auto-scroll to the bottom when new messages are added
    useEffect(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [aiResponse]);
  
    return (
      <Box sx={styles.container}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#ff8c00" }}>
          🔥 AI Live Discussion:
        </Typography>
  
        <Box sx={styles.discussionBox}>
          <Typography
            variant="h5"
            sx={{ color: "#00D4FF", mb: 2, textAlign: "center", fontWeight: "bold" }}
          >
            🔥 AI Collaborative Discussion
          </Typography>
  
          {aiResponse.length === 0 ? (
            <Typography sx={{ color: "#ddd", mt: 2, textAlign: "center" }}>
              💬 AI Agents are discussing...
            </Typography>
          ) : (
            aiResponse.map((message, index) => (
              <MessageItem key={index} message={message} />
            ))
          )}
  
          {/* Empty div for auto-scroll */}
          <div ref={messagesEndRef} />
        </Box>
  
        {/* Global CSS for animations */}
        <style>
          {`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}
        </style>
      </Box>
    );
  };
  
  export default AIDiscussion;