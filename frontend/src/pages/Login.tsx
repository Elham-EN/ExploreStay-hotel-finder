import React from "react";
import { Link } from "react-router-dom";

export default function Login(): React.ReactElement {
  return (
    <div>
      Login Page
      <span>
        Already registerd? <Link to={"/register"}>Sign in here</Link>
      </span>
    </div>
  );
}
