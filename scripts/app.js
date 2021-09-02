// ---
const form = $("#addForm");
const item = $(".item");
const itemList = $("#items");
const lis = $(".list-group-item");

// ---
const updateUi = (data) => {
  if (data.password) {
    password = data.password;
  } else if (data.message) {
    password = data.message;
  }

  // tooltip for dynamic elements
  $("body").tooltip({
    selector: ".tt",
  });

  html = `     <li class="list-group-item">
  <span class="textToCopy">
    ${password}</span
  >

  <span
    class="tt float-end"
    data-bs-placement="left"
    title="Copy"
  >
    <span class="copy"
      ><i class="fas fa-clipboard fa-1x"></i
    ></span>
  </span>
  </li>`;

  itemList.prepend(html);
};

// ---
form.on("submit", function (e) {
  e.preventDefault();
  let passwordLength = item.val();
  passwordLength = passwordLength ? passwordLength : 10;

  let pathChecked = $('input[name="inlineRadioOptions"]:checked').val();

  getPassword(pathChecked, passwordLength)
    .then((data) => {
      updateUi(data);
    })
    .catch((err) => {
      console.log(err);
    });

  // ---
  localStorage.setItem("passwordLength", passwordLength);
  localStorage.setItem("pathChecked", pathChecked);
});

// ---
let passwordLength = localStorage.getItem("passwordLength");
let pathChecked = localStorage.getItem("pathChecked");

if (passwordLength) {
  getPassword(pathChecked, passwordLength)
    .then((data) => {
      updateUi(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

// flter passwords ---
$("#filter").on("keyup", function (e) {
  var value = $(this).val().toLowerCase();
  $("#items li").filter(function (e) {
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
  });
});

// ---
const tooltips = document.querySelectorAll(".tt");
tooltips.forEach((t) => {
  new bootstrap.Tooltip(t);
});

// ---
$("#items").on("click", ".tt", function () {
  // https://stackoverflow.com/a/50150393/15235273
  // this helped with changing tooltip text to copied
  $(this)
    .attr("title", "Copied!")
    .tooltip("_fixTitle")
    .tooltip("show")
    .attr("title", "Copy")
    .tooltip("_fixTitle");
});

// ---
document.querySelector("#items").addEventListener("click", copyToClipboard);
function copyToClipboard(e) {
  if (e.target.classList.contains("fas")) {
    let textToCopy =
      e.target.parentElement.parentElement.parentElement.firstElementChild
        .innerText;
    // console.log(textToCopy);
    // console.log(e.target);

    let myTemporaryInputElement = document.createElement("input");
    myTemporaryInputElement.type = "text";
    myTemporaryInputElement.value = textToCopy;
    document.body.appendChild(myTemporaryInputElement);
    myTemporaryInputElement.select();
    document.execCommand("Copy");
    document.body.removeChild(myTemporaryInputElement);
  }
}

// ---
// https://stackoverflow.com/a/51810568
$(".btn").on("click", function () {
  setTimeout(function () {
    $(".btn").addClass("shadow-none");
  }, 150);
  $(this).removeClass("shadow-none");
});
