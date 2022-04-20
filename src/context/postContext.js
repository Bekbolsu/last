import React, { useReducer, useState } from "react";
import axios from "axios";
export const postContext = React.createContext();

let API = "http://3.82.224.241/api/v1/";
const INIT_STATE = {
  post: [],
  onePost: null,
  pages: 0,
  count: 0,
  myPosts: [],
};
const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_POST":
      return {
        ...state,
        post: action.payload.results,
        pages: Math.ceil(action.payload.count / 5),
      };
    case "GET_ONE_POST":
      // console.log(action);
      return {
        ...state,
        onePost: action.payload,
      };
    case "INCREMENT":
      return {
        count: action.payload,
      };
    case "GET_MY_POST":
      return {
        ...state,
        myPosts: action.payload,
      };

    default:
      return state;
  }
};

const PostContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  async function getPost() {
    let { data } = await axios.get(`${API}post/` + window.location.search);
    console.log(data);
    dispatch({
      type: "GET_POST",
      payload: data,
    });
  }

  async function getMyPosts() {
    // let { data } = await axios.get(`${API}post/` + window.location.search);
    let token = JSON.parse(localStorage.getItem("token"));
    const Authorization = `Bearer ${token.access}`;

    let { data } = await axios.get(`${API}post/my_posts/`, {
      headers: { Authorization },
    });

    console.log(data);
    dispatch({
      type: "GET_MY_POST",
      payload: data,
    });
  }
  async function addPost(newObj) {
    const formData = new FormData();
    formData.append("title", newObj.title);
    formData.append("img", newObj.img);

    formData.append("description", newObj.description);

    let res = await axios.post(`${API}post/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("token")).access
        }`,
      },
    });
    console.log(res);
    getPost();
  }
  async function deletePost(id) {
    const Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("token")).access
    }`;
    // const Authorization = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUwNDMxODEzLCJpYXQiOjE2NTA0MjgyMTMsImp0aSI6IjI1ZWNjNjg1Zjc2YjQzMDM5NjI0NTM2M2JhNWViOTc0IiwidXNlcl9pZCI6ImFkbWluQGFkbWluLmNvbSJ9.-O9t64keFfK6lp5VwflAEU1zaXnr55tC_xQMNxzKeWM`;
    await axios.delete(`${API}post/${id}/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization,
      },
    });

    getPost();
    getMyPosts();
  }
  async function updatePost(id, edited) {
    // console.log(edited);
    //console.log(`it is id`, id);
    let formData = new FormData();
    formData.append("title", edited.title);
    formData.append("description", edited.description);
    //let newObj = {
    //  title: edited.title,
    // img: edited.img,
    //description: edited.description,
    //};
    const Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("token")).access
    }`;
    //console.log(Authorization);
    //console.log(newObj);
    await axios.patch(`${API}post/${id}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization,
      },
    });
    getPost();
  }

  async function getOnePost(id) {
    let { data } = await axios.get(`${API}post/${id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("token")).access
        }`,
      },
    });
    dispatch({
      type: "GET_ONE_POST",
      payload: data,
    });
  }

  function counter() {
    let count = count;
    dispatch({
      type: "INCREMENT",
      payload: count++,
    });
  }

  // async function getComments() {
  //   let token = JSON.parse(localStorage.getItem("token"));
  //   const Authorization = `Bearer ${token.access}`;

  //   let { data } = await axios.get(`${API}comment/`, {
  //     headers: { Authorization },
  //   });

  //   console.log(data);
  // }
  // async function addComments(newObj) {
  //   let token = JSON.parse(localStorage.getItem("token"));
  //   const Authorization = `Bearer ${token.access}`;

  //   let { data } = await axios.post(`${API}comment/`, newObj, {
  //     headers: { Authorization },
  //   });

  //   console.log(data);
  // }

  return (
    <postContext.Provider
      value={{
        post: state.post,
        onePost: state.onePost,
        pages: state.pages,
        count: state.count,
        myPosts: state.myPosts,
        addPost,
        getPost,
        deletePost,
        getOnePost,
        updatePost,
        counter,
        getMyPosts,
      }}
    >
      {children}
    </postContext.Provider>
  );
};
export default PostContextProvider;
