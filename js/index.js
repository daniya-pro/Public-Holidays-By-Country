var countries = [];

fetch(
  "https://calendarific.com/api/v2/countries?api_key=6fb1da00460d4eee6bb370a48c0aa06f5aed0aa0"
).then((d) =>
  d.json().then((data) => {
    data.response.countries.forEach((e) => {
      countries.push({ CountryName: e.country_name, CC: e["iso-3166"] });
    });
  })
);

document.getElementById("submit").addEventListener("click", (e) => {
  e.preventDefault();
  //elements
  let Input = document.getElementById("CcCn");
  let err = document.getElementById("err");
  let BON = document.getElementById("BON");
  let modal = document.getElementById("modal-one");
  //elements
  //variables
  var flag;
  //variables

  countries.forEach((e) => {
    if (e.CountryName.toLowerCase() === Input.value) {
      flag = true;
    } else if (e.CC.toLowerCase() === Input.value) {
      flag = true;
    }
  });

  if (Input.value === "") {
    err.innerHTML = `<li class='li'>Please Write A Country Name or Country Code In The Input Above</li>`;
    BON.style.display = "block";
  } else if (flag !== true) {
    BON.style.display = "block";
    err.innerHTML = `<li class='li'>There Might Be A Spelling Mistake Please Write The Name Correctly</li> <br> <li class='li'>If You Are Sure That You Have Writen It Correctly Then This Country Might Not Be Available</li>`;
  } else {
    BON.style.display = "none";
    err.innerHTML = "";
    modal.style.display = "none";

    // fetch("https://https://calendarific.com/api/v2/holidays?&api_key=6fb1da00460d4eee6bb370a48c0aa06f5aed0aa0&country=US&");
  }
});
