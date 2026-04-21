import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const ActivityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useAppContext();

  if (state.loading) return <p data-testid="loading">Loading...</p>;

  const activity = state.activities.find(
    (a) => String(a.activityId) === String(id)
  );

  if (!activity) return <p data-testid="not-found">Activity not found.</p>;

  // Efficiency score = caloriesBurned / workoutMinutes (handle division by zero)
  const efficiencyScore =
    activity.workoutMinutes > 0
      ? (activity.caloriesBurned / activity.workoutMinutes).toFixed(2)
      : "N/A (division by zero)";

  return (
    <div data-testid="activity-detail-page">
      <h2 data-testid="detail-name">{activity.name}</h2>
      <p data-testid="detail-steps">Steps: {activity.steps}</p>
      <p data-testid="detail-calories">
        Calories Burned: {activity.caloriesBurned}
      </p>
      <p data-testid="detail-minutes">
        Workout Minutes: {activity.workoutMinutes}
      </p>
      <p data-testid="detail-goal">
        Goal Achieved: {activity.goalAchieved ? "Yes" : "No"}
      </p>
      <p data-testid="detail-date">Date: {activity.date ?? "N/A"}</p>
      <p data-testid="detail-efficiency">
        Efficiency Score: {efficiencyScore}
      </p>
      <button
        data-testid="back-button"
        onClick={() => navigate("/activities")}
      >
        Back
      </button>
    </div>
  );
};

export default ActivityDetail;