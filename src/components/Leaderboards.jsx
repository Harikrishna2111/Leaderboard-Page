import LeaderboardBox from "./LeaderboardBox";

function Leaderboards() {
  return (
    <div style={styles.container}>
      <LeaderboardBox title="Main Leaderboard (Top 10)" count={10} />
      <LeaderboardBox title="Runner-Up (Top 3)" count={3} />
      <LeaderboardBox title="Extra Leaderboard (Top 3)" count={3} />
    </div>
  );
}

const styles = {
  container: {
  width: "100%",
  maxWidth: "1000px",
  margin: "0 auto",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: "20px",
  padding: "20px",
  boxSizing: "border-box",
},

};

export default Leaderboards;
