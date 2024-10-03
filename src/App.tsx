import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BallotForm from "./components/BallotForm";
import NumberSelection from "./components/NumberSelection";
import ThankYou from "./components/ThankYou";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 md:p-8">
        <div className="bg-white p-12 rounded-lg shadow-xl w-full md:w-1/2 lg:w-1/3">
          <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
            Balloting System
          </h1>
          <Routes>
            <Route path="/" element={<BallotForm />} />
            <Route path="/select-number" element={<NumberSelection />} />
            <Route path="/thank-you" element={<ThankYou />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
