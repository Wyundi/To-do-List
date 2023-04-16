import { Api } from "./api.js";
import { View } from "./view.js";

export const Model = ((api, view) => {
  class State {
    #todolist = [];

    get todolist() {
      return this.#todolist;
    }

    set todolist(newtodos) {
      this.#todolist = newtodos;

      const pendingList = document.querySelector(view.domstr.pendingList);
      const completedList = document.querySelector(view.domstr.completedList);
      const {pendingList_html, completedList_html} = view.createTmp(this.#todolist);
      
      view.render(pendingList, pendingList_html);
      view.render(completedList, completedList_html);
    }
  }
  class Todo {
    constructor(content) {
      this.content = content;
      this.completed = false;
      this.modify = false;
    }
  }

  const {getTodos, deleteTodo, addTodo, updateTodo} = api;

  return {
    getTodos,
    deleteTodo,
    addTodo,
    updateTodo,
    Todo,
    State
  }
})(Api, View);