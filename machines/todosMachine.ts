import { assign, DoneInvokeEvent } from "xstate";
import { createModel } from "xstate/lib/model";
import { TodoItem } from "../types";

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
              id: "1",
              label: "Clean my computer",
              checked: false,
            },
            {
              id: "2",
              label: "Buy a keyboard",
              checked: false,
            },
            {
              id: "3",
              label: "Write an article about @xtate/test",
              checked: true,
            },
          ];

          return initialTodos;
        },

        onDone: {
          target: "idle",

          actions: assign((_context, event) => {
            const { data: todos } = event as DoneInvokeEvent<TodoItem[]>;

            return {
              todos,
            };
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
                id: todo,
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
              checked: checked,
            };
          }),
      }),
    },
  },
});
