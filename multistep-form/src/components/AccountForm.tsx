import { FormWrapper } from "./FormWrapper";

type AccountData = {
  email: string;
  password: string;
};

type AccountFormProps = AccountData & {
  updateFields: (fields: Partial<AccountData>) => void;
};

export const AccountForm = ({
  email,
  password,
  updateFields,
}: AccountFormProps) => {
  return (
    <FormWrapper title="Account Creation">
      <label>Email</label>
      <input
        className="border p-1 rounded-sm"
        type="email"
        autoFocus
        required
        value={email}
        onChange={(e) => updateFields({ email: e.target.value })}
      />
      <label>Password</label>
      <input
        className="border p-1 rounded-sm"
        type="password"
        required
        value={password}
        onChange={(e) => updateFields({ password: e.target.value })}
      />
    </FormWrapper>
  );
};
