import React, { useState, useEffect } from "react";
import { Table, Button, Container, Row } from "reactstrap";
import { Header, PostModal } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { allPosts, getSinglePost, deletePost } from "../redux/posts/actions";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import Moment from "react-moment";
import { Spin } from "antd";

const Posts = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [action, setAction] = useState();

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

      <Container fluid className="home-bg">
        <Row className="shadow mx-1  bg-white">
          <Button
            color="info"
            onClick={() => {
              toggle();
              setAction("create");
            }}
            className="mt-3 create-button"
          >
            Create Post
          </Button>

          <Table className="mt-3 border table-layout">
            <thead>
              <tr className="table-heading">
                <th>Title</th>
                <th>Slug</th>
                <th>Content</th>
                <th>Username</th>
                <th>Categories</th>
                <th>Tags</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody className="">
              {loading ? (
                <Spin size="large" className="mt-3" />
              ) : (
                <>
                  {posts !== null &&
                    posts
                      .sort((a, b) =>
                        new Date(a.created_at) > new Date(b.created_at) ? -1 : 0
                      )
                      .map((item) => (
                        <tr>
                          <td>{item.title}</td>
                          <td>{item.slug}</td>
                          <td>{item.content}</td>
                          <td>{item.user && item.user.username}</td>
                          <td>
                            {item.categories.map((catagory) => (
                              <>{catagory.title}</>
                            ))}
                          </td>
                          <td>
                            {item.tags.map((tag) => (
                              <>{tag.title}</>
                            ))}
                          </td>
                          <td>
                            <Moment format="MMMM DD, YYYY">
                              {item.created_at}
                            </Moment>
                          </td>
                          <td>
                            <Moment format="MMMM DD, YYYY">
                              {item.updated_at}
                            </Moment>
                          </td>

                          <td>
                            <FaTrashAlt
                              onClick={() => {
                                dispatch(deletePost(item.id));
                              }}
                            />

                            <FaPencilAlt
                              className="ml-3"
                              onClick={() => {
                                toggle();
                                setAction("edit");
                                dispatch(getSinglePost(item.id));
                              }}
                            />
                          </td>
                        </tr>
                      ))}
                </>
              )}
            </tbody>
          </Table>

          {modal && (
            <PostModal
              modal={modal}
              action={action}
              setModal={setModal}
              toggle={toggle}
            />
          )}
        </Row>
      </Container>
    </>
  );
};

export default Posts;
