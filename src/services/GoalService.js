import { API } from "../apiEndPoints/apiEndPoints";
import { axiosGet, axiosPatch, axiosPost } from "../axios/axiosMiddleware";

export const addGoal = (data) => {
  console.log("data", data);
  return axiosPost(API?.PROFILE?.ADD_GOAL, data);
};
