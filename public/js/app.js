const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  messageOne.textContent = "Loading...";
  const location = search.value;
  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.err) {
          messageOne.textContent = data.err;
        } else {
          console.log(data);
          messageOne.textContent = `Location: ${data.address}, temperatur: ${data.temperature}, chances of rain: ${data.chanceOfRain}`;
        }
      });
    }
  );
});
