import { Model } from "./model.js";
import { View } from "./view.js";

export const Controller = ((model, view) => {
  const state = new model.State();

  const addTodo = () => {
    const inputbox = document.querySelector(view.domstr.inputbox);
    const submitbtn = document.querySelector(view.domstr.submitbtn);

    const handleSubmit = (task) => {
      const newtodo = new model.Todo(task);
        
      model.addTodo(newtodo).then(todo => {
        state.todolist = [todo, ...state.todolist];
      });
    };

    inputbox.addEventListener('keyup', event => {
      if (event.code === 'Enter' && event.target.value.trim() !== '') {
        handleSubmit(event.target.value.trim());
        event.target.value = '';
      }
    });

    submitbtn.addEventListener('click', event => {
      if (inputbox.value.trim() !== '') {
        handleSubmit(inputbox.value.trim());
        inputbox.value = '';
      }
    });
  }

  const deleteTodo = () => {
    const container = document.querySelector(view.domstr.container);

    container.addEventListener('click', event => {
      if (event.target.className === 'deletebtn') {
        state.todolist = state.todolist.filter((todo) => {
          return +todo.id !== +event.target.id;
        });
        model.deleteTodo(event.target.id);
      }
    });
  }

  const completeTodo = () => {
    const container = document.querySelector(view.domstr.container);

    container.addEventListener('click', event => {
      if (event.target.className === 'completebtn') {
        let complete_state = undefined;

        state.todolist = state.todolist.map((todo) => {
          if (+todo.id === +event.target.id) {
            todo.completed = !todo.completed;
            complete_state = todo.completed;
          }
          return todo;
        });

        model.updateTodo(event.target.id, {completed: complete_state})

      }
    });
  };

  const modifyTodo = () => {
    const container = document.querySelector(view.domstr.container);

    let modify_state = undefined;
    container.addEventListener('click', event => {
      if (event.target.className === 'modifybtn') {
        state.todolist = state.todolist.map((todo) => {
          if (+todo.id === +event.target.id) {
            todo.modify = !todo.modify;
            modify_state = todo.modify;
          }
          return todo;
        });

        if (modify_state){
          model.updateTodo(event.target.id, {modify: modify_state});
        } else {
          const newContent = event.target.closest("li").querySelector("input").value;
          model.updateTodo(event.target.id, {modify: modify_state, content: newContent});
        }
      }
    });
  };

  const init = () => {
    model.getTodos().then(todos => {
      state.todolist = todos.reverse();
    });
  }

  const bootstrap = () => {
    init();
    deleteTodo();
    addTodo();
    completeTodo();
    modifyTodo();
  }

  return { bootstrap };
})(Model, View);