// JavaScript Document

$(document).ready(function(){

	// News slider function
	
	// Defining slider body height if presented
	
	/*if ($(".news .content_slider").length > 0) {
		sliderBodyHeight = $(".news .content_slider .body").height();
		bodyHeight = $(".news .content_slider .body").height();
		sliderHeight = $(".news .content_slider").height();
		newsLength = $(".news .container").length;
		disLoc = sliderHeight*(-1);
		linkInd = 0;
		newsHoverInd = 0;
		action = 0;
	
		// News Auto Switching function
		
		function newsShow() {
			if (newsHoverInd == 0) {
				if (linkInd < newsLength/2) {
					linkInd = linkInd+1;
				}
				if (linkInd == newsLength/2) {
					linkInd=0;
				} 
				newsSwitcher($(".news .navigation a:not(.prev, .next)").eq(linkInd));
			}	
			newstimer = setTimeout(newsShow, 10000);
		}
		
		// News animation function
		
		function newsSwitcher (object) {
			$(".news .navigation a:not(.prev, .next)").removeClass("current");
			$(".news .navigation li").eq(linkInd+1).find("a:not(.prev, .next)").addClass("current");
			object
				.parent()
				.parent()
				.parent()
				.find(".content_slider .body")
				.stop()
				.animate({
					top:disLoc*linkInd
				},1000, "easeInOutExpo", function(){
					
				});
			}
		
		// Writing a simple onclick actions
		
		$(".news .navigation a:not(.prev, .next)").click(function(){
			action = 'click';
			linkInd = ($(this).parent().index())-1;
			newsSwitcher($(this));
			return false;
		});
		
		$(".news .navigation a.prev").click(function(){
			action = 'click';
			if(linkInd > 0) {
				linkInd = linkInd-1;
				newsSwitcher($(this));
			}
			return false;
		});
		
		$(".news .navigation a.next").click(function(){
			if (linkInd < ($(".news .navigation li").length)-3) {
				linkInd = linkInd+1;
				newsSwitcher($(this));
			}
			return false;
		});
		
		$(".news").hover(function(){
			action = 'click';
			newsHoverInd = 1;
		}, function(){
			newsHoverInd = 0;
			action = 0;
		});
		
		// newsShow Trigger
		
		newstimer = setTimeout(newsShow, 10000);
	
	}
	*/
	/* Top Navigation Submenu dropdowns */
	
	
	// HomePage Slideshow
	
	// Condition of div#Slider presence
	
	if ($("#slider").length > 0) {
		
		// Hack to make script wait for all images will load to trigger itself
		$(".slides").css({visibility:"hidden",display:"block"});
		
		$(window).load(function(){
		
			// Removing hack
			$(".slides").css({visibility:"visible",display:"none"});
			
			// Removing preloader class
			$("#slider").removeAttr("class");
		
			// Variables
			slidesLength = $(".slides").length;
			slideCounter = 0;
			sliderHoverInd = 0;
			
			// SlideShow function
			
			function slideShow() {
				if(sliderHoverInd==0) {
					if (slideCounter == slidesLength) {
						$("#slider_controls a").removeClass("current").eq(0).addClass("current");
					} else if (slideCounter < slidesLength) {
						$("#slider_controls a").removeClass("current").eq(slideCounter).addClass("current");
					}
					if (slideCounter <= slidesLength) {
						slideCounter = slideCounter+1;
					}
					if(slideCounter > slidesLength) {
						slideCounter = 1;
					}
					slideSwitcher(2000);
				}
				timer = setTimeout(slideShow, 5000);
			}
			
			// SlideSwitchr
	
			function slideSwitcher(time){
				$(".slides").removeClass("current");
				$("#slide"+slideCounter).css("opacity","0").show().addClass("current").animate({
					opacity:1
				},time, function(){
					$(".slides").removeClass("prev")
					$(this).removeClass("current").addClass("prev").prev(".slides").removeClass("prev");
					if (slideCounter <= 1) {
						$("#slider .slides:last").removeClass("prev");
					}
				});
			}
			
			/* Rendering Controls
			
			$("#slider").prepend("<div id='slider_controls'></div>");
			for (x=1; x<=slidesLength; x++) {
				$("#slider_controls").append("<a href='#'>"+x+"</a>");
			}
			
			// Programming control
			
			$("#slider_controls a").click(function(){
				$("#slider_controls a").removeClass("current");
				slideCounter = $(this).index()+1;
				$(this).addClass("current");
				slideSwitcher(500);
				return false;
			});
			
			// Hover Pause
			
			$("#slider").hover(function(){
				sliderHoverInd = 1;
			}, function(){
				sliderHoverInd = 0;
			})*/
			
			// Trigger
			slideShow();
			return false;
		});
		
	}

});
