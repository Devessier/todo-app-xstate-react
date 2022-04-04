# Handle concurrent tasks with parallel states in XState

Thanks to parallel states, we can manage several tasks at the same time in a XState machine. Here we implement background refreshing of a list of todo.

With great power comes great responsibility and cancellation may be necessary to handle concurrent tasks correctly. Here we leverage cancellation to stop background refreshing when a todo is created or updated. That way we prevent race conditions to happen.

[Open explanatory video](https://youtu.be/Lvpi0XM_Nzg)

[See committed changes](https://github.com/Devessier/todo-app-xstate-react/compare/d8bb8f68d05194adffcfab808de31a523e20fb71..video-concurrent-tasks-with-parallel-states)

[Open live demo](https://deploy-preview-1--todo-app-xstate-react.netlify.app/)

## Getting started

Install dependencies:

```bash
npm install
```

Launch Next.js development server:

```bash
npm run dev
```

Now you can manage your todos!
