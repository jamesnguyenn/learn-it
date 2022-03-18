import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { PostsContext } from "../../contexts/PostsContext";

function UpdatePostModal() {
  //Context
  const {
    postsData: { postItem },
    activeUpdateModal,
    setActiveUpdateModal,
    updatePost,
    setShowToast,
  } = useContext(PostsContext);

  //State
  const [updatedPost, setUpdatedPost] = useState(postItem);

  useEffect(() => {
    setUpdatedPost(postItem);
  }, [postItem]);

  const { title, description, url, status } = updatedPost;

  const handleOnChangeUpdatedPost = (e) => {
    setUpdatedPost({ ...updatedPost, [e.target.name]: e.target.value });
  };

  const handleCloseModal = () => {
    setActiveUpdateModal(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { message, success } = await updatePost(updatedPost);
    setActiveUpdateModal(false);
    // resetAddPostData();
    setShowToast({
      type: success ? "success" : "danger",
      messages: message,
      show: true,
    });
  };

  const resetAddPostData = () => {
    setUpdatedPost({
      title: "",
      description: "",
      url: "",
      status: "TO LEARN",
    });
    setActiveUpdateModal(false);
  };

  return (
    <Modal
      show={activeUpdateModal}
      onHide={handleCloseModal}
      onSubmit={onSubmit}
    >
      <Modal.Header closeButton>
        <Modal.Title>Making progress?</Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body>
          <Form.Group className="my-3">
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              required
              aria-describedby="title-help"
              value={title}
              onChange={handleOnChangeUpdatedPost}
            />
            <Form.Text id="title-help" muted required>
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group className="my-3">
            <Form.Control
              as="textarea"
              row={3}
              placeholder="Description..."
              name="description"
              value={description}
              onChange={handleOnChangeUpdatedPost}
            />
          </Form.Group>
          <Form.Group className="my-3">
            <Form.Control
              type="text"
              row={3}
              placeholder="Your URL..."
              name="url"
              value={url}
              onChange={handleOnChangeUpdatedPost}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="select"
              value={status}
              name="status"
              onChange={handleOnChangeUpdatedPost}
            >
              <option value="TO LEARN">TO LEARN</option>
              <option value="LEARNING">LEARNING</option>
              <option value="LEARNED">LEARNED</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default UpdatePostModal;
