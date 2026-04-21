import { useEffect } from "react";
import { useAppContext } from "../context/AppContext";

const Stats = () => {
  const { state } = useAppContext();
  const { activities, loading, error } = state;

  // Valid activities using filter
  const validActivities = activities.filter(
    (activity) =>
      activity.steps > 0 &&
      activity.caloriesBurned > 0 &&
      activity.workoutMinutes > 0 &&
      typeof activity.goalAchieved === "boolean"
  );

  const totalActivities = validActivities.length;

  const goalAchievedCount = validActivities.reduce(
    (count, activity) => (activity.goalAchieved === true ? count + 1 : count),
    0
  );

  const goalNotAchievedCount = validActivities.reduce(
    (count, activity) => (activity.goalAchieved === false ? count + 1 : count),
    0
  );

  
  useEffect(() => {
    if (!loading && !error) {
      window.appState = {
        totalActivities,
        goalAchieved: goalAchievedCount,
        goalNotAchieved: goalNotAchievedCount,
        
      };
    }

    return () => {
      delete window.appState;
    };
  }, [activities, loading, error]);

  if (loading) return <p data-testid="loading">Loading...</p>;
  if (error) return <p data-testid="error">{error}</p>;

  return (
    <div data-testid="stats-page">
      <h2>Activity Analytics Dashboard</h2>

      <p data-testid="total-activities">
        Total Valid Activities: {totalActivities}
      </p>
      <p data-testid="goal-achieved">
        Goal Achieved: {goalAchievedCount}
      </p>
      <p data-testid="goal-not-achieved">
        Goal Not Achieved: {goalNotAchievedCount}
      </p>
    
    </div>
  );
};

export default Stats;