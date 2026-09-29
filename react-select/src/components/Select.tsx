import { useState } from "react";

type SelectOptions = {
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
};

type SelectProps = {
  options: SelectOptions[];
  value: SelectOptions;
  onChange: (value: SelectOptions | undefined) => void;
};

const Select = ({ value, onChange, options }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedOption, setHighlightedOption] = useState<
    SelectOptions | undefined
  >();

  return (
    <div
      tabIndex={0}
      className="relative w-[20em] min-h-[1.5em] border-solid border-[0.05em] border-gray-500 rounded-[.25em] flex items-center gap-[.5em] p-[.5em] outline-none focus:border-blue-500 ml-2"
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <span className="grow">{value?.label || "Value"}</span>

      <button
        type="button"
        className="bg-transparent border-none outline-none cursor-pointer p-0 text-[1.5em] focus:text-black hover:text-black"
        onClick={(e) => {
          e.stopPropagation();
          onChange(undefined);
        }}
      >
        &times;
      </button>

      <div className="bg-gray-200 self-stretch w-[.05em]"></div>

      <div className="border-[.25em] border-solid border-transparent border-t-gray-300 translate-x-0 translate-y-[25%]"></div>

      <ul
        className={`
          absolute
          m-0
          p-0
          list-none
          max-h-[15em]
          overflow-y-auto
          border-[.05em]
          border-solid
          border-[#777]
          rounded-[.25em]
          w-full
          left-0
          top-[calc(100%+.25em)]
          bg-white
          z-100
          ${isOpen ? "block" : "hidden"}
        `}
      >
        {options.map((option) => (
          <li
            key={option.label}
            className={`
              px-[.25em]
              py-[.5em]
              cursor-pointer

              ${
                option.label === highlightedOption?.label
                  ? "bg-[hsl(200,100%,50%)] text-white"
                  : ""
              }

              ${option.label === value?.label ? "bg-[hsl(200,100%,70%)]" : ""}
            `}
            onMouseEnter={() => setHighlightedOption(option)}
            onClick={(e) => {
              e.stopPropagation();
              onChange(option);
              setIsOpen(false);
              setHighlightedOption(undefined);
            }}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
