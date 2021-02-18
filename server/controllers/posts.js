import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";
import User from "../models/User.js";
export const getPosts = async (req, res) => {
  try {
    const postMessage = await PostMessage.find();
    res.send(postMessage);
  } catch (error) {
    res.status(500).send({ msg: "daata noted fetcheD", error });
  }
};

export const creatPosts = async (req, res) => {
  const body = req.body;
  const userid = req.body.userid;
  try {
    //tjeso bloke wala le :p
    const postuserid = await User.findById(userid);
    if (postuserid.bloked === false) {
      const newPost = new PostMessage(body);
      await newPost.save();
      res.status(200).json({ msg: "post createD", newPost });
    } else {
      res.send("user bloked");
    }
  } catch (error) {
    res.status(500).send({ msg: "post not createD", error });
  }
};
//c bon
export const editPosts = async (req, res) => {
  const _id = req.params.postid;
  const post = req.body;
  const userid = req.body.userid;
  try {
    // if (!mongoose.Types.ObjectId.isValid(_id))
    // return res.status(404).send("no post with this id");

    const updatepost = await PostMessage.findByIdAndUpdate(_id, post, {
      new: true,
    });
    res.status(200).json({ msg: "post UPdateD", updatepost });
  } catch (error) {
    res.status(500).send({ msg: "post not updateD", error });
  }
};

export const likeupdate = async (req, res) => {
  const _id = req.params.postid;
  const userid = req.params.test;

  try {
    const postidd = await PostMessage.findById(_id);
    const index = postidd.likesid.findIndex((_id) => _id === String(userid));
    console.log(index);
    if (index === -1) {
      const test = await PostMessage.findByIdAndUpdate(
        _id,
        { $push: { likesid: userid } },
        {
          new: true,
        }
      );
      const updatlikeepost = await PostMessage.findByIdAndUpdate(
        _id,
        { like: postidd.like + 1 },
        {
          new: true,
        }
      );
      res.status(200).json({ msg: "like UPdateD", updatlikeepost, test });
    } else {
      if (postidd.like >= 0) {
        const dislike = await PostMessage.findByIdAndUpdate(
          _id,
          { like: postidd.like - 1 },
          {
            new: true,
          }
        );

        const test = await PostMessage.findByIdAndUpdate(
          _id,
          {
            $filter: {
              likesid: postidd.likesid.filter((_id) => _id !== String(userid)),
            },
          },
          {
            new: true,
          }
        );
        console.log("5edmet");
      }

      res.status(200).json({ msg: "dislike UPdateD", dislike });
    }
  } catch (error) {
    res.status(500).send({ msg: "like not detecteD" });
  }
};

export const deletePosts = async (req, res) => {
  const id = req.params.postid; //id post
  const userid = req.body.userid; // id user

  try {
    //  let user = await User.findOne({ userid });
    // let postuserid = await PostMessage.findById(id);
    //if (postuserid.userid == userid) {
    const post = await PostMessage.findByIdAndDelete(id);
    //console.log(post);
    res.status(200).json({ msg: "post deleteD", post });
    //}
  } catch (error) {
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    // res.status(404).send("NO poste with this id");
    //}
    console.log(error);
    res.status(500).send({ msg: "PosT noT deleTeD", error });
  }
};
