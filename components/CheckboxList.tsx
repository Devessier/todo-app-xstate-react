import React, { ChangeEvent } from "react";
import { TodoItem } from "../types";

interface CheckboxListProps {
  items: TodoItem[];
  // eslint-disable-next-line no-unused-vars
  onCheckboxChange: (id: string, checked: boolean) => void;
  title: string;
}

function CheckboxList({ title, items, onCheckboxChange }: CheckboxListProps) {
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
    <fieldset>
      <legend className="text-lg font-medium leading-6 text-gray-900">
        {title}
      </legend>

      <ul className="mt-4 space-y-2">
        {items.map(({ id, label, checked }) => (
          <li
            v-for=" in props.items"
            key={label}
            className="relative flex items-start"
          >
            <div className="flex items-center h-5">
              <input
                checked={checked}
                aria-describedby={`todo-${id}-description`}
                name={`todo-${id}`}
                type="checkbox"
                className="w-4 h-4 text-yellow-600 border-gray-300 rounded  focus:ring-yellow-500"
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
        ))}
      </ul>
    </fieldset>
  );
}

export default CheckboxList;
