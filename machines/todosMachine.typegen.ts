// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    "Assign initial todos to context": "done.invoke.todos.Fetching todos:invocation[0]";
    "Assign new todo to context": "Save todo";
    "Assign todo status update to context": "Update todo status";
  };
  internalEvents: {
    "done.invoke.todos.Fetching todos:invocation[0]": {
      type: "done.invoke.todos.Fetching todos:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    "Fetch todos": "done.invoke.todos.Fetching todos:invocation[0]";
    "Send new todo to server": "done.invoke.todos.Todos management.Todos creation.Creating a todo.Sending new todo to server:invocation[0]";
    "Send todo status update to server": "done.invoke.todos.Todos management.Updating todos.Sending todo status update to server:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    "Fetch todos": "xstate.init";
    "Send new todo to server": "Save todo";
    "Send todo status update to server": "Update todo status";
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | "Fetching todos"
    | "Fetching todos.Waiting"
    | "Fetching todos.Show loading indicator"
    | "Erred fetching todos"
    | "Todos management"
    | "Todos management.Todos creation"
    | "Todos management.Todos creation.Idle"
    | "Todos management.Todos creation.Creating a todo"
    | "Todos management.Todos creation.Creating a todo.Waiting for todo creation"
    | "Todos management.Todos creation.Creating a todo.Sending new todo to server"
    | "Todos management.Todos creation.Creating a todo.Sent new todo to server"
    | "Todos management.Updating todos"
    | "Todos management.Updating todos.Idle"
    | "Todos management.Updating todos.Sending todo status update to server"
    | {
        "Fetching todos"?: "Waiting" | "Show loading indicator";
        "Todos management"?:
          | "Todos creation"
          | "Updating todos"
          | {
              "Todos creation"?:
                | "Idle"
                | "Creating a todo"
                | {
                    "Creating a todo"?:
                      | "Waiting for todo creation"
                      | "Sending new todo to server"
                      | "Sent new todo to server";
                  };
              "Updating todos"?:
                | "Idle"
                | "Sending todo status update to server";
            };
      };
  tags:
    | "render nothing"
    | "show loading indicator"
    | "show error state"
    | "show todo creation form"
    | "is sending request to server";
}
