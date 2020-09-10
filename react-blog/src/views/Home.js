import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Card,
  CardText,
  CardBody,
  CardTitle,
  Row,
} from "reactstrap";
import { Header } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { allPosts } from "../redux/posts/actions";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const Home = () => {
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  const { loading, posts } = useSelector((state) => ({
    loading: state.postReducers.allPosts.loading,
    posts: state.postReducers.allPosts.posts,
  }));

  useEffect(() => {
    dispatch(allPosts());
  }, [dispatch]);

  return (
    <>
      <Header></Header>
      <Container className="home-bg" fluid={true}>
        {loading ? (
          <Row>Loading...</Row>
        ) : (
          <>
            {posts !== null &&
              posts
                .sort((a, b) =>
                  new Date(a.created_at) > new Date(b.created_at) ? -1 : 0
                )
                .map((item) => (
                  <Row>
                    <Card className="card shadow mt-1">
                      <CardBody>
                        <Link to={`${item.id}`}>
                          <CardTitle>Title : {item.title}</CardTitle>
                        </Link>
                        <CardText className="card-text">
                          slug:{item.slug}
                        </CardText>
                        <CardText className="text-secondary card-text">
                          create:
                          <Moment
                            format="MMMM DD, YYYY"
                            className="font-weight-bold"
                          >
                            {item.created_at}
                          </Moment>
                        </CardText>
                        <CardText className="text-secondary card-text">
                          update:
                          <Moment
                            format="MMMM DD, YYYY"
                            className="font-weight-bold"
                          >
                            {item.updated_at}
                          </Moment>
                        </CardText>

                        <CardText className="text-secondary card-text">
                          category:
                          {item.categories.map((catagory) => (
                            <>{catagory.title}</>
                          ))}
                        </CardText>

                        <CardText className="card-text">
                          {item.tags.map((tag) => (
                            <>tag:{tag.title}</>
                          ))}
                        </CardText>
                        <CardText className="card-text div-line">
                          content:{item.content}
                        </CardText>
                      </CardBody>
                    </Card>
                  </Row>
                ))}
          </>
        )}
      </Container>
    </>
  );
};

export default Home;
