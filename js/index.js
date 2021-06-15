var countries = [];

fetch(
  "https://calendarific.com/api/v2/countries?api_key=b9a08c60bc14a3b6bdfbefb2232d1a913eb29941"
).then((d) =>
  d.json().then((data) => {
    data.response.countries.forEach((e) => {
      countries.push({ CountryName: e.country_name, CC: e["iso-3166"] });
    });
  })
);
