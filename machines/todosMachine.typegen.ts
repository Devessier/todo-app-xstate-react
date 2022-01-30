// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    updateTodoStatus: "UPDATE_TODO_STATUS";
    assignInitialTodosToContext: "done.invoke.todos.fetchingTodos:invocation[0]";
    assignNewTodoToContext: "SAVE_TODO";
  };
  internalEvents: {
    "done.invoke.todos.fetchingTodos:invocation[0]": {
      type: "done.invoke.todos.fetchingTodos:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    fetchTodos: "done.invoke.todos.fetchingTodos:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    fetchTodos: "xstate.init";
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates: "fetchingTodos" | "idle" | "creatingTodo";
  tags: "showTodoCreationForm";
}
