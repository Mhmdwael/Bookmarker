var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var searchInput = document.getElementById("searchInput");
var textUrlAlert = document.getElementById("textUrlAlert");
var textSiteAlert = document.getElementById("textSiteAlert");

var myFav = [];

if (localStorage.getItem("website") != null) {
  myFav = JSON.parse(localStorage.getItem("website"));
  displaysite();
}

function addWeb() {
  if (siteNameVallidate() == true && urlNameVallidate() == true) {
    var addWeb = {
      name: siteNameInput.value,
      url: siteUrlInput.value,
    };
    myFav.push(addWeb);
    localStorage.setItem("website", JSON.stringify(myFav));
    displaysite();
    clearSite();
  }
}

function displaysite() {
  var container = "";
  for (let i = 0; i < myFav.length; i++) {
    container += `
        <tr>
            <td>${i + 1}</td>
            <td>${myFav[i].name}</td>
            <td>
               <a href='${
                 myFav[i].url
               }' target="_blank" class="btn text-decoration-none">
            <i class="fa-solid fa-eye "></i> Visit
            </a>
            </td>
            <td>
              <button class="btn btn2"  onclick="deleteSite(${i})">
                <i class="fa-solid fa-trash-can me-2"></i>Delete
              </button>
            </td>
          </tr>
        `;
  }
  document.getElementById("tBody").innerHTML = container;
}

function clearSite() {
  siteNameInput.value = "";
  siteUrlInput.value = "";
  siteNameInput.classList.remove("is-valid");
  siteUrlInput.classList.remove("is-valid");
}

function deleteSite(index) {
  myFav.splice(index, 1);
  localStorage.setItem("website", JSON.stringify(myFav));
  displaysite();
}
function search() {
  var siteName = searchInput.value;
  var container = "";
  var found=false;
  for (let i = 0; i < myFav.length; i++) {
    if (myFav[i].name.toLowerCase().includes(siteName.toLowerCase())) {
      found = true;
      container += `
        <tr>
            <td>${i + 1}</td>
            <td>${myFav[i].name}</td>
            <td>
            <a href='${
              myFav[i].url
            }' target="_blank" class="btn text-decoration-none">
            <i class="fa-solid fa-eye "></i> Visit
            </a>
            </td>
            <td>
              <button class="btn btn2" onclick="deleteSite(${i})">
                <i class="fa-solid fa-trash-can me-2"></i>Delete
              </button>
            </td>
          </tr>
        `;
    }
  }
  if (!found) {
    container = `<tr><td colspan="4" class="bg-danger text-light text-center">No results found</td></tr>`;
  }
  document.getElementById("tBody").innerHTML = container;
}

function siteNameVallidate() {
  var siteText = siteNameInput.value;
  var regex = /^[A-Z][a-z]{3,10}$/;
  if (regex.test(siteText) == true) {
    siteNameInput.classList.add("is-valid");
    siteNameInput.classList.remove("is-invalid");
    textSiteAlert.classList.add("d-none");
    return true;
  } else {
    siteNameInput.classList.remove("is-valid");
    siteNameInput.classList.add("is-invalid");
    textSiteAlert.classList.remove("d-none");
    return false;
  }
}
function urlNameVallidate() {
  var urlText = siteUrlInput.value;
  var regex =/^https?:\/\/(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,6}(\.[a-zA-Z]{2,6})?(\.[a-zA-Z]{2,})?(\/[a-zA-Z0-9#]+\/?)*$/;
  if (regex.test(urlText) == true) {
    siteUrlInput.classList.add("is-valid");
    siteUrlInput.classList.remove("is-invalid");
    textUrlAlert.classList.add("d-none");
    return true;
  } else {
    siteUrlInput.classList.remove("is-valid");
    siteUrlInput.classList.add("is-invalid");
    textUrlAlert.classList.remove("d-none");
    return false;
  }
}
