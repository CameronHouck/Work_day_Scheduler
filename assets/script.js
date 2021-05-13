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

$(".timearea").each(function () {
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

  $(".editData").click(function (event) {
    $("#eventDescription").val("");
    var chosenTime = $(this).parent().siblings().prev().html();
    $("#chosen-time").html(chosenTime);
    var timeValue = $(this).parent().siblings().prev().data("time");
    $("#chosen-time").attr("data-hourValue", timeValue);
  });

$("#saveBtn").click(function () { 
    var eventInformation = $("#eventDescription").val(); 
    var chosenTimeHTML = $(this)
      .parent()
      .siblings()
      .prev()[1]
      .querySelector("span");
    var chosenTimeHTML = $(chosenTimeHTML);
    var dataAttribute = chosenTimeHTML.attr("data-hourValue");
    $(".eventInfo").each(function (i, object) {
      var object = $(object);
      if (object.attr("value") == dataAttribute) {
        object.html(eventInformation);
        setLocalStorage(dataAttribute, eventInformation);
      }
    });
  });

