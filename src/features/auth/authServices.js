import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

const register = async (userData) => {
  const response = await axios.post(`${base_url}user/register`, userData);
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(`${base_url}user/admin-login`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const forgotPasswordToken = async (data) => {
  const response = await axios.post(
    `${base_url}user/forgot-password-token`,
    data,
    ""
  );
  return response.data;
};

const resetPassword = async (data) => {
  const response = await axios.put(
    `${base_url}user/reset-password/${data.token}`,
    { password: data.password }
  );
  return response.data;
};

const getOrders = async () => {
  const response = await axios.get(`${base_url}user/getallorders`, config);
  return response.data;
};

const getOrder = async (id) => {
  const response = await axios.get(`${base_url}user/getaorder/${id}`, config);
  return response.data;
};

const updateOrderStatus = async (data) => {
  console.log(data);
  const response = await axios.put(
    `${base_url}user/order/update-order/${data.id}`,
    { status: data.status },
    config
  );
  return response.data;
};

const getMonthlyOrders = async () => {
  const response = await axios.get(
    `${base_url}user/getMonthWiseOrderIncome`,
    config
  );
  return response.data;
};

const getyearlyStats = async () => {
  const response = await axios.get(
    `${base_url}user/getYearlyTotalOrders`,
    config
  );
  return response.data;
};

const authService = {
  login,
  register,
  getOrders,
  getOrder,
  updateOrderStatus,
  forgotPasswordToken,
  resetPassword,
  getMonthlyOrders,
  getyearlyStats,
};

export default authService;
