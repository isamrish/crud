import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updatePost, selectPostById } from "./postSlice";
export const EditPostPage = ({ match }) => {
  const { postId } = match.params;

  const post = useSelector(state => selectPostById(state, postId));
  const [title, SetTitle] = useState(post.title);
  const [body, SetBody] = useState(post.body);

  const [isError, SetError] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleTitle = (e) => {
    SetTitle(e.target.value);
  }

  const handleBody = (e) => {
    SetBody(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === '' || body === '') {
      SetError(true);
    } else {
      dispatch(updatePost({ id: postId, title, body }));
      history.push(`/posts/${postId}`);
    }

  }

  return (
    <div className="add-post-form">
      <h2>Edit post</h2>
      <div>
        {
          isError ? <p className="text-danger">Either title or body is empty</p> : null
        }
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="Title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Title..." value={title} onChange={handleTitle} />
        </Form.Group>

        <Form.Group controlId="Body">
          <Form.Label>Body</Form.Label>
          <Form.Control as="textarea" cols="5" rows="10" type="text" placeholder="Body..." value={body} onChange={handleBody} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Edit Post
        </Button>
      </Form>
    </div>
  )
}