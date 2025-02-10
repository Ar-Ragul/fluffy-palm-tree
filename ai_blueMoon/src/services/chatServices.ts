import axios from "axios";

const API_URL = "http://localhost:3000"; // Backend URL

export const sendMessageToAI = async (prompt:any) => {
  try {
    const response = await axios.post(`${API_URL}/chat`, { prompt });
    const data = response.data as { response: string };
    return data.response || "No response from AI.";
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return "Error: Unable to connect to AI.";
  }
};

export async function sendAgentQuery(query: string, role: string): Promise<string> {
  try {
    const response = await fetch(`${API_URL}/agent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, role }),
    });

    const data = await response.json();
    return data.response || "⚠️ No response from AI.";
  } catch (error) {
    console.error("❌ API Error:", error);
    return "⚠️ Error connecting to AI.";
  }
}

export async function fetchArchitectTask(): Promise<string> {
  try {
    const response = await fetch(`${API_URL}/architect-task`);
    const data = await response.json();
    return data.task || "No task assigned yet.";
  } catch (error) {
    console.error("❌ API Error:", error);
    return "⚠️ Unable to fetch Architect's task.";
  }
}

export async function sendArchitectTask(task: string): Promise<string> {
  await fetch(`${API_URL}/architect-task`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task }),
  });
  return "Task saved successfully!";
}

export async function sendDeveloperUpdate(update: string): Promise<string> {
  const response = await fetch(`${API_URL}/developer-update`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ update }),
  });
  const data = await response.json();
  return data.response;
}