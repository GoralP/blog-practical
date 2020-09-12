import React, { useEffect } from "react";
import { Table, Button, Container, Row, Card, Col } from "reactstrap";
import { Header } from ".";
import { useDispatch, useSelector } from "react-redux";
import { allCategories } from "../redux/categories/actions";

import { Spin } from "antd";

const CategoriesTitle = () => {
  const dispatch = useDispatch();

  const { loading, categories } = useSelector((state) => ({
    loading: state.categoryReducers.allCategories.loading,
    categories: state.categoryReducers.allCategories.categories,
  }));

  useEffect(() => {
    dispatch(allCategories());
  }, [dispatch]);

  return (
    <>
      <Header></Header>

      <Container fluid className="home-bg">
        <Row className="shadow mx-1 tags-title-container bg-white">
          <Col sm="12">Categories</Col>
          <Col sm="12">
            {loading ? (
              <Spin size="large" className="mt-3" />
            ) : (
              <>
                {categories !== null &&
                  categories
                    .sort((a, b) =>
                      new Date(a.created_at) > new Date(b.created_at) ? -1 : 0
                    )
                    .map((item) => (
                      <Button className="tags-title-button">
                        #{item.title}
                      </Button>
                    ))}
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CategoriesTitle;
