import React from "react";

const ThankYou: React.FC = () => {
  const userName = localStorage.getItem("userName");

  return (
    <div className="text-center">
      <p className="text-2xl font-semibold text-green-600 mb-4">
        Thank you, {userName}!
      </p>
      <p className="text-xl">Your selection has been saved in the system.</p>
    </div>
  );
};

export default ThankYou;
