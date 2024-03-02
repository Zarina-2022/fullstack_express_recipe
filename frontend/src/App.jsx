import { BrowserRouter, Routes, Route } from "react-router-dom";

// import components
import Sidebar from "./components/sidebar";

// import pages
import MainPage from "./pages/main-page";
import DetailPage from "./pages/detail-page";
import CreatePage from "./pages/create-page";

function App() {
  return (
    <BrowserRouter>
      <div className="flex gap-3">
        <Sidebar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/recipe/:id" element={<DetailPage />} />
          <Route path="/add" element={<CreatePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
