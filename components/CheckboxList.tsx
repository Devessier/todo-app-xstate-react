import React, { ChangeEvent } from "react";
import clsx from "clsx";
import { TodoItem } from "../types";

function CheckboxListSkeletons() {
  const widthClasses = ["w-64", "w-32", "w-48"];

  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => {
        const widthClass = widthClasses[index % widthClasses.length];

        return (
          <div
            key={index}
            className={clsx([
              "h-4 bg-gray-200 rounded-md animate-pulse max-w-full",
              widthClass,
            ])}
          />
        );
      })}
    </>
  );
}

interface CheckboxListProps {
  disableAllList: boolean;
  isLoading: boolean;
  items: TodoItem[];
  onCheckboxChange: (id: string, checked: boolean) => void;
  title: string;
}

function CheckboxList({
  disableAllList,
  isLoading,
  title,
  items,
  onCheckboxChange,
}: CheckboxListProps) {
  function handleCheckboxChangeEvent(
    id: string,
    event: ChangeEvent<HTMLInputElement>
  ) {
    const target = event.target;
    if (target === null) {
      return;
    }
    const inputTarget = target as HTMLInputElement;

    onCheckboxChange(id, inputTarget.checked);
  }

  return (
    <fieldset className="grid grid-cols-1">
      <legend className="text-lg font-medium leading-6 text-gray-900">
        {title}
      </legend>

      <ul className="mt-4 space-y-2">
        {isLoading === true ? (
          <CheckboxListSkeletons />
        ) : items.length === 0 ? (
          <p className="text-base text-gray-500">No todos here!</p>
        ) : (
          items.map(({ id, label, checked }) => (
            <li key={id} className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  disabled={disableAllList}
                  checked={checked}
                  aria-describedby={`todo-${id}-description`}
                  name={`todo-${id}`}
                  type="checkbox"
                  className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                  onChange={(event) => handleCheckboxChangeEvent(id, event)}
                />
              </div>

              <div className="ml-3 text-sm">
                <span
                  id={`todo-${id}-description`}
                  className="font-medium text-gray-700"
                >
                  {label}
                </span>
              </div>
            </li>
          ))
        )}
      </ul>
    </fieldset>
  );
}

export default CheckboxList;
