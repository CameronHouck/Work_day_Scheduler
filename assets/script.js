function liveTime() {
    $("#moment-time").html(moment().format("MMMM D YYYY hh:mm A"));
  }
  setInterval(liveTime, 1000);