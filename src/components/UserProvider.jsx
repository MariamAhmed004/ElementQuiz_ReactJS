import React, { useState } from "react";
import { UserContext } from "./UserContext";

// the UserProvider component
export function UserProvider({ children }) {

    // State to hold the user's name
  const [name, setName] = useState("");

  // Provide the user state and the function to update it to the rest of the app
  return <UserContext.Provider value={{ name, setName }}>{children}</UserContext.Provider>;
}