import _ from "lodash";
import { Fragment, Suspense } from "react";
import { appRoutes } from "../utils/routes";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Main from "../containers/Main";
import ThemeLayout from "../components/ThemeLayout";

const AppContainer = () => {
  const routesList = appRoutes.map(
    ({ key, path, component: Component, nestedRoutes }) => {
      const nestedRoutesList =
        nestedRoutes && !_.isEmpty(nestedRoutes) ? (
          nestedRoutes.map(({ key, path, component: NestedComponent }) => {
            return (
              <Route key={key} path={path} element={<NestedComponent />} />
            );
          })
        ) : (
          <Fragment></Fragment>
        );

      return (
        <Route key={key} path={path} element={<Component />}>
          {nestedRoutesList}
        </Route>
      );
    }
  );

  return (
    <ThemeLayout>
      <BrowserRouter>
        <Suspense fallback={<div>Loading....</div>}>
          <Main>
            <Routes>
              {routesList}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Main>
        </Suspense>
      </BrowserRouter>
    </ThemeLayout>
  );
};

export default AppContainer;
