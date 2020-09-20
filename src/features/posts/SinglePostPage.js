import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectPostById, deletePost } from "./postSlice";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { unwrapResult } from '@reduxjs/toolkit';

export const SinglePostPage = ({ match }) => {
  const { postId } = match.params;
  const post = useSelector(state => selectPostById(state, postId));
  const dispatch = useDispatch();
  const history = useHistory();


  if (!post) {
    return (
      <section>
        <h2>Page Not Found</h2>
      </section>
    )
  }

  const handleDelete = async () => {
    try {
      const resultAction = await dispatch(deletePost(postId));
      unwrapResult(resultAction);
    } catch (err) {
      console.log('Failed to delete the post', err);
    } finally {
      history.push(`/posts`);
    }
  }

  return (
    <section style={{ maxWidth: "1020px", margin: 'auto' }} className="m-auto p-3">
      <article>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <Link to={`/edit-post/${post.id}`}>Edit Post</Link>
        <br />
        <Button onClick={handleDelete}>Delete</Button>
      </article>
    </section>
  )
}