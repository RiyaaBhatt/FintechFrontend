import Login from "../pages/authentication/Login";
import Signup from "../pages/authentication/Signup";
import Home from "../pages/dashboard/Home";
import Invesment from "../pages/dashboard/Invesment";
import Goals from "../pages/dashboard/Goals";

import { paths } from "./path";
import Reports from "../pages/dashboard/Reports";
import Setting from "../pages/dashboard/Setting";
import Transaction from "../pages/dashboard/Transaction";
import step1 from "../pages/steps/step1";
import step2 from "../pages/steps/step2";
import ProfilePage from "../pages/Profile";
import Chatbot from "../pages/dashboard/Chatbot";
export const AuthRoutes = [
  {
    id: 1,
    path: paths.auth.login,
    name: "Login",
    element: Login,
    isback: false,
  },
  {
    id: 2,
    path: paths.auth.signup,
    name: "Signup",
    element: Signup,
    isback: false,
  },

  // {
  //   id: 2,
  //   path: paths.auth.addNewPassword,
  //   name: 'Add new Password',
  //   element: AddNewPassword,
  //   isback: false,
  // },
  // {
  //   id: 3,
  //   path: paths.auth.forgotPassword,
  //   name: 'Forget Password',
  //   element: ForgetPassword,
  //   isback: false,
  // },
  // {
  //   id: 4,
  //   path: paths.auth.otp,
  //   name: 'OTP',
  //   element: OTP,
  //   isback: false,
  // },
  // {
  //   id: 5,
  //   path: paths.auth.changePassword,
  //   name: 'Change Password',
  //   element: ChangePassword,
  //   isback: false,
  // },
  // {
  //   id: 6,
  //   path: paths.auth.loginUser,
  //   name: 'Login',
  //   element: Login,
  //   isback: false,
  // },
];
export const DashboardRoutes = [
  {
    id: 1,
    path: paths.dashboard.home,
    name: "Dashboard",
    element: Home,
    isback: false,
  },
  {
    id: 2,
    path: paths.dashboard.investments,
    name: "investments",
    element: Invesment,
    isback: false,
  },
  {
    id: 3,
    path: paths.dashboard.goals,
    name: "Goals",
    element: Goals,
    isback: false,
  },
  {
    id: 4,
    path: paths.dashboard.reports,
    name: "reports",
    element: Reports,
    isback: false,
  },
  {
    id: 5,
    path: paths.dashboard.settings,
    name: "settings",
    element: Setting,
    isback: false,
  },
  {
    id: 6,
    path: paths.dashboard.transaction,
    name: "transaction",
    element: Transaction,
    isback: false,
  },
  {
    id: 7,
    path: paths.auth.profile_page,
    name: "profile",
    element: ProfilePage,
    isback: false,
  },
  {
    id: 8,
    path: paths.dashboard.chatbot,
    name: "chatbot",
    element: Chatbot,
    isback: false,
  },
];
export const InformationRoutes = [
  {
    id: 1,
    path: paths.information.profile,
    name: "Profile",
    element: step1,
    isback: false,
  },
  {
    id: 2,
    path: paths.information.step2,
    name: " step2",
    element: step2,
    isback: false,
  },
];
