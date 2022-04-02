import { useMachine } from "@xstate/react";
import type { NextPage } from "next";
import { FormEvent } from "react";
import { useKey } from "react-use";
import { PlusIcon } from "@heroicons/react/solid";
import CheckboxList from "../components/CheckboxList";
import { todosMachine } from "../machines/todosMachine";
import clsx from "clsx";

interface CreateTodoFormProps {
  handleSaveTodo: (newTodo: string) => void;
  handleCloseTodoCreation: () => void;
}

function CreateTodoForm({
  handleSaveTodo,
  handleCloseTodoCreation,
}: CreateTodoFormProps) {
  function handleFormSubmit({ target }: FormEvent<HTMLFormElement>) {
    if (target === null) {
      return;
    }

    const formData = new FormData(target as HTMLFormElement);
    const newTodo = formData.get("new-todo");
    if (typeof newTodo !== "string") {
      return;
    }

    const sanitizedNewTodo = sanitizeNewTodo(newTodo);
    if (sanitizedNewTodo.length === 0) {
      return;
    }

    handleSaveTodo(newTodo);
  }

  function sanitizeNewTodo(todo: string): string {
    return todo.trim();
  }

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Create a todo
        </h3>

        <form
          className="mt-5"
          onSubmit={(event) => {
            event.preventDefault();

            handleFormSubmit(event);
          }}
        >
          <div className="w-full sm:max-w-xs">
            <label htmlFor="new-todo" className="sr-only">
              New Todo
            </label>

            <input
              id="new-todo"
              type="text"
              name="new-todo"
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              placeholder="Write an article about XState"
            />
          </div>

          <div className="flex justify-start pt-5">
            <button
              type="submit"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-yellow-500 border border-transparent rounded-md shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              Save
            </button>

            <button
              type="button"
              className="px-4 py-2 ml-3 text-sm font-medium bg-white border border-gray-300 rounded-md shadow-sm text-blue-gray-900 hover:bg-blue-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              onClick={handleCloseTodoCreation}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const Home: NextPage = () => {
  const [state, send] = useMachine(todosMachine);

  const shouldShowNothing = state.hasTag("render nothing");
  const shouldShowLoadingIndicator = state.hasTag("show loading indicator");
  const shouldShowErrorState = state.hasTag("show error state");
  const showTodoCreationForm = state.hasTag("show todo creation form");
  const isSendingRequestToServer = state.hasTag("is sending request to server");
  const isRefetchingTodos = false as boolean;
  const thingsToDo = state.context.todos.filter(
    ({ checked }) => checked === false
  );
  const thingsDone = state.context.todos.filter(
    ({ checked }) => checked === true
  );

  function handleOpenTodoCreation() {
    send({
      type: "Create todo",
    });
  }

  function handleCloseTodoCreation() {
    send({
      type: "Close todo creation",
    });
  }

  function handleSaveTodo(newTodo: string) {
    send({
      type: "Save todo",
      todo: newTodo,
    });
  }

  function handleTodoStatusUpdate(id: string, checked: boolean) {
    send({
      type: "Update todo status",
      id,
      checked: checked,
    });
  }

  function handleRefreshTodos() {
    send({
      type: "Refresh todos",
    });
  }

  useKey("Escape", handleCloseTodoCreation);

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white border-b border-gray-200">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <p className="text-xl font-medium leading-6 text-gray-900 sm:truncate">
              XTodo
            </p>
          </div>
        </div>
      </nav>

      <div className="py-10">
        {shouldShowNothing ? null : shouldShowErrorState ? (
          <p>An error occured while fetching todos</p>
        ) : (
          <div className="mx-auto max-w-7xl">
            <header>
              <div className="px-4 sm:px-6 lg:px-8 md:flex md:items-center md:justify-between">
                <div className="flex-1 min-w-0">
                  <h1 className="text-3xl font-bold leading-tight text-gray-900">
                    Things to get done
                  </h1>
                </div>

                <div className="flex mt-4 md:mt-0 md:ml-4">
                  <button
                    type="button"
                    disabled={isRefetchingTodos === true}
                    className={clsx([
                      "inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-yellow-500 border border-transparent rounded-md shadow-sm hover:bg-yellow-600 disabled:hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500",
                      {
                        "animate-pulse": isRefetchingTodos === true,
                      },
                    ])}
                    onClick={handleRefreshTodos}
                  >
                    Refresh
                  </button>
                </div>
              </div>
            </header>

            <main>
              <div className="transition-opacity duration-200 sm:px-6 lg:px-8">
                <div className="px-4 py-8 space-y-4 sm:px-0">
                  <CheckboxList
                    disableAllList={isSendingRequestToServer}
                    isLoading={shouldShowLoadingIndicator}
                    items={thingsToDo}
                    onCheckboxChange={handleTodoStatusUpdate}
                    title="Things to do"
                  />

                  {showTodoCreationForm === true ? (
                    <CreateTodoForm
                      handleSaveTodo={handleSaveTodo}
                      handleCloseTodoCreation={handleCloseTodoCreation}
                    />
                  ) : (
                    <button
                      type="button"
                      disabled={isSendingRequestToServer}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-white bg-yellow-500 border border-transparent rounded-full shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                      onClick={handleOpenTodoCreation}
                    >
                      <PlusIcon
                        className="-ml-0.5 mr-2 h-4 w-4"
                        aria-hidden="true"
                      />
                      Add a todo
                    </button>
                  )}

                  <CheckboxList
                    disableAllList={isSendingRequestToServer}
                    isLoading={shouldShowLoadingIndicator}
                    items={thingsDone}
                    onCheckboxChange={handleTodoStatusUpdate}
                    title="Things done"
                  />
                </div>
              </div>
            </main>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
