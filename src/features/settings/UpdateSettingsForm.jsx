import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const { isLoadingSettings, settings } = useSettings();
  const { doUpdateSetting, isUpdatingSetting } = useUpdateSetting();

  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settings || {}; // because settings will be undefined in the beginning

  if (isLoadingSettings) return <Spinner />;

  function handleUpdate(val, field) {
    if (!field || !val) return;

    doUpdateSetting({ [field]: val });
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        {isUpdatingSetting ? (
          <Spinner />
        ) : (
          <Input
            type="number"
            id="min-nights"
            defaultValue={minBookingLength}
            disabled={isUpdatingSetting}
            onBlur={(e) => handleUpdate(e.target.value, "minBookingLength")}
          />
        )}
      </FormRow>

      <FormRow label="Maximum nights/booking">
        {isUpdatingSetting ? (
          <Spinner />
        ) : (
          <Input
            type="number"
            id="max-nights"
            defaultValue={maxBookingLength}
            disabled={isUpdatingSetting}
            onBlur={(e) => handleUpdate(e.target.value, "maxBookingLength")}
          />
        )}
      </FormRow>

      <FormRow label="Maximum guests/booking">
        {isUpdatingSetting ? (
          <Spinner />
        ) : (
          <Input
            type="number"
            id="max-guests"
            defaultValue={maxGuestsPerBooking}
            disabled={isUpdatingSetting}
            onBlur={(e) => handleUpdate(e.target.value, "maxGuestsPerBooking")}
          />
        )}
      </FormRow>

      <FormRow label="Breakfast price">
        {isUpdatingSetting ? (
          <Spinner />
        ) : (
          <Input
            type="number"
            id="breakfast-price"
            defaultValue={breakfastPrice}
            disabled={isUpdatingSetting}
            onBlur={(e) => handleUpdate(e.target.value, "breakfastPrice")}
          />
        )}
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
