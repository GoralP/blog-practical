import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  CardText,
  CardBody,
  CardTitle,
  Row,
  Button,
} from "reactstrap";
import { Header } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePost } from "../redux/posts/actions";
import { useParams } from "react-router-dom";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const SinglePost = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { loading, post } = useSelector((state) => ({
    loading: state.postReducers.getSinglePost.loading,
    post: state.postReducers.getSinglePost.post,
  }));

  useEffect(() => {
    dispatch(getSinglePost(id));
  }, [dispatch, id]);

  return (
    <>
      <Header></Header>

      <Container>
        <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              {post !== null && (
                <Row>
                  <Link to="/">Back to home</Link>
                  <Card className="card-block">
                    <CardBody>
                      <CardTitle>{post.title}</CardTitle>

                      <CardText className="text-secondary card-text">
                        <Moment
                          format="MMMM DD, YYYY"
                          className="font-weight-bold"
                        >
                          {post.created_at}
                        </Moment>
                      </CardText>
                      <CardText className="card-text">
                        {post.created_by}
                      </CardText>
                      <CardText className="card-text">
                        {post.categories.map((catagory) => (
                          <>{catagory.title}</>
                        ))}
                      </CardText>
                      <CardText className="card-text">
                        {post.tags.map((catagory) => (
                          <>{catagory.title}</>
                        ))}
                      </CardText>
                      <CardText className="card-text">{post.content}</CardText>
                    </CardBody>
                  </Card>
                </Row>
              )}
            </>
          )}
        </div>
      </Container>
    </>
  );
};

export default SinglePost;
