import React, { useState } from "react";
import base64 from "react-file-input-previews-base64";

import EditPostModal from "./editPostModal";
//useselctor
import { useDispatch, useSelector } from "react-redux";
import { deletepp, likeupdate } from "../../../js/actions/postActions";
import { bloke_user } from "../../../js/actions/authActions";
import {
  Card,
  Button,
  CardImg,
  CardTitle,
  Badge,
  CardDeck,
  CardSubtitle,
  CardBody,
} from "reactstrap";
const Post = ({ e }) => {
  const user = useSelector((state) => state.authReducer.user);
  const isAuth = useSelector((state) => state.authReducer.isAuth);

  //console.log(user._id);
  //console.log(e._id);
  const dispatch = useDispatch();
  const handldelete = () => {
    // console.log("handledelte");
    dispatch(deletepp(e._id, user._id));
  };
  //like disoatch
  const handllike = () => {
    isAuth && dispatch(likeupdate(e._id, user._id));
  };

  const handlbloke = () => {
    dispatch(bloke_user(user._id, e.userid));
  };

  return (
    <CardDeck style={{ width: "430px", marginBottom: "20px" }}>
      <Card>
        <>
          {isAuth && user.admin === true && (
            <Button onClick={handlbloke}>Bloke User Post</Button>
          )}
          {isAuth && user.admin === true && (
            <Button onClick={handldelete}>Delete this Post</Button>
          )}
        </>

        {/* // bech tarja3 */}
        {e.photo && (
          <CardImg
            style={{
              width: "400px",
              height: "300px",
            }}
            src={e.photo.file_arr.base64}
            alt={e.photo}
          />
        )}
        <CardBody></CardBody>
        <CardBody>
          <CardTitle tag="h5">creator:{e.creator}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            email: {e.email}
          </CardSubtitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            name ref : {e.name_ref}
          </CardSubtitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            marque : {e.marque}
          </CardSubtitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            tags :#{e.tags.split(" ").join("#")}
          </CardSubtitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            prix : {e.prix}
          </CardSubtitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            description:{e.description}
          </CardSubtitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            review video:
            <Badge href={e.review_video} target="_blank" color="info">
              show video
            </Badge>
          </CardSubtitle>

          <CardSubtitle tag="h6" className="mb-2 text-muted">
            game played: {e.game_played}
          </CardSubtitle>

          <CardSubtitle tag="h6" className="mb-2 text-muted">
            Date creation poste: {e.date_post.slice(0, 10)}
          </CardSubtitle>

          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              // border: "1px solid blue",
              borderRadius: "5px",
            }}
          >
            <Button onClick={handllike} outline color="info">
              like :{e.like}
            </Button>
            {isAuth && e.userid == user._id && <EditPostModal e={e} />}
            {isAuth && e.userid == user._id && (
              <Button onClick={handldelete}>Delete Post</Button>
            )}
          </div>
        </CardBody>
      </Card>
    </CardDeck>
  );
};

export default Post;
