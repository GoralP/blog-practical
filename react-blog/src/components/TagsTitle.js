import React, { useEffect } from "react";
import { Table, Button, Container, Row, Card, Col } from "reactstrap";
import { Header } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { allTags } from "../redux/tags/actions";

import { Spin } from "antd";

const TagsTitle = () => {
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
        <Row className="shadow mx-1 tags-title-container bg-white">
          <Col xs="12">
            {loading ? (
              <Spin size="large" className="mt-3" />
            ) : (
              <>
                {tags !== null &&
                  tags
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

export default TagsTitle;
