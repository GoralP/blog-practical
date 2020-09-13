import React, { useEffect } from "react";
import { Button, Container, Row, Col } from "reactstrap";
import { Header } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { allPosts } from "../redux/posts/actions";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { Spin } from "antd";
import { FaUser, FaCalendarAlt, FaList, FaTags } from "react-icons/fa";

const Home = () => {
  const dispatch = useDispatch();

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

      <Container className="home-bg " fluid={true}>
        {loading ? (
          <Spin size="large" className="mt-3" />
        ) : (
          <>
            {posts !== null &&
              posts
                .sort((a, b) =>
                  new Date(a.created_at) > new Date(b.created_at) ? -1 : 0
                )
                .map((post) => (
                  <Row className="card">
                    <Col
                      sm="12"
                      className="text-info font-weight-bold card-title-size"
                    >
                      {post.title}
                    </Col>
                    <Col sm="12" className="my-2">
                      <Row>
                        <Col sm="2">
                          <img
                            alt="Blog"
                            className="home-card-image"
                            src={
                              post.featured_media &&
                              `https://infblogdemo.herokuapp.com${post.featured_media.url}`
                            }
                          />
                        </Col>

                        <Col sm="9">
                          <p className="line-clamp "> {post.content}</p>

                          <Button className="read-more-button">
                            <Link
                              className="read-more-text"
                              to={`${post.slug}-${post.id}`}
                            >
                              Read More
                            </Link>
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                    <Col sm="12">
                      <FaUser /> by
                      <span className="text-info mx-1">
                        {post.user && post.user.username}
                      </span>
                      |
                      <FaCalendarAlt className="mx-1" />{" "}
                      <Moment format="MMM DD O, YYYY">{post.created_at}</Moment>{" "}
                      |
                      <FaList className="mx-1" /> Categories :
                      {post.categories.map((catagory) => (
                        <span className="tags-button bg-info font-weight-bold">
                          {catagory.title}
                        </span>
                      ))}
                      <span className="ml-1">|</span> <FaTags mx-1 />
                      Tags :
                      {post.tags.map((tag) => (
                        <span className="tags-button bg-info font-weight-bold">
                          {tag.title}
                        </span>
                      ))}
                    </Col>
                  </Row>
                ))}
          </>
        )}
      </Container>
    </>
  );
};

export default Home;
