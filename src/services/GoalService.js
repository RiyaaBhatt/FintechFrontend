import { API } from "../apiEndPoints/apiEndPoints";
import { axiosGet, axiosPost, axiosPut } from "../axios/axiosMiddleware";

export const updateUserProfile = async (userId, userData) => {
  try {
    console.log(`${API.PROFILE.UPDATE_PROFILE}${userId}/`);
    const response = await axiosPut(
      `${API.PROFILE.UPDATE_PROFILE}${userId}/`,
      userData
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error updating user profile:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const addGoal = async (goalData) => {
  try {
    console.log(goalData);
    const response = await axiosPost(`${API.PROFILE.ADD_GOAL}`, goalData);
    return response.data;
  } catch (error) {
    console.error("Error adding goal:", error.response?.data || error.message);
    throw error;
  }
};
export const fetchGoal = async (id) => {
  try {
    const response = await axiosGet(`${API.PROFILE.ADD_GOAL}${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error adding goal:", error.response?.data || error.message);
    throw error;
  }
};

export const addExpense = async (userId, expenseData) => {
  try {
    const response = await axiosPost(`${API.PROFILE.ADD_EXPENSE}`, expenseData);
    return response.data;
  } catch (error) {
    console.error(
      "Error adding expense:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const addBudgetCategory = async (userId, categoryData) => {
  try {
    const response = await axiosPost(
      `${API.PROFILE.ADD_BUDGET_CATEGORY}`,
      categoryData
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error adding budget category:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const addInvestment = async (userId, investmentData) => {
  try {
    const response = await axiosPost(
      `${API.PROFILE.ADD_INVESTMENT}`,
      investmentData
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error adding investment:",
      error.response?.data || error.message
    );
    throw error;
  }
};
export const fetchInvestment = async (userId) => {
  try {
    const response = await axiosGet(`${API.PROFILE.GET_INVESMENT}${userId}/`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching investment:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const dashboardService = async (userId) => {
  const data = await axiosGet(`${API.PROFILE.DASHBOARD}${userId}`);
  return data;
};
