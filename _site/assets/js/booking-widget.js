$(function() {
  var body = $('body');
  var sidebar = $('.booking-widget');
  var iframe = sidebar.find("iframe");
  var iframeURL = iframe.data('url')
  var closeButton = $('.booking-widget_close');
  var showButtons = $('[show-booking-widget]');

  // Show booking sidebar events
  $.each(showButtons, function(i, item) {
    $(item).on('click', function(e) {
      e.preventDefault();

      if (!sidebar.hasClass('-show')) {
        body.addClass('overflow');
        sidebar.addClass('-show');
      }
    });
  });

  // Close sidebar event
  closeButton.on('click', function() {
    body.removeClass('overflow');
    sidebar.removeClass('-show');
  });

  
});
