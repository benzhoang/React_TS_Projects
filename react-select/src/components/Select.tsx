import { useState } from "react";

type SelectOption = {
  label: string;
  value: string | number;
};

type SelectProps = {
  options: SelectOption[];
  value: SelectOption | undefined;
  onChange: (value: SelectOption | undefined) => void;
};

const Select = ({ value, onChange, options }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const clearOption = () => {
    onChange(undefined);
  };

  const selectOption = (option: SelectOption) => {
    if (option !== value) {
      onChange(option);
    }
  };

  const isOptionSelected = (option: SelectOption) => {
    return option === value;
  };

  const toggleDropdown = () => {
    // Khi mở dropdown thì reset highlightedIndex về option đầu tiên
    if (!isOpen) {
      setHighlightedIndex(0);
    }

    setIsOpen((prev) => !prev);
  };

  return (
    <div
      tabIndex={0}
      className="relative w-[20em] min-h-[1.5em] border-solid border-[0.05em] border-gray-500 rounded-[.25em] flex items-center gap-[.5em] p-[.5em] outline-none focus:border-blue-500 ml-4 mt-4"
      onClick={toggleDropdown}
      onBlur={() => setIsOpen(false)}
    >
      <span className="grow">{value?.label}</span>

      <button
        type="button"
        className="bg-transparent border-none outline-none cursor-pointer p-0 text-[1.5em] focus:text-black hover:text-black"
        onClick={(e) => {
          e.stopPropagation();
          clearOption();
        }}
      >
        &times;
      </button>

      <div className="bg-gray-200 self-stretch w-[0.05em]" />

      <div className="border-[0.25em] border-solid border-transparent border-t-gray-300 translate-x-0 translate-y-[25%]" />

      <ul
        className={`
          absolute
          m-0
          p-0
          list-none
          max-h-[15em]
          overflow-y-auto
          border-[0.05em]
          border-solid
          border-[#777]
          rounded-[0.25em]
          w-full
          left-0
          top-[calc(100%+.25em)]
          bg-white
          z-100
          ${isOpen ? "block" : "hidden"}
        `}
      >
        {options.map((option, index) => (
          <li
            key={option.value}
            className={`
              px-[0.25em]
              py-[0.5em]
              cursor-pointer
              ${
                index === highlightedIndex
                  ? "bg-[hsl(200,100%,50%)] text-white"
                  : ""
              }
              ${isOptionSelected(option) ? "bg-[hsl(200,100%,70%)]" : ""}
            `}
            onMouseEnter={() => setHighlightedIndex(index)}
            onClick={(e) => {
              e.stopPropagation();
              selectOption(option);
              setIsOpen(false);
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
