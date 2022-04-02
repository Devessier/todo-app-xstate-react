// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    "Assign initial todos to context": "done.invoke.todos.Fetching todos:invocation[0]";
    "Assign new todo to context": "done.invoke.todos.Fetched initial todos.Todos management.Todos creation.Creating a todo.Sending new todo to server:invocation[0]";
    "Assign todo status update to context": "Update todo status";
    "Assign refreshed todos to context": "done.invoke.todos.Fetched initial todos.Refreshing todos.Refetching todos:invocation[0]";
  };
  internalEvents: {
    "done.invoke.todos.Fetching todos:invocation[0]": {
      type: "done.invoke.todos.Fetching todos:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.todos.Fetched initial todos.Todos management.Todos creation.Creating a todo.Sending new todo to server:invocation[0]": {
      type: "done.invoke.todos.Fetched initial todos.Todos management.Todos creation.Creating a todo.Sending new todo to server:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.todos.Fetched initial todos.Refreshing todos.Refetching todos:invocation[0]": {
      type: "done.invoke.todos.Fetched initial todos.Refreshing todos.Refetching todos:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    "Fetch todos": "done.invoke.todos.Fetching todos:invocation[0]";
    "Send new todo to server": "done.invoke.todos.Fetched initial todos.Todos management.Todos creation.Creating a todo.Sending new todo to server:invocation[0]";
    "Send todo status update to server": "done.invoke.todos.Fetched initial todos.Todos management.Updating todos.Sending todo status update to server:invocation[0]";
    "Refetch todos": "done.invoke.todos.Fetched initial todos.Refreshing todos.Refetching todos:invocation[0]";
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
    "Refetch todos": "Refresh todos";
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | "Fetching todos"
    | "Fetching todos.Waiting"
    | "Fetching todos.Show loading indicator"
    | "Erred fetching todos"
    | "Fetched initial todos"
    | "Fetched initial todos.Todos management"
    | "Fetched initial todos.Todos management.Todos creation"
    | "Fetched initial todos.Todos management.Todos creation.Idle"
    | "Fetched initial todos.Todos management.Todos creation.Creating a todo"
    | "Fetched initial todos.Todos management.Todos creation.Creating a todo.Waiting for todo creation"
    | "Fetched initial todos.Todos management.Todos creation.Creating a todo.Sending new todo to server"
    | "Fetched initial todos.Todos management.Todos creation.Creating a todo.Sent new todo to server"
    | "Fetched initial todos.Todos management.Updating todos"
    | "Fetched initial todos.Todos management.Updating todos.Idle"
    | "Fetched initial todos.Todos management.Updating todos.Sending todo status update to server"
    | "Fetched initial todos.Refreshing todos"
    | "Fetched initial todos.Refreshing todos.Idle"
    | "Fetched initial todos.Refreshing todos.Refetching todos"
    | "Fetched initial todos.Refreshing todos.Failed to fetch todos"
    | {
        "Fetching todos"?: "Waiting" | "Show loading indicator";
        "Fetched initial todos"?:
          | "Todos management"
          | "Refreshing todos"
          | {
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
              "Refreshing todos"?:
                | "Idle"
                | "Refetching todos"
                | "Failed to fetch todos";
            };
      };
  tags:
    | "render nothing"
    | "show loading indicator"
    | "show error state"
    | "show todo creation form"
    | "is sending request to server"
    | "is refreshing todos";
}
