import React, { useState, useRef } from "react";
import { auth, firestore } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, getDocs } from "firebase/firestore";

export default function Home() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(""); // "donor" or "recipient"
  const emailRef = useRef();
  const passwordRef = useRef();
  const foodNameRef = useRef();
  const quantityRef = useRef();
  const expiryRef = useRef();
  const [availableFood, setAvailableFood] = useState([]);

  const handleAuth = async (isSignUp) => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const userCredential = isSignUp
        ? await createUserWithEmailAndPassword(auth, email, password)
        : await signInWithEmailAndPassword(auth, email, password);

      setUser(userCredential.user);
    } catch (error) {
      console.error("Auth error:", error.message);
    }
  };

  const handleAddFood = async () => {
    if (!foodNameRef.current.value || !quantityRef.current.value || !expiryRef.current.value) return;

    try {
      await addDoc(collection(firestore, "available"), {
        foodName: foodNameRef.current.value,
        quantity: quantityRef.current.value,
        expiry: expiryRef.current.value,
      });

      alert("Food added successfully!");
    } catch (error) {
      console.error("Error adding food:", error);
    }
  };

  const fetchAvailableFood = async () => {
    const querySnapshot = await getDocs(collection(firestore, "available"));
    setAvailableFood(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  return (
    <div>
      {!user ? (
        <div>
          <h2>Sign In / Sign Up</h2>
          <input type="email" ref={emailRef} placeholder="Email" />
          <input type="password" ref={passwordRef} placeholder="Password" />
          <button onClick={() => handleAuth(true)}>Sign Up</button>
          <button onClick={() => handleAuth(false)}>Login</button>
        </div>
      ) : (
        <div>
          <h2>Welcome, {user.email}!</h2>
          <button onClick={() => setRole("donor")}>I'm a Donor</button>
          <button onClick={() => setRole("recipient")}>I'm a Recipient</button>

          {role === "donor" && (
            <div>
              <h3>Add Food</h3>
              <input type="text" ref={foodNameRef} placeholder="Food Name" />
              <input type="number" ref={quantityRef} placeholder="Quantity" />
              <input type="date" ref={expiryRef} />
              <button onClick={handleAddFood}>Submit</button>
            </div>
          )}

          {role === "recipient" && (
            <div>
              <h3>Available Food</h3>
              <button onClick={fetchAvailableFood}>Refresh List</button>
              <ul>
                {availableFood.map((food) => (
                  <li key={food.id}>
                    {food.foodName} - {food.quantity} available (Exp: {food.expiry})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
