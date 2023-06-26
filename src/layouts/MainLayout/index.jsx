import { Route, Routes } from "react-router-dom";
import Proptypes from "prop-types";
import { personalRouter } from "../../routes";

const MainLayout = () => {
  return (
    <Routes>
      {personalRouter.map((route, index) => (
        <Route key={index} path={route.path} element={<route.element />} />
      ))}
    </Routes>
  );
};

MainLayout.propTypes = {
  children: Proptypes.node,
  scroll: Proptypes.bool,
};

export default MainLayout;
