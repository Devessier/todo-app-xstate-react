import { assign, createMachine } from "xstate";
import { nanoid } from "nanoid/non-secure";
import { TodoItem } from "../types";
import { log } from "xstate/lib/actions";

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

/** @xstate-layout N4IgpgJg5mDOIC5QBcD2FWwHQDMzIGMALASwDsoAVdTAYgzLC3IDdUBrJvQo6jeJCAAOmEshKoyiUAA9EAJgCsAdiwBmFcoAMygJwAWAGwBGNWcMAaEAE9EBrFsPbdy+fN1b9xgL7erafiwAzABZAEMyMJgAWzAyZCCaWABhACcwMPFJZggAGzBaZIAlAFEAQUoSgH1KAHkAEVrpYVEsqUE5BBd5LBcjF11FQcd9K1sEE0V1AA59Z101OenFQ19-JMT+cMiYuITglPTMiTIsAiPxCj5ULAB3MLFyKho0jLbaAGUygDVqusbmiJYI9JM1OvotFosMZXGplK5DLp5MpLDZENo1FhFMZltNDJMhmpdGsQAdNqEIlEwLF4uTDm8TmcLk9rvRJExYMhMkwyQdtlSafskq9jtlzgyrjRAa0TmC7K5esp+nohooRmN0fp9Fh8ZDPCYYcZFGoSbykvzdrSDiK2kyJc8MIUADK1D5-Bq1KrFcqUACStQActLgW05V0FX1ESrhoZRmiJtMoQtpotjIYVEb06aNnzKZaEgBXIQQY6SwIkPIFACqAAV6hV3Y0qh9KBUqx9gyD2rIFO4sMo1IidLpjJ5FF4NQhR8j+0YTPJ9IpjYZ5Ca-KSc+a89S9lgiyXLg7MFhYHEICyaB8ucgC7Aq8XudQPmBUiwX2zGMwyGxOCez9cr0yW97wPMAnxfN9Uk7UMOl7XR+0HDw9FHRcJ3jXRYwcBckSHAc3H0Xx1zIdA4GaMluGIC9+Gg2VYIQfR5EnJEdRxfQPDUeRpmMRctGJdczS2bdBTpG1GQrfIaNBOjjHkLRpn7FFFDxQwtCXbRGPjQxZiwfRpl0JE9AxQwzGzQJcx2HcrWFZkxWZMsbnuR57NEqTQCBLswzTYwdVmEwtLhEcYTUSdXFUBi9NcRwF2URR5FM49zIFXdrRs05xVLI8-zIc8KADMBbmucDXxfSTuxATpYyhJVlgXdMvDUkKtB6Rx9JcaYBxHaZ4uwRL8xE1K7Qy64suQPKCpoIrINKzy5kndNDCwLjPC4gd9DMLQfH4zdBIs4SUoZWz7WuabpNXSclJ6YwRw8DC9MRNburpC1LKFfgXLK9yYJ7LpdHOnQsVWq7ByNNjkUe3qXr3B9D2ubBxLAE7vuMGFJxQ7ylzhYzFh0aZOPBrddt3fcho2U9sqo1BAJvO9obAymIJKwRPto76VCTDRuO0PzllRjaoQXHEl3kFTVwHfGdqS2liZhpJEfKuxgvjaY9J0kZBxUEd4QIrazIJyXkDlirfvjNaekGUH2OxhjusNxAcVRrrCKAA */
export const todosMachine = createMachine(
  {
    context: { todos: [] },
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
    id: "todos",
    initial: "fetchingTodos",
    states: {
      fetchingTodos: {
        invoke: {
          id: "fetchTodos",
          src: "fetchTodos",
          onDone: [
            {
              actions: "assignInitialTodosToContext",
              target: "#todos.todosManagement",
            },
          ],
        },
      },
      todosManagement: {
        type: "parallel",
        states: {
          todosCreation: {
            initial: "idle",
            states: {
              idle: {
                on: {
                  CREATE_TODO: {
                    target: "#todos.todosManagement.todosCreation.creatingTodo",
                  },
                },
              },
              creatingTodo: {
                tags: "showTodoCreationForm",
                initial: "waitingTodoCreation",
                states: {
                  waitingTodoCreation: {
                    on: {
                      SAVE_TODO: {
                        actions: "assignNewTodoToContext",
                        target:
                          "#todos.todosManagement.todosCreation.creatingTodo.sendingNewTodoToServer",
                      },
                    },
                  },
                  sendingNewTodoToServer: {
                    tags: "isSendingRequestToServer",
                    invoke: {
                      id: "sendTodoToServer",
                      src: "sendNewTodoToServer",
                      onDone: {
                        target:
                          "#todos.todosManagement.todosCreation.creatingTodo.sentNewTodoToServer",
                      },
                    },
                  },
                  sentNewTodoToServer: {
                    type: "final",
                  },
                },
                on: {
                  CLOSE_TODO_CREATION: {
                    target: "#todos.todosManagement.todosCreation.idle",
                  },
                },
                onDone: {
                  target: "#todos.todosManagement.todosCreation.idle",
                },
              },
            },
          },
          updatingTodos: {
            initial: "idle",
            states: {
              idle: {
                on: {
                  UPDATE_TODO_STATUS: {
                    actions: "assignTodoStatusUpdateToContext",
                    target:
                      "#todos.todosManagement.updatingTodos.sendingTodoStatusUpdateToServer",
                  },
                },
              },
              sendingTodoStatusUpdateToServer: {
                tags: "isSendingRequestToServer",
                invoke: {
                  id: "sendToServer",
                  src: "sendTodoStatusUpdateToServer",
                  onDone: [
                    {
                      target: "#todos.todosManagement.updatingTodos.idle",
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

      sendNewTodoToServer: async (_context, event): Promise<void> => {
        await waitForTimeout(1_000);

        console.log("Sending new todo to server", event.todo);
      },

      sendTodoStatusUpdateToServer: async (_context, event): Promise<void> => {
        await waitForTimeout(1_000);

        console.log("Sending todo status update to server", event);
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

      assignTodoStatusUpdateToContext: assign({
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
