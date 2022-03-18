import React, { useContext, useEffect } from "react";
import { PostsContext } from "../contexts/PostsContext";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Toast from "react-bootstrap/Toast";
import { AuthContext } from "../contexts/AuthContext";
import SinglePost from "../Components/posts/SinglePost";
import AddPostModal from "../Components/posts/AddPostModal";
import addIcons from "../assets/plus-circle-fill.svg";
import UpdatePostModal from "../Components/posts/UpdatePostModal";

function Dashboard() {
  const {
    getAllPosts,
    postsData: { postItem, posts, postsLoading },
    setActiveModal,
    showToast: { show, messages, type },
    setShowToast,
  } = useContext(PostsContext);

  const {
    auth: {
      user: { username },
    },
  } = useContext(AuthContext);

  //Start: Get all posts
  useEffect(() => getAllPosts(), []);

  let body = null;
  if (postsLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (posts.length === 0) {
    body = (
      <div className="card text-center mx-5 my-5">
        <div className="card-header">Hi {`${username}`} </div>
        <div className="card-body">
          <h5 className="card-title">Welcome to Learn It</h5>
          <p className="card-text">
            Click the button below to track your first skill to learn
          </p>
          <Button variant="primary" onClick={() => setActiveModal(true)}>
            Learn It!
          </Button>
        </div>
      </div>
    );
  } else {
    body = (
      <>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
          {posts.map((post) => (
            <Col key={post._id} className="my-2">
              <SinglePost post={post} />
            </Col>
          ))}
        </Row>
        {/* Open Add Post Modal */}
        <Button
          className="btn-floating"
          onClick={() => {
            setActiveModal(true);
          }}
        >
          <img src={addIcons} alt="addIcon" width="40" height="40"></img>
        </Button>
      </>
    );
  }

  return (
    <>
      {body}
      <AddPostModal />
      {postItem !== null && <UpdatePostModal />}
      <Toast
        show={show}
        style={{ position: "fixed", top: "20px", right: "10px" }}
        className={`bg-${type} text-white`}
        onClose={() =>
          setShowToast({
            show: false,
            message: "",
            type: null,
          })
        }
        delay={3000}
        autohide
      >
        <Toast.Body>{messages}</Toast.Body>
      </Toast>
    </>
  );
}

export default Dashboard;
