import Chat from "./Chat";

export default class WebSocketConnection {
  constructor() {
    this.apiUrl = "https://chat-on-websocket.onrender.com";
    this.chat = new Chat();
    this.ws = null;
    this.user = null;
    this.chatSend = document.querySelector(".chat_send");
  }

  add(user) {
    document.querySelector(".error_message").textContent = "";
    const body = JSON.stringify({ name: user });

    const xhr = new XMLHttpRequest();
    xhr.open("POST", this.apiUrl + "/new-user");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) return;
      if (xhr.status == 200) {
        try {
          const result = JSON.parse(xhr.response);
          this.user = result.user;
          this.ws = new WebSocket("wss://chat-on-websocket.onrender.com");
          this.removeWidget();
          this.chat.onEnterChatHandler(this.user.id, this.user.name);
          this.subscribeOnEvents();
        } catch (e) {
          console.error(e);
        }
      } else {
        const response = JSON.parse(xhr.response);
        if (response.status === "error") {
          document.querySelector(".error_message").textContent =
            response.message;
          return;
        }
      }
    };
    xhr.send(body);
  }

  removeWidget() {
    document.querySelector(".widget").remove();
    this.showChat();
  }

  showChat() {
    document.querySelector(".container").classList.remove("hidden");
  }

  sendMessage() {
    console.log(this);
    const chatInput = document.querySelector(".chat_input");
    const message = chatInput.value;

    if (!message) return;
    console.log(this.user, "user");
    const body = JSON.stringify({
      user: this.user,
      type: "send",
      message,
    });
    console.log(body, "body");
    this.ws.send(body);

    chatInput.value = "";
  }

  subscribeOnEvents() {
    this.chatSend.addEventListener("click", this.sendMessage.bind(this));

    this.ws.addEventListener("open", (e) => {
      console.log("ws open");
    });

    this.ws.addEventListener("close", (e) => {
      console.log("ws close");

      this.ws.send(
        JSON.stringify({
          user: this.user,
          type: "exit",
        })
      );

      document.getElementById(this.user.id).remove();
    });

    this.ws.addEventListener("error", (e) => {
      console.log("ws error");
    });

    this.ws.addEventListener("message", (e) => {
      console.log(e.data);

      const data = JSON.parse(e.data);
      data.user.id === this.user.id
        ? this.chat.renderMessage(data.message, "You")
        : this.chat.renderMessage(data.message, data.user.name);
    });
  }
}
