/*
   jQuery plugin settings and other scriptds
   ========================================================================== */


$(document).ready(function () {

	// FitVids init
	$("#main").fitVids();

	// init smooth scroll
	$("a").smoothScroll({
		offset: -20
	});


	//navbar main menu
	$(window).bind('scroll', function () {
		var navHeight = 300; // custom nav height 
		($(window).scrollTop() > navHeight) ? $('nav').addClass('sticky-top'): $('nav').removeClass('sticky-top');
	});
	$(".navbar-collapse ul").css({
		maxHeight: $(window).height() - $("nav").height() + "px"
	});

	/*Gallery start*/


	$(".filter").on("click", function () {
		var $this = $(this);
		// if we click the active tab, do nothing
		if (!$this.hasClass("active")) {
			$(".filter").removeClass("active");
			$this.addClass("active"); // set the active tab
			var $filter = $this.data("rel"); // get the data-rel value from selected tab and set as filter
			$filter == 'all' ? // if we select "view all", return to initial settings and show all
				$(".fancybox").attr("data-fancybox-group", "gallery").not(":visible").fadeIn() : // otherwise
				$(".fancybox").fadeOut(0).filter(function () {
					return $(this).data("filter") == $filter; // set data-filter value as the data-rel value of selected tab
				}).attr("data-fancybox-group", $filter).fadeIn(1000); // set data-fancybox-group and show filtered elements
			//reset lightgallery after filtering
			setTimeout(function () {
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


	//homepage slider outside indicator
	function initCarouselIndicators() {
		$(".carousel-indicators[data-target]").each(function (i, indicators) {
			var targetId = indicators.dataset.target;
			if (targetId != "") {
				var $carousel = $(targetId);
				$carousel.bind('slide.bs.carousel', function (e) {
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
		navNext.on('click', function () {
			carouselID.trigger('next.owl.carousel');
		});
		navPrev.on('click', function () {
			carouselID.trigger('prev.owl.carousel');
		});
	}
	//wedding carousel 
	setTimeout(function () {
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
	setTimeout(function () {
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
	$('#home-attractions').owlCarousel({
		margin: 30,
		loop: true,
		autoWidth: true,
		autoHeight: true,
		items: 4,
		nav: true
	});







	//Date Picker

	$("#od_arrival").datepicker({
		dateFormat: "yy-mm-dd",
		altField: '#arrival_date',
		altFormat: 'yy-mm-dd',
		minDate: 0,
		onSelect: function (date) {
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
		onClose: function () {
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
		onSelect: function (date) {
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
		onClose: function () {
			var dt1 = $('#v').datepicker('getDate');
			console.log(dt1);
			var dt2 = $('#departure_date').datepicker('getDate');
			if (dt2 <= dt1) {
				var minDate = $('#departure_date').datepicker('option', 'minDate');
				$('#departure_date').datepicker('setDate', minDate);
			}
		}
	});

	// Map starts here
	var mapstyle = [{
		"elementType": "geometry",
		"stylers": [{
			"color": "#212121"
		}]
	}, {
		"elementType": "labels.icon",
		"stylers": [{
			"visibility": "off"
		}]
	}, {
		"elementType": "labels.text.fill",
		"stylers": [{
			"color": "#757575"
		}]
	}, {
		"elementType": "labels.text.stroke",
		"stylers": [{
			"color": "#212121"
		}]
	}, {
		"featureType": "administrative",
		"elementType": "geometry",
		"stylers": [{
			"color": "#757575"
		}]
	}, {
		"featureType": "administrative.country",
		"elementType": "labels.text.fill",
		"stylers": [{
			"color": "#9e9e9e"
		}]
	}, {
		"featureType": "administrative.land_parcel",
		"stylers": [{
			"visibility": "off"
		}]
	}, {
		"featureType": "administrative.locality",
		"elementType": "labels.text.fill",
		"stylers": [{
			"color": "#bdbdbd"
		}]
	}, {
		"featureType": "poi",
		"elementType": "labels.text.fill",
		"stylers": [{
			"color": "#757575"
		}]
	}, {
		"featureType": "poi.park",
		"elementType": "geometry",
		"stylers": [{
			"color": "#181818"
		}]
	}, {
		"featureType": "poi.park",
		"elementType": "labels.text.fill",
		"stylers": [{
			"color": "#616161"
		}]
	}, {
		"featureType": "poi.park",
		"elementType": "labels.text.stroke",
		"stylers": [{
			"color": "#1b1b1b"
		}]
	}, {
		"featureType": "road",
		"elementType": "geometry.fill",
		"stylers": [{
			"color": "#2c2c2c"
		}]
	}, {
		"featureType": "road",
		"elementType": "labels.text.fill",
		"stylers": [{
			"color": "#8a8a8a"
		}]
	}, {
		"featureType": "road.arterial",
		"elementType": "geometry",
		"stylers": [{
			"color": "#373737"
		}]
	}, {
		"featureType": "road.highway",
		"elementType": "geometry",
		"stylers": [{
			"color": "#3c3c3c"
		}]
	}, {
		"featureType": "road.highway.controlled_access",
		"elementType": "geometry",
		"stylers": [{
			"color": "#4e4e4e"
		}]
	}, {
		"featureType": "road.local",
		"elementType": "labels.text.fill",
		"stylers": [{
			"color": "#616161"
		}]
	}, {
		"featureType": "transit",
		"elementType": "labels.text.fill",
		"stylers": [{
			"color": "#757575"
		}]
	}, {
		"featureType": "water",
		"elementType": "geometry",
		"stylers": [{
			"color": "#000000"
		}]
	}, {
		"featureType": "water",
		"elementType": "labels.text.fill",
		"stylers": [{
			"color": "#3d3d3d"
		}]
	}];

	function initialize() {
		var myLatlng = new google.maps.LatLng(40.755882, -73.982224);
		var mapOptions = {
			zoom: 16,
			center: myLatlng,
			styles: mapstyle,
			scrollwheel: false,
			tilt: 45,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			disableDefaultUI: true
		}
		if (document.getElementById('map')) {
			var map = new google.maps.Map(document.getElementById('map'), mapOptions);
			//Callout Content
			var contentString = '44 West 44th Street, New York, NY 10036';
			//Set window width + content
			var infowindow = new google.maps.InfoWindow({
				content: contentString,
				maxWidth: 500
			});

			//Add Marker
			var marker = new google.maps.Marker({
				position: myLatlng,
				map: map,
				icon: '/assets/images/marker.png'
			});

			google.maps.event.addListener(marker, 'click', function () {
				infowindow.open(map, marker);
			});

			//Resize Function
			google.maps.event.addDomListener(window, "resize", function () {
				var center = map.getCenter();
				google.maps.event.trigger(map, "resize");
				map.setCenter(center);

			});
		}

	}

	google.maps.event.addDomListener(window, 'load', initialize);

	//end map


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
