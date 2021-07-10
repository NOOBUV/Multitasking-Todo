const input = document.querySelector("input");
const btn = document.querySelector(".addbtn");
const todocontainer = document.querySelector(".tdcont");
const inputbox = document.querySelector(".todo");
// const del=document.querySelectorAll(".del");
var todos = localStorage.getItem("todos");
// var arrdell=document.querySelectorAll(".del");
// console.log(todos)
let id = localStorage.getItem("lastid")
  ? JSON.parse(localStorage.getItem("lastid"))
  : 0;
var del;
if (todos === null) {
  todos = [];
  localStorage.setItem("todos", JSON.stringify(todos));
} else {
  todos = JSON.parse(localStorage.getItem("todos"));
  loadTodo();

  del = document.querySelectorAll(".del");
}
function loadTodo() {
  JSON.parse(localStorage.getItem("todos")).map((todo, index) => {
    const newtodo = document.createElement("div");
    newtodo.classList.add("newtodo");
    // console.log(todo.id);
    // newtodo.setAttribute("name",todo.id);
    todocontainer.appendChild(newtodo);
    newtodo.innerHTML = `<div class="todotext">${todo.title}</div>
        <button class="del" name=${todo.id}>Del</button>`;
    // let indexs=index;
  });
}

// function del() {
//     console.log(this)
//     // todos.splice(indexs,1);
//     localStorage.setItem("todos", JSON.stringify(todos));
// }
del.forEach((deletedbtn) => {
  deletedbtn.addEventListener("click", (e) => {
    // console.log(e.target);
    const todoid = e.target.getAttribute("name");
    console.log(todoid);

    todos = todos.filter((t) => {
      // console.log(t.id,todoid)
      // console.log(typeof(t.id))
      // console.log(typeof(todoid))
      // console.log(parseInt(t.id)!==parseInt(todoid))
      return parseInt(t.id) !== parseInt(todoid);
    });
    e.target.parentElement.remove();
    // console.log(todos)
    localStorage.setItem("todos", JSON.stringify(todos));
    // console.log(e.target.parentElement.firstChild.innerHTML)
    // localStorage.removeItem()
  });
});
btn.addEventListener("click", () => {
  console.log(todos);
  if (input.value != "") {
    const newtodo = document.createElement("div");

    newtodo.classList.add("newtodo");
    newtodo.innerHTML = `<div class="todotext">${input.value}</div>
        <button class="del" name=${id}>Del</button>`;
    newtodo.setAttribute("name", id);
    todocontainer.appendChild(newtodo);
    // const tempval=input.value;
    let temp = {
      title: input.value,
      done: false,
      id: id,
    };
    id++;
    localStorage.setItem("lastid", JSON.stringify(id));
    // console.log(todos)
    todos.push(temp);
    // console.log(todos);
    input.value = "";

    localStorage.setItem("todos", JSON.stringify(todos));
    newtodo.querySelector(".del").addEventListener("click", (e) => {
      // console.log(e.target);
      const todoid = e.target.getAttribute("name");
      console.log(todoid);
      todos = todos.filter((t) => {
        // console.log(t.id,todoid)
        // console.log(typeof(t.id))
        // console.log(typeof(todoid))
        console.log(parseInt(t.id) !== parseInt(todoid));
        return parseInt(t.id) !== parseInt(todoid);
      });
      e.target.parentElement.remove();
      console.log(todos);
      localStorage.setItem("todos", JSON.stringify(todos));
    });
    // del.addEventListener("click",(e) =>{
    //     e.target.parentElement.remove();
    // })
  }
  input.value = "";
  // del=document.querySelectorAll(".del");
});

const newTodo = localStorage.getItem("todos");

// to use commands today:
// fetch(api)
// then(res=> res.json)
// then(data=>console.log(data.bio))

// showing time
function updateClock() {
  var now = new Date();
  var dname = now.getDay(),
    mo = now.getMonth(),
    dnum = now.getDate(),
    yr = now.getFullYear(),
    hou = now.getHours(),
    min = now.getMinutes(),
    sec = now.getSeconds(),
    pe = "AM";

  if (hou >= 12) {
    pe = "PM";
  }
  if (hou == 0) {
    hou = 12;
  }
  if (hou > 12) {
    hou = hou - 12;
  }

  Number.prototype.pad = function (digits) {
    for (var n = this.toString(); n.length < digits; n = 0 + n);
    return n;
  };

  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Augest",
    "September",
    "October",
    "November",
    "December",
  ];
  var week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var ids = [
    "dayname",
    "month",
    "daynum",
    "year",
    "hour",
    "minutes",
    "seconds",
    "period",
  ];
  var values = [
    week[dname],
    months[mo],
    dnum.pad(2),
    yr,
    hou.pad(2),
    min.pad(2),
    sec.pad(2),
    pe,
  ];
  for (var i = 0; i < ids.length; i++)
    document.getElementById(ids[i]).firstChild.nodeValue = values[i];
}

function initClock() {
  updateClock();
  window.setInterval("updateClock()", 1);
}

// quote api functions
var data;
let front = true;
const authors = document.querySelectorAll(".author");
const texts = document.querySelectorAll(".text");
const button = document.querySelectorAll(".new-quote");
console.log(button);
console.log({ texts });
// const cards=document.querySelectorAll(".thecard")

const blockFront = document.querySelector(".front");
const blockBack = document.querySelector(".back");

// need to fix this but let's see if it works
const authorFront1 = authors[0];
const authorBack1 = authors[1];

const textFront1 = texts[0];
const textBack1 = texts[1];

const displayQuote = () => {
  let index = Math.floor(Math.random() * data.length);
  let quote = data[index].text;
  let author = data[index].author;

  if (quote.length > 90) {
    displayQuote();
  }

  if (!author) {
    author = "Anonymous";
  }
  if (front) {
    textFront1.innerHTML = quote;
    authorFront1.innerHTML = "-" + author;
  } else {
    textBack1.innerHTML = quote;
    authorBack1.innerHTML = "-" + author;
  }

  front = !front;
};

fetch("https://type.fit/api/quotes")
  .then(function (response) {
    return response.json();
  }) // Getting the raw JSON data
  .then(function (data) {
    this.data = data;
    console.log(data);
    displayQuote();
  });

button.forEach((fbutton) => {
  fbutton.addEventListener("click", (e) => {
    e.target.parentElement.parentElement.classList.toggle("rotate");
    displayQuote();
  });
});

// card 3
function callPlayer(frame_id, func, args) {
  if (window.jQuery && frame_id instanceof jQuery)
    frame_id = frame_id.get(0).id;
  var iframe = document.getElementById(frame_id);
  if (iframe && iframe.tagName.toUpperCase() != "IFRAME") {
    iframe = iframe.getElementsByTagName("iframe")[0];
  }
  if (iframe) {
    // Frame exists,
    iframe.contentWindow.postMessage(
      JSON.stringify({
        event: "command",
        func: func,
        args: args || [],
        id: frame_id,
      }),
      "*"
    );
  }
}

// text-editor js

// Allow for vendor prefixes.
window.requestFileSystem =
  window.requestFileSystem || window.webkitRequestFileSystem;

// Create a variable that will store a reference to the FileSystem.
var filesystem = null;

// Get references to the page elements.
var form = document.getElementById("file-form");
var filenameInput = document.getElementById("filename");
var contentTextArea = document.getElementById("content");

var fileList = document.getElementById("file-list");

var messageBox = document.getElementById("messages");

// A simple error handler to be used throughout this demo.
function errorHandler(error) {
  var message = "";

  switch (error.code) {
    case FileError.SECURITY_ERR:
      message = "Security Error";
      break;
    case FileError.NOT_FOUND_ERR:
      message = "Not Found Error";
      break;
    case FileError.QUOTA_EXCEEDED_ERR:
      message = "Quota Exceeded Error";
      break;
    case FileError.INVALID_MODIFICATION_ERR:
      message = "Invalid Modification Error";
      break;
    case FileError.INVALID_STATE_ERR:
      message = "Invalid State Error";
      break;
    default:
      message = "Unknown Error";
      break;
  }

  console.log(message);
}

// Request a FileSystem and set the filesystem variable.
function initFileSystem() {
  navigator.webkitPersistentStorage.requestQuota(
    1024 * 1024 * 5,
    function (grantedSize) {
      // Request a file system with the new size.
      window.requestFileSystem(
        window.PERSISTENT,
        grantedSize,
        function (fs) {
          // Set the filesystem variable.
          filesystem = fs;

          // Setup event listeners on the form.
          setupFormEventListener();

          // Update the file browser.
          listFiles();
        },
        errorHandler
      );
    },
    errorHandler
  );
}

function loadFile(filename) {
  filesystem.root.getFile(
    filename,
    {},
    function (fileEntry) {
      fileEntry.file(function (file) {
        var reader = new FileReader();

        reader.onload = function (e) {
          // Update the form fields.
          filenameInput.value = filename;
          contentTextArea.value = this.result;
        };

        reader.readAsText(file);
      }, errorHandler);
    },
    errorHandler
  );
}

function displayEntries(entries) {
  // Clear out the current file browser entries.
  fileList.innerHTML = "";

  entries.forEach(function (entry, i) {
    var li = document.createElement("li");

    var link = document.createElement("a");
    link.innerHTML = entry.name;
    link.className = "edit-file";
    li.appendChild(link);

    var delLink = document.createElement("a");
    delLink.innerHTML = "[x]";
    delLink.className = "delete-file";
    li.appendChild(delLink);

    fileList.appendChild(li);

    // Setup an event listener that will load the file when the link
    // is clicked.
    link.addEventListener("click", function (e) {
      e.preventDefault();
      loadFile(entry.name);
    });

    // Setup an event listener that will delete the file when the delete link
    // is clicked.
    delLink.addEventListener("click", function (e) {
      e.preventDefault();
      deleteFile(entry.name);
    });
  });
}

function listFiles() {
  var dirReader = filesystem.root.createReader();
  var entries = [];

  var fetchEntries = function () {
    dirReader.readEntries(function (results) {
      if (!results.length) {
        displayEntries(entries.sort().reverse());
      } else {
        entries = entries.concat(results);
        fetchEntries();
      }
    }, errorHandler);
  };

  fetchEntries();
}

// Save a file in the FileSystem.
function saveFile(filename, content) {
  filesystem.root.getFile(
    filename,
    { create: true },
    function (fileEntry) {
      fileEntry.createWriter(function (fileWriter) {
        fileWriter.onwriteend = function (e) {
          // Update the file browser.
          listFiles();

          // Clean out the form field.
          filenameInput.value = "";
          contentTextArea.value = "";

          // Show a saved message.
          messageBox.innerHTML = "File saved!";
        };

        fileWriter.onerror = function (e) {
          console.log("Write error: " + e.toString());
          alert("An error occurred and your file could not be saved!");
        };

        var contentBlob = new Blob([content], { type: "text/plain" });

        fileWriter.write(contentBlob);
      }, errorHandler);
    },
    errorHandler
  );
}

function deleteFile(filename) {
  filesystem.root.getFile(
    filename,
    { create: false },
    function (fileEntry) {
      fileEntry.remove(function (e) {
        // Update the file browser.
        listFiles();

        // Show a deleted message.
        messageBox.innerHTML = "File deleted!";
      }, errorHandler);
    },
    errorHandler
  );
}

// Add event listeners on the form.
function setupFormEventListener() {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get the form data.
    var filename = filenameInput.value;
    var content = contentTextArea.value;

    // Save the file.
    saveFile(filename, content);
  });
}

// Start the app by requesting a FileSystem (if the browser supports the API)
if (window.requestFileSystem) {
  initFileSystem();
} else {
  alert("Sorry! Your browser doesn't support the FileSystem API :(");
}

// text-editor js
const card2btn = document.querySelector(".card2button");
const toshow = document.querySelector(".clearfix");
const card2 = document.querySelector(".card2thecard");
const card4 = document.querySelector(".card4thecard");
const card4btn = document.querySelector(".card4button");
const closebtn = document.querySelector(".close");

card2btn.addEventListener("click", (e) => {
  e.target.parentElement.parentElement.classList.add("rotate");
  toshow.classList.add("show");
});

closebtn.addEventListener("click", (e) => {
  card2.classList.remove("rotate");
  toshow.classList.remove("show");
});

card4btn.addEventListener("click", (e) => {
  e.target.parentElement.parentElement.classList.add("rotate");
});

// timer js

var minutes = $("#set-time").val();

var target_date = new Date().getTime() + minutes * 60 * 1000; // set the countdown date
var time_limit = minutes * 60 * 1000;
//set actual timer
setTimeout(function () {
  alert("done");
}, time_limit);

var days, hours, minutes, seconds; // variables for time units

var countdown = document.getElementById("tiles"); // get tag element

getCountdown();

setInterval(function () {
  getCountdown();
}, 1000);

function getCountdown() {
  // find the amount of "seconds" between now and target
  var current_date = new Date().getTime();
  var seconds_left = (target_date - current_date) / 1000;

  if (seconds_left >= 0) {
    console.log(time_limit);
    if (seconds_left * 1000 < time_limit / 2) {
      $("#tiles").removeClass("color-full");
      $("#tiles").addClass("color-half");
    }
    if (seconds_left * 1000 < time_limit / 4) {
      $("#tiles").removeClass("color-half");
      $("#tiles").addClass("color-empty");
    }

    days = pad(parseInt(seconds_left / 86400));
    seconds_left = seconds_left % 86400;

    hours = pad(parseInt(seconds_left / 3600));
    seconds_left = seconds_left % 3600;

    minutes = pad(parseInt(seconds_left / 60));
    seconds = pad(parseInt(seconds_left % 60));

    // format countdown string + set tag value
    countdown.innerHTML =
      "<span>" +
      hours +
      ":</span><span>" +
      minutes +
      ":</span><span>" +
      seconds +
      "</span>";
  }
}

function pad(n) {
  return (n < 10 ? "0" : "") + n;
}

// card4infobtn eventlistener
var info = document.querySelector(".card4infobtn");
var imgclass = document.querySelector(".pomoimg");
info.addEventListener("click", (e) => {
  imgclass.classList.toggle("show");
});
