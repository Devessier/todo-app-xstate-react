import { assign, DoneInvokeEvent } from "xstate";
import { createModel } from "xstate/lib/model";
import { nanoid } from "nanoid/non-secure";
import { TodoItem } from "../types";

function generateId(): string {
  return nanoid();
}

function waitForTimeout(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const todoModel = createModel(
  {
    todos: [] as TodoItem[],
  },
  {
    events: {
      CREATE_TODO: () => ({}),

      CLOSE_TODO_CREATION: () => ({}),

      SAVE_TODO: (todo: string) => ({ todo }),

      UPDATE_TODO_STATUS: (id: string, checked: boolean) => ({
        id,
        checked,
      }),
    },
  }
);

export const todosMachine = todoModel.createMachine({
  id: "todos",

  context: todoModel.initialContext,

  initial: "fetchingTodos",

  states: {
    fetchingTodos: {
      invoke: {
        src: async (_context, _event): Promise<TodoItem[]> => {
          await waitForTimeout(1_000);

          const initialTodos = [
            {
              id: generateId(),
              label: "Clean my computer",
              checked: false,
            },
            {
              id: generateId(),
              label: "Buy a keyboard",
              checked: false,
            },
            {
              id: generateId(),
              label: "Write an article about @xtate/test",
              checked: true,
            },
          ];

          return initialTodos;
        },

        onDone: {
          target: "idle",

          actions: assign({
            todos: (_context, event: DoneInvokeEvent<TodoItem[]>) => {
              const { data: todos } = event;

              return todos;
            },
          }),
        },
      },
    },

    idle: {
      on: {
        CREATE_TODO: {
          target: "creatingTodo",
        },
      },
    },

    creatingTodo: {
      tags: "showTodoCreationForm",

      on: {
        CLOSE_TODO_CREATION: {
          target: "idle",
        },

        SAVE_TODO: {
          target: "idle",

          actions: todoModel.assign({
            todos: ({ todos }, { todo }) => [
              ...todos,
              {
                id: nanoid(),
                label: todo,
                checked: false,
              },
            ],
          }),
        },
      },
    },
  },

  on: {
    UPDATE_TODO_STATUS: {
      actions: todoModel.assign({
        todos: ({ todos }, { id: todoToUpdateId, checked }) =>
          todos.map((todo) => {
            if (todo.id !== todoToUpdateId) {
              return todo;
            }

            return {
              ...todo,
              checked,
            };
          }),
      }),
    },
  },
});
