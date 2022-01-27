function App() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white border-b border-gray-200">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <p className="text-xl font-medium leading-6 text-gray-900 sm:truncate">
              XTodo
            </p>
          </div>
        </div>
      </nav>

      <div className="py-10">
        <header>
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">
              Things to get done
            </h1>
          </div>
        </header>

        <main>
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="px-4 py-8 space-y-4 sm:px-0">
              {/* <CheckboxList
              :items="thingsToDo"
              :on-checkbox-change="handleTodoStatusUpdate"
            >
              <template #title> Things to do </template>
            </CheckboxList> */}

              <div
                v-if="showTodoCreationForm"
                className="bg-white shadow sm:rounded-lg"
              >
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Create a todo
                  </h3>

                  <form
                    className="mt-5"
                    //  @submit.prevent="handleSaveTodo"
                  >
                    <div className="w-full sm:max-w-xs">
                      <label htmlFor="new-todo" className="sr-only">
                        New Todo
                      </label>

                      <input
                        id="new-todo"
                        type="text"
                        name="new-todo"
                        className="block w-full border-gray-300 rounded-md shadow-sm  focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                        placeholder="Write an article about XState"
                      />
                    </div>

                    <div className="flex justify-start pt-5">
                      <button
                        type="submit"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-yellow-500 border border-transparent rounded-md shadow-sm  hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                      >
                        Save
                      </button>

                      <button
                        type="button"
                        className="px-4 py-2 ml-3 text-sm font-medium bg-white border border-gray-300 rounded-md shadow-sm  text-blue-gray-900 hover:bg-blue-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                        // @click="handleCloseTodoCreation"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* <button
              v-else
              type="button"
              className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-white bg-yellow-500 border border-transparent rounded-full shadow-sm  hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              @click="handleOpenTodoCreation"
            >
              <PlusIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />

              Add a todo
            </button>

            <CheckboxList
              :items="thingsDone"
              :on-checkbox-change="handleTodoStatusUpdate"
            >
              <template #title> Things done </template>
            </CheckboxList> */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
