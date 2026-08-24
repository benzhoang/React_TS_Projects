import { FormWrapper } from "./FormWrapper";

export const AccountForm = () => {
  return (
    <FormWrapper title="Account Creation">
      <label>Email</label>
      <input
        className="border p-1 rounded-sm"
        type="email"
        autoFocus
        required
      />
      <label>Password</label>
      <input className="border p-1 rounded-sm" type="password" required />
    </FormWrapper>
  );
};
