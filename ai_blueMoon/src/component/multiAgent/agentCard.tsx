import { Grid, Card, CardContent, Typography } from "@mui/material";


interface Agent {
  id: string;
  name: string;
  instructions?: string;
}

interface AgentGridProps {
  existingAgents: Agent[];
  role: string;
  setRole: (role: string) => void;
}


const AgentCard: React.FC<{
  agent: Agent;
  isSelected: boolean;
  onClick: () => void;
}> = ({ agent, isSelected, onClick }) => {
  const cardStyles = {
    cursor: "pointer",
    borderRadius: "12px",
    border: isSelected ? "2px solid #7b61ff" : "2px solid transparent",
    background: "rgba(255, 255, 255, 0.08)",
    color: "#fff",
    transition: "0.3s",
    height: "150px", // Fixed height for consistency
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    "&:hover": {
      transform: "scale(1.03)",
      boxShadow: "0 0 20px rgba(123, 97, 255, 0.5)",
    },
  };

  return (
    <Card onClick={onClick} sx={cardStyles}>
      <CardContent>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
          {agent.name}
        </Typography>
        {/* Uncomment if needed */}
        <Typography variant="body2" sx={{ fontSize: "13px", color: "#ccc" }}>
          {agent.instructions?.slice(0, 60)}...
        </Typography>
      </CardContent>
    </Card>
  );
};

export const AgentGrid: React.FC<AgentGridProps> = ({ existingAgents, role, setRole }) => {
  return (
    <Grid container spacing={2}>
      {existingAgents.map((agent) => (
        <Grid item xs={6} sm={4} md={3} key={agent.id}>
          <AgentCard
            agent={agent}
            isSelected={role === agent.name}
            onClick={() => setRole(agent.name)}
          />
        </Grid>
      ))}
    </Grid>
  );
};