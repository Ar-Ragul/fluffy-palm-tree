import React from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";


// Floating star animation
const floatingStars = {
  animate: {
    y: [0, 5, 0], // Moves up & down slightly
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut"
    }
  }
};

const Home: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        background: "radial-gradient(circle, rgba(18,18,18,1) 20%, rgba(26,26,46,1) 80%)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#E0E0E0",
        fontFamily: "Montserrat, sans-serif", // ✅ Apply Montserrat
      }}
    >
      {/* Floating Stars */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          variants={floatingStars}
          animate="animate"
          style={{
            position: "absolute",
            top: `${Math.random() * 100}vh`,
            left: `${Math.random() * 100}vw`,
            width: `${Math.random() * 5 + 2}px`, // Random star size
            height: `${Math.random() * 5 + 2}px`,
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            borderRadius: "50%",
            boxShadow: `0 0 ${Math.random() * 10 + 5}px rgba(255, 255, 255, 0.6)`, // Reduce glow intensity
            opacity: Math.random() * 0.7 + 0.3,
          }}
        />
      ))}

      <Container maxWidth="sm">
        {/* Title Section */}
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography 
            variant="h3" 
            fontWeight="bold" 
            sx={{
              color: "#BB86FC",
              textShadow: "0 0 10px rgba(187, 134, 252, 0.6)", // ✅ Reduced glow
              letterSpacing: "1.5px",
              fontFamily: "Montserrat, sans-serif", // ✅ Montserrat font
            }}
          >
            <span style={{color: "#ffffff", textShadow: "none"}}>Meet</span> AI bluemoon
          </Typography>
          <Typography variant="h6" color="#A0A0A0" sx={{ fontFamily: "Montserrat, sans-serif" }}>
            we build apps that are both functional & beautiful.
          </Typography>
        </Box>

        {/* Buttons */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 4 }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#BB86FC",
              color: "white",
              borderRadius: "20px",
              textTransform: "none",
              fontSize: "14px",
              padding: "10px 22px",
              transition: "all 0.9s ease-in-out", // ✅ Faster hover response
              fontFamily: "Montserrat, sans-serif",
              "&:hover": {
                bgcolor: "#985EFF",
                boxShadow: "0px 0px 10px rgba(187, 134, 252, 0.5)", // ✅ Less glow
              },
            }}
          >
            book a call
          </Button>
          <Button
            variant="outlined"
            sx={{
              borderColor: "#BB86FC",
              color: "#BB86FC",
              borderRadius: "20px",
              textTransform: "none",
              fontSize: "14px",
              padding: "10px 22px",
              transition: "all 0.2s ease-in-out", // ✅ Faster hover response
              fontFamily: "Montserrat, sans-serif",
              "&:hover": {
                bgcolor: "#BB86FC",
                color: "white",
                boxShadow: "0px 0px 10px rgba(187, 134, 252, 0.5)", // ✅ Less glow
              },
            }}
          >
            email
          </Button>
        </Box>

        {/* Our Works Section */}
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, textAlign: "center", fontFamily: "Montserrat, sans-serif" }}>
          our works
        </Typography>
        <Grid container spacing={2}>
          {[
            { title: "Multi-Agents", subtitle: "AI-driven agent system", icon: "🤖", link: "/multiagent" },
            { title: "Single-Agent", subtitle: "One AI for all tasks", icon: "⚡", link: "/single-agent" },
            { title: "AI Office View", subtitle: "A virtual office powered by AI", icon: "🏢", link: "/ai-office-view" }
          ].map((item, index) => (
            <Grid item xs={12} key={index}>
              <div onClick={() => window.location.href = item.link}>
                <motion.div
                  whileHover={{ scale: 1.03, boxShadow: "0px 2px 5px rgba(187,134,252,0.2)" }} // ✅ Snappier hover effect
                  transition={{ duration: 0.15 }} // ✅ Faster response time
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "#1E1E1E",
                    padding: "12px 18px",
                    borderRadius: "15px",
                    cursor: "pointer",
                    transition: "all 0.2s ease-in-out", // ✅ Faster transition
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <Typography fontSize="20px">{item.icon}</Typography>
                  <Box>
                    <Typography fontWeight="bold" fontSize="16px" color="white">
                      {item.title}
                    </Typography>
                    <Typography color="#A0A0A0" fontSize="12px">
                      {item.subtitle}
                    </Typography>
                  </Box>
                </Box>
                <Typography fontSize="16px" sx={{ opacity: 0.5 }}>↗</Typography>
                </motion.div>
              </div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
