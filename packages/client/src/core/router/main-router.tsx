import { Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { getRoutes } from "@router/routes";
import { Loading } from "@ui/loading/loading";

export function MainRouter() {
  const location = useLocation();

  return (
    <Suspense fallback={<Loading />}>
      <Routes location={location}>
        {getRoutes().map((item, index) => (
          <Route key={index} path={item.path} element={item.element} />
        ))}
      </Routes>
    </Suspense>
  );
}
