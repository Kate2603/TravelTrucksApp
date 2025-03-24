import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Header from "./components/Header/Header";
import Filters from "./components/FilterPanel/FilterPanel";
import BookingForm from "./components/BookingForm/BookingForm";
import Home from "./pages/Home/Home";
import Catalog from "./pages/Catalog/Catalog";
import CamperPage from "./pages/CamperPage/CamperPage";
import NotFound from "./components/NotFound/NotFound";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/catalog"
            element={
              <>
                <Filters />
                <Catalog />
              </>
            }
          />
          <Route
            path="/catalog/:id"
            element={
              <>
                <CamperPage />
                <BookingForm />
              </>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
