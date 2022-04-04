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
  | { type: "Create todo" }
  | { type: "Close todo creation" }
  | { type: "Update todo status"; id: string; checked: boolean }
  | { type: "Save todo"; todo: string }
  | { type: "Refresh todos" };

/** @xstate-layout N4IgpgJg5mDOIC5QBcD2FWwHQDEzIGMALASwDsoACNDbAdQEMTlyoBiAD1mQeTCwYAzPgCcAFAEYADDICUbGplz5irauiWNmrRKAAOmbajK6QHRAFoA7ABYsEiQFZHEgJwOpADgBMAZiueADQgAJ6IElZWWD7eno7e7q623jaOAL5pwYrYeISkFOq0bBhk-OQAbqgA1vzZynlq2QgVqAS8JMYA2lIAuqYGsEYmSGaINla+0QBsNl42U1JTvp7jwWEIvg5YvjY2vlPe3o6uvlKxGVkaOSr5VNlsYCIiqCJYegA2vIIvALZYdblVAUmi02iwur1+oZwcNQOYEBJvBJ7K5PL5vFNHD4bK4bBJfGtEC5JvEXLiplMrO4KRcQACbo0rpxuLx+EJRGJTnIFFd6kC7lcoYMYaZ4RYHK4sK5KbtZlIIgqCaExgkpeMkc4ZEclrS6gAVK6UH4MMgMGA-MBkZBYA20SgEERgdrGLAASQg7zAbAAwo7WYVUEKhqLEEkotKMa4ZAclhJCQjpFgZPFfFjfP4pO50pk6bzbZgjSazWALVabYaHU6YVhfVW1AwA1gtCwCt8RAH7X6YWwAMoMcpgANBkUjeFOJJYFO7Txoqykqbx2KSiKp5wSA6OTNTXV5w3G03my3W-OwTt1l219oFBuKLA9y0QNSlADuHbQlFgjwHImKxjKZEqGp-l3O192LUtjwrLsOjIGtoOvRt7zIR8ChfN9UA-L9HmaADWmdMhuj6EYBmDUdEEODF7FSKNDlROITkXKZJUpFZPAWSkpDxGwd1octQKLQ8yxPM98LgusEMUX9SiwFk+GA3jhLAwTILtStRMvFsqBvDRhxgkMEFcKNJxxeYFiOOIrDjZUEAxOxPEzPxPAiSJfFcbweKURSBJLI8+ILNTqw0+sAx9d5MEHRQRJHfRoT0siDJcLAKUiNEnCmJxM3jWZkSSVxHDnFZUn2FYPOwLyDx8ssAFU9AgK8BV491PTYGq6r4DtZIAV3gYjYuMfTpESnwdmkeVXLnJV1isKRHHsBwcVs3Zlm3HN9T3byIKwVr6oDbAkJQhqMK609Otq-130-ERvyk-9ANqECCyUyrrW2zTdrvB9GQwD8eGQbrKFOtqIqOrCRBwyowRgwjdP6+LpFiSdLIxM45wcBdrIOTwsCOVzjiY9dIlcDIczIdA4FMekGmBXlmx0XrhTiuFLE2KRsdlHFN1TGR13jBV7DiHxEUcU4uKsUq+Vud6eyIVBXzChgDsochHzBF4YdhUYEU8SVUm8aM3B2KR-G8XnLP5rFYnxZMTk8cXAUl7J1f0ix0zsFJZTyo3N3ldH1nGbH5TcREph8WNfHFgBRJ5IEoQQGWp2gnfiiwMXDeZtYpRZ8Xd+MsRygnKQCPxpFt1aHtPJ7NuEgKYLdD0wCTpmEDRbwpXxTZjnspJUkXLF7CsQ50V2NxZjFsuFPWiqq6g89YKCiSNCbJg3rbDsa9hmKGY3zXEVTaJHAWCRPACaUkcXHwkspCl3H2JbU3F8rwN86voIveCtMQz7ULAV9Iou0HG471DvYGY0obBHE4ocX25F8r91OJiA+SxThHAfpPJ+QkZ7qXfpQbSGAPpWkoGhP+IMrqPEAfCbUrNcSHDnAcY2Exz6t2SiHDcBwj6l0uBPfiU9n6YMCtg3BgZ6akSboiLYcRD7HwzmfayR87DOUxHiNiDhjioO4eglS-lX4axItFTW9ksY3w7qiTMthHDxn8EmTMPhIhSGmtKSkajHobV8q9L6SgmoN2EXo+ELc26GyMQkNy8ZMSs0tnEJwNi9hE3Hp5NByktpnTenUfa7ifq8H+oDc6JDvzkPCHsKY0R4bxBjAfBhGMUhSlojsQyM5sROIri46qST3E9U3iI-RXh-GzECYZE21k1xVLnPMVyywnISAaYWHhVo8kIACHYIx44u5mPjC7WaqJnD2TxHlSJixSqzLWVjd2uxPZcx9qskuUou4+CNtrFIzhiZpCAA */
export const todosMachine = createMachine(
  {
    context: { todos: [] },
    tsTypes: {} as import("./todosMachine.typegen").Typegen0,
    schema: {
      context: {} as Context,
      events: {} as Event,
      services: {} as {
        "Fetch todos": {
          data: TodoItem[];
        };
        "Refetch todos": {
          data: TodoItem[];
        };
        "Send new todo to server": {
          data: TodoItem;
        };
        "Send todo status update to server": {
          data: void;
        };
      },
    },
    id: "todos",
    initial: "Fetching todos",
    states: {
      "Fetching todos": {
        invoke: {
          src: "Fetch todos",
          onDone: [
            {
              actions: "Assign initial todos to context",
              target: "Fetched initial todos",
            },
          ],
          onError: [
            {
              target: "Erred fetching todos",
            },
          ],
        },
        initial: "Waiting",
        after: {
          "3000": {
            target: "Erred fetching todos",
          },
        },
        states: {
          Waiting: {
            tags: "render nothing",
            after: {
              "1000": {
                target: "Show loading indicator",
              },
            },
          },
          "Show loading indicator": {
            tags: "show loading indicator",
          },
        },
      },
      "Erred fetching todos": {
        tags: "show error state",
      },
      "Fetched initial todos": {
        type: "parallel",
        states: {
          "Todos management": {
            type: "parallel",
            states: {
              "Todos creation": {
                initial: "Idle",
                states: {
                  Idle: {
                    on: {
                      "Create todo": {
                        target: "Creating a todo",
                      },
                    },
                  },
                  "Creating a todo": {
                    tags: "show todo creation form",
                    initial: "Waiting for todo creation",
                    states: {
                      "Waiting for todo creation": {
                        on: {
                          "Save todo": {
                            target: "Sending new todo to server",
                          },
                        },
                      },
                      "Sending new todo to server": {
                        invoke: {
                          src: "Send new todo to server",
                          onDone: [
                            {
                              actions: "Assign new todo to context",
                              target: "Sent new todo to server",
                            },
                          ],
                        },
                        tags: "is sending request to server",
                      },
                      "Sent new todo to server": {
                        type: "final",
                      },
                    },
                    on: {
                      "Close todo creation": {
                        target: "Idle",
                      },
                    },
                    onDone: {
                      target: "Idle",
                    },
                  },
                },
              },
              "Updating todos": {
                initial: "Idle",
                states: {
                  Idle: {
                    on: {
                      "Update todo status": {
                        actions: "Assign todo status update to context",
                        target: "Sending todo status update to server",
                      },
                    },
                  },
                  "Sending todo status update to server": {
                    invoke: {
                      src: "Send todo status update to server",
                      onDone: [
                        {
                          target: "Idle",
                        },
                      ],
                    },
                    tags: "is sending request to server",
                  },
                },
              },
            },
          },
          "Refreshing todos": {
            initial: "Idle",
            states: {
              Idle: {
                on: {
                  "Refresh todos": {
                    target: "Refetching todos",
                  },
                },
              },
              "Refetching todos": {
                tags: "is refreshing todos",
                invoke: {
                  src: "Refetch todos",
                  onDone: {
                    target: "Idle",
                    actions: "Assign refreshed todos to context",
                  },
                  onError: {
                    target: "Failed to fetch todos",
                  },
                },
                on: {
                  "Save todo": {
                    target: "Idle",
                  },
                  "Update todo status": {
                    target: "Idle",
                  },
                },
              },
              "Failed to fetch todos": {
                on: {
                  "Refresh todos": {
                    target: "Refetching todos",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  {
    services: {
      "Fetch todos": async (_context, _event): Promise<TodoItem[]> => {
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
            label: "Write an article about @xstate/test",
            checked: true,
          },
        ];

        return initialTodos;
      },

      "Refetch todos": async (context): Promise<TodoItem[]> => {
        await waitForTimeout(1_000);

        return [
          ...context.todos,
          {
            id: generateId(),
            label: "Todo created by another user",
            checked: true,
          },
        ];
      },

      "Send new todo to server": async (
        _context,
        { todo: todoLabel }
      ): Promise<TodoItem> => {
        await waitForTimeout(1_000);

        console.log("Sending new todo to server", todoLabel);

        return {
          id: nanoid(),
          label: todoLabel,
          checked: false,
        };
      },

      "Send todo status update to server": async (
        _context,
        event
      ): Promise<void> => {
        await waitForTimeout(1_000);

        console.log("Sending todo status update to server", event);
      },
    },

    actions: {
      "Assign initial todos to context": assign({
        todos: (_context, event) => {
          const { data: todos } = event;

          return todos;
        },
      }),

      "Assign refreshed todos to context": assign({
        todos: (_context, event) => {
          const { data: todos } = event;

          return todos;
        },
      }),

      "Assign new todo to context": assign({
        todos: ({ todos }, { data: todo }) => [...todos, todo],
      }),

      "Assign todo status update to context": assign({
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
