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

  // All computed using reduce — no derived values stored in state
  const totalActivities = validActivities.length;

  const goalAchievedCount = validActivities.reduce(
    (count, activity) => (activity.goalAchieved === true ? count + 1 : count),
    0
  );

  const goalNotAchievedCount = validActivities.reduce(
    (count, activity) => (activity.goalAchieved === false ? count + 1 : count),
    0
  );

  const totalSteps = validActivities.reduce(
    (sum, activity) => sum + activity.steps,
    0
  );

  const totalCalories = validActivities.reduce(
    (sum, activity) => sum + activity.caloriesBurned,
    0
  );

  const totalMinutes = validActivities.reduce(
    (sum, activity) => sum + activity.workoutMinutes,
    0
  );

  const averageSteps =
    totalActivities > 0
      ? (totalSteps / totalActivities).toFixed(2)
      : 0;

  const averageCalories =
    totalActivities > 0
      ? (totalCalories / totalActivities).toFixed(2)
      : 0;

  // Expose window.appState ONLY in /stats
  useEffect(() => {
    if (!loading && !error) {
      window.appState = {
        totalActivities,
        goalAchieved: goalAchievedCount,
        goalNotAchieved: goalNotAchievedCount,
        totalSteps,
        totalCalories,
        totalMinutes,
        averageSteps: parseFloat(averageSteps),
        averageCalories: parseFloat(averageCalories),
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
      <p data-testid="total-steps">
        Total Steps: {totalSteps}
      </p>
      <p data-testid="total-calories">
        Total Calories Burned: {totalCalories}
      </p>
      <p data-testid="total-minutes">
        Total Workout Minutes: {totalMinutes}
      </p>
      <p data-testid="average-steps">
        Average Steps: {averageSteps}
      </p>
      <p data-testid="average-calories">
        Average Calories: {averageCalories}
      </p>
    </div>
  );
};

export default Stats;