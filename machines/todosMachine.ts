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
  | { type: "Save todo"; todo: string };

/** @xstate-layout N4IgpgJg5mDOIC5QBcD2FWwHQDEzIGMALASwDsoACNDbAdQEMTlyoBiAD1mQeTCwYAzPgCcAFAEYADDICUbGplz5irauiWNmrRKAAOmbajK6QHRAFoA7ABYsEiQFZHEgJwOpADgBMAZiueADQgAJ6IElZWWD7eno7e7q623jaOAL5pwYrYeISkFOq0bBhk-OQAbqgA1vzZynlq2QgVqAS8JMYA2lIAuqYGsEYmSGaINla+0QBsNl42U1JTvp7jwWEIvg5YvjY2vlPe3o6uvlKxGVkaOSr5VNlsYCIiqCJYegA2vIIvALZYdblVAUmi02iwur1+oZwcNQOYEBJvBJ7K5PL5vFNHD4bK4bBJfGtEC5JvEXLiplMrO4KRcQACbo0rpxuLx+EJRGJTnIFFd6kC7lcoYMYaZ4RYHK4sK5KbtZlIIgqCaExgkpeMkc4ZEclrS6gAVK6UH4MMgMGA-MBkZBYA20SgEERgdrGLAASQg7zAbAAwo7WYVUEKhqLEEkotKMa4ZAclhJCQjpFgZPFfFjfP4pO50pk6bzbZgjSazWALVabYaHU6YVhfVW1AwA1gtCwCt8RAH7X6YWwAMoMcpgANBkUjeFOKaSo6eCSeBZTaRIqzxyPRVyaxzy0m+XV5w3G03my3W-OwTt1l219oFBuKLA9y0QNSlADuHbQlFgjwHImKxjKZEqGp-l3O192LUtjwrLsOjIGtoOvRt7zIR8ChfN9UA-L9HmaADWmdMhuj6EYBmDUdEEOKxkWcaVIgkGYZymZdPElU55kSVxvHlCYd1octQKLQ8yxPM98LgusEMUX9SiwFk+GA3jhLAwTILtStRMvFsqBvDRhxgkMEFcKMsEcHF5gWKdHEo5cZmiTM-GnSIJg4nilEUgSSyPPiCzU6sNPrAMfXeTBB0UESR30aE9LIgyXCwClIjRccnEzeNZmRJI1ysLFdkcfYVhc7A3IPDyywAVT0CArwFXj3U9NhysqvgO1kgBXeBiMi4x9OkWKfB2aR5V8JJcvjKwpEcewHBxDFZWWKYCq808lJK60GqqgNsCQlDqow1rTxair-XfT8RG-KT-0A2oQILZaIKwNbNI2u8H0ZDAPx4ZA2soA7GpC3asJEHDKjBGDCN0rrooXTxjMojEziyhxGOVBADmho4huOCc6MiVwMhzMh0DgUx6QaYFeWbHQOuFKK4UsTYpCwFJZTXKRUxkOj4wVew4h8RFcqkPFxgWwFbiensiFQV8goYbbKHIR8wRecHYVGBFmKwVJOMWNwdlZqxvE5yjuaxWJ8WTE5PGFhkydoZX9IsdM7CZ3YWbZ+UkfWcYNasCcsoOcZxikKwFoAUSeSBKEEa2dvaiLqYh2mEAsDFw3mZiKW19FdnjLF0uxykAj8aRLZzfU93cu7hJ8mC3Q9MA7eitFvClfFNmOTxM1sRxlyxex9b8Jm3FmYPS+upaK88qvoIveCtMbCnWxeDtq4TkASPC1XEVTaJHAWGcAhoxEmOb+KKXcfZdnTbNLgU8visrqDz1gvyJI0Z7kKfMBX1C46AYbxO3CsylBSJwHE4j+BsD3KIpxZznyGvrRYI8b6uTvuBSej91Kz0oNpDA79kCUDQj-f6p1Hj-1VhiCIjN8QpBnP1BYS5kaxBPpSKYs5tRIk8D7BaRU0FCQwb5LBODAxU1IgApEyI4h704enWGnMVjbAiAEfwDg6KpG4ag5Si0wo0zXp1FW8IO7QzgaAjuSRUjxn8EmCQewO7iMsj7a+uZb78Xvp5B6r0lC1XriIjeBj0Qt11nAhIHF4yYgZqbOITgfC2CGuolxvDVqHUenULaHj3q8C+j9I6xDvxkLHHsKY0QFzxBjLvCYoSUhSkOCcHEqJPDYjiTdCeZUkkeNjro+O+jECGICbMIJhkDbI2cOldEZt97FxsI08erirR5MQAEOwxj26d3McjB2E0kiYgxIcTMU1Jmj1tj4nRYpUxo1lDiDcbsOZrOLsA2wA1KLyhOCPDIQA */
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
        "Send new todo to server": {
          data: void;
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
              target: "Todos management",
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
                        actions: "Assign new todo to context",
                        target: "Sending new todo to server",
                      },
                    },
                  },
                  "Sending new todo to server": {
                    invoke: {
                      src: "Send new todo to server",
                      onDone: [
                        {
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

      "Send new todo to server": async (_context, event): Promise<void> => {
        await waitForTimeout(1_000);

        console.log("Sending new todo to server", event.todo);
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

      "Assign new todo to context": assign({
        todos: ({ todos }, { todo }) => [
          ...todos,
          {
            id: nanoid(),
            label: todo,
            checked: false,
          },
        ],
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
