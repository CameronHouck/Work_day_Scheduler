function liveTime() {
  $("#moment-time").html(moment().format("MMMM D YYYY hh:mm A"));
}
setInterval(liveTime, 1000);

function setLocalStorage(objKey, objValue) {
  var dailySchedule = JSON.parse(localStorage.getItem("dailySchedule") || "{}");
  dailySchedule[objKey] = objValue;
  localStorage.setItem("dailySchedule", JSON.stringify(dailySchedule));
}

$(document).ready(function () {
  var scheduledItems = JSON.parse(
    localStorage.getItem("dailySchedule") || "{}"
  );
  var eventInfoItems = $(".eventInfo");
  $.each(eventInfoItems, function (index, object) {
    var object = $(object);
    var dataValue = object.attr("value");
    $.each(scheduledItems, function (key, value) {
      if (key == dataValue) {
        object.text(value);
      }
    });
  });
});
