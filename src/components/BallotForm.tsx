import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";

const BallotForm: React.FC = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleNameSubmit = async () => {
    if (name) {
      setLoading(true); // Start loading
      setError(""); // Clear any previous error message

      // Check if the name already exists in Firebase
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("name", "==", name));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // If a document with this name exists, show an error
        setError(
          "This name has already been used. Please use a different name."
        );
        setLoading(false);
      } else {
        // Proceed with the form submission
        localStorage.setItem("userName", name);
        setTimeout(() => {
          setLoading(false); // Stop loading
          navigate("/select-number"); // Navigate to number selection page
        }, 2000); // Simulate a 2-second loading delay
      }
    } else {
      setError("Please enter your name.");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="w-full">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="p-4 text-lg border border-gray-400 rounded w-full"
        />
        <button
          onClick={handleNameSubmit}
          className="mt-4 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 w-full text-lg"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
          ) : (
            "Submit Name"
          )}
        </button>
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default BallotForm;
