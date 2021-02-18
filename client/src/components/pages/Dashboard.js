import React from "react";
import { useSelector } from "react-redux";

import { Form, Spinner } from "reactstrap";
import Post from "../Posts/Post/Post";
import Formm from "../Form/Form";
import Posts from "../Posts/Posts";
const Dashboard = () => {
  const user = useSelector((state) => state.authReducer.user);
  if (!user) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Spinner
          style={{ width: "3rem", height: "3rem", color: "secondary" }}
          type="grow"
        />
      </div>
    );
  }

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <Posts />

      <Formm />
    </div>
  );
};

export default Dashboard;
