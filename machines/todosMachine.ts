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

/** @xstate-layout N4IgpgJg5mDOIC5QBcD2FWwHQDEzIGMALASwDsoACNDWAYgzLC3IDdUBrZmzXfY8lR6wEbVAQCGyEqjIBtAAwBdRKAAOmEtNmqQAD0QAmAGyGsxgOwAWAKxWAzDYs37CwzZsAaEAE9EATgBGc3djV39jCIAOK0MrAF9472EsABV0TEoAWwkyCRgssDJkNIzYSgIAJzApGTIsAEkIABswOgBhaqkwagzdDVgtOt0DBECbQ38sC0MFU38rBXt-G397bz8EVYssWdnTY3HAqOMoxOSy0tps3PywQuKrzKqa7XrO18FKCV6MLAB1CRDCiUABmqEqv1QFS6bzoAGUJKwejx+po3iNEIsrNM3B4bG4LP4FFZAhYNohjFYppZDPZ6bY3P4TOcQCl0tccnkCkUShznrC6lgPrUQT8eFh4UUIF8mAB3KG9SiwMCVZGVBiyZhiLhYdllG7c+68p7lF61WTCwViqGS6WysAKnhKlVq1WiMjsSRvRQqJAgAZDHT+0YrYxYRaGGL+CwKDxhikIWlYFyBcauGxRex0+ys-Wc248x78s2Cy0i6Q2niaphYWDIbp6y4lw13B58g3mt5Wz5Vvr+wMYkOIcaTab7SaLZarda+RAzHFUuxRQILKJrPPNg1ctsmltdoUVr7ijIdZqYFEZGGfYPqdHDYdjCZTGZzSdLFZrRPGYwKLDM+wLBmKNZkzBIkjZLcCyNdssAAVTUCBRSES4mlaOgEKQ5BLwwZUG2QABXeAB3vW99CMUldnsE5bCsYwbECexAjiRMY2CKI4gURjHEmCxV03WhTVbIsSkw5CoWwKUyBlEFnXrKQiMoAjEO6F1VXVGttU9ThuCgzIdxE+CVMrFDBKkmTTOheTCPKZSsMvZV1PdMRvTqX00UGIdQFGOJgjpGi7HoxjmKsViFCiLBAjcWJ7B-OLwsSCCyHQOBdBSPBCFIWSyg8oMyExBBYjC-9iROYLlhWPiBN4FsDONYtOzLeo0LAXKvPIsYLHsHEojmEljisCx5lnTYfxsXZ11XJdo1MarsFqwt6o7a4D3La0qBPP5AWBKhwUhZ1VvykjPIfbyR0G79rCwZYgoXKwrBXOahLq2D9yantxM21A7Wkh0nSvNBHLdSo2tOjqgt2fEImJAkFAUfxv2pLAlmcMIiTo-qnoWmC90am93nW75bSk5BKHlRVAdddVQbI0YQvsa6sxXB6hpWbNLpxG6GLuh7Aix7dFtevGLQJ3sNqhGmjrOsY6UTJxwxJSxot638ohsfnoN3BqVqayWCv8BG5y2JZkY8GI0zi5izgg-N9MFk0xJMiTGhaVrjrygq03JI3-BOaZAlMWxszXNMNbtnHHkdr4UnM6Or2sxS7NUymnJB932tGGdkaiKJY1CNWTkMViPAjElqK6rMePAi5BOxrXROMuPaD1x8vyNrNxrTcZTB4saw-KF7eRb6XIkTBw-zmakiTVkwyT5m2cvTsG6aiRNjkS+IgA */
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
        },
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
            label: "Write an article about @xtate/test",
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
