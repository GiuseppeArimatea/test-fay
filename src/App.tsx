import { memo, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Homepage, Pdp, CartPage, Summary } from "./pages";
import Header from "./components/core/Header";

const App = memo((): JSX.Element => {
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <div>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="pdp/:id" element={<Pdp />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="summary" element={<Summary />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Suspense>
    </BrowserRouter>
  );
});

export default App;
