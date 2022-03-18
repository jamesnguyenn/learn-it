import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import playIcon from "../../assets/play-btn.svg";
import editIcon from "../../assets/pencil.svg";
import deleteIcon from "../../assets/trash.svg";
import { PostsContext } from "../../contexts/PostsContext";
function ActionButton({ url, _id }) {
  //Context
  const { deletePost, findPost, setActiveUpdateModal } = useContext(
    PostsContext
  );
  const handleChoosePost = () => {
    findPost(_id);
    setActiveUpdateModal(true);
  };
  return (
    <>
      <Button className="post-button" href={url} target="_blank">
        <img src={playIcon} alt="playIcon" width="30" height="32" />
      </Button>
      <Button className="post-button" onClick={handleChoosePost}>
        <img src={editIcon} alt="editIcon" width="20" height="24" />
      </Button>
      <Button
        className="post-button"
        onClick={() => {
          deletePost(_id);
        }}
      >
        <img src={deleteIcon} alt="deleteIcon" width="20" height="24" />
      </Button>
    </>
  );
}

export default ActionButton;
