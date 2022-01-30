import { assign, createMachine } from "xstate";
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

type Context = {
  todos: TodoItem[];
};

type Event =
  | { type: "CREATE_TODO" }
  | { type: "CLOSE_TODO_CREATION" }
  | { type: "UPDATE_TODO_STATUS"; id: string; checked: boolean }
  | { type: "SAVE_TODO"; todo: string };

export const todosMachine = createMachine(
  {
    id: "todos",

    tsTypes: {} as import("./todosMachine.typegen").Typegen0,

    schema: {
      context: {} as Context,
      events: {} as Event,
      services: {} as {
        fetchTodos: {
          data: TodoItem[];
        };
      },
    },

    context: {
      todos: [],
    },

    initial: "fetchingTodos",

    states: {
      fetchingTodos: {
        invoke: {
          src: "fetchTodos",

          onDone: {
            target: "idle",

            actions: "assignInitialTodosToContext",
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

            actions: "assignNewTodoToContext",
          },
        },
      },
    },

    on: {
      UPDATE_TODO_STATUS: {
        actions: "updateTodoStatus",
      },
    },
  },
  {
    services: {
      fetchTodos: async (_context, _event): Promise<TodoItem[]> => {
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
    },

    actions: {
      assignInitialTodosToContext: assign({
        todos: (_context, event) => {
          const { data: todos } = event;

          return todos;
        },
      }),

      assignNewTodoToContext: assign({
        todos: ({ todos }, { todo }) => [
          ...todos,
          {
            id: nanoid(),
            label: todo,
            checked: false,
          },
        ],
      }),

      updateTodoStatus: assign({
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
  }
);
