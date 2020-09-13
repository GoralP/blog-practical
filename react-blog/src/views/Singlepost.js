import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardImg,
  Row,
  Button,
  Tooltip,
} from "reactstrap";
import { Header } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePost } from "../redux/posts/actions";
import { useParams } from "react-router-dom";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaList, FaTags, FaArrowLeft } from "react-icons/fa";
import { Spin } from "antd";

const SinglePost = () => {
  const dispatch = useDispatch();

  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

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

      <Container className="home-bg " fluid={true}>
        <Container>
          <Row className="px-3 py-4 bg-white">
            {loading ? (
              <Spin size="large" className="mt-3" />
            ) : (
              <>
                {post !== null && (
                  <>
                    <Link to="/">
                      <FaArrowLeft id="hometooltip" className="home-icon" />
                      <Tooltip
                        placement="bottom"
                        isOpen={tooltipOpen}
                        toggle={toggle}
                        target="hometooltip"
                      >
                        Back to home
                      </Tooltip>
                    </Link>

                    <Card className="shadow mt-3 single-post-card">
                      <CardBody>
                        <CardTitle className="single-blog-title text-info">
                          {post.title}
                        </CardTitle>
                        <CardText>
                          <FaTags />
                          Tags :
                          {post.tags.map((tag) => (
                            <span className="tags-button bg-info font-weight-bold">
                              #{tag.title}
                            </span>
                          ))}
                          <FaList className="ml-1" /> Categories :
                          {post.categories.map((post) => (
                            <span className="tags-button bg-info font-weight-bold">
                              #{post.title}
                            </span>
                          ))}
                        </CardText>
                        <CardText>
                          by
                          <span className="font-weight-bold ml-1">
                            {post.user !== null && post.user.username}
                          </span>
                          <Moment
                            format="MMM DD, YYYY"
                            className="text-secondary ml-3"
                          >
                            {post.created_at}
                          </Moment>
                        </CardText>
                        <CardImg
                          className="home-card-image"
                          src={
                            post.featured_media &&
                            `https://infblogdemo.herokuapp.com${post.featured_media.url}`
                          }
                        ></CardImg>
                        <CardText className="card-text mt-2">
                          {post.content}
                        </CardText>
                      </CardBody>
                    </Card>
                  </>
                )}
              </>
            )}
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default SinglePost;
