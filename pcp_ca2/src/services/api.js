import axios from "axios";

const BASE_URL = "https://t4e-testserver.onrender.com/api";
const STUDENT_ID = "E0423003";
const SET = "setB";
const PASSWORD = "224166";

const getToken = async () => {
  const { data } = await axios.post(`${BASE_URL}/public/token`, {
    studentId: STUDENT_ID,
    set: SET,
    password: PASSWORD,
  });
  return data;
};





const getDataset = async (token, dataUrl) => {
  const { data } = await axios.get(`${BASE_URL}${dataUrl}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.data.activities;
};

export const fetchActivitiesData = async () => {
  try {
    const tokenData = await getToken();
    const activities = await getDataset(tokenData.token, tokenData.dataUrl);
    return activities;
  } catch (err) {
    console.error("Error fetching data:", err);
    throw err;
  }
};