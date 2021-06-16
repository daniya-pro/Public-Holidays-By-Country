var countries = [];

fetch(
  "https://calendarific.com/api/v2/countries?api_key=73540fb60004f60f00fa294da35161370f6b6e47"
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
  let card = document.getElementById("card");
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
    card.style.display = "block";
    fetch(
      `https://calendarific.com/api/v2/holidays?api_key=73540fb60004f60f00fa294da35161370f6b6e47&country=${
        Input.value
      }&year=${new Date().getFullYear()}`
    ).then((d) =>
      d.json().then((data) => {
        if (Array.isArray(data.response.holidays)) {
          data.response.holidays.forEach((e) => {
            console.log(e);
            card.innerHTML += `<div class="maindiv Card">

<div class="eachdiv">

    <h3> ${e.name} </h3><br/>
    <p>
    <strong>Date : </strong>${e.date.iso}
    
    </p> <br/>
    <p><strong>Country : </strong> ${e.country.name} </p> <br/>
    <p><strong> Cities That Celebrates ${e.name} : </strong> ${e.locations} </p> <br/>
    <p><strong>Description : </strong><span class="description">${e.description}</span></p> <br/>

</div>

</div>`;
          });
        }
      })
    );
  }
});
