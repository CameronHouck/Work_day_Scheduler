function liveTime() {
    $("#moment-time").html(moment().format("MMMM D YYYY hh:mm A"));
  }
  setInterval(liveTime, 1000);

  function setLocalStorage(objKey, objValue) {
    var dailySchedule = JSON.parse(localStorage.getItem("dailySchedule") || "{}");
    dailySchedule[objKey] = objValue;
    localStorage.setItem("dailySchedule", JSON.stringify(dailySchedule));
  }
  