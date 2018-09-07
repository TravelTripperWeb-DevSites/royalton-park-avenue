$(document).ready(function() {
  // Blog categories
   $(".toggle-arrow").click(function(){
     $(this).toggleClass('rotate');
     $(".categories").stop().slideToggle();
   });


  /*Gallery start*/

  $(".filter").on("click", function() {
    var $this = $(this);
    // if we click the active tab, do nothing
    if (!$this.hasClass("active")) {
      $(".filter").removeClass("active");
      $this.addClass("active"); // set the active tab
      var $filter = $this.data("rel"); // get the data-rel value from selected tab and set as filter
      $filter == 'all' ? // if we select "view all", return to initial settings and show all
        $(".fancybox").attr("data-fancybox-group", "gallery").not(":visible").fadeIn() : // otherwise
        $(".fancybox").fadeOut(0).filter(function() {
          return $(this).data("filter") == $filter; // set data-filter value as the data-rel value of selected tab
        }).attr("data-fancybox-group", $filter).fadeIn(1000); // set data-fancybox-group and show filtered elements
      //reset lightgallery after filtering
      setTimeout(function() {
        var lightgallery = $('#lightgallery');
        if (lightgallery.length > 0) {
          lightgallery.data('lightGallery').destroy(true);
          $('#lightgallery').lightGallery({
            selector: ".item:visible",
            counter: false,
            thumbnail: false,
            share: false

          });
        }

      }, 1000);
    } // if
  }); // on


  $('#lightgallery').lightGallery({
    selector: ".item",
    counter: false,
    thumbnail: false,
    share: false
  });


  /*Gallery end*/

  $('#snap-carousel').lightGallery({
    selector: ".item",
    counter: false,
    thumbnail: false,
    share: false
  });


  $('.fa-facebook').click(function(e) {
    e.preventDefault();
    FB.ui({
      method: 'share_open_graph',
      action_type: 'og.shares',
      action_properties: JSON.stringify({
        object: {
          'og:url': window.location.href,
          'og:title': $("h1.blog-heading").text(),
          'og:description': $(".blog-description").text(),
          'og:image:width': '1200',
          'og:image:height': '650',
          'og:image': "http:" + $("img.hero-img").attr("src")
        }
      })
    });
  });
  // FitVids init
  $("#main").fitVids();

  // init smooth scroll
  $("a").smoothScroll({
    offset: -20
  });


  //navbar main menu
  $(window).bind('scroll', function() {
    var navHeight = 300; // custom nav height
    ($(window).scrollTop() > navHeight) ? $('nav').addClass('sticky-top'): $('nav').removeClass('sticky-top');
  });
  $(".navbar-collapse ul").css({
    maxHeight: $(window).height() - $("nav").height() + "px"
  });


  //homepage slider outside indicator
  function initCarouselIndicators() {
    $(".carousel-indicators[data-target]").each(function(i, indicators) {
      var targetId = indicators.dataset.target;
      if (targetId != "") {
        var $carousel = $(targetId);
        $carousel.bind('slide.bs.carousel', function(e) {
          var $targetSlide = $(e.relatedTarget);
          var index = $targetSlide.index();
          $('.carousel-indicators[data-target="' + targetId + '"] li').removeClass('active')
          $('.carousel-indicators[data-target="' + targetId + '"] li:nth-child(' + (index + 1) + ')').addClass('active');
        });
      }
    });
  }


  // external owl carousel nav
  function owlOwlNav($carouselID, $navID) {
    var navNext = $($navID).find('.owl-arrow-next');
    var navPrev = $($navID).find('.owl-arrow-prev');
    var carouselID = $($carouselID);
    navNext.on('click', function() {
      carouselID.trigger('next.owl.carousel');
    });
    navPrev.on('click', function() {
      carouselID.trigger('prev.owl.carousel');
    });
  }
  //wedding carousel
  setTimeout(function() {
    owlOwlNav('#snap-carousel', '.snap-gallery-nav');
    $('#snap-carousel').owlCarousel({
      margin: 0,
      loop: true,
      items: 2,
      responsiveClass: true,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 2
        },
        1000: {
          items: 4
        },
        1500: {
          items: 5
        }
      }
    });
  }, 2000);
  //press carousel
  /* setTimeout(function(){
   owlOwlNav( '#pressCarousel', '.press-logo-nav');
   $('#pressCarousel').owlCarousel({
        margin:30,
        loop:true,
        items:2,
        responsiveClass:true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1000:{
                items:4
            },
            1500:{
                items:5
            }
        }
    });
   },2000);*/
  //rooms home owl
  setTimeout(function() {
    owlOwlNav('#rooms-suites-carousel', '.rooms-suites-nav');
    owlOwlNav('#exclusive-offers-carousel', '.exclusive-offers-nav');
    owlOwlNav('#more-assets', '.rooms-suites-nav');
    $('#rooms-suites-carousel').owlCarousel({
      loop: true,
      margin: 20,
      autoplay: true,
      navRewind: true,
      items: 1,
      responsiveClass: true,
      responsive: {
        0: {
          items: 1,
          nav: true
        }
      }
    });


    $('#exclusive-offers-carousel').owlCarousel({
      margin: 30,
      loop: true,
      items: 2,
      responsiveClass: true,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 2
        },
        1000: {
          items: 2
        }
      }
    });
    //room and offer details owl
    $('#more-assets').owlCarousel({
      margin: 30,
      loop: true,
      items: 2,
      responsiveClass: true,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 2
        },
        1000: {
          items: 3
        }
      }
    });

    //$("#photosSlider").owlCarousel();
    initCarouselIndicators();
  }, 3300);

  //home attraction owl
  owlOwlNav('#home-attractions', '.attractions-controls');
  setTimeout(function() {
    $('#home-attractions').owlCarousel({
      margin: 30,
      loop: true,
      responsiveClass: true,
      items: 1.5,
      nav: true,
      responsive: {
        0: {
          items: 1.2
        },
        600: {
          items: 1.3
        },
        1000: {
          items: 1.6
        }
      }
    });
  }, 1500);








  //Date Picker

  $("#od_arrival").datepicker({
    dateFormat: "yy-mm-dd",
    altField: '#arrival_date',
    altFormat: 'yy-mm-dd',
    minDate: 0,
    onSelect: function(date) {
      var date2 = $('#od_arrival').datepicker('getDate');
      date2.setDate(date2.getDate() + 1);
      $('#od_departure').datepicker('setDate', date2);
      //sets minDate to dt1 date + 1
      $('#od_departure').datepicker('option', 'minDate', date2);
    }
  });
  $('#od_departure').datepicker({
    dateFormat: "yy-mm-dd",
    altField: '#departure_dates',
    altFormat: 'yy-mm-dd',
    onClose: function() {
      var dt1 = $('#v').datepicker('getDate');
      console.log(dt1);
      var dt2 = $('#od_departure').datepicker('getDate');
      if (dt2 <= dt1) {
        var minDate = $('#od_departure').datepicker('option', 'minDate');
        $('#od_departure').datepicker('setDate', minDate);
      }
    }
  });
  $("#ui-datepicker-div").addClass("od-cal");


  $("#arrival_date, .main-date, .main-date-1").datepicker({
    dateFormat: "yy-mm-dd",
    altField: '#arrival_date',
    altFormat: 'yy-mm-dd',
    minDate: 0,
    onSelect: function(date) {
      var date2 = $('#arrival_date').datepicker('getDate');
      date2.setDate(date2.getDate() + 1);
      $('#departure_date').datepicker('setDate', date2);
      //sets minDate to dt1 date + 1
      $('#departure_date').datepicker('option', 'minDate', date2);
    }
  });
  $('#departure_date, #departure_date_1, .alternate-date, .alternate-date-1').datepicker({
    dateFormat: "yy-mm-dd",
    altField: '#departure_dates',
    altFormat: 'yy-mm-dd',
    onClose: function() {
      var dt1 = $('#v').datepicker('getDate');
      console.log(dt1);
      var dt2 = $('#departure_date').datepicker('getDate');
      if (dt2 <= dt1) {
        var minDate = $('#departure_date').datepicker('option', 'minDate');
        $('#departure_date').datepicker('setDate', minDate);
      }
    }
  });



  var rooms = 1;
  var roomsEl = document.getElementById("rooms");

  function roomsplus() {
    rooms++;
    roomsEl.value = rooms;
  }

  function roomsminus() {
    if (rooms > 1) {
      rooms--;
      roomsEl.value = rooms;
    }
  }

  var adults = 2;
  var adultsEl = document.getElementById("adults");

  function adultsplus() {
    adults++;
    adultsEl.value = adults;
  }

  function adultsminus() {
    if (adults > 1) {
      adults--;
      adultsEl.value = adults;
    }
  }

  var child = 0;
  var childEl = document.getElementById("child");

  function childplus() {
    child++;
    childEl.value = child;
  }

  function childminus() {
    if (child > 0) {
      child--;
      childEl.value = child;
    }
  }

});

//dropdown nav
$(window).on('load', function(){
 $('.loading').remove();
});
$(window).on('load resize', function(){
  if($(window).width() > 991) {
    $('ul.navbar-nav li.dropdown').hover(function() {
      $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(200);
    }, function() {
      $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(200);
    });
    $('ul.navbar-nav .dropdown-icon').remove();
  }else{
     $('ul.navbar-nav li.dropdown').each(function() {
       console.log($(this).find('.dropdown-icon').length);
       if($(this).find('.dropdown-icon').length == 0){
         $(this).append('<i class="fa fa-angle-right dropdown-icon" aria-hidden="true"></i>');
       }
     });
     $('ul.navbar-nav .dropdown-icon').on('click',function(e) {
       e.preventDefault();
       $(this).toggleClass('active');
       if($(this).siblings('.dropdown-menu').css('display') && $(this).siblings('.dropdown-menu').css('display') !== 'block'){
         if($(this).siblings('.dropdown-menu').css('display')){
           $(this).siblings('.dropdown-menu').stop(true, true).delay(200).slideDown('slow');
         }
       }else{
         $(this).siblings('.dropdown-menu').stop(true, true).delay(200).slideUp('slow');
       }
     });
  }
});


function pinterestShare(img, desc) {
    window.open("//www.pinterest.com/pin/create/button/" +
        "?url=" + window.location.href +
        "&media=" + img +
        "&description=" + desc, "pinIt", "toolbar=no, scrollbars=no, resizable=no, top=0, right=0");
    return false;
}

var fbAppId = '499595317087970';

if(document.location.hostname.indexOf('www.royaltonparkavenue.com') > -1){
    fbAppId = '163245761170250';
}

window.fbAsyncInit = function() {
    FB.init({appId: fbAppId, status: true, cookie: true,
    xfbml: true});
};

(function() {
    var e = document.createElement('script'); e.async = true;
    e.src = document.location.protocol +
    '//connect.facebook.net/en_US/all.js';
    if(document.getElementById('fb-root')) {
      document.getElementById('fb-root').appendChild(e);
    }

}());



// Restrict form submission by disabling submit button until all required fields are filled (W.r.t GDPR Guidelines)

function checkForm() {
  // here, "this" is an input element
  var isValidForm = true;
  $(this.form)
    .find(':input[required]:visible')
    .each(function() {
      if (!this.value.trim()) {
        isValidForm = false;
      }
    });
  $(this.form)
    .find('input[type="checkbox"]:required')
    .each(function() {
      if (!$(this)
        .is(':checked')) {
        isValidForm = false;
      }
    });
  $(this.form)
    .find('select:required')
    .each(function() {
      if (!$(this)
        .find('option:selected')
        .val()
        .trim()) {
        isValidForm = false;
      }
    });

  $(this.form)
    .find('#subscribe, #rfp-btn, #contact-btn') // Button class names should be unique for every form
    .prop('disabled', !isValidForm);
  return isValidForm;
}

$('#subscribe, #rfp-btn, #contact-btn') // Button class names should be unique for every form
  .closest('form')
  // indirectly bind the handler to form
  .submit(function() {
    return checkForm.apply($(this)
      .find(':input')[0]);
  })
  // look for input elements
  .find(':input[required]:visible')
  // bind the handler to input elements
  .on('change keyup', checkForm)
  // immediately fire it to initialize buttons state
  .keyup();
