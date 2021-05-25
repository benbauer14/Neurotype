import React from "react";
import { navigate } from "@reach/router";

import { Status } from "./Status";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

export function Nav() {
  const participant = useSelector((store) => store.currentsession.participant_name)
  const history = useHistory()

  function goToLogout() {
    navigate("/logout");
  }
  function goToActivities() {
    history.push("/userhome/" + participant);
  }

  return (
    <nav className="card">
      <Status />
      <button onClick={goToLogout} className="card-btn">
        Logout
      </button>
      <button onClick={goToActivities} className="card-btn">
        Return to Activities
      </button>           
    </nav>
  );
}
