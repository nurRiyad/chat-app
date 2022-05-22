const socket = io();

//selecting dom element
const btn = document.querySelector("#send");
const msg = document.querySelector("#msg");
const lbtn = document.querySelector("#location");
const msgRender = document.querySelector("#message");
const sidebar = document.querySelector("#sidebar");

//selecting html template to render
const msgTemplae = document.querySelector("#message-templage").innerHTML;
const linkTemplate = document.querySelector("#link-template").innerHTML;
const sidebarTemplate = document.querySelector("#sidebar-template").innerHTML;

//part the query params
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

socket.on("newMsg", (msg) => {
  const html = Mustache.render(msgTemplae, {
    username: msg.username,
    msg: msg.msg,
    createdAt: moment(msg.createdAt).format("h.mm a"),
  });
  msgRender.insertAdjacentHTML("beforeend", html);
});

socket.on("locationMsg", (msg) => {
  const html = Mustache.render(linkTemplate, {
    username: msg.username,
    msg: msg.msg,
    createdAt: moment(msg.createdAt).format("h:mm a"),
  });
  msgRender.insertAdjacentHTML("beforeend", html);
});

socket.on("roomData", ({ users, room }) => {
  console.log("Called->", users);
  const html = Mustache.render(sidebarTemplate, {
    room,
    users,
  });
  sidebar.innerHTML = html;
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

socket.emit("join", { username, room }, (error) => {
  if (error) {
    alert(error);
    location.href = "/";
  }
});
