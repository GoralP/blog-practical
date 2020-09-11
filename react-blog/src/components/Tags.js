import React, { useState, useEffect } from "react";
import { Table, Button, Container, Row, Card, Col } from "reactstrap";
import { Header, TagsModal } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { allTags, getSingleTag, deleteTag } from "../redux/tags/actions";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import Moment from "react-moment";

import { Spin } from "antd";

const Tags = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [action, setAction] = useState();

  const dispatch = useDispatch();

  const { loading, tags } = useSelector((state) => ({
    loading: state.tagReducers.allTags.loading,
    tags: state.tagReducers.allTags.tags,
  }));

  useEffect(() => {
    dispatch(allTags());
  }, [dispatch]);

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
              Create Tag
            </Button>
          </Col>
          <Col xs="12">
            {loading ? (
              <Spin size="large" className="mt-3" />
            ) : (
              <Table className="mt-3 border table-layout">
                <thead className="table-heading">
                  <tr>
                    <th>Title</th>
                    <th>Slug</th>
                    <th>Description</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody className="">
                  {tags !== null &&
                    tags
                      .sort((a, b) =>
                        new Date(a.created_at) > new Date(b.created_at) ? -1 : 0
                      )
                      .map((item) => (
                        <tr>
                          <td>{item.title}</td>
                          <td>{item.slug}</td>
                          <td>{item.description}</td>
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
                                dispatch(deleteTag(item.id));
                              }}
                            />

                            <FaPencilAlt
                              className="ml-3"
                              onClick={() => {
                                toggle();
                                setAction("edit");
                                dispatch(getSingleTag(item.id));
                              }}
                            />
                          </td>
                        </tr>
                      ))}
                </tbody>
              </Table>
            )}
            {modal && (
              <TagsModal
                modal={modal}
                action={action}
                setModal={setModal}
                toggle={toggle}
              />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Tags;
