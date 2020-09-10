import React, { useState, useEffect } from "react";
import {
  Button,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalFooter,
} from "reactstrap";
import Select from "react-select";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../redux/posts/actions";
import { allCategories } from "../redux/categories/actions";
import { allTags } from "../redux/tags/actions";

const signupSchema = yup.object().shape({
  title: yup.string().required("Title is a required field."),
  slug: yup.string().required("Slug is a required field."),
  content: yup.string().required("Content is a required field."),
  category: yup.string().required("Categories is a required field."),
  tag: yup.string().required("Tags is a required field."),
});

const PostModal = ({ modal, setModal, toggle, action }) => {
  const { control, register, handleSubmit, errors } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const dispatch = useDispatch();

  const { loading, post, categories, tags } = useSelector((state) => ({
    loading: state.postReducers.getSinglePost.loading,
    post: state.postReducers.getSinglePost.post,
    categories: state.categoryReducers.allCategories.categories,
    tags: state.tagReducers.allTags.tags,
  }));

  useEffect(() => {
    dispatch(allCategories());
    dispatch(allTags());
  }, [dispatch]);

  const categoryOption =
    categories !== null &&
    categories.map((item) => ({
      id: item.id,
      value: item.title,
      label: item.title,
    }));
  console.log(categories);

  const tagOption =
    tags !== null &&
    tags.map((item) => ({ id: item.id, value: item.title, label: item.title }));

  const onSubmit = (data) => {
    console.log(data);
    action === "create"
      ? dispatch(createPost(data, setModal))
      : dispatch(updatePost(data, post.id, setModal));
  };

  return (
    <Modal isOpen={modal}>
      <ModalHeader toggle={toggle}>
        {action === "create" ? "Create Post" : "Update Post"}
      </ModalHeader>

      {loading ? (
        <Label>Loading...</Label>
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <FormGroup>
              <Label> Title </Label>:
              <Controller
                as={Input}
                control={control}
                name="title"
                type="text"
                placeholder="Enter Title"
                defaultValue={
                  action === "edit" ? post !== null && post.title : ""
                }
                ref={register}
                className={errors && errors.title ? "is-invalid" : ""}
              />
              {errors && errors.title && (
                <span className="text-danger">{errors.title.message}</span>
              )}
            </FormGroup>
            <FormGroup>
              <Label>Slug</Label>
              <Controller
                as={Input}
                control={control}
                name="slug"
                type="text"
                placeholder="Enter Title"
                defaultValue={
                  action === "edit" ? post !== null && post.slug : ""
                }
                ref={register}
                className={errors && errors.slug ? "is-invalid" : ""}
              />
              {errors && errors.slug && (
                <span className="text-danger">{errors.slug.message}</span>
              )}
            </FormGroup>
            <FormGroup>
              <Label> Content </Label>:
              <Controller
                as={Input}
                control={control}
                name="content"
                type="textarea"
                placeholder="Enter Content"
                defaultValue={
                  action === "edit" ? post !== null && post.content : ""
                }
                ref={register}
                className={errors && errors.content ? "is-invalid" : ""}
              ></Controller>
              {errors && errors.content && (
                <span className="text-danger">{errors.content.message}</span>
              )}
            </FormGroup>

            <FormGroup>
              <Label> Categories </Label>:
              <Controller
                as={Select}
                options={categoryOption}
                control={control}
                name="category"
                isMulti
                defaultValue={
                  action === "edit" ? post !== null && post.category : ""
                }
                ref={register}
                className={errors && errors.category ? "is-invalid" : ""}
              ></Controller>
              {errors && errors.category && (
                <span className="text-danger">{errors.category.message}</span>
              )}
            </FormGroup>

            <FormGroup>
              <Label> Tags </Label>:
              <Controller
                as={Select}
                options={tagOption}
                control={control}
                name="tag"
                isMulti
                defaultValue={
                  action === "edit" ? post !== null && post.tag : ""
                }
                ref={register}
                className={errors && errors.tag ? "is-invalid" : ""}
              ></Controller>
              {errors && errors.tag && (
                <span className="text-danger">{errors.tag.message}</span>
              )}
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary">
              {action === "create" ? "Add" : "Update"}
            </Button>
            <Button color="secondary" onClick={toggle}>
              cancel
            </Button>
          </ModalFooter>
        </Form>
      )}
    </Modal>
  );
};

export default PostModal;
