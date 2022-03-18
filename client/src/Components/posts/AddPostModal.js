import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { PostsContext } from "../../contexts/PostsContext";
function AddPostModal() {
  //Context
  const { activeModal, setActiveModal, addPost, setShowToast } = useContext(
    PostsContext
  );

  //State
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    url: "",
    status: "TO LEARN",
  });

  const { title, description, url } = newPost;

  const handleOnChangeNewPost = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handleCloseModal = () => {
    resetAddPostData();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { message, success } = await addPost(newPost);

    resetAddPostData();
    setShowToast({
      type: success ? "success" : "danger",
      messages: message,
      show: true,
    });
  };

  const resetAddPostData = () => {
    setNewPost({
      title: "",
      description: "",
      url: "",
      status: "TO LEARN",
    });
    setActiveModal(false);
  };

  return (
    <Modal show={activeModal} onHide={handleCloseModal} onSubmit={onSubmit}>
      <Modal.Header closeButton>
        <Modal.Title>What do you want to learn?</Modal.Title>
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
              onChange={handleOnChangeNewPost}
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
              onChange={handleOnChangeNewPost}
            />
          </Form.Group>
          <Form.Group className="my-3">
            <Form.Control
              type="text"
              row={3}
              placeholder="Your URL..."
              name="url"
              value={url}
              onChange={handleOnChangeNewPost}
            />
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

export default AddPostModal;
