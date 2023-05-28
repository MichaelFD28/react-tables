import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import clsx from "clsx";
import { CaretDown, CaretUp } from "phosphor-react";

// Redecalare forwardRef (https://fettblog.eu/typescript-react-generic-forward-refs/)
declare module "react" {
  function forwardRef<T, P = Record<string, unknown>>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

export type FormDropdownOption<TValue> = {
  label: string;
  value: TValue;
};

export type FormDropdownProps<TValue> = {
  options: FormDropdownOption<TValue>[];
  label?: string;
  pleaseSelectText?: string;
  value: TValue | null;
  onChange: (value: TValue, option: FormDropdownOption<TValue>) => void;
  onBlur?: (label?: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  tooltip?: string;
  buttonClassName?: string;
  optionsAboveButton?: boolean;
  noOptionsText?: string;
  helpText?: string;
};

// https://devtrium.com/posts/react-typescript-using-generics-in-react#generics-syntax-for-arrow-functions-in-jsx
const FormDropdown = <TValue,>(
  {
    label,
    pleaseSelectText = "Select an option",
    options,
    value,
    onChange,
    onBlur,
    error,
    required,
    disabled,
    className,
    tooltip,
    buttonClassName,
    optionsAboveButton,
    noOptionsText = "No options to choose from...",
    helpText,
    ...inputProps
  }: FormDropdownProps<TValue>,
  ref: React.ForwardedRef<HTMLButtonElement>
) => {
  const valueIsNumber = typeof value === "number";

  const selected =
    value !== null || !valueIsNumber
      ? options.find(
          (option) => JSON.stringify(option.value) === JSON.stringify(value)
        )
      : undefined;

  if (value && !selected)
    throw Error(`Couldn't find option with value ${value}.`);

  const handleChange = (value: TValue) => {
    const option = options.find((_) => _.value === value);

    if (!option) throw new Error(`Expected option with value ${value}.`);
    onChange(value, option);
  };

  return (
    <div className={className}>
      {label && (
        <label className="text-sm m-2 flex flex-row items-center select-none">
          {label}
        </label>
      )}
      <Listbox
        value={value}
        onChange={handleChange}
        disabled={disabled}
        {...inputProps}
      >
        {({ open }) => (
          <div className="relative mt-1 ">
            <Listbox.Button
              className={clsx(
                "border rounded-md w-full pl-4 pr-8 h-12 flex items-center transition-background-color",
                "focus:outline-none focus:bg-white focus:ring-inset focus:border-teal-300 focus:ring-2 focus:ring-teal-300 hover:bg-white",
                `${
                  buttonClassName
                    ? buttonClassName
                    : "border-black bg-neutral-100"
                }`,
                open && "z-50 ring-2 ring-teal-300",
                error &&
                  " border-red-500 focus:border-red-500 ring-red-500 pr-10 outline-none focus:ring-red-500",
                open && error && "ring-0"
              )}
              ref={ref}
            >
              <span
                className={clsx(
                  "block truncate",
                  !selected && "opacity-60",
                  disabled && "opacity-40"
                )}
              >
                {selected ? selected.label : pleaseSelectText}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                {open ? (
                  <CaretUp
                    weight="fill"
                    className={clsx(
                      "h-5 w-5 text-primary-text",
                      disabled && "text-disabled-text"
                    )}
                    aria-hidden
                  />
                ) : (
                  <CaretDown
                    weight="fill"
                    className={clsx(
                      "h-5 w-5 text-primary-text",
                      disabled && "text-disabled-text"
                    )}
                    aria-hidden
                  />
                )}
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                className={clsx(
                  "drop-shadow-lg rounded-md absolute mt-1 max-h-60 w-full overflow-auto",
                  "bg-white py-1 text-base",
                  "focus:outline-none sm:text-sm z-[1000]",
                  optionsAboveButton && "bottom-full"
                )}
              >
                {!options.length && (
                  <Listbox.Option
                    key="no-options"
                    className={clsx(
                      "relative h-12 flex items-center cursor-default select-none px-4"
                    )}
                    value={null}
                    disabled
                  >
                    <>
                      <span
                        className={clsx(
                          "block truncate font-normal text-neutral-800"
                        )}
                      >
                        {noOptionsText}
                      </span>
                    </>
                  </Listbox.Option>
                )}
                {options.map((option, index) => (
                  <Listbox.Option
                    key={`${label}${index}`}
                    className={({ active }) =>
                      clsx(
                        "relative h-12 flex items-center cursor-default select-none hover:bg-teal-200 px-4",
                        active && "bg-teal-300"
                      )
                    }
                    value={option.value}
                    onBlur={() => onBlur && onBlur(selected?.label)}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={clsx(
                            "block truncate",
                            selected ? "font-medium" : "font-normal"
                          )}
                        >
                          {option.label}
                        </span>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
    </div>
  );
};

export default React.forwardRef(FormDropdown);
