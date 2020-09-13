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
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createTag, updateTag } from "../redux/tags/actions";

const signupSchema = yup.object().shape({
  title: yup.string().max(15).required("Title is a required field."),
  slug: yup.string().max(15).required("Slug is a required field."),
  description: yup.string().required("Description is a required field."),
});

const TagsModal = ({ modal, setModal, toggle, action }) => {
  const { control, register, handleSubmit, errors } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const dispatch = useDispatch();

  const { loading, tag } = useSelector((state) => ({
    loading: state.tagReducers.getSingleTag.loading,
    tag: state.tagReducers.getSingleTag.tag,
  }));

  const onSubmit = (data) => {
    console.log(data);
    action === "create"
      ? dispatch(createTag(data, setModal))
      : dispatch(updateTag(data, tag.id, setModal));
  };

  return (
    <Modal isOpen={modal}>
      <ModalHeader toggle={toggle}>
        {action === "create" ? "Create Tag" : "Update Tag"}
      </ModalHeader>

      {loading ? (
        <Label>Loading...</Label>
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <FormGroup>
              <Label>Title</Label>
              <Controller
                as={Input}
                control={control}
                name="title"
                type="text"
                placeholder="Enter Title"
                defaultValue={
                  action === "edit" ? tag !== null && tag.title : ""
                }
                ref={register}
                className={errors && errors.title ? "is-invalid" : ""}
              />
              {errors && errors.title && (
                <span className="text-danger">{errors.title.message}</span>
              )}
            </FormGroup>
            <FormGroup>
              <Label> Slug </Label>:
              <Controller
                as={Input}
                control={control}
                name="slug"
                type="text"
                placeholder="Enter Slug"
                defaultValue={action === "edit" ? tag !== null && tag.slug : ""}
                ref={register}
                className={errors && errors.slug ? "is-invalid" : ""}
              ></Controller>
              {errors && errors.slug && (
                <span className="text-danger">{errors.slug.message}</span>
              )}
            </FormGroup>

            <FormGroup>
              <Label> Description </Label>:
              <Controller
                as={Input}
                control={control}
                name="description"
                type="textarea"
                placeholder="Enter Description"
                defaultValue={
                  action === "edit" ? tag !== null && tag.description : ""
                }
                ref={register}
                className={errors && errors.description ? "is-invalid" : ""}
              ></Controller>
              {errors && errors.description && (
                <span className="text-danger">
                  {errors.description.message}
                </span>
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

export default TagsModal;
