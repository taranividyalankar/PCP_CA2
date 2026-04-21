import { createContext, useContext, useReducer, useEffect } from "react";
import AppReducer, { initialState } from "../reducer/AppReducer";
import { fetchActivitiesData } from "../services/api";

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Fetch API ONCE on app load
  useEffect(() => {
    fetchActivitiesData()
      .then((activities) => {
        // Normalize data to handle inconsistencies
        const normalized = activities.map((activity, index) => ({
          activityId: activity.activityId ?? activity.id ?? `activity-${index}`,
          name: activity.name ?? activity.title ?? "Unnamed Activity",
          steps: Number(activity.steps ?? 0),
          caloriesBurned: Number(activity.caloriesBurned ?? activity.calories ?? 0),
          workoutMinutes: Number(activity.workoutMinutes ?? activity.duration ?? 0),
          goalAchieved: typeof activity.goalAchieved === "boolean"
            ? activity.goalAchieved
            : activity.goalAchieved === "true"
            ? true
            : activity.goalAchieved === "false"
            ? false
            : null,
          date: activity.date ?? null,
        }));

        // Auto-set goalAchieved to true if steps >= 8000
        const withAutoGoal = normalized.map((activity) => ({
          ...activity,
          goalAchieved:
            activity.steps >= 8000 ? true : activity.goalAchieved,
        }));

        dispatch({ type: "INITIAL_DATA", payload: withAutoGoal });
      })
      .catch((err) => {
        dispatch({ type: "SET_ERROR", payload: err.message });
      });
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};