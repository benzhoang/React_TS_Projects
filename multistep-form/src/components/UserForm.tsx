import { FormWrapper } from "./FormWrapper";

export const UserForm = () => {
  return (
    <FormWrapper title="User Details">
      <label>First Name</label>
      <input className="border p-1 rounded-sm" type="text" autoFocus required />
      <label>Last Name</label>
      <input className="border p-1 rounded-sm" type="text" required />
      <label>Age</label>
      <input className="border p-1 rounded-sm" type="number" min={1} required />
    </FormWrapper>
  );
};
