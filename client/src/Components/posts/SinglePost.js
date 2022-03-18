import React from "react";
import Card from "react-bootstrap/CardHeader";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import ActionButtons from "./ActionButton";
function SinglePost({ post: { _id, status, title, description, url } }) {
  return (
    <Card
      className="shadow"
      border={
        status === "LEARNED"
          ? "success"
          : status === "LEARNING"
          ? "warning"
          : "danger"
      }
    >
      <div className="card-body">
        <div className="card-title">
          <Row>
            <Col>
              <p className="post-title">{title}</p>
              <Badge
                pill
                variant={
                  status === "LEARNED"
                    ? "success"
                    : status === "LEARNING"
                    ? "warning"
                    : "danger"
                }
                bg={
                  status === "LEARNED"
                    ? "success"
                    : status === "LEARNING"
                    ? "warning"
                    : "danger"
                }
              >
                {status}
              </Badge>
            </Col>
            <Col className="text-right button-right">
              <ActionButtons url={url} _id={_id} />
            </Col>
          </Row>
        </div>
        <p className="card-text">{description}</p>
      </div>
    </Card>
  );
}

export default SinglePost;
