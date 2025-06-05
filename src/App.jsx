import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Catalog from "./pages/Catalog/Catalog";
import CamperDetailsPage from "./pages/CamperDetailsPage/CamperDetailsPage";
import NotFound from "./components/NotFound/NotFound";

import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<CamperDetailsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
