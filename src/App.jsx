import React, { lazy, Suspense, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { store } from "./redux/store";
import { selectFavorites } from "./redux/favorites/favoritesSlice";
import Loader from "./components/Loader/Loader";
import Header from "./components/Header/Header";
import "./App.css";

const Home = lazy(() => import("./pages/Home/Home"));
const Catalog = lazy(() => import("./pages/Catalog/Catalog"));
const CamperDetailsPage = lazy(
  () => import("./pages/CamperDetailsPage/CamperDetailsPage")
);
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));

const AppContent = React.memo(() => {
  const favorites = useSelector(selectFavorites);
  const favoritesJSON = useMemo(() => JSON.stringify(favorites), [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem("favorites", favoritesJSON);
    } catch (err) {
      console.error("❌ Failed to store favorites in localStorage:", err);
    }
  }, [favoritesJSON]);

  return (
    <>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<CamperDetailsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
});

const App = () => (
  <Provider store={store}>
    <Router>
      <div>
        {" "}
        <AppContent />
      </div>
    </Router>
  </Provider>
);

export default App;
