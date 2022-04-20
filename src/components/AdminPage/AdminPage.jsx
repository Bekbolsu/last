import React, { useContext, useEffect, useState } from "react";
import "./AdminPage.css";
import image6 from "../images/man.svg";
import image7 from "../images_add/publish.svg";

import { postContext } from "../../context/postContext";
import { Link, useSearchParams } from "react-router-dom";
import { authContext, useAuthContext } from "../../context/authContext";
import { Button } from "@mui/material";

const AdminPage = () => {
  const { user } = useContext(authContext);
  const { getUser } = useAuthContext();
  const {
    myPosts: post,
    getMyPosts,
    deletePost,
    count,
    pages,
  } = useContext(postContext);
  useEffect(() => {
    getMyPosts();
    getUser();
  }, []);
  //console.log(post);
  const [page, setPage] = useState(1);
  const [searchParams, setSearchparams] = useSearchParams();
  console.log(post);
  useEffect(() => {
    setSearchparams({
      page,
    });
  }, [page]);
  useEffect(() => {
    getMyPosts();
  }, [searchParams]);
  useEffect(() => {
    getMyPosts();
  }, []);
  return !post ? null : (
    <div className="admin">
      <div className="admin_inner">
        <div className="admin_block1">
          <img className="admin_img" src={image6}></img>
          <h1 className="beka1">{user}</h1>
        </div>
        <div className="admin_block2">
          <img className="publish" src={image7} alt="" />
          <h2 className="publish_title">PUBLISHED IDEAS</h2>
        </div>
      </div>
      <div className="main_list2">
        {post.map((item) => (
          <div key={item.id}>
            <div className="list1 admin_post">
              <img className="list_img1" src={item.img} alt="" />
              <div className="list_div">
                <h1 className="list_h11">{item.title}</h1>
                <p className="list_p1">{item.description}</p>
              </div>
              <div className="buttons">
                <button
                  onClick={() => deletePost(item.id)}
                  className="admin_btn"
                >
                  Delete
                </button>
                <Link to={`/edit/${item.id}`}>
                  <button className="admin_btn">Edit</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
        <div className="pagination">
          <div>
            <Button
              className="prev"
              disabled={page === 1 ? true : false}
              onClick={() => setPage(page - 1)}
            >
              prev
            </Button>
            <span style={{ color: "white" }}>{page}</span>

            <Button
              disabled={page === pages ? true : false}
              className="next"
              onClick={() => setPage(page + 1)}
            >
              next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
