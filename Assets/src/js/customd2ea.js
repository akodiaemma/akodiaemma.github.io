
jQuery(document).ready(function () {

	// header sticky -----------------------------
	jQuery(window).on("load scroll", function (e) {
		if (jQuery(window).scrollTop() >= 1) {
			jQuery('header').addClass('fixed-header');
		} else {
			jQuery('header').removeClass('fixed-header');
		}
	});
	if( jQuery('.insight-related-insight').length  > 0 ){
		jQuery('body').addClass("insight-body");
	}

	if( jQuery('.side-nav').length  > 0 ){
		jQuery('body').addClass("side-body");
	}

	$("#fe9367").css("font-size", "21px");

	jQuery('.footer-url-list h6 a').click(function(){
		jQuery('.collapse').collapse('hide');
	});

	jQuery(document).on("click",".side-nav__list-elements li",function() {
		jQuery('.side-nav__list-elements li.active').removeClass("active");
		jQuery(this).addClass("active");
	});
	
	jQuery('.side-nav__list-item-text').on('click',function(){
		var targetHref = $(this).attr('href');
		var headerHeight = $('header').outerHeight() + 40;
		$('html, body').animate({
			scrollTop: $(targetHref).offset().top - headerHeight // Add it to the calculation here
		});
   });

	jQuery('.expert-more-desc .button-dark-lg').click(function(){
		jQuery(this).parent().find('.expanded-content').slideToggle('slide');
		jQuery(this).parent().parent().parent().toggleClass('active');
		
		jQuery(this).parent().parent().parent().siblings().removeClass('active');
		jQuery(this).parent().parent().parent().siblings().find('.expanded-content').slideUp('medium');
	});

});
jQuery(window).scroll(function() {

	var windoscroll = $(window).scrollTop();
	var headerHeight = $('header').outerHeight() + 50;
	if (windoscroll >= 100) {
		$('.jump-to-navigation-left .jump').each(function(i) {
			if ($(this).offset().top - headerHeight <= windoscroll) {
				$('.side-nav__list-elements li.active').removeClass('active');
				$('.side-nav__list-elements li').eq(i).addClass('active');
				
			}
		});
	}
	else {
		$('.side-nav__list-elements li.active').removeClass('active');
	}
});

$(function () {
	$('.dropdown-category').click(function () {
		$('.mobile-links-only').toggleClass('d-none');
	});
});

if ($('.secondary-header').length > 0) {
  $('body').addClass("jumpbar-body");
}

$('.search-icon').click(function () {
  $('body').toggleClass('hs-active');
});

//*****OWL CAROUSEL ONLY FOR MOBILE*****//

function owlInitialize() {
	if ($(window).width() < 1024) {
		$('.custom-mobileslider').addClass("owl-carousel");
		$('.owl-carousel').owlCarousel({
			nav: false,
			loop: false,
			dots: true,
			margin: 30,
			responsive: {
				0: {
					items: 1,
				},
				576: {
					items: 2,
				}
			}
		});
	} else {
		//$('.owl-carousel').owlCarousel('destroy');
		$('.custom-mobileslider').removeClass("owl-carousel");
	}
}
$(document).ready(function (e) {
	owlInitialize();
});
$(window).resize(function () {
	owlInitialize();
});

//*****CUSTOM CAROUSEL INDICATOR PROGRESSBAR JS*****//
const myCarousel = document.getElementById("carouselCustomIndicators");
var intervalID;
var home_slider = jQuery('#carouselCustomIndicators');
if (home_slider.length){
const carouselIndicators = myCarousel.querySelectorAll(
  ".carousel-indicators div span"
);
const carousel = new bootstrap.Carousel(myCarousel, {
    interval: 7000,});
    
window.addEventListener("load", function () {
  fillCarouselIndicator(1);
});
myCarousel.addEventListener("slide.bs.carousel", function (e) {
  let index = e.to;
  fillCarouselIndicator(++index);
});
function fillCarouselIndicator(index) {
    let i = 0;
    if (typeof (carouselIndicators) === 'undefined') {
        var carouselIndicators = myCarousel.querySelectorAll(
          ".carousel-indicators div span"
        );
    }

  for (const carouselIndicator of carouselIndicators) {
    carouselIndicator.style.width = 0;
  }
    clearInterval(intervalID);

    if (typeof (carousel) !== 'undefined') {
        carousel.pause();
    }

  intervalID = setInterval(function () {
    i++;
    myCarousel.querySelector(".carousel-indicators .active span").style.width =
      (i % 101) + '%';
      if (i >= 100) {
      // i = 0; -> just in case
        carousel.next();
      }
  }, 70);

};

jQuery(".indicators-point").on("click", function (e) {
  if (jQuery(this).hasClass("active") && jQuery(this).hasClass("click_active")) {
    fillCarouselIndicator(1);
  } else {
    clearInterval(intervalID);
  }
  jQuery(this).toggleClass('click_active').parent().siblings('.col').find('.indicators-point').removeClass('click_active');
});

let watchButton = document.getElementById("watch-video-button");
let exitButton = document.getElementById("video-modal-exit-btn");

if (watchButton !== null) {
  watchButton.addEventListener("click", function () {
    clearInterval(intervalID);
  });
  if (exitButton) {
    exitButton.addEventListener("click", function () {
      fillCarouselIndicator(1);
    });
  }
}
}

//*****SELECT DROPDOWN CUSTOM JS*****//

if ($("#selectbox-1") !== null) {
    $("#selectbox-1").on("click", function (e) {
      var dropdownItem = e.target;
      var container = $(this).find(".selectBox__value");
      container.text(dropdownItem.text);
      $(dropdownItem)
        .addClass("active")
      $("#selectbox-1 .dropdown-item").on("click", function (e) {
          $(dropdownItem)
        .removeClass("active")
      })
    });
    
    $("#selectbox-1").on("click", function(){
      $(this).toggleClass("show");
    });
    
    $(document).on('click', function(event) {
    if (!$(event.target).closest('#selectbox-1').length)  {
          $("#selectbox-1").removeClass("show");
    }
    });
}


if ($("#selectbox-2") !== null) {
  $("#selectbox-2").on("click", function (e) {
    var dropdownItem = e.target;
    var container = $(this).find(".selectBox__value");
    container.text(dropdownItem.text);
    $(dropdownItem)
      .addClass("active")
    $("#selectbox-2 .dropdown-item").on("click", function (e) {
        $(dropdownItem)
      .removeClass("active")
    })
  });
  
  $("#selectbox-2").on("click", function(){
    $(this).toggleClass("show");
  });
  
  $(document).on('click', function(event) {
  if (!$(event.target).closest('#selectbox-2').length)  {
        $("#selectbox-2").removeClass("show");
  }
  });
}

if ($('#selectbox-1', '#selectbox-2') !== null) {
  $('#selectbox-1', '#selectbox-2').on('focus', 
  function(){
    $(this).addClass('show');
  }).on('focusout', function(){
    $(this).removeClass('show');
 });
}

//*****SECONDARY NAVBAR STICKY JS*****//

let navbar = document.getElementById("main-nav");

if (navbar !== null) {
  let navPos = navbar.getBoundingClientRect().top;
  let navbarLinks = document.querySelectorAll("nav a");
  let jumpbarPos = (document.querySelector('.hero-wrapper-large') ? document.querySelector('.hero-wrapper-large').offsetHeight : document.querySelector('.hero-wrapper-small') ? document.querySelector('.hero-wrapper-small').offsetHeight : document.querySelector('.hero-wrapper-white') ? document.querySelector('.hero-wrapper-white').offsetHeight : 20) - document.querySelector('.main-header').offsetHeight + 32;
  window.addEventListener("scroll", e => {
	let scrollPos = window.scrollY;
	if (scrollPos > jumpbarPos) {
	  navbar.classList.add('sticky');
	  header.classList.add('navbarOffsetMargin');
	} else {
	  navbar.classList.remove('sticky');
	  header.classList.remove('navbarOffsetMargin');
	}

	var windscroll = $(window).scrollTop();
	$('.jumpbar-body section,div').each(function(i) {
		if($(this).hasClass('cta-list-section offices')) { var extraMargins = 80; } else { var extraMargins = 180; }
		if ($(this).position().top <= windscroll + extraMargins && $('nav a[href="#' + $(this).attr('id') + '"]').length > 0) {
			$('nav a.active').removeClass('active');
			$('nav a[href="#' + $(this).attr('id') + '"]').addClass('active');
		  }
	 });
    // if (navbarLinks !== null) {
    //   navbarLinks.forEach((link, index) => {
    //     if (link.innerText !== null && link.innerText !== "") {
    //       let section = document.querySelector(link.hash);
    //       if (section !== null) {
    //         if (scrollPos + 180 > section.offsetTop && scrollPos + 180 < (section.offsetTop + 44) + (section.offsetHeight + 44)) {
    //           if (index > 0) {
    //             navbarLinks[index - 1].classList.remove("active");
    //           }
    //           link.classList.add("active");

    //         } else {
    //           link.classList.remove("active");
    //         }
    //       }
    //     }
    //   });
    // }
  });

  $(window).scroll(function () {
	var scroll = $(window).scrollTop();
	if (screen.width > 1199) {
	  if (scroll >= jumpbarPos) {
		$(".main-header").addClass("fixed-header");
	  } else {
		$(".main-header").removeClass("fixed-header");
	  }
	}


	if (scroll <= 200) {
	  $("#main-nav a:first-child").addClass("active");
	}
  });
}	

//*****CUSTOM VIDEO PLAYER JS*****//
const video = document.getElementById("video");
if (video !== null) {
	const circlePlayButton = document.getElementById("circle-play-b");
	function togglePlay() {
		if (video.paused || video.ended) {
			video.play();
		} else {
			video.pause();
		}
	}

	if (video) {
		circlePlayButton.addEventListener("click", togglePlay);
		video.addEventListener("playing", function () {
			circlePlayButton.style.opacity = 0;
		});
		video.addEventListener("pause", function () {
			circlePlayButton.style.opacity = 1;
		});
	}
}

//*****HERO Carousel video sound*****//
jQuery('#staticBackdrop .btn-close').click(function () {
	var video = jQuery("#staticBackdrop iframe").attr("src");
	jQuery("#staticBackdrop iframe").attr("src", "");
	jQuery("#staticBackdrop iframe").attr("src", video);
});



//*****select menu dropdown arrow item active *****//
jQuery('.select-main .select-box').click(function () {
	jQuery(".select-main .select-box").not(this).removeClass("active");
	jQuery(this).toggleClass("active");
});
jQuery(document).mouseup(function (e) {
	var container = jQuery(".select-main .select-box");
	if (!container.is(e.target) && container.has(e.target).length === 0) {
		jQuery('.select-main .select-box').removeClass("active");
	}
});

//*****SECONDARY HEADER SCROLL HEIGHT COUNT*****//

if (Secondaryheaderheight !== null) {
    $('.secondary-header .nav-link a').addClass('scroll');
    var Headerheight = $('header').height();
    var Secondaryheaderheight = $('.secondary-header').height();
    var Totalheaderheight = parseInt(Headerheight - 33) + parseInt(Secondaryheaderheight);

    jQuery(document).ready(function ($) {
        $(".scroll").click(function (event) {
            var scroll_name = $(this).attr('href');
			if (scroll_name == '#casestudies' && $(this.hash).offset() != undefined){
                if($( "div#header" ).hasClass( "navbarOffsetMargin" )){
                    $('html,body').animate({ scrollTop: $(this.hash).offset().top - 150 }, 400);
                }else{
                    $('html,body').animate({ scrollTop: $(this.hash).offset().top - 210 }, 400);
                }
			} else if (scroll_name == '#services' && $(this.hash).offset() != undefined){
            	if($( "div#header" ).hasClass( "navbarOffsetMargin" )){
                    $('html,body').animate({ scrollTop: $(this.hash).offset().top - 150 }, 400);
                }else{
                    $('html,body').animate({ scrollTop: $(this.hash).offset().top - 210 }, 400);
                }
			}else if (scroll_name == '#overview' && $(this.hash).offset() != undefined){
            	if($( "div#header" ).hasClass( "navbarOffsetMargin" )){
                    $('html,body').animate({ scrollTop: $(this.hash).offset().top - 200 }, 400);
                }else{
                    $('html,body').animate({ scrollTop: $(this.hash).offset().top - 250 }, 400);
                }
			}else if ((scroll_name == '#experts' || scroll_name == '#insights') && $(this.hash).offset() != undefined){
            	if($( "div#header" ).hasClass( "navbarOffsetMargin" )){
                    $('html,body').animate({ scrollTop: $(this.hash).offset().top - 250 }, 400);
                }else{
                    $('html,body').animate({ scrollTop: $(this.hash).offset().top - 290 }, 400);
                }
			} else {
				if ($(this.hash).offset() != undefined) {
					if ($("div#header").hasClass("navbarOffsetMargin")) {
						$('html,body').animate({ scrollTop: $(this.hash).offset().top - 165 }, 400);
					} else {
						$('html,body').animate({ scrollTop: $(this.hash).offset().top - 218 }, 400);
					}
                }               
            }
        });
    });
}
jQuery(window).load(function() {

	if (window.location.hash.length) {
	    var hash = window.location.hash;
	    if ($(hash).length) {
			if (hash == '#casestudies' && $(hash).offset() != undefined){
                if($( "div#header" ).hasClass( "navbarOffsetMargin" )){
                    $('html,body').animate({ scrollTop: $(hash).offset().top - 150 }, 400);
                }else{
                    $('html,body').animate({ scrollTop: $(hash).offset().top - 210 }, 400);
                }
			} else if (hash == '#services' && $(hash).offset() != undefined){
            	if($( "div#header" ).hasClass( "navbarOffsetMargin" )){
                    $('html,body').animate({ scrollTop: $(hash).offset().top - 150 }, 400);
                }else{
                    $('html,body').animate({ scrollTop: $(hash).offset().top - 210 }, 400);
                }
			}else if (hash == '#overview' && $(hash).offset() != undefined){
            	if($( "div#header" ).hasClass( "navbarOffsetMargin" )){
                    $('html,body').animate({ scrollTop: $(hash).offset().top - 200 }, 400);
                }else{
                    $('html,body').animate({ scrollTop: $(hash).offset().top - 250 }, 400);
                }
      }else if ((hash == '#experts' || hash == '#insights') && $(hash).offset() != undefined){
            	if($( "div#header" ).hasClass( "navbarOffsetMargin" )){
                    $('html,body').animate({ scrollTop: $(hash).offset().top - 250 }, 400);
                }else{
                    $('html,body').animate({ scrollTop: $(hash).offset().top - 290 }, 400);
                }
      }else{	
				if(jQuery('.jump-to-navigation-left').length > 0){
					$('html,body').animate({ scrollTop: $(hash).offset().top - $('header').outerHeight()}, 400);

				}else{
					if ($(hash).offset() != undefined) {
						if ($("div#header").hasClass("navbarOffsetMargin")) {
							$('html,body').animate({ scrollTop: $(hash).offset().top - 165 }, 400);
						} else {
							$('html,body').animate({ scrollTop: $(hash).offset().top - 218 }, 400);
						}
        			} 
				}
				   
      }
	  }
	}
});
//*****video paly button move *****//
jQuery(document).ready(function () {
	if (jQuery('.yt_video_link').length != 0) {
		// change cursor over menu
		if ($(window).width() > 1200) {

			jQuery(document).mousemove(function (e) {
				jQuery(".what-believe.cta-video .play-btn").css({ left: e.pageX, top: e.pageY });
				jQuery('.what-believe.cta-video .play-btn').css({
					left: e.clientX,
					top: e.clientY,
				});
			});
			//attempt to attach div to cursor each time window scrolls
			jQuery('.video-section').mouseenter(function () {
				jQuery('.what-believe.cta-video .play-btn').addClass('activemenu');
			});

			jQuery('.video-section').mouseleave(function () {
				jQuery('.what-believe.cta-video .play-btn').removeClass('activemenu');
			});
		}

		//*****video auto play for API *****//
		var tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		var player;
		function onYouTubeIframeAPIReady(yt_id, iframe_id) {
			if (yt_id == undefined) { yt_id = 'tgbNymZ7vqY'; }
			if (iframe_id == undefined) { iframe_id = 'yt_video_desktop_iframe'; }

			player = new YT.Player(iframe_id, {
				width: '100%',
				height: '100%',
				videoId: yt_id,
				playerVars: { 'autoplay': 1, 'playsinline': 1, 'rel': 0 },
				events: {
					'onReady': onPlayerReady,
				}
			});
		}

		function onPlayerReady(event) {
			//event.target.mute();
			event.target.setVolume(70);
			event.target.playVideo();
		}

		// CTA Youtube video
		jQuery('.yt_video_link').on('click', function (e) {
			e.preventDefault();
			var div_id = jQuery(this).attr('id');
			var div_iframe = div_id + '_iframe';
			var yt_id = jQuery('#' + div_id).data('ytid');

			jQuery('#' + div_id + ' .yt_video_play').css('display', 'none');
			onYouTubeIframeAPIReady(yt_id, div_iframe);
			jQuery('#ctaModal').modal('show');
			var video = jQuery('#' + div_iframe).attr("src");
			jQuery('#' + div_iframe).attr("src", "");
			jQuery('#' + div_iframe).attr("src", video);
		});
		jQuery('#ctaModal').on('hidden.bs.modal', function () {
			stopVideo();
		});

		// Banner Youtub video Popup
		jQuery('.banner_yt_video_link').on('click', function (e) {
			e.preventDefault();
			var yt_id = jQuery(this).attr('data-ytid');
			var div_iframe = 'banner_video_iframe';
			onYouTubeIframeAPIReady(yt_id, div_iframe);
			jQuery('#banner_video_popup').modal('show');
			var video = jQuery('#' + div_iframe).attr("src");
			jQuery('#' + div_iframe).attr("src", "");
			jQuery('#' + div_iframe).attr("src", video);
		});
		jQuery('#banner_video_popup').on('hidden.bs.modal', function () {
			stopVideo();
		});
	}
	headermenujs();
});

function stopVideo() {
	var iframes = document.querySelectorAll('iframe');
	Array.prototype.forEach.call(iframes, iframe => {
		iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'stopVideo' }), '*');
	});
}

function changeHeight() {
	var x = document.getElementById('iframe');
	x.style.height = "100%";
}

//var isLargeWindow;
$(window).resize(function () {
	if(jQuery(window).width() > 1024){
		var home_slider = jQuery('#carouselCustomIndicators');
		if ( home_slider.length){
			fillCarouselIndicator(1);
		}
	}
	headermenujs();
	select_box_with();
});

//Header menu
jQuery(document).on('click', '.mobile_view .submenu-toggle-btn, .mobile_view #nav-links .dropdown-category.menu-children .category-title', function () {
	jQuery(this).parent().siblings().children('.dropdown-content').slideUp('medium');
	jQuery(this).parent().siblings('.dropdown-category').removeClass('menu-open');
	jQuery(this).siblings('.dropdown-content').slideToggle();
	jQuery(this).parent().toggleClass("menu-open");
});

jQuery(document).on('click', '.mobile_view #nav-menu, .mobile_view .toggle-close', function () {
	
	jQuery("header").toggleClass("show-menu");
	if (!jQuery('header').hasClass('show-menu')) {
		jQuery("#nav-links .dropdown-category.menu-children").removeClass("menu-open");
		jQuery("#nav-links .dropdown-category.menu-children .dropdown-content").slideUp('medium');
	}
});

function headermenujs() {
	if (window.matchMedia('(max-width:899PX)').matches) {
		if (jQuery('body').hasClass('desktop_view')) {
			jQuery('body').removeClass('desktop_view');
		}
		if (!jQuery('body').hasClass('mobile_view')) {
			jQuery('body').addClass('mobile_view');
		}
		if (!jQuery(".mobile_view #nav-links .menu-children .submenu-toggle-btn")[0]) {
			jQuery('.mobile_view #nav-links .dropdown-category.menu-children .category-title').after('<span class="submenu-toggle-btn"></span>');
		}
	} else {
		if (jQuery('body').hasClass('mobile_view')) {
			jQuery('body').removeClass('mobile_view');
		}
		if (!jQuery('body').hasClass('desktop_view')) {
			jQuery('body').addClass('desktop_view');
			desktopView();
		}
	}
}

function desktopView() {
	jQuery("header").removeClass("show-menu");
	jQuery("#nav-links .dropdown-category.menu-children").removeClass("menu-open");
	jQuery("#nav-links .dropdown-category.menu-children .dropdown-content").css({ "display": "" });
	// Desktop
	let width = window.innerWidth;
	var bp_xs = 575,
		bp_s = 767,
		bp_m = 1024,
		bp_l = 1199;
	function bp(breakpoint) {
		width = window.innerWidth;
		let breakpoints = {
			xs: width < bp_xs ? true : false,
			s: width >= bp_xs && width < bp_s ? true : false,
      m: width >= bp_s && width < bp_m ? true : false,
      ml: width >= 900 && width < bp_m ? true : false,
			l: width >= bp_m && width < bp_l ? true : false,
			d: width > bp_l ? true : false
		}
		return breakpoints[breakpoint];
	}
	jQuery('#nav-links li.dropdown-category').mouseenter(function () {
		// If Desktop/Tablet
    if (bp('d') || bp('l') || bp('ml')) {
			jQuery('#nav-links li.dropdown-category').removeClass('show');
			jQuery(this).addClass('show');
		}
	});
	if (bp('m')) {
		jQuery('#nav-links li.dropdown-category').click(function () {
			jQuery(this).toggleClass('show');
		});
	}
	jQuery('#nav-links li.dropdown-category').mouseleave(function () {
		// If Desktop/Tablet
    if (bp('d') || bp('l') || bp('ml')) {
			jQuery(this).removeClass('show');
		}
	});
}

$(document).mouseup(function (e) {
  if ($(e.target).closest("#nav-links li.dropdown-category").length
              === 0) {
      $("#nav-links li.dropdown-category").removeClass('show');
  }
});

$('.dropdown-category.show').click(function(){
    $(".dropdown-category").removeClass("show");
  });

// $('.dropdown-category').click(function(){
//   Â  $(".dropdown-category").toggleClass("show");
//   });

// $("button").click(function(){
//   $("p").toggleClass("main");
// });

//Header Menu end
$(window).on('load', function () {
	select_box_with();
});
function select_box_with() {
	$('.select-box').change(function(){
		var text = $(this).find('option:selected').text();
		var $aux = $('<select/>').append($('<option/>').text(text));
		$(this).after($aux);
		$(this).width($aux.width() - 5);		
		if($aux.width() < 900){
			jQuery(this).css("text-overflow", "unset");
		}else{
			jQuery(this).css("text-overflow", "ellipsis");			
		}
		$aux.remove();
	}).change();
}

if (jQuery(".newinsight_sticky").length !== 0) {
    var insight_sticky = jQuery(".newinsight_sticky").offset().top - 72;
    jQuery(window).scroll(function() {
      var wscroll = jQuery(window).scrollTop();
      if (wscroll >= insight_sticky ) {
        jQuery('.newinsight_sticky').addClass('active__sticky');
      } else {
        jQuery('.newinsight_sticky').removeClass('active__sticky');
      }
      var pageHeight = $(document).height() - $(window).height();
      var progress = 100 * wscroll / pageHeight;
      
      $("div.progress-bar").css("width", progress + "%");
    });
}



// $(".selectAll").click(function() {
// 	$(this).prop("checked", $(this).prop("checked"));
// 	console.log(this);
// });

$(document).on('change', '.drop-down-menu input[type="checkbox"]', function(){
	if($(this).hasClass('selectAll')){
		if ($(this).prop("checked") && $(this).hasClass("selectAll")) {
			$(this).parent().children().find('input[type=checkbox]').prop("checked",true);
		}
		if (!$(this).prop("checked") && $(this).hasClass("selectAll")) {
			$(this).parent().children().find('input[type=checkbox]').prop("checked",false);
		}
	}
	var current_all = $(this).parents('.drop-down-menu .desc > ul > li').find('input[type="checkbox"]:not(.selectAll)').length;
	var current_checked_all = $(this).parents('.drop-down-menu .desc > ul > li').find('input[type="checkbox"]:checked:not(.selectAll)').length;
	if(current_all == current_checked_all){
		$(this).parents('.drop-down-menu .desc > ul > li').find('.selectAll').prop("checked" , true);
			
	}else{ 
		$(this).parents('.drop-down-menu .desc > ul > li').find('.selectAll').prop("checked" , false);
	}

});
$(document).on('click', '.news-dropdown .news-box p', function(){
	var cate = $(this).data("cat");
	$(this).parent().siblings().children(".news-box p").removeClass('active');
	$(this).toggleClass('active');
	$(".news-box #"+ cate).slideToggle();
	$(".news-box .drop-down-menu:not(#"+ cate +")").slideUp('fast');

});



$(document).on('click', '.filter-icon', function(){
	$('.filter-cross-icon').toggleClass('activee');
	$('.news-faceted').toggleClass('news-active');
	$('.news-dropdown').slideToggle('medium');
	if ($('.news-active').length > 0) {
        $('section,footer').addClass('d-none');
        $('.news-active').removeClass('d-none');
    }
    else {
        $('section,footer').removeClass('d-none');
    }
});

$(document).on('click', '.filter-cross-icon', function(){
	$(this).toggleClass('activee');
	$('.news-dropdown').slideToggle('medium');
	$('.news-faceted').toggleClass('news-active');
	$('section,footer').removeClass('d-none');
});

$('.cta-carousel').owlCarousel({

	loop:true,
	margin:16,
	nav:false,
	dots:true,
	autoplay: true,
	autoPlaySpeed: 7000,	
	responsive:{
		0:{
			items:1
		},
		899:{
			items:1
		},
		1200:{
			items:1
		}
	}
});







