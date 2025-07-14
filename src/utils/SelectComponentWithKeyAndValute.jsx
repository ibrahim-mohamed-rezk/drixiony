import React, { useEffect, useRef } from "react";
import useCustomSelect from "../components/hooks/useCustomSelect";

// The options prop should be an array of objects: { key: ..., value: ... }
const SelectComponentWithKeyAndValue = ({
  options,
  placeholder,
  open,
  customClass,
  onChange,
}) => {
  const {
    isOpen,
    selectedOption,
    closeDropdown,
    toggleDropdown,
    selectOption,
  } = useCustomSelect(options, open);

  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      closeDropdown();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const dropdownClassName = `nice-select ${customClass || ""} ${
    isOpen ? "open" : ""
  }`;

  // Find the selected option object to display its key
  const selectedObj =
    options.find((option) => option.value === selectedOption) || null;

  return (
    <div
      className={dropdownClassName}
      tabIndex="0"
      onClick={toggleDropdown}
      ref={dropdownRef}
    >
      <span className="current">
        {selectedObj ? selectedObj.key : placeholder}
      </span>
      <ul className="list">
        {options.map((option, index) => (
          <li
            key={option.value ?? index}
            className={`option${
              selectedOption === option.value ? " selected focus" : ""
            }`}
            data-value={option.value}
            onClick={(e) => {
              e.stopPropagation();
              selectOption(option.value);
              closeDropdown();
              onChange(option.value); // Pass the whole option object
            }}
          >
            {option.key}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectComponentWithKeyAndValue;
