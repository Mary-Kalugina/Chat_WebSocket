import WebSocketConnection from "./WebSocket";

export default class Chat {
  constructor(container) {
    this.container = container;
    this.websocket = new WebSocketConnection();
    this.chat = document.querySelector(".chat__area");
    this.chatSend = document.querySelector(".chat_send");
  }
  //modal window
  init() {
    const widget = `<div class="widget modal__body modal__content">
    <h3 class="modal__header">Choose nickname</h3>
    <input type="text" class="input_name">
    <div class="error_message"></div>
    <button type="submit" class="submit_name">Continue</button>
    </div>`;
    document.querySelector("body").append(widget);
  }

  renderError(text) {
    document.querySelector(".error_message").textContent = text;
  }

  removeError() {
    document.querySelector(".error_message").textContent = "";
  }

  removeWindow() {
    document.querySelector(".widget").remove();
  }

  subscribeOnEvents() {
    const userNameInput = document.querySelector(".input_name").textContent;
    document
      .querySelector(".submit_name")
      .addEventListener("click", this.websocket.add(userNameInput));
    this.chatSend.addEventListener("click", this.websocket.sendMessage());
  }

  //on enter chat
  onEnterChatHandler(id, name) {
    const chatUser = `<div class="chat__user" id="${id}">
                      <div class="kinda_img"></div>
                      <p class="nickname">${name}</p>
                      </div>`;
    document.querySelector(".chat__userlist").append(chatUser);
  }

  renderMessage(message, name) {
    let addClass = "";
    if (name === "You") {
      addClass = "message__container-yourself";
    }

    this.chat
      .appendChild(`<div class="chat_message message__container ${addClass}">
          <div class="message__header">${name}, ${this.chat.time()}</div>
          <div class="message_text">${message}</div>
          </div>`);
  }

  onExit() {
    const id = this.websocket.user.id;
    document.getElementById(id).remove();
  }

  time() {
    let month = new Date().getMonth();
    if (month.toString().length === 1) {
      month = "0" + month.toString();
    }
    let hours = new Date().getHours();
    if (hours.toString().length === 1) {
      hours = "0" + hours.toString();
    }
    return (
      new Date().getDate() +
      "." +
      month +
      "." +
      new Date().getFullYear() +
      "   " +
      hours +
      ":" +
      new Date().getMinutes()
    );
  }
}
