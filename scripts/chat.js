const webCamElement = document.getElementById("localVideo");
const canvasElement = document.getElementById("canvas");
const webcam = new Webcam(webCamElement, "user", canvasElement);
const startButton = document.getElementById("startWebcamButton");

startButton.addEventListener("click", () => {
  webcam
    .start()
    .then((result) => {
      if (result) {
        console.log("Webcam started successfully!");
        startButton.innerText = "Next";
      } else {
        console.error("Failed to start webcam.");
      }
    })
    .catch((error) => {
      console.error("Error starting webcam:", error);
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const profilePhotoUrl = localStorage.getItem("profilePhotoUrl");
  const profilePhotoChat = document.getElementById("profile-photo-chat");
  const profilePhotoChatLocal = document.getElementById(
    "profile-photo-chat-local"
  );
  if (profilePhotoChat && profilePhotoChatLocal) {
    profilePhotoChat.src = profilePhotoUrl;
    profilePhotoChatLocal.src = profilePhotoUrl;
  }

  const sendButton = document.getElementById("sendButton");
  const chatInput = document.getElementById("chatInput");
  const messagesContainer = document.getElementById("messages");

  sendButton.addEventListener("click", () => {
    const messageText = chatInput.value.trim();

    if (messageText !== "") {
      const messageElement = document.createElement("div");
      messageElement.className = "message";

      if (profilePhotoUrl) {
        const profilePhotoElement = document.createElement("img");
        profilePhotoElement.src = profilePhotoUrl;
        profilePhotoElement.className = "profile-photo-message";
        messageElement.appendChild(profilePhotoElement);
      }

      const messageTextElement = document.createElement("div");
      messageTextElement.textContent = messageText;
      messageTextElement.className = "inside-text";
      messageElement.appendChild(messageTextElement);

      messagesContainer.appendChild(messageElement);

      chatInput.value = "";
    }
  });
});
