/*
   Expire Content
   ========================================================================== */

$(function() {
  $(".expired").each(function(index) {
    var end  = new Date($(this).data("end-date"));
    var date = new Date();
    if (date <= end)
      $(this).show();
  });
});