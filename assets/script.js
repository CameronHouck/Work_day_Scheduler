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

$(".timeslot").each(function () {
    var time = $(this).data("time"); 
    var now = moment().hour(); 
    if (time < now) {
      $(this).parent().css({ backgroundColor: "#A9A9A9" }); 
    } else if (time == now) {
      $(this).parent().css({ backgroundColor: "#DC143C" }); 
      $(this)
        .siblings()
        .next()
        .append(
          "<button type='button' class='btn btn-primary editData' data-toggle='modal' data-element='" +
            time +
            "' data-target='#editEvent' type='submit'>Add Event</button>"
        );
    } else if (time > now) {
      $(this).parent().css({ backgroundColor: "#32CD32" });
      $(this)
        .siblings()
        .next()
        .append(
          "<button type='button' class='btn btn-primary editData' data-toggle='modal' data-element='" +
            time +
            "' data-target='#editEvent' type='submit'>Add Event</button>"
        );
    }
  });
