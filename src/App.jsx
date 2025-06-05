import React, { useEffect, useMemo, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { store } from "./redux/store";
import { selectFavorites } from "./redux/favoritesSlice";

import Header from "./components/Header/Header";
import Loader from "./components/Loader/Loader";
import "./App.css";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home/Home"));
const Catalog = lazy(() => import("./pages/Catalog/Catalog"));
const CamperDetailsPage = lazy(
  () => import("./pages/CamperDetailsPage/CamperDetailsPage")
);
const NotFound = lazy(() => import("./components/NotFound/NotFound"));

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

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}

export default App;
