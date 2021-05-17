import React from "react";
import { Link } from "@reach/router";

import { Nav } from "../components/Nav";
import { useNotion } from "../services/notion";

export function Instructions() {
  const { user } = useNotion();

  if (!user) {
    return null;
  }

  return (
    <main className="main-container">
      {user ? <Nav /> : null}

      <div>
        <p>
          Welcome to the <strong>picture viewing task</strong>! In this
          experiment, your task will be to simply watch and pay attention
          to the images - when no image is on the screen, please focus on 
          the "+" in the middle of the screen. <strong>Warning:</strong> some 
          of the images will contain evocative (e.g., nudity, adventure) or 
          disturbing (e.g., violence) content.
        </p>

        <p>
            When you're ready please click "Begin" below!
        </p>
      
      <Link to="/experiment">Begin</Link>
      </div>
    
    </main>
  );
}