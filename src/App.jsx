import './App.css'
import {Routes, Route, BrowserRouter, NavLink} from "react-router-dom";
import { StockOverviewPage } from './pages/StockOverviewPage';
import { StockDetailPage } from './pages/StockDetailPage';
import { ContextProvider } from './Context';

export default function App() {
  return (
    <main className="container">
      <ContextProvider>
        <BrowserRouter>
          <NavLink to={"/"}>StockOverviewPage</NavLink>
            <Routes>
              <Route path="/" element={<StockOverviewPage />} />
              <Route path="/detail/:symbol" element={<StockDetailPage />} />
            </Routes>
        </BrowserRouter>
      </ContextProvider>
    </main>
  );
}
