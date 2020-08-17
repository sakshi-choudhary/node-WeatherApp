const userinput = document.querySelector("form");
const search = document.querySelector("input");
const temp = document.querySelector("h2");
const msgone = document.querySelector("#msg1");

userinput.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  temp.textContent = "Loading...";
  msgone.textContent = "";

  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        temp.textContent = " ";

        msgone.textContent = data.error;
      } else {
        console.log(data.location);
        console.log(data.forecast);

        msgone.textContent = data.location;

        temp.textContent = data.forecast;
      }
    });
  });
});
