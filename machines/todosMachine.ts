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

/** @xstate-layout N4IgpgJg5mDOIC5QBcD2FWwHQDEzIGMALASwDsoACNDbAdQEMTlyoBiAD1mQeTCwYAzPgCcsARgAM0xKAAOmZiVRlZIDogBM4zVgCckgMwAOAGwBWU4fOaALAHZxtgDQgAnomObde8+fHmxraGwbY2AL7hrjSYuPjErNTomGwYZPzkAG6oANb8Mdh4hKQUSbQIWagEvMpkANqSALpqCrBKKmoaCBbmWJqSxnrW5ob2xlLmrh4ItpLiWKOStpqmy362XpHRyYXxJVQFbGAiIqhicgA2vIJnALZYBXHFiQUVZNnVLCoNzUggre1VH8uj0+gMhn5RuNJJN3J5RgtvIYLJJHIMwlsQI8iglSocuDw+AJhMcFtJJC1FF8gaAQX4wYNhlCJlNEPZ7IYsKZpPYwvZ-IFgpjHgAVHaUW4MMgMGC3MBkZBYMW0SgEERgGoqLAASQgFzAbAAwureGAyqhKW1qZ0tCZ7H1TEE9M7-N5xPZWQhNPZTBJvXoOT7gu7rMKdkrxZLpbL5YrlZhVSbqVhjRqWKUGOasIwlKUbiJzYm07U2ABlBiZM0xS2Am0IHSmXSacxGWymPRmQyaT1d4xYcwd7w9Xmrcxh2gRlVRmVgOUKycJtXFrWpmoZrOl+UQRLpADuhbQlFgx0rIlSKgy71y+XD8dgEqlM7ncfFS81ZBTScSmZiWE3ZG3Uo9wPVAjxPY43g+d8fhra1gUQcRxk5XxJFMexvE0FDHR7fwsDCdsgm9DZENscdYjvB9o1nWMF3vN9k1XdMqB-ZJz3SLBuFNB5b0jR8Y3nCj6NqT9i3Xas-gBODaVtYx7RWJ0XR0bQPThGYjH7RwQmMAcDG02SyOwCjp34l8VSElcvzE1jDQuTAq2SIt31g2o600O0HQU3wlPdHtDD0LAnVMUxxEQ905lMAzaMop8aIAVTkCA1wOcNdX1Nh4sSvhC045AAFd4AkqkXPg+tJA7LAxlWd1bF8IKfNUlEKpbGEzCkIJBkioy+Oo+cMqS81sH-QDkowI9CXyyhcoS00kjAkRTzYy9sjybiJy6qjnywPqmIGv8txeBycomqbMvsubT0gqpoKaZyOhKqRysq2xqtq4KVOmQJ7UkTRjFGEKhjbNtIiiEAyHQOA1GxPYDonHMmNuml1DZbtVK8WwAv6EZDCcFZHWMSKcX2XbSyIVB91shhhsocht0+M4EbrExJD6cQA15bRgqC7TPTRjGlgDfpmzbQwCehvEdgZkqNk9dt-LsKxDEMVDjC8RXOt4jaaMEr8tVSsBJekr0B10aw7UsVEB2RHtbHR7R-CMDt7DKvRxAikHRQ1mKBNfHWP0Y78szhxJ80LczEck4rDakJZ+wcdkBcDGwcM5Ls7G9AZvoCPQ3e2NbPZMqKw5E-qWIwPaAJ3MB9xiWbj3m44DaR+sWz7YxW2sFWWrbHtvX0KxnpGHkapzrEeKnbrNu15c-cs5iN1jShgJrw869PRuum0aR9GxtDeT8sqUemU3ETTp227t7P1fHzXvbM33i520uLUKq1I6bjtmfMOP7AT0Yk9UoW+h0IOGsK7IIAQxzuzHgmYyPVTKLl9uvRAtVY7sh-uhROh8ELjH0OMNC7opDNjcnoK+MCJ5xWmjtR4eskEIADOjL+aDf78iwd0CwXJlhhBVl2Fs2hSH3lgZtbaMNYhDREWNXgx1KFnVXg3F+tZ7phGZlYCw4gTBhA2LCaY-cFhKyxnoIcfJ+HRQLsI8WtBaEoVQfHDBf9WH+HRkYdmehZi+EsCPD218vbIEsSsax6DvR2M9G1fQBh0LOhWCEYIJCoETgAKInEgJQQQYsRqYFodpdGjgbBuSCGhaQxgeZKwkIMFYThGwuLKgZWhdgcKhI7Nyb68kQo+mBuEIAA */
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
              target: "#todos.Todos management",
            },
          ],
          onError: [
            {
              target: "#todos.Erred fetching todos",
            },
          ],
        },
        initial: "Waiting",
        after: {
          "3000": {
            target: "#todos.Erred fetching todos",
          },
        },
        states: {
          Waiting: {
            tags: "render nothing",
            after: {
              "1000": {
                target: "#todos.Fetching todos.Show loading indicator",
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
                    target:
                      "#todos.Todos management.Todos creation.Creating a todo",
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
                        target:
                          "#todos.Todos management.Todos creation.Creating a todo.Sending new todo to server",
                      },
                    },
                  },
                  "Sending new todo to server": {
                    tags: "is sending request to server",
                    invoke: {
                      src: "Send new todo to server",
                      onDone: [
                        {
                          target:
                            "#todos.Todos management.Todos creation.Creating a todo.Sent new todo to server",
                        },
                      ],
                    },
                  },
                  "Sent new todo to server": {
                    type: "final",
                  },
                },
                on: {
                  "Close todo creation": {
                    target: "#todos.Todos management.Todos creation.Idle",
                  },
                },
                onDone: {
                  target: "#todos.Todos management.Todos creation.Idle",
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
                    target:
                      "#todos.Todos management.Updating todos.Sending todo status update to server",
                  },
                },
              },
              "Sending todo status update to server": {
                tags: "is sending request to server",
                invoke: {
                  src: "Send todo status update to server",
                  onDone: [
                    {
                      target: "#todos.Todos management.Updating todos.Idle",
                    },
                  ],
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
