export const initialState = {
  activities: [],
  loading: true,
  error: null,
};

const AppReducer = (state, action) => {
  switch (action.type) {
    case "INITIAL_DATA":
      return {
        ...state,
        activities: action.payload,
        loading: false,
        error: null,
      };

    case "ADD_ITEM":
      return {
        ...state,
        activities: [...state.activities, action.payload],
      };

    case "DELETE_ITEM":
      return {
        ...state,
        activities: state.activities.filter(
          (activity) => activity.activityId !== action.payload
        ),
      };

    case "UPDATE_ITEM":
      return {
        ...state,
        activities: state.activities.map((activity) =>
          activity.activityId === action.payload.activityId
            ? { ...activity, ...action.payload.updates }
            : activity
        ),
      };

    case "TOGGLE_STATUS":
      return {
        ...state,
        activities: state.activities.map((activity) => {
          if (activity.activityId !== action.payload) return activity;
          // If steps >= 8000, goalAchieved must stay true
          if (activity.steps >= 8000) return { ...activity, goalAchieved: true };
          return { ...activity, goalAchieved: !activity.goalAchieved };
        }),
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default AppReducer;