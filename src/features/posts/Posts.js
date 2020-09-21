import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
export const Posts = ({ posts }) => {
  return (
    <div className="posts-block">
      {
        posts.map(post => {
          return (
            <Card className="post-card" key={post.id}>
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