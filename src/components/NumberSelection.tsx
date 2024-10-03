import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const NumberSelection: React.FC = () => {
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [takenNumbers, setTakenNumbers] = useState<number[]>([]);
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");

  // Fetch taken numbers from Firebase
  useEffect(() => {
    const fetchTakenNumbers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const numbers: number[] = querySnapshot.docs.map(
        (doc) => doc.data().number
      );
      setTakenNumbers(numbers);
    };

    fetchTakenNumbers();
  }, []);

  const handleNumberSubmit = async (number: number) => {
    if (userName && number !== null && !takenNumbers.includes(number)) {
      setLoading(true);
      try {
        // Store user and number in Firebase
        await addDoc(collection(db, "users"), {
          name: userName,
          number: number,
        });
        setTimeout(() => {
          setLoading(false);
          navigate("/thank-you"); // Navigate to thank you page after submitting
        }, 2000); // Simulate a loading delay
      } catch (error) {
        alert("Error storing data to Firebase.");
        setLoading(false);
      }
    } else {
      alert("Number already taken or invalid.");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <p className="text-2xl text-green-600 text-center mb-4">
        Please choose a number
      </p>
      <div className="grid grid-cols-1 gap-4">
        {[1, 2, 3, 4, 5, 6,7,8,9,10].map((number) => (
          <button
            key={number}
            onClick={() => handleNumberSubmit(number)}
            className={`py-3 px-6 rounded-lg text-lg w-full ${
              takenNumbers.includes(number)
                ? "bg-red-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
            disabled={takenNumbers.includes(number)} // Disable button if number is taken
          >
            {takenNumbers.includes(number) ? `Taken: ${number}` : number}
          </button>
        ))}
      </div>
      {loading && (
        <div className="flex justify-center items-center mt-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  );
};

export default NumberSelection;
