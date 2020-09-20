import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
export const Posts = ({ posts }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridAutoRows: 'max-content', gridGap: "3rem" }}>
      {
        posts.map(post => {
          return (
            <Card style={{ width: '18rem', minHeight: '320px' }} key={post.id}>
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>
                  {post.body.substring(0, 100)}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Link to={`/posts/${post.id}`}>View Post</Link>
              </Card.Footer>
            </Card>
          )
        })
      }
    </div>
  )
}