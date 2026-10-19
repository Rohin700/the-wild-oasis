import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, closeModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isToEdit = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isToEdit ? editValues : {},
  });

  const { isAdding, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  const isWorking = isEditing || isAdding;

  const { errors } = formState;
  // console.log(errors);

  function doSubmit(data) {
    // console.log(data);

    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isToEdit) {
      editCabin(
        { newCabin: { ...data, image }, id: editId },
        {
          //this onSuccess is a callBack func called after the mutation takes place
          onSuccess: (data) => {
            // console.log(data);
            reset();
            closeModal?.();
          },
        },
      );
    }
    //because mutateFn receive only 1 element as its parameter
    else
      createCabin(
        { ...data, image },
        {
          onSuccess: (data) => {
            // console.log(data);
            reset();
            closeModal?.();
          },
        },
      );
  }

  const doErrors = (errors) => {
    console.log(errors);
  };

  return (
    <Form
      onSubmit={handleSubmit(doSubmit, doErrors)}
      type={closeModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "The name field is required",
          })}
        />
      </FormRow>

      <FormRow label="maxCapacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "The maxCapacity field is required",
            min: {
              value: 1,
              message: "maxCapacity should have atleast 1 as a value",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "The regularPrice field is required",
            min: {
              value: 50,
              message: "The regular price should be atleast 50",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "The discount field is required",
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              "Discount should be less than the regular price",
          })}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register("description", {
            required: "The description field is  required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isToEdit ? false : "The image field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */
        /*The $ is here imp otherwise the styled componenet will direactly pass the passed props to the dom*/}
        <Button
          $variation="secondary"
          type="reset"
          id="cancelBtn"
          onClick={() => closeModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking} id="addBtn">
          {isToEdit ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
