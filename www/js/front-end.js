// JavaScript Document
	
	$(document).ready(function() {
		
		var currentLangCode = 'en';
		var currentTimezone = false;
		var date = new Date();
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear();	
		var tme = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
		var mo = ['Jan','Feb','Mar','Apr','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		var data='<div class="upcoming-events"><div class="event-date"><div class="month">'+mo[m-1]+'</div><div class="day">'+d+'</div></div><div class="event-info"><div class="event-name">No Events</div><div class="event-location">The time is:</div><div class="event-time">'+tme+'</div></div></div>';
		
		$.ajax({
			url: 'php/today_events.php',
			type: "POST",
			success: function(json) {
				//alert(json);
				$('#event-details').children().fadeOut('slow',function(){
					$('#event-details').children().remove();
					$('#event-details').append(json).fadeIn('slow');
				});
				
			}
		});
		
		//$('#event-details').children().fadeOut('slow',function(){
		//	$('#event-details').children().remove();
		//	$('#event-details').append(data).fadeIn('slow');
		//});


		// build the language selector's options
		$.each($.fullCalendar.langs, function(langCode) {
			$('#lang-selector').append(
				$('<option/>')
					.attr('value', langCode)
					.prop('selected', langCode == currentLangCode)
					.text(langCode)
			);
		});
		
		// rerender the calendar when the selected option changes
		$('#lang-selector').on('change', function() {
			if (this.value) {
				currentLangCode = this.value;
				$('#calendar').fullCalendar('destroy');
				renderCalendar();
			}
		});

		function renderCalendar() {
			var calendar = $('#calendar').fullCalendar({
				header: {
					left: '',
					center: 'title',
					right: 'prev,next'
				},
				defaultButtonText: {
					prev: "<", //prev
					next: ">", //next
				},
				buttonIcons: {
					prev: '', //left-single-arrow
					next: '', //right-single-arrow
				},
				columnFormat: {
					month: '', // like "Sat"
				},
				theme: true,
				buttonIcons: false, // show the prev/next text
				themeButtonIcons: {
					prev: '', //circle-triangle-w
					next: '', //circle-triangle-e
				},
				weekMode: '4', //variable //liquid //fixed
				titleFormat: {
					month: 'MMMM YYYY', // like "September 1986". each language will override this
				},
				defaultDate: Date.now(),
				timezone: currentTimezone,
				lang: currentLangCode,
				
				//weekNumbers: true,
				editable: false,
				droppable: false, // this allows things to be dropped onto the calendar !!!
				selectable: true,
				unselectAuto: true,
				selectHelper: true,
				firstDay: 1,
				//DAY SELECT//
				select: function(start, end, allDay,revertFunc) {
					
					
					$('#calendar').fullCalendar('unselect');
					
				},
				
				dayClick: function(date, jsEvent, view) {
					//var start =$('#calendar').fullCalendar('getView').intervalStart;

					
					//var end = $('#calendar').fullCalendar('getView').intervalEnd;
					//alert('Clicked on: ' + date.format());
					//var now = moment(new Date()).format().substring(10,0);
					//var nwDate = moment(date).add("days",2);
					//alert(nwDate);
					
					var now = date.format();
					$.ajax({
						url: 'php/append_events.php',
						data: 'date='+now,
						type: "POST",
						success: function(json) {
							//alert(json);
							$('#event-details').children().fadeOut('slow',function(){
								$('#event-details').children().remove();
								$('#event-details').append(json).fadeIn('slow');
							});
							
						}
					});
					
					$('#calendar').fullCalendar('unselect');
					//alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
			
					//alert('Current view: ' + view.name);
			
					// change the day's background color just for fun
					//$(this).css('background-color', 'red');
			
				},
				//EVENT MOUSEOVER//
				eventMouseover: function (event, jsEvent) {
				},
				//LOADING RENDER//
				loading: function(bool) {
					//$('#loading').toggle(bool);
					console.log(bool);
				},
				//contentHeight: 500,
				//EVENTS//
				events: {
					
					url: 'php/events-front.php',
					//error: function() {
					//	$('#script-warning').show();
					//}
				},
				//eventColor: '#378006',
				//EVENT CLICK//
				eventClick: function(event){
					

					
					
					$('#calendar').fullCalendar('unselect');
				},
				//nextDayThreshold: "05:00:00",
				dayRender: function (date, cell) {
					//if(event.date === date){
					//	cell.css("background-color", "red");
					//}
					//$('.fc-other-months .fc-past').css("background-color", "red");
					
					//$('.fc-content-skeleton').find('.fc-other-month').css('color', "#CCC");
					//$('.fc-content-skeleton').find('.fc-past').css('color', "#CCC");	
					$('.fc-past').css('color', "#CCC");	
					//EVENT TODAY//
					$('.fc-day-number.fc-today.ui-state-highlight').css('background','#FF9');
						
					//$('#calendar').find('.fc-content-skeleton').children('table').children('thead').children('tr').find('.fc-other-month').css('color', "red");
					//$('.fc-content-skeleton').find('.fc-other-month.fc-future').css('color', "red");
				},
				
				//EVENT RENDER//
				eventRender: function(event, element, view) {
					//TO HIDE EVENTS//
					element.addClass('ui-helper-hidden');
					
					
					var now = moment(new Date()).format().substring(10,0);
					var dtestrt = event.start.format().substring(10,0);
					var dteend = event.end.format().substring(10,0);
					//$('.fc-day[data-date="' + dtestrt + '"]').css('color', "#9c122a");
					//$('.fc-day[data-date="' + dteend + '"]').css('color', "#9c122a");
					
					//PAST DAY WITH EVENT//
					//$('.fc-other-month.fc-day-number[data-date="' + dtestrt + '"]').css('color', "#9c122a");	
					//$('.fc-content-skeleton').find('.fc-other-month[data-date="' + dtestrt + '"]').css('color', "#9c122a");
					
					
					//TODAY HIGHLIGHT//
					$('.fc-day-number.fc-today.ui-state-highlight').css('background','#FF9');
					
					//EVENT TODAY//
					$('.fc-day-number.fc-today.ui-state-highlight[data-date="' + dtestrt + '"]').css('color', "#9c122a");
					
					//EVENT COLOR PAST//
					$('.fc-day-number.fc-past[data-date="' + dtestrt + '"]').css('color', "#9c122a");	//start date
					
					//EVENT COLOR FUTURE//
					$('.fc-day-number.fc-future[data-date="' + dtestrt + '"]').css('color', "#9c122a");	//start date
					//$('.fc-day-number.fc-future[data-date="' + dteend + '"]').css('color', "#9c122a"); //end date

					//BETWEEN EVENTS//
					//var dteSD = dtestrt.substring(8,2);
					//var dteED = dteend.substring(8,2);
					//var dteDiff = dteED-dteSD;
					
					//LONG EVENT COLOR//
					var dteDiff = moment(dteend).diff(moment(dtestrt),'days');
						
					for(x=1;x<=dteDiff;x++){
						//alert(dteDiff+" "+);
						var exis = moment(dtestrt).add('days', x).format().substring(10,0);
						$('.fc-day-number[data-date="' + exis + '"]').css('color', "#9c122a");
					}
					
					
					/*for(x=0;x<=dteDiff;x++){
						var nwDate = moment(event.start).add("days",x);
						alert(nwDate);
						$('.fc-day-number.fc-future[data-date="' + nwDate + '"]').css('color', "#9c122a");	//start date
					}*/
					
					
					//var dif = moment(dtestrt,"YYYY/MM/DD HH:mm:ss").diff(moment(dteend,"YYYY/MM/DD HH:mm:ss"));
					
					
						//$('#calendar').fullCalendar('removeEvents', event);
					//if (event.start.hasZone()) {
					//	el.find('.fc-event-title').after(
					//		$('<div class="tzo"/>').text(event.start.format('Z'))
					//	);
					//}
				}
			});

		}
		
		renderCalendar();
		
		$('.fc-left').html('<div class="title">EVENT CALENDAR</div>');
		var mon =  $('.fc-center').html();
		$('.fc-center').html('<div class="month">'+mon+'</div>');
		//$('#calendar').find('.fc-other-month').css('background', "red");.hasClass('.fc-past')
		//$('#calendar').find('.fc-content-skeleton').children('table').children('thead').children('tr').find('.fc-other-month.fc-past').css('color', "red");
	});

