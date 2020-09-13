import React, { useEffect } from "react";
import { Table, Button, Container, Row, Card, Col } from "reactstrap";
import { Header } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { allTags } from "../redux/tags/actions";

import { Spin } from "antd";

const TagsTitle = () => {
  const dispatch = useDispatch();

  const { loading, tagsData } = useSelector((state) => ({
    loading: state.tagReducers.allTags.loading,
    tagsData: state.tagReducers.allTags.tagsData,
  }));

  useEffect(() => {
    dispatch(allTags());
  }, [dispatch]);

  return (
    <>
      <Header></Header>

      <Container fluid className="home-bg">
        <Row className="shadow mx-1 tags-title-container bg-white">
          <Col sm="12" className="tags-title">
            Tags
          </Col>
          <Col xs="12">
            {loading ? (
              <Spin size="large" className="mt-3" />
            ) : (
              <>
                {tagsData !== null &&
                  tagsData
                    .sort((a, b) =>
                      new Date(a.created_at) > new Date(b.created_at) ? -1 : 0
                    )
                    .map((tags) => (
                      <Button className="tags-title-button">
                        #{tags.title}
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
