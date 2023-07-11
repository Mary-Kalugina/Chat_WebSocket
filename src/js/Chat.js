export default class Chat {
  constructor() {
    this.chat = document.querySelector(".chat__area");
  }

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
          <div class="message__header">${name}, ${this.time()}</div>
          <div class="message_text">${message}</div>
          </div>`);
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
