// JavaScript Document


//<![CDATA[

<!-- FADE IN FADE OUT FOR nav -->
$(document).ready(function () {


	//Append a div with hover class to all the LI
	jQuery('#nav li').append('<div class="hover"><\/div>');


	jQuery('#nav li').hover(
		
		//Mouseover, fadeIn the hidden hover class	
		function() {
			
			jQuery(this).children('div').fadeIn('8000');	
		
		}, 
	
		//Mouseout, fadeOut the hover class
		function() {
		
			jQuery(this).children('div').fadeOut('8000');	
		
	}).click (function () {
	
		//Add selected class if user clicked on it
		$(this).addClass('selected');
		
	});

});

//]]>

<!-- FADE IN FADE OUT FOR nav -->
