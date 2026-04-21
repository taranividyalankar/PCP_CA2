import { useState } from "react";
import { useAppContext } from "../context/AppContext";

const Filter = () => {
  const { state } = useAppContext();
  const { activities, loading, error } = state;

  const [stepsInput, setStepsInput] = useState("");

  // Valid activities only
  const validActivities = activities.filter(
    (activity) =>
      activity.steps > 0 &&
      activity.caloriesBurned > 0 &&
      activity.workoutMinutes > 0 &&
      typeof activity.goalAchieved === "boolean"
  );

  // Filter by steps >= input value
  const filteredActivities =
    stepsInput !== ""
      ? validActivities.filter(
          (activity) => activity.steps >= Number(stepsInput)
        )
      : validActivities;

  return (
    <div data-testid="filter-page">
      <h2>Filter Activities</h2>

      {loading && <p data-testid="loading">Loading...</p>}
      {error && <p data-testid="error">{error}</p>}

      {!loading && !error && (
        <div>
          <input
            data-testid="filter-input"
            type="number"
            value={stepsInput}
            onChange={(e) => setStepsInput(e.target.value)}
            placeholder="Enter minimum steps"
          />

          <p data-testid="filtered-count">
            Showing: {filteredActivities.length} activities
          </p>

          <div data-testid="filtered-list">
            {filteredActivities.length === 0 ? (
              <p data-testid="no-results">No activities match the filter.</p>
            ) : (
              filteredActivities.map((activity) => (
                <div key={activity.activityId} data-testid="activity-item">
                  <h3 data-testid="activity-name">{activity.name}</h3>
                  <p data-testid="activity-steps">Steps: {activity.steps}</p>
                  <p data-testid="activity-calories">
                    Calories Burned: {activity.caloriesBurned}
                  </p>
                  <p data-testid="activity-minutes">
                    Workout Minutes: {activity.workoutMinutes}
                  </p>
                  <p data-testid="activity-goal">
                    Goal Achieved: {activity.goalAchieved ? "Yes" : "No"}
                  </p>
                  <p data-testid="activity-date">
                    Date: {activity.date ?? "N/A"}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;