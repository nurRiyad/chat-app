const socket = io();

socket.on("welcome", (msg) => {
  console.log(msg);
});

const btn = document.querySelector("#send");
const msg = document.querySelector("#msg");
const lbtn = document.querySelector("#location");

btn.addEventListener("click", (event) => {
  socket.emit("sendMsg", msg.value);
});

lbtn.addEventListener("click", (event) => {
  if (navigator.geolocation) {
    const data = navigator.geolocation.getCurrentPosition((position) => {
      const fdata = `https://www.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`;
      socket.emit("sendLocation", fdata);
    });
  } else {
    alert("This browser doesn't support geo location");
  }
});

socket.on("newMsg", (msg) => {
  console.log(msg);
});
