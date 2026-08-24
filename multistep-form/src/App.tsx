import type { FormEvent } from "react";
import { AccountForm } from "./components/AccountForm";
import { AddressForm } from "./components/AddressForm";
import { UserForm } from "./components/UserForm";
import { useMultistepForm } from "./hooks/useMultistepForm";

const App = () => {
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([<UserForm />, <AddressForm />, <AccountForm />]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    next();
  };

  return (
    <div className="relative bg-white border border-solid rounded-lg p-8 m-4 font-sans">
      <form onSubmit={onSubmit}>
        <div className="absolute top-2 right-4">
          {currentStepIndex + 1} / {steps.length}
        </div>
        {step}
        <div className="mt-4 flex gap-2 justify-end">
          {!isFirstStep && (
            <button
              className="border px-2 rounded-sm"
              type="button"
              onClick={back}
            >
              Back
            </button>
          )}
          <button className="border px-2 rounded-sm" type="submit">
            {isLastStep ? "Finish" : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default App;
