import { useEffect, useRef, useState } from "react";

export type SelectOption = {
  label: string;
  value: string | number;
};

type MultipleSelectProps = {
  multiple: true;
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
};

type SingleSelectProps = {
  multiple?: false;
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
};

type SelectProps = {
  options: SelectOption[];
} & (SingleSelectProps | MultipleSelectProps);

const Select = ({ multiple, value, onChange, options }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const clearOption = () => {
    if (multiple) {
      onChange([]);
    } else {
      onChange(undefined);
    }
  };

  const selectOption = (option: SelectOption) => {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter((o) => o !== option));
      } else {
        onChange([...value, option]);
      }
    } else {
      if (option !== value) {
        onChange(option);
      }
    }
  };

  const isOptionSelected = (option: SelectOption) => {
    return multiple ? value.includes(option) : option === value;
  };

  const toggleDropdown = () => {
    // Khi mở dropdown thì reset highlightedIndex về option đầu tiên
    if (!isOpen) {
      setHighlightedIndex(0);
    }

    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const handler = (e: KeyboardEvent) => {
      if (e.target !== container) return;

      switch (e.code) {
        case "Enter":
        case "Space": {
          e.preventDefault();

          if (!isOpen) {
            setIsOpen(true);
            return;
          }

          const option = options[highlightedIndex];

          if (option) {
            selectOption(option);
            setIsOpen(false);
          }

          break;
        }

        case "ArrowDown": {
          e.preventDefault();

          if (!isOpen) {
            setIsOpen(true);
            return;
          }

          setHighlightedIndex((prev) =>
            prev < options.length - 1 ? prev + 1 : prev,
          );

          break;
        }

        case "ArrowUp": {
          e.preventDefault();

          if (!isOpen) {
            setIsOpen(true);
            return;
          }

          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));

          break;
        }

        case "Escape": {
          e.preventDefault();
          setIsOpen(false);
          break;
        }
      }
    };

    container.addEventListener("keydown", handler);

    return () => {
      container.removeEventListener("keydown", handler);
    };
  }, [isOpen, highlightedIndex, options]);

  return (
    <div
      tabIndex={0}
      className="relative w-[20em] min-h-[1.5em] border-solid border-[0.05em] border-gray-500 rounded-[.25em] flex items-center gap-[.5em] p-[.5em] outline-none focus:border-blue-500 ml-4 mt-4"
      onClick={toggleDropdown}
      onBlur={() => setIsOpen(false)}
      ref={containerRef}
    >
      <span className="grow flex gap-[.5em] flex-wrap">
        {multiple
          ? value.map((v) => (
              <button
                key={v.value}
                onClick={(e) => {
                  e.stopPropagation();
                  selectOption(v);
                }}
                className="flex items-center border-[.05em] border-solid border-gray-500 rounded-[.25em] gap-[.25em] cursor-pointer bg-none outline-none p-[0.25em] hover:bg-[hsl(0,100%,90%)] hover:border-[hsl(0,100%,50%)focus:bg-[hsl(0,100%,90%)] focus:border-[hsl(0,100%,50%)]"
              >
                {v.label}
                <span className="text-[1.25em] text-[#777] group-hover:text-[hsl(0,100%,50%)] group-focus:text-[hsl(0,100%,50%)]">
                  &times;
                </span>
              </button>
            ))
          : value?.label}
      </span>

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
