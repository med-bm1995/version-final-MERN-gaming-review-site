import React from "react";
import { Card, Button, CardTitle, CardText } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { bloke_user } from "../../js/actions/authActions";
function User({ e }) {
  const user = useSelector((state) => state.authReducer.user);

  const dispatch = useDispatch();
  const handlbloke = () => {
    dispatch(bloke_user(user._id, e._id));
  };
  return (
    <Card
      body
      inverse
      color="danger"
      style={{ width: "130px", marginBottom: "20px" }}
    >
      <CardTitle tag="h5">{e.name}</CardTitle>
      <CardTitle tag="h5">{e.lastName}</CardTitle>
      <CardText>{e.email}</CardText>
      <Button color="secondary" onClick={handlbloke}>
        {e.bloked === false ? "user not blokeD" : "user blocked"}
      </Button>
    </Card>
  );
}

export default User;
