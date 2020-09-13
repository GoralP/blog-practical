import React, { useState, useEffect } from "react";
import { Table, Button, Container, Row, Col, Tooltip } from "reactstrap";
import { Header, TagsModal } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { allTags, getSingleTag, deleteTag } from "../redux/tags/actions";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import Moment from "react-moment";
import swal from "sweetalert";
import { Spin } from "antd";

const Tags = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [action, setAction] = useState();

  const dispatch = useDispatch();

  const { loading, tagsData } = useSelector((state) => ({
    loading: state.tagReducers.allTags.loading,
    tagsData: state.tagReducers.allTags.tagsData,
  }));

  useEffect(() => {
    dispatch(allTags());
  }, [dispatch]);

  const removeTag = (id) => {
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
        dispatch(deleteTag(id));
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
                  {tagsData !== null &&
                    tagsData
                      .sort((a, b) =>
                        new Date(a.created_at) > new Date(b.created_at) ? -1 : 0
                      )
                      .map((tag) => (
                        <tr>
                          <td>{tag.title}</td>
                          <td>{tag.slug}</td>
                          <td>{tag.description}</td>
                          <td>
                            <Moment format="MMM DD, YYYY">
                              {tag.created_at}
                            </Moment>
                          </td>
                          <td>
                            <Moment format="MMM DD, YYYY">
                              {tag.updated_at}
                            </Moment>
                          </td>

                          <td>
                            <FaTrashAlt onClick={() => removeTag(tag.id)} />
                            <FaPencilAlt
                              className="ml-3"
                              onClick={() => {
                                toggle();
                                setAction("edit");
                                dispatch(getSingleTag(tag.id));
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
