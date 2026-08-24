import { FormWrapper } from "./FormWrapper";

export const AddressForm = () => {
  return (
    <FormWrapper title="Address">
      <label>Street</label>
      <input className="border p-1 rounded-sm" type="text" autoFocus required />
      <label>City</label>
      <input className="border p-1 rounded-sm" type="text" required />
      <label>State</label>
      <input className="border p-1 rounded-sm" type="text" required />
      <label>Zip</label>
      <input className="border p-1 rounded-sm" type="text" required />
    </FormWrapper>
  );
};
