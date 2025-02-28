import { Route, Routes } from "react-router-dom";
import NotFound from "../pages/NotFound";
import { AuthRoutes, InformationRoutes } from "./routes";
// import SecurityCheck from "../components/themeComponents/SecurityCheck";
// import CommonElement from "../pages/CommonElement";
import GuestRoute from "./GuestRoute";
import { DashboardRoutes } from "./routes";
import Wrapper from "../pages/dashboard/wrapper";
// import SecurityCheck from "../components/themeComponents/SecurityCheck";
const AppRoutes = () => {
  return (
    <Routes>
      {/* <Route element={<SecurityCheck />}> */}
      <Route element={<Wrapper />}>
        {(DashboardRoutes || [])?.map((route, id) => (
          <Route key={id} path={route.path} element={<route.element />} />
        ))}
        {/* </Route> */}
      </Route>

      {InformationRoutes?.map((route, id) => (
        <Route key={id} path={route.path} element={<route.element />} />
      ))}
      {AuthRoutes?.map((route, id) => (
        <Route
          key={id}
          path={route.path}
          element={
            <GuestRoute>
              <route.element />
            </GuestRoute>
          }
        />
      ))}
      {/* <Route path="/commonelements" element={<CommonElement />} /> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
