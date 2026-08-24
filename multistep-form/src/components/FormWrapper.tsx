import type { ReactNode } from "react";

interface FormWrapperProps {
  title: string;
  children: ReactNode;
}

export const FormWrapper = ({ title, children }: FormWrapperProps) => {
  return (
    <>
      <p className="text-center font-bold text-3xl m-0 mb-8">{title}</p>
      <div className="grid gap-x-4 gap-y-2 justify-start grid-cols-[auto_minmax(auto,400px)]">
        {children}
      </div>
    </>
  );
};
