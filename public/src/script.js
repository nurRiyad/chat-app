const socket = io();
const btn = document.querySelector("#send");
const msg = document.querySelector("#msg");
const lbtn = document.querySelector("#location");
const msgTemplae = document.querySelector("#message-templage").innerHTML;
const linkTemplate = document.querySelector("#link-template").innerHTML;
const msgRender = document.querySelector("#message");

socket.on("newMsg", (msg) => {
  console.log(msg);
  const html = Mustache.render(msgTemplae, {
    msg: msg.msg,
    createdAt: moment(msg.createdAt).format("h.mm a"),
  });
  msgRender.insertAdjacentHTML("beforeend", html);
});

socket.on("locationMsg", (msg) => {
  console.log(msg);
  const html = Mustache.render(linkTemplate, {
    msg: msg.msg,
    createdAt: moment(msg.createdAt).format("h:mm a"),
  });
  msgRender.insertAdjacentHTML("beforeend", html);
});

btn.addEventListener("click", (event) => {
  btn.setAttribute("disabled", "disabled");
  socket.emit("sendMsg", msg.value, (error) => {
    btn.removeAttribute("disabled");
    msg.value = "";
    msg.focus();
    if (error) {
      console.log(error);
    } else {
      console.log("Message delivered");
    }
  });
});

lbtn.addEventListener("click", (event) => {
  if (navigator.geolocation) {
    lbtn.setAttribute("disabled", "disabled");
    navigator.geolocation.getCurrentPosition((position) => {
      const fdata = `https://www.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`;
      socket.emit("sendLocation", fdata, (error) => {
        lbtn.removeAttribute("disabled");
        if (error) {
          console.log(error);
        } else {
          console.log("Location Shared");
        }
      });
    });
  } else {
    alert("This browser doesn't support geo location");
  }
});
