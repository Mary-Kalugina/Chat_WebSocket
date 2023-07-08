import "./css/style.css";
import "./css/modal.css";
import Chat from "./js/Chat";
import WebSocketConnection from "./js/WebSocket";

const chat = new Chat();

document.addEventListener("DOMContentLoaded", () => {
  chat.init();
});
