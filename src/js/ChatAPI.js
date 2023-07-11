import WebSocketConnection from "./WebSocket";

export default class ChatAPI {
  constructor() {
    this.ws = new WebSocketConnection();
    this.chatSend = document.querySelector(".chat_send");
  }

  subscribeOnEvents() {
    this.chatSend.addEventListener("click", this.ws.send());
  }
}
