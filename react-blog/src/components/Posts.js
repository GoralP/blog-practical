import React, { useState, useEffect } from "react";
import { Table, Button, Container, Row, Col } from "reactstrap";
import { Header, PostModal } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { allPosts, getSinglePost, deletePost } from "../redux/posts/actions";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import Moment from "react-moment";
import swal from "sweetalert";
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

  const removePost = (id) => {
    swal({
      title: "Are you sure?",
      text: "You will not be able to recover this record file! !",
      icon: "warning",
      closeOnClickOutside: false,
      closeOnEsc: false,
      buttons: {
        no: {
          text: "Cancel",
          value: "no",
          className: "sweet-cancel btn-center",
        },
        yes: {
          text: "Yes, delete it!",
          value: "yes",
          className: "sweet-warning btn-center",
        },
      },
    }).then((value) => {
      if (value === "yes") {
        dispatch(deletePost(id));
        swal({
          title: "Deleted!",
          text: "Your record has been deleted.",
          icon: "success",
          closeOnClickOutside: false,
          closeOnEsc: false,
          buttons: {
            ok: {
              text: "Ok",
              className: "sweet-ok swal-footer",
            },
          },
        });
      }
      return false;
    });
  };

  return (
    <>
      <Header></Header>

      <Container fluid className="home-bg">
        <Row className="shadow mx-1  bg-white">
          <Col xs="12">
            <Button
              color="primary"
              onClick={() => {
                toggle();
                setAction("create");
              }}
              className="mt-3 create-button"
            >
              Create Post
            </Button>
          </Col>
          <Col xs="12">
            {loading ? (
              <Spin size="large" className="mt-3" />
            ) : (
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
                            <Moment format="MMM DD, YYYY">
                              {item.created_at}
                            </Moment>
                          </td>
                          <td>
                            <Moment format="MMM DD, YYYY">
                              {item.updated_at}
                            </Moment>
                          </td>

                          <td>
                            <FaTrashAlt onClick={() => removePost(item.id)} />

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
                </tbody>
              </Table>
            )}
          </Col>

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
