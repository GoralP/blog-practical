import React, { useState, useEffect } from "react";
import { Table, Button, Container, Row, Col } from "reactstrap";
import { Header, CategoriesModal } from "../components";
import { useDispatch, useSelector } from "react-redux";
import {
  allCategories,
  getSingleCategory,
  deleteCategory,
} from "../redux/categories/actions";
import { FaTrashAlt, FaPencilAlt, FaBlackTie } from "react-icons/fa";
import Moment from "react-moment";
import swal from "sweetalert";
import { Spin } from "antd";

const Categories = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [action, setAction] = useState();

  const dispatch = useDispatch();

  const { loading, categoriesData } = useSelector((state) => ({
    loading: state.categoryReducers.allCategories.loading,
    categoriesData: state.categoryReducers.allCategories.categoriesData,
  }));

  useEffect(() => {
    dispatch(allCategories());
  }, [dispatch]);

  const removeCategory = (id) => {
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
        dispatch(deleteCategory(id));
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
              onClick={() => {
                toggle();
                setAction("create");
              }}
              className="mt-3 create-button"
            >
              Create Category
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
                    <th>Description</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody className="">
                  {categoriesData !== null &&
                    categoriesData
                      .sort((a, b) =>
                        new Date(a.created_at) > new Date(b.created_at) ? -1 : 0
                      )
                      .map((category) => (
                        <tr>
                          <td>{category.title}</td>
                          <td>{category.slug}</td>
                          <td>{category.description}</td>
                          <td>
                            <Moment format="MMM DD, YYYY">
                              {category.created_at}
                            </Moment>
                          </td>
                          <td>
                            <Moment format="MMM DD, YYYY">
                              {category.updated_at}
                            </Moment>
                          </td>

                          <td>
                            <FaTrashAlt
                              onClick={() => removeCategory(category.id)}
                            />

                            <FaPencilAlt
                              className="ml-3"
                              onClick={() => {
                                toggle();
                                setAction("edit");
                                dispatch(getSingleCategory(category.id));
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
            <CategoriesModal
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

export default Categories;
