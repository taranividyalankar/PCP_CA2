import { useAppContext } from "../context/AppContext";
import ActivityCard from "../components/ActivityCard";

const Activities = () => {
  const { state } = useAppContext();
  const { activities, loading, error } = state;

  // Valid activities: steps, caloriesBurned, workoutMinutes > 0 and goalAchieved is boolean
  const validActivities = activities.filter(
    (activity) =>
      activity.steps > 0 &&
      activity.caloriesBurned > 0 &&
      activity.workoutMinutes > 0 &&
      typeof activity.goalAchieved === "boolean"
  );

  return (
    <div data-testid="activities-page">
      <h2>Activities</h2>

      {loading && <p data-testid="loading">Loading...</p>}
      {error && <p data-testid="error">{error}</p>}

      {!loading && !error && (
        <div>
          <p data-testid="activity-count">
            Valid Activities: {validActivities.length}
          </p>

          <div data-testid="activities-list">
            {validActivities.length === 0 ? (
              <p data-testid="no-activities">No valid activities found.</p>
            ) : (
              validActivities.map((activity) => (
                <ActivityCard key={activity.activityId} activity={activity} />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Activities;