let lowerBoxes = document.querySelectorAll(".card .lower-box");
let data;
currentIndex = 0;
async function getData() {
  try {
    let response = await fetch("data.json");
    data = await response.json();
    return data;
  } catch (error) {
    return "error";
  }
}

function clearfield() {
  lowerBoxes.forEach((box) => {
    box.innerHTML = "";
  });
}
function generateElements(timeframe) {
  lowerBoxes.forEach((box) => {
    if (currentIndex < data.length) {
      let h2 = document.createElement("h2");
      h2.textContent = `${data[currentIndex].title}`;
      box.appendChild(h2);
      let spentDiv = document.createElement("div");
      spentDiv.className = "time-spent";
      let spanOne = document.createElement("span");
      let spanTwo = document.createElement("span");
      switch (timeframe) {
        case "daily":
          spanOne.innerHTML = `${data[currentIndex].timeframes.daily.current}hrs`;
          spanTwo.innerHTML = `Last Week -${data[currentIndex].timeframes.daily.previous}hrs`;
          break;
        case "weekly":
          spanOne.innerHTML = `${data[currentIndex].timeframes.weekly.current}hrs`;
          spanTwo.innerHTML = `Last Week -${data[currentIndex].timeframes.weekly.previous}hrs`;
          break;
        case "monthly":
          spanOne.innerHTML = `${data[currentIndex].timeframes.monthly.current}hrs`;
          spanTwo.innerHTML = `Last Week -${data[currentIndex].timeframes.monthly.previous}hrs`;
          break;
        default:
          break;
      }

      spentDiv.appendChild(spanOne);
      spentDiv.appendChild(spanTwo);
      box.appendChild(spentDiv);
      currentIndex++;
    }
  });
}

let taps = document.querySelectorAll(".user ul .link");

taps.forEach((tap) => {
  tap.addEventListener("click", (e) => {
    taps.forEach((btn) => {
      btn.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
    let timeframe = e.currentTarget.innerHTML.toLowerCase();
    currentIndex = 0;
    clearfield();
    generateElements(timeframe);
  });
});

document.addEventListener("DOMContentLoaded", async () => {
  await getData();
  document.querySelector(".user ul .link.active").click();
});
