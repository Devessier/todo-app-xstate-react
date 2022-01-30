// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    assignInitialTodosToContext: "done.invoke.fetchTodos";
    assignNewTodoToContext: "SAVE_TODO";
    assignTodoStatusUpdateToContext: "UPDATE_TODO_STATUS";
  };
  internalEvents: {
    "done.invoke.fetchTodos": {
      type: "done.invoke.fetchTodos";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "xstate.init": { type: "xstate.init" };
    "error.platform.fetchTodos": {
      type: "error.platform.fetchTodos";
      data: unknown;
    };
    "done.invoke.sendTodoToServer": {
      type: "done.invoke.sendTodoToServer";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.sendTodoToServer": {
      type: "error.platform.sendTodoToServer";
      data: unknown;
    };
    "done.invoke.sendToServer": {
      type: "done.invoke.sendToServer";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.sendToServer": {
      type: "error.platform.sendToServer";
      data: unknown;
    };
  };
  invokeSrcNameMap: {
    fetchTodos: "done.invoke.fetchTodos";
    sendNewTodoToServer: "done.invoke.sendTodoToServer";
    sendTodoStatusUpdateToServer: "done.invoke.sendToServer";
  };
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    fetchTodos: "xstate.init";
    sendNewTodoToServer: "SAVE_TODO";
    sendTodoStatusUpdateToServer: "UPDATE_TODO_STATUS";
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | "fetchingTodos"
    | "todosManagement"
    | "todosManagement.todosCreation"
    | "todosManagement.todosCreation.idle"
    | "todosManagement.todosCreation.creatingTodo"
    | "todosManagement.todosCreation.creatingTodo.waitingTodoCreation"
    | "todosManagement.todosCreation.creatingTodo.sendingNewTodoToServer"
    | "todosManagement.todosCreation.creatingTodo.sentNewTodoToServer"
    | "todosManagement.updatingTodos"
    | "todosManagement.updatingTodos.idle"
    | "todosManagement.updatingTodos.sendingTodoStatusUpdateToServer"
    | {
        todosManagement?:
          | "todosCreation"
          | "updatingTodos"
          | {
              todosCreation?:
                | "idle"
                | "creatingTodo"
                | {
                    creatingTodo?:
                      | "waitingTodoCreation"
                      | "sendingNewTodoToServer"
                      | "sentNewTodoToServer";
                  };
              updatingTodos?: "idle" | "sendingTodoStatusUpdateToServer";
            };
      };
  tags: "showTodoCreationForm" | "isSendingRequestToServer";
}
