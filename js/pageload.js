
ddsmoothmenu.arrowimages = {down:['downarrowclass', 'img/down.gif', 0], right:['rightarrowclass', 'img/right.gif']};
ddsmoothmenu.init({	
	mainmenuid: "top-navigation", //menu DIV id
	orientation: 'h', //Horizontal or vertical menu: Set to "h" or "v"
	classname: 'ddsmoothmenu', //class added to menu's outer DIV
	contentsource: "markup" //"markup" or ["container_id", "path_to_menu_file"]
});

$(function(){
	$('.date-pick').datepick({
		dateFormat: 'mm/dd/yyyy', 
		showTrigger: '<img src="./img/calendar.jpg"/>'		
	});
});

$(document).ready(function(){
	
	$(".colorboxPDF").colorbox({width: "80%", height: "80%", iframe: true});
	
	// 	$(".colorboxMap").on('click', function(e){
// 		e.preventDefault();
// 		$.colorbox({width: "80%", height: "80%", iframe: true, href: $(this).attr('href') });
// 	});
	$(".colorboxMap").colorbox({width: "80%", height: "80%", iframe: true});
		
	$(".colorboxJOSEFINA").colorbox({width: "982px", height: "80%", iframe: true});
		
	$(".colorbox").colorbox();	
	$(".opentable").colorbox({width: "900px", height: "700px", iframe: true});

	
	
	$(".eb-slide-show").eb_slideshow();


	$(document).bind('cbox_complete', function(){
		$(".eb-slide-show", $("#colorbox")).eb_slideshow();
	});

	$("<div class=\"secClose\"/>").css({right: 5, bottom: 0, left: "auto"}).hover(function(){$(this).addClass("secClose-hover")},function(){$(this).removeClass("secClose-hover")}).appendTo( $(".reservations-box-wrapper") ).click(function(){
		
		$("li.page-uid-reserve a").trigger("click");
		
		return false;
	});

	$("li.page-uid-reserve a").click(function(){
		var p = $(this).offset();
		if( $(".reservations-box-wrapper").hasClass("expanded") )
		{ 
			$(".reservations-box-wrapper").animate({height: 0}, 400, function(){
				
				$(this).removeClass("expanded").hide();
				$(".promo-box-wrapper").off("resize");
			});
			$(".page-uid-home .promo-box-wrapper").animate({top: 0}, {
				  duration: 400,	
				  step: function( now, fx ) {
					$(".fullscreen-slideshow", this).eb_slideshow("adjust");
				  }
			});
		}
		else{
			
			var ph = $(".reservations-box-wrapper").css({height: 215}).height(); 
			$(".reservations-box-wrapper").css({height: 200}).show().animate({height: ph }, 400, function(){
				$(this).addClass("expanded");
				$(".promo-box-wrapper").off("resize");
			});
			$(".page-uid-home .promo-box-wrapper").animate({top: ph}, {
				  duration: 400,	
				  step: function( now, fx ) {
					$(".fullscreen-slideshow", this).eb_slideshow("adjust");
				  }
			});
		}
		return false;
	});
	if( $(".page-uid-home").length ){
		$("li.page-uid-reserve a").trigger("click");
	}
});


$(function() {
	$('.eb-slide-show').swipe( {
		swipe:function(event, direction, distance, duration, fingerCount) {
			//alert(direction);
			if(direction == 'left'){
				$(this).eb_slideshow('next');
			}
			else if (direction == 'right'){
				$(this).eb_slideshow('prev');
			}
		},
	});
});


$(document).ready(function(){

	$(document).pngFix();
	
	$.swapImage(".swapImage");

   	jQuery.fn.center = function () {
   	    this.css("position","absolute");
   	    this.css("top", ( $(window).height() - this.height() ) / 2+$(window).scrollTop() + "px");
   	    this.css("left", ( $(window).width() - this.width() ) / 2+$(window).scrollLeft() + "px");
   	    return this;
   	};
   	
   	jQuery.fn.centerH = function () {
   		var $o = $(this);
   		$o.css({position: "absolute", left: ( $(window).width() - $o.width() ) / 2+$(window).scrollLeft() + "px" });
   	 	$(window).resize(function() {
   	 		$o.css({position: "absolute", left: ( $(window).width() - $o.width() ) / 2+$(window).scrollLeft() + "px" });   	  		
		});
   	    return $o;
   	};
	
    /*
    $(window).resize(function() {
    	    	
	});    
    $(window).trigger('resize');
    */
    
});


$(document).ready(function(){

	$("<div class=\"secClose\"/>").css({right: -15, bottom: -15, left: "auto"}).hover(function(){$(this).addClass("secClose-hover")},function(){$(this).removeClass("secClose-hover")}).appendTo( $(".popup-box") );
	$(".popup-box .secClose").css({top: -15}).click(function(){			
		$(".popup-box").animate({opacity: 0, width: 0, height: 0}, 300, function(){
			$(this).hide();			
		});					
		return false;
	});

	
	$(window).resize(function() {
	
		$(".fullscreen-slideshow").each(function(){
			$(this).eb_slideshow("adjust");    		
		});
	
        $(".page-sub-title").css({backgroundSize: $(".page-content-wrapper-inner").width() + 'px ' + $(".page-content-wrapper-inner").height() + 'px' });

    	var w1 = $("#top-navigation").width();

    	
    	$("#top-navigation .top-navigation-ul").each(function(){
    		$(this).hide();
        	var cnt = $(">li", this).length;
        	if( cnt )
        	{
        		$(">li>a", this).css({paddingLeft: 0, paddingRight: 0});
        		var m1 = ( w1 - $(this).innerWidth(true) ) / cnt - 10;
        		if( m1 > 0 )
        		{
        			$(">li>a", this).css({paddingLeft: m1/2, paddingRight: m1/2});
        		}
        	}
        	$(this).show();
        });

    	$(".page-uid-special_offers .subnavigation-wrapper").css({bottom: $(".offer-signup-wrapper").height() + 10 });
        
	});   
    
    $(window).trigger("resize");
	
});		



<!-- twitter feed -->
function relative_time(time_value) {
  var values = time_value.split(" ");
  time_value = values[1] + " " + values[2] + ", " + values[5] + " " + values[3];
  var parsed_date = Date.parse(time_value);
  var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
  var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
  delta = delta + (relative_to.getTimezoneOffset() * 60);

  if (delta < 60) {
    return "less than a minute ago";
  } else if(delta < 120) {
    return "about a minute ago";
  } else if(delta < (60*60)) {
    return (parseInt(delta / 60)).toString() + " minutes ago";
  } else if(delta < (120*60)) {
    return "about an hour ago";
  } else if(delta < (24*60*60)) {
    return "about " + (parseInt(delta / 3600)).toString() + " hours ago";
  } else if(delta < (48*60*60)) {
    return "1 day ago";
  } else {
    return (parseInt(delta / 86400)).toString() + " days ago";
  }
}


$(document).ready(function(){
	$("#ism2 #submit1").click(function(){
  		
  		return false;
	});	
});


var reservationsTimerId;
var reservationsTimeout = 7;

$(document).ready(function(){
		
	$(".reservations-box-close-btn").click(function(){
		var $o = $(".reservations-box-wrapper");
		$o.animate({left: $o.hasClass("expanded") ? -235 : 0 }, 300, function(){
			if( $o.hasClass("expanded") )
			{
				$o.removeClass("expanded");
			}	
			else
			{
				$o.addClass("expanded");
			}
		});
			
		return false;	
	});

});


$(document).ready(function(){
	$(".room-list-item-overlay").css({opacity: 0, display: "block"}).show();
	$(".room-list-item").hover(
		function () {
    		$(".room-list-item-overlay", this).dequeue().animate({opacity: 1}, 700);
  		},
  		function () {
    		$(".room-list-item-overlay", this).dequeue().animate({opacity: 0}, 700);
  		}
	);	
});


$(window).load(function() {
	//get height of page
	var iHeight = $(".content-wrapper").height();
	//get height of window
	var pHeight = $(window).height();
	var imgHeight = Math.round(pHeight * .54);
	var iScrollHeight = $(".content-wrapper").prop("scrollHeight");
	var msg = 'Height:' + iHeight + 'px & ScrollHeight:' + iScrollHeight + 'px';
//alert("iScrollHeight: " + iScrollHeight + " " + "imgHeight: " + imgHeight);
  $('.page-content-right .page-content-inner').css({ height: iScrollHeight  });
  $('.page-content-image').css({ height: imgHeight  });
  $('.page-text-no-thumbs').css({ top: imgHeight  });
  
  $(window).resize(function(){
    $('.page-content-right .page-content-inner').css({ height: iScrollHeight });
	$('.page-text-no-thumbs').css({ top: imgHeight  });
  });
});

/* Deal with ie8 at 1024 x 768 res */
$(document).ready(function() {
if (jQuery.browser.version==8.0) {
	//alert("ie8");
	//$('html').addClass('ie' + $.browser.version.substring(0,1));
}
});

/* Google map */
function initialize() {
  var myLatlng = new google.maps.LatLng(40.7563609,-73.97209599999996);
  var mapOptions = {
    zoom: 14,
    center: myLatlng
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var contentString = '<b>The Benjamin</b><br/>125 East 50th Street<br />New York, NY 10022';

  var infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 200
  });

  var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'The Benjamin'
  });
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
  });
}

google.maps.event.addDomListener(window, 'load', initialize);

//datepicker for open table- The National
 var startDate = jQuery('#startDate').datepicker({ dateFormat: 'mm/dd/yy', constrainInput: true, minDate: 0 });
	startDate.datepicker('setDate', new Date());
	try {
		$('#ism').submit(function (e) {
			var partySize = $('#PartySize').val();
			var reservationDate = $('#startDate').val();
			var reservationTime = ($('#ResTime').val()).replace(' ', '').toLowerCase();
			if (typeof ROIL_OpenTable == 'function')
				ROIL_OpenTable(partySize, reservationDate, reservationTime);
		});
	} catch (e) {
		if (typeof console != 'undefined' && typeof console.log != 'undefined') console.log('Unable to send OpenTable info to Omniture');
}
      


