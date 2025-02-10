import axios from "axios";

const API_URL = "http://localhost:3000/chat"; // Backend URL

export const sendMessageToAI = async (prompt:any) => {
  try {
    const response = await axios.post(API_URL, { prompt });
    return response.data.content;
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return "Error: Unable to connect to AI.";
  }
};
