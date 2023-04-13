// convert epochtime to JavaScripte Date object
function epochToJsDate(epochTime) {
  return new Date(epochTime * 1000);
}

// convert time to human-readable format YYYY/MM/DD HH:MM:SS
function epochToDateTime(epochTime) {
  var epochDate = new Date(epochToJsDate(epochTime));
  var dateTime =
    epochDate.getFullYear() +
    "/" +
    ("00" + (epochDate.getMonth() + 1)).slice(-2) +
    "/" +
    ("00" + epochDate.getDate()).slice(-2) +
    " " +
    ("00" + epochDate.getHours()).slice(-2) +
    ":" +
    ("00" + epochDate.getMinutes()).slice(-2) +
    ":" +
    ("00" + epochDate.getSeconds()).slice(-2);

  return dateTime;
}

// DOM elements
const loginElement = document.querySelector("#login-form");
const contentElement = document.querySelector("#content-sign-in");
const userDetailsElement = document.querySelector("#user-details");
const authBarElement = document.querySelector("#authentication-bar");
const tableContainerElement = document.querySelector("#table-container");
const chartsCheckboxElement = document.querySelector(
  "input[name=charts-checkbox]"
);

// DOM elements for sensor readings
const chartsDivElement = document.querySelector("#charts-div");
const tempElement = document.getElementById("temp");
const humElement = document.getElementById("hum");
const lluElement = document.getElementById("llu");
const updateElement = document.getElementById("lastUpdate");

// MANAGE LOGIN/LOGOUT UI
const setupUI = (user) => {
  if (user) {
    //toggle UI elements
    loginElement.style.display = "none";
    contentElement.style.display = "block";
    authBarElement.style.display = "block";
    userDetailsElement.style.display = "block";
    userDetailsElement.innerHTML = user.email;

    // get user UID to get data from database
    var uid = user.uid;
    console.log(uid);

    // Database paths (with user UID)
    var dbPathTemp = "Weather/Temp";
    var dbPathHum = "Weather/Hum";
    var dbPathLlu = "Weather/rain";

    // Database references
    var dbRefTemp = firebase.database().ref().child(dbPathTemp);
    var dbRefHum = firebase.database().ref().child(dbPathHum);
    var dbRefLlu = firebase.database().ref().child(dbPathLlu);

    // Update page with new readings
    dbRefTemp.on("value", (snap) => {
      if (tempElement) {
        const data = snap.val();
        const keys = Object.keys(data);
        const latestKey = keys[keys.length - 1];
        tempElement.innerText = data[latestKey].toFixed(2);

        var x = new Date().getTime(),
          y = parseFloat(data[latestKey].toFixed(2));
        if (chartT.series[0].data.length > 40) {
          chartT.series[0].addPoint([x, y], true, true, true);
        } else {
          chartT.series[0].addPoint([x, y], true, false, true);
        }
      }
    });

    dbRefHum.on("value", (snap) => {
      if (humElement) {
        const data = snap.val();
        const keys = Object.keys(data);
        const latestKey = keys[keys.length - 1];
        humElement.innerText = data[latestKey].toFixed(2);

        var x = new Date().getTime(),
          y = parseFloat(data[latestKey].toFixed(2));
        if (chartH.series[0].data.length > 40) {
          chartH.series[0].addPoint([x, y], true, true, true);
        } else {
          chartH.series[0].addPoint([x, y], true, false, true);
        }
      }
    });
    dbRefLlu.on("value", (snap) => {
      if (lluElement) {
        const data = snap.val();
        const keys = Object.keys(data);
        const latestKey = keys[keys.length - 1];
        lluElement.innerText = data[latestKey].toFixed(2);

        var x = new Date().getTime(),
          y = parseFloat(data[latestKey].toFixed(2));
        if (chartL.series[0].data.length > 40) {
          chartL.series[0].addPoint([x, y], true, true, true);
        } else {
          chartL.series[0].addPoint([x, y], true, false, true);
        }
      }
    });

    // if user is logged out
  } else {
    // toggle UI elements
    loginElement.style.display = "block";
    authBarElement.style.display = "none";
    userDetailsElement.style.display = "none";
    contentElement.style.display = "none";
  }
};

// Checbox (charta for sensor readings)
chartsCheckboxElement.addEventListener("change", (e) => {
  if (chartsCheckboxElement.checked) {
    chartsDivElement.style.display = "block";
  } else {
    chartsDivElement.style.display = "none";
  }
});
