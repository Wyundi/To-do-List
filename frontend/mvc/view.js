export const View = (() => {

  const domstr = {
    container: '.container',

    pendingList: '.pendingList',
    completedList: '.completedList',

    complete: '.complete',
    inputbox: '.todolist_input',
    submitbtn: '.todolist_submit',

    completebtn: '.completebtn',
    deletebtn: '.deletebtn',
    modifybtn: '.modifybtn',
  };

  const button_icon = {
    edit: `<svg focusable="false" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" aria-label="fontSize small"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="#ffffff"></path></svg>`,
    delete: `<svg focusable="false" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" aria-label="fontSize small"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="#ffffff"></path></svg>`,
    arrow_left: `<svg focusable="false" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" aria-label="fontSize small"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="#ffffff"></path></svg>`,
    arrow_right: `<svg focusable="false" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" data-testid="ArrowForwardIcon" aria-label="fontSize small"><path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" fill="#ffffff"></path></svg>`
  };

  const render = (ele, tmp) => {
    if (ele && tmp) {
      ele.innerHTML = tmp;
    }
  }

  const createTmp = (arr) => {

    let pendingList_html = '';
    let completedList_html = '';

    let task = undefined;
    let isChecked = 'uncomplete';
    arr.forEach(ele => {

      if (ele.completed) {
        isChecked = 'complete';
      } else {
        isChecked = 'uncomplete';
      }

      if (ele.modify) {
        console.log(ele.content);
        task = `<input type="text" id=${ele.id} class="edit_input" value="${ele.content}" />`;
      } else {
        task = `<span id=${ele.id} class=${isChecked}>${ele.content}</span>`;
      }

      if (ele.completed) {
        completedList_html += `
          <li>
            <div class="left-button">
              <button id="${ele.id}" class="completebtn">${button_icon.arrow_left}</button>
            </div>
            <div class="span-text">${task}</div>
            <div class='right-button'>
            <button id="${ele.id}" class="modifybtn">${button_icon.edit}</button>
            <button id="${ele.id}" class="deletebtn">${button_icon.delete}</button>
            <div>
          </li>
        `;
      } else {
        pendingList_html += `
          <li>
            <div class="span-text">${task}</div>
            <div class="right-button">
              <button id="${ele.id}" class="modifybtn">${button_icon.edit}</button>
              <button id="${ele.id}" class="deletebtn">${button_icon.delete}</button>
              <button id="${ele.id}" class="completebtn">${button_icon.arrow_right}</button>
            <div>
          </li>
        `;
      }

    });
    return {pendingList_html, completedList_html};
  }

  return {
    domstr,
    render,
    createTmp
  };
})();