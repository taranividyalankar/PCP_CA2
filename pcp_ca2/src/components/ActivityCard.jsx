import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const ActivityCard = ({ activity }) => {
  const { dispatch } = useAppContext();

  const handleToggle = () => {
    dispatch({ type: "TOGGLE_STATUS", payload: activity.activityId });
  };

  const handleDelete = () => {
    dispatch({ type: "DELETE_ITEM", payload: activity.activityId });
  };

  return (
    <div data-testid="activity-item">
      <h3 data-testid="activity-name">{activity.name}</h3>
      <p data-testid="activity-steps">Steps: {activity.steps}</p>
      <p data-testid="activity-calories">Calories Burned: {activity.caloriesBurned}</p>
      <p data-testid="activity-minutes">Workout Minutes: {activity.workoutMinutes}</p>
      <p data-testid="activity-goal">
        Goal Achieved: {activity.goalAchieved ? "Yes" : "No"}
      </p>
      <p data-testid="activity-date">Date: {activity.date ?? "N/A"}</p>
      <button
        data-testid="toggle-goal"
        onClick={handleToggle}
        disabled={activity.steps >= 8000}
      >
        {activity.goalAchieved ? "Mark as Not Achieved" : "Mark as Achieved"}
      </button>
      <button data-testid="delete-activity" onClick={handleDelete}>
        Delete
      </button>
      <Link to={`/activities/${activity.activityId}`} data-testid="view-detail">
        View Details
      </Link>
    </div>
  );
};

export default ActivityCard;