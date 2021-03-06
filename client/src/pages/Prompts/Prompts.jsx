import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import "../assets/main.css";
import { Link, useParams, useHistory } from "react-router-dom";
import API from "../../utils/API";
import "./Prompts.css";

function Thoughts() {
  const [thoughts, setThoughts] = useState([]);
  const history = useHistory();
  const [active, setActive] = useState(true);

  useEffect(() => {
    const id = sessionStorage.getItem("currentUsers");
    console.log(id);
    if (id) {
      API.getPrompts()
        .then((res) => setThoughts(res.data.allThoughts))
        .catch((err) => console.log(err));
    } else {
      history.push("/");
    }
  }, []);

  function offOn() {
    if (active) {
      setActive(false);
      API.togglePrompts(false).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
      console.log("Off");
    } else {
        setActive (true);
        API.togglePrompts(true).then(res => {
          console.log(res);
        }).catch(err => {
          console.log(err);
        })
      console.log("On");
    }
  }

  return (
    <div>
      <Navbar />
      <div>
        <br />
      </div>
      <div id="prompts">
        {thoughts &&
          thoughts.map((Thought) => {
            return (
              <li className="list-group-item" id="prompt-list">
                {Thought.message_text}
              </li>
            );
          })}
      </div>
      <div className="custom-control custom-switch" value="true">
        <input
          type="checkbox"
          className="custom-control-input"
          onClick={offOn}
          active={active}
          id="customSwitch1"
          checked={active}
        />
        <div><br/></div>
        <label className="custom-control-label" for="customSwitch1">
          Turn texts on/off
        </label>
      </div>
    </div>
  );
}

export default Thoughts;
