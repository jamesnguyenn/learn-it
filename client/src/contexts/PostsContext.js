import React, { createContext, useReducer, useState } from "react";
import { postsReducer } from "../reducers/postsReducer";
import {
  ADD_POST,
  apiURL,
  DELETE_POST,
  FIND_POST,
  POST_LOADED_FAILED,
  POST_LOADED_SUCCESS,
  UPDATE_POST,
} from "./constants";
import axios from "axios";

export const PostsContext = createContext();

function PostsContextProvider({ children }) {
  //State
  const [postsData, dispatch] = useReducer(postsReducer, {
    postItem: null,
    posts: [],
    postsLoading: true,
  });
  const [activeModal, setActiveModal] = useState(false);
  const [activeUpdateModal, setActiveUpdateModal] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    messages: "",
    type: "",
  });

  //Get all posts
  const getAllPosts = async () => {
    try {
      const response = await axios.get(`${apiURL}/posts`);
      if (response.data.success) {
        dispatch({
          type: POST_LOADED_SUCCESS,
          payload: response.data.posts,
        });
      }
    } catch (e) {
      dispatch({
        type: POST_LOADED_FAILED,
      });
    }
  };

  //Add Post
  const addPost = async (newPost) => {
    try {
      const response = await axios.post(`${apiURL}/posts`, newPost);
      if (response.data.success) {
        dispatch({ type: ADD_POST, payload: response.data.post });
      }
      return response.data;
    } catch (e) {
      return e.response.data
        ? e.response.data
        : { success: false, message: "Internal Server Error" };
    }
  };

  //Delete Post
  const deletePost = async (postID) => {
    try {
      const response = await axios.delete(`${apiURL}/posts/${postID}`);
      if (response.data.success) {
        dispatch({ type: DELETE_POST, payload: postID });
      }
    } catch (e) {
      console.log(e);
    }
  };

  //Find post when user is updating post
  const findPost = (postID) => {
    const post = postsData.posts.find((item) => item._id === postID);
    dispatch({
      type: FIND_POST,
      payload: post,
    });
  };

  //Update Post
  const updatePost = async (updatePost) => {
    try {
      const response = await axios.put(
        `${apiURL}/posts/${updatePost._id}`,
        updatePost
      );
      if (response.data.success) {
        dispatch({ type: UPDATE_POST, payload: response.data.updatedPost });
      }
      return response.data;
    } catch (e) {
      return e.response.data
        ? e.response.data
        : { success: false, message: "Internal Server Error" };
    }
  };

  const postsContextData = {
    getAllPosts,
    postsData,
    activeModal,
    setActiveModal,
    addPost,
    showToast,
    setShowToast,
    deletePost,
    updatePost,
    findPost,
    activeUpdateModal,
    setActiveUpdateModal,
  };
  return (
    <PostsContext.Provider value={postsContextData}>
      {children}
    </PostsContext.Provider>
  );
}

export default PostsContextProvider;
