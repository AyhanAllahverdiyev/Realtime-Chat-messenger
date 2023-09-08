const socket = io("http://localhost:3000");
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");
const name = prompt("What is your name?");

appendMessage("You joined");
socket.emit("new-user", name);

socket.on("chat-message", ({ message, name }) => {
  appendReceivedMessage(name, message);
});
socket.on("user-disconnected", (name) => {
  appendMessage(`${name} disconnected`);
});
socket.on("user-connected", (name) => {
  appendMessage(`${name} connected`);
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value.trim();
  if (message !== "") {
    socket.emit("send-chat-message", message);
    appendSentMessage("You", message);
    messageInput.value = "";
  }
});

function appendMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.style.color = "grey";
  messageContainer.appendChild(messageElement);
}

function appendSentMessage(sender, message) {
  const messageElement = document.createElement("div");
  messageElement.innerText = `${sender}: ${message}`;
  messageElement.classList.add("sent");
  messageContainer.appendChild(messageElement);
}

function appendReceivedMessage(sender, message) {
  const messageElement = document.createElement("div");
  messageElement.innerHTML = `<span class="sender-name">${sender}:</span> ${message}`;
  messageElement.classList.add("received");
  messageContainer.appendChild(messageElement);
}
