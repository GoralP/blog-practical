import React, { useEffect } from "react";
import { Button, Container, Row, Col } from "reactstrap";
import { Header } from ".";
import { useDispatch, useSelector } from "react-redux";
import { allCategories } from "../redux/categories/actions";

import { Spin } from "antd";

const CategoriesTitle = () => {
  const dispatch = useDispatch();

  const { loading, categoriesData } = useSelector((state) => ({
    loading: state.categoryReducers.allCategories.loading,
    categoriesData: state.categoryReducers.allCategories.categoriesData,
  }));

  useEffect(() => {
    dispatch(allCategories());
  }, [dispatch]);

  return (
    <>
      <Header></Header>

      <Container fluid className="home-bg">
        <Row className="shadow mx-1 tags-title-container bg-white">
          <Col sm="12" className="tags-title">
            Categories
          </Col>
          <Col sm="12">
            {loading ? (
              <Spin size="large" className="mt-3" />
            ) : (
              <>
                {categoriesData !== null &&
                  categoriesData
                    .sort((a, b) =>
                      new Date(a.created_at) > new Date(b.created_at) ? -1 : 0
                    )
                    .map((category) => (
                      <Button className="tags-title-button">
                        #{category.title}
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
