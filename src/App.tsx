import { Route, Routes } from "react-router-dom";
import "./scss/app.scss";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import React, { Suspense } from "react";
import { lazy } from "react";
import Loadable from "react-loadable";
import { Loading } from "./components/Loading/Loading";

//Загрузка lazy
const Cart = lazy(() => import("./pages/Cart"));

// const Cart = Loadable({
//   loader: () => import(/* webpackChunkName: "Cart" */ "./pages/Cart"),
//   loading: () => <Loading />,
// });

const NotFound = lazy(() => import("./pages/NotFound"));
const FullSneaker = lazy(() => import("./pages/FullSneaker"));

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Home />} />
          <Route
            path="cart"
            element={
              <Suspense fallback={<div>Идет загрузка корзины...</div>}>
                <Cart />
              </Suspense>
            }
          ></Route>
          <Route
            path="sneakers/:id"
            element={
              <Suspense fallback={<div>Идет загрузка...</div>}>
                <FullSneaker />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<div>Идет загрузка...</div>}>
                <NotFound />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
