import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { addPost, addNewPost } from "./postSlice"
import { unwrapResult } from '@reduxjs/toolkit'
export const AddPost = () => {

  const [title, SetTitle] = useState('');
  const [body, SetBody] = useState('');

  const [isError, SetError] = useState(false);
  const [addRequestStatus, setAddRequestStatus] = useState('idle')


  const canSave = [title, body].every(Boolean) && addRequestStatus === 'idle'

  const dispatch = useDispatch();

  const handleTitle = (e) => {
    SetTitle(e.target.value);
  }

  const handleBody = (e) => {
    SetBody(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        setAddRequestStatus('pending');
        const resultAction = await dispatch(addNewPost({ id: nanoid(), title, body }));
        unwrapResult(resultAction);
        SetTitle('');
        SetBody('');
      } catch (err) {
        console.log('Failed to save post', err);
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

  return (
    <div className="add-post-form">
      <h2>Add New post</h2>
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
          Add
        </Button>
      </Form>
    </div>
  )
}