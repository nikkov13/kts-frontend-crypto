import { Routes, Route } from "react-router-dom";

import CoinPage from "./CoinPage";
import MarketPage from "./MarketPage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MarketPage />} />
      <Route path="/coin">
        <Route path=":id" element={<CoinPage />} />
      </Route>
    </Routes>
  );
};

export default App;
