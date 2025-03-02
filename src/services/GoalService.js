import { API } from "../apiEndPoints/apiEndPoints";
import { axiosGet, axiosPost, axiosPut } from "../axios/axiosMiddleware";
import axios from "axios";
import { useSelector } from "react-redux";

export const patchSavings = async (access, savings) => {
  try {
    // Retrieve the access token from the Redux state

    if (!access) {
      throw new Error("Access token is missing");
    }

    // Set up the PATCH request with the Authorization header
    const response = await axios.patch(
      "http://localhost:8000/api/savings/", // Replace with your actual API endpoint
      savings,
      {
        headers: {
          Authorization: `Bearer ${access}`, // Attach the access token here
          "Content-Type": "application/json", // Ensure the correct content type
        },
      }
    );

    // Return the response (or you can handle success accordingly)
    return response.data;
  } catch (error) {
    console.error("Error in patchSavings:", error);
    throw error; // Handle the error as needed (e.g., show a notification or log it)
  }
};
export const addGoal = async (access, goalData) => {
  try {
    // Retrieve the access token from the Redux state

    if (!access) {
      throw new Error("Access token is missing");
    }

    // Set up the PATCH request with the Authorization header
    const response = await axios.post(
      "http://127.0.0.1:8000/api/financial-goals/", // Replace with your actual API endpoint
      goalData,
      {
        headers: {
          Authorization: `Bearer ${access}`, // Attach the access token here
          "Content-Type": "application/json", // Ensure the correct content type
        },
      }
    );

    // Return the response (or you can handle success accordingly)
    return response.data;
  } catch (error) {
    console.error("Error in patchSavings:", error);
    throw error; // Handle the error as needed (e.g., show a notification or log it)
  }
};

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
export const fetchGoal = async (access) => {
  try {
    // Retrieve the access token from the Redux state

    if (!access) {
      throw new Error("Access token is missing");
    }

    // Set up the PATCH request with the Authorization header
    const response = await axios.get(
      "http://127.0.0.1:8000/api/financial-goals/", // Replace with your actual API endpoint
      {
        headers: {
          Authorization: `Bearer ${access}`, // Attach the access token here
          "Content-Type": "application/json", // Ensure the correct content type
        },
      }
    );

    // Return the response (or you can handle success accordingly)
    return response.data;
  } catch (error) {
    console.error("Error in patchSavings:", error);
    throw error; // Handle the error as needed (e.g., show a notification or log it)
  }
};
// Update Goal Service with Static Endpoint
export const updateGoal = async (access, goalId, goalData) => {
  try {
    if (!access) {
      throw new Error("Access token is missing");
    }

    // Static API endpoint for updating goal
    const endpoint = `http://127.0.0.1:8000/api/financial-goals/${goalId}/`; // Static endpoint

    // Send PATCH request to update goal
    const response = await axios.patch(endpoint, goalData, {
      headers: {
        Authorization: `Bearer ${access}`, // Include the access token for authorization
        "Content-Type": "application/json", // Ensure content type is JSON
      },
    });

    return response.data; // Return the updated goal data
  } catch (error) {
    console.error(
      "Error in updateGoal service:",
      error.response?.data || error.message
    );
    throw error; // Re-throw error for handling by calling function
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
