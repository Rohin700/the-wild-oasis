import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useForm } from "react-hook-form";
import { createCabin } from "../../services/apiCabins";

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();

  const { errors } = formState;
  // console.log(errors);

  const queryClient = useQueryClient();

  const { isLoading: isAdding, mutate } = useMutation({
    mutationFn: (newCabin) => createCabin(newCabin),
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },

    onErrors: (err) => toast.error(err.message),
  });

  function doSubmit(data) {
    // console.log(data);
    mutate({ ...data, image: data.image[0] });
  }

  const doErrors = (errors) => {
    console.log(errors);
  };

  return (
    <Form onSubmit={handleSubmit(doSubmit, doErrors)}>
      <FormRow label="Cabin Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isAdding}
          {...register("name", {
            required: "The name field is required",
          })}
        />
      </FormRow>

      <FormRow label="maxCapacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isAdding}
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
          disabled={isAdding}
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
          disabled={isAdding}
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
          disabled={isAdding}
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
            required: "The image field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */
        /*The $ is here imp otherwise the styled componenet will direactly pass the passed props to the dom*/}
        <Button $variation="secondary" type="reset" id="cancelBtn">
          Cancel
        </Button>
        <Button disabled={isAdding} id="addBtn">
          Add cabin
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
