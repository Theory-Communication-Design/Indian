// JavaScript Document
	
	$(document).ready(function() {
		var currentLangCode = 'en';
		var currentTimezone = false;
		var date = new Date();
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear();
		
		$('#btnAdd').click(function(){
			$('#btnAddlink').click();
		});
		
		$('#btnEditme').click(function(){
			$('#btnEditlink').click();
		});
		
		$('#btnDelete').click(function(){
			$('#btnDellink').click();
		});
		
		$('#btnAddEvent').click(function(){
			//alert('Hooray');
			$.ajax({
				url: '../php/add_event.php',
				data: $('#frmAddEvent').serialize(),
				type: 'POST',
				success: function(msg){
					alert("Record Added "+msg);
					//$('#frmAddEvent').reset();
				}
			});
		});
		
		$('#selTitle').change(function(){
			var id = $(this).val();
			var _obj = $(this);
			$.post('../php/get_data.php',{ id : id },function(data){
				$('#etitle').val(data[1]);
				$('#estartdate').val(data[2]);
				$('#estarttime').val(data[3]);
				$('#eenddate').val(data[4]);
				$('#eendtime').val(data[5]);
				$('#elocation').val(data[6]);
				//alert(data);
			},'json');
		});
		
		$('#btnEditEvent').click(function(){
			$.ajax({
				url: '../php/edit_events.php',
				data: $('#frmEditEvent').serialize(),
				type: 'POST',
				success: function(msg){
					alert(msg);
					window.location.href="index.php";
				}
			});
		});
		
		$('#frmDelEvent').change(function(){
			var a = confirm('Are you sure want to delete this event?');
			if(a){
				$.ajax({
					url: '../php/del_events.php',
					data: $('#frmDelEvent').serialize(),
					type: 'POST',
					success: function(msg){
						alert(msg);
						window.location.href="index.php";
					}
				});
			}
		});
		
		//var strt = $.fullCalendar('getView').visStart

		//var ends = $.fullCalendar('getView').visEnd
		
		//initialize the external events
		$('#external-events div.external-event').each(function() {
		
			// create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
			// it doesn't need to have a start or end
			/*var eventObject = {
				title: $.trim($(this).text()), // use the element's text as the event title
				mandays: $(this).next().text(),
				backgroundColor: $(this).css("background-color"),
				color: $(this).css("background-color"),
				className: "task-in-call"
			};*/
			
			// store the Event Object in the DOM element so we can get to it later
			//$(this).data('eventObject', eventObject);
			
			// make the event draggable using jQuery UI
			$(this).draggable({
				zIndex: 999,
				revert: true,      // will cause the event to go back to its
				revertDuration: 0  //  original position after the drag
			});
			
			//Click to Edit event
			$(this).click(function(){
				alert("hooray");
			});
			
		});
		
		// load the list of available timezones
		$.getJSON('../php/get-timezones.php', function(timezones) {
			$.each(timezones, function(i, timezone) {
				if (timezone != 'UTC') { // UTC is already in the list
					$('#timezone-selector').append(
						$("<option/>").text(timezone).attr('value', timezone)
					);
				}
			});
		});
		
		// when the timezone selector changes, rerender the calendar
		$('#timezone-selector').on('change', function() {
			currentTimezone = this.value || false;
			$('#calendar').fullCalendar('destroy');
			renderCalendar();
		});

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
					left: 'prev,next today',
					center: 'title',
					right: '' //month,agendaWeek,agendaDay
				},
				defaultDate: Date.now(),
				timezone: currentTimezone,
				lang: currentLangCode,
				buttonIcons: false, // show the prev/next text
				//weekNumbers: true,
				editable: true,
				droppable: true, // this allows things to be dropped onto the calendar !!!
				selectable: true,
				selectHelper: true,
				firstDay: 1,
				//allDay: false,
				//allDayDefault: false,
				//defaultAllDayEventDuration: 1,
				//minTime: '06:00:00',
				//maxTime: '24:00:00',
				//DAY SELECT//
				select: function(start, end, allDay,revertFunc) {
					//var view = $('#calendar').fullCalendar('getView');
  					//var month_int = date1.getMonth();
					
					
					var check = moment(new Date(start.format()));
					var today = moment(new Date());
					var subCh = new Date(check.format().substring(0, 10));
					var subTo = new Date(today.format().substring(0, 10));
					//alert(subCh+" "+subTo);
					if(subCh < subTo){
						alert("Add Event in past dates is disabled.");
					} else {
						if (!confirm("Add Event?")) {
							calendar.fullCalendar('unselect');
							revertFunc();
						} else {
							//alert("start:"+start.format()+" end:"+start.format());
							var title = prompt('Event Title:');
							var startTme = prompt('Start Time: (hh:mm AM/PM)');
							var endTme = prompt('End Time: (hh:mm AM/PM)');
							var desc = prompt('Location:');
							var olday=0;
							
							if(startTme=="" && endTme==""){
								olday=1;
							} else {
								olday=0;
							}
							if(title){
								$.ajax({
									url: '../php/add_events.php',
									data: 'title='+title+'&start='+ start.format() +'&end='+ end.format() +'&strtTme='+startTme+'&endTme='+endTme+'&desc='+desc+'&allDay='+olday,
									type: "POST",
									success: function(json) {
										alert('Added Successfully ' + json);
										$('#calendar').fullCalendar('refetchEvents');
										$('#calendar').fullCalendar("rerenderEvents");
									},
									error: function(json){
										alert('Something went wrong... <br><b>Error: '+json+'</b>');
									}
								});
								
								/*calendar.fullCalendar('renderEvent',
								{
									title: title,
									start: start,
									end: end,
									allDay: allDay
								},
									true // make the event "stick"
								);*/
								
								/*var title = prompt('Event Title:');
								var url = prompt('Type Event url, if exits:');
								if (title) {
									var start = $.fullCalendar.formatDate(start, "yyyy-MM-dd HH:mm:ss");
									var end = $.fullCalendar.formatDate(end, "yyyy-MM-dd HH:mm:ss");
									$.ajax({
										url: '../php/add_events.php',
										data: 'title='+ title+'&start='+ start +'&end='+ end +'&url='+ url ,
										type: "POST",
										success: function(json) {
										alert('Added Successfully');
										}
									});
									calendar.fullCalendar('renderEvent',
									{
										title: title,
										start: start,
										end: end,
										allDay: allDay
									},
										true // make the event "stick"
									);
								}
									calendar.fullCalendar('unselect');*/
							}
						}
					}
					//var olday = 0;
					//if(view.name=="month"){
						//olday = 1;
					//} else if(view.name=="agendaWeek" && view.name=="agendaDay"){
						//olday = 0;
					//}
					
					$('#calendar').fullCalendar('unselect');
					
				},
				
				dayClick: function(date, jsEvent, view) {
					//var start =$('#calendar').fullCalendar('getView').intervalStart;

					
					//var end = $('#calendar').fullCalendar('getView').intervalEnd;
					//alert('Clicked on: ' + start.format() +" "+ end.format());
			
					//alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
			
					//alert('Current view: ' + view.name);
			
					// change the day's background color just for fun
					//$(this).css('background-color', 'red');
			
				},
				//allDaySlot: false,
				//EVENT DROP//
				editable: true,
				/*eventDrop: function(event, delta) {
					//var start = $.fullCalendar.formatDate(event.start, "yyyy-MM-dd hh:mm:ss");
					//var end = $.fullCalendar.formatDate(event.end, "yyyy-MM-dd hh:mm:ss");
					$.ajax({
						url: '../php/update_events.php',
						data: 'title='+ event.title+'&start='+ start +'&end='+ end +'&id='+ event.id ,
						type: "POST",
						success: function(json) {
							alert("Updated Successfully");
						}
					});
				},*/
				eventDrop: function(event, delta, revertFunc) {
					//$('#calendar').fullCalendar( 'refetchEvents' );
					//$('#calendar').fullCalendar("rerenderEvents");
			
					//alert("id "+event.id+" "+event.title + " was dropped on " + event.start.format() + "End date: "+ event.end.format());
					var con = confirm('Are you sure want to change this event?');
					if(con){
						$.ajax({
							url: '../php/update_events.php',
							data: '&title='+ event.title+'&start='+event.start.format()+'&end='+event.end.format()+'&id='+ event.id ,
							type: "POST",
							success: function(json) {
								$('#calendar').fullCalendar( 'refetchEvents' );
								$('#calendar').fullCalendar("rerenderEvents");
								alert("Updated Successfully");
								
							}
						});
					} else {
						revertFunc();	
					}
					/*if (!confirm("Are you sure about this change?")) {
						//var start = $.fullCalendar.formatDate(event.start, "yyyy-MM-dd hh:mm:ss");
						//var end = $.fullCalendar.formatDate(event.end, "yyyy-MM-dd hh:mm:ss");
						
						revertFunc();
					}*/
				},
				/*eventDragStart: function(event, jsEvent, ui, view) {
					//$('#calendar').fullCalendar( 'refetchEvents' );
					//$('#calendar').fullCalendar("rerenderEvents");
			
					alert("id "+event.id+" "+event.title + " was dropped on " + event.start.format() + "End date: "+ event.end.format());
					
					$.ajax({
						url: '../php/update_events.php',
						data: '&title='+ event.title+'&start='+event.start.format()+'&end='+event.end.format()+'&id='+ event.id ,
						type: "POST",
						success: function(json) {
							$('#calendar').fullCalendar( 'refetchEvents' );
							$('#calendar').fullCalendar("rerenderEvents");
							alert("Updated Successfully");
							
						}
					});
				},*/
				/*eventDragStop: function(event, jsEvent, ui, view) {
					//$('#calendar').fullCalendar( 'refetchEvents' );
					//$('#calendar').fullCalendar("rerenderEvents");
			
					alert("id "+event.id+" "+event.title + " was dropped on " + event.start.format() + "End date: "+ event.end.format());
					
					$.ajax({
						url: '../php/update_events.php',
						data: '&title='+ event.title+'&start='+event.start.format()+'&end='+event.end.format()+'&id='+ event.id ,
						type: "POST",
						success: function(json) {
							$('#calendar').fullCalendar( 'refetchEvents' );
							$('#calendar').fullCalendar("rerenderEvents");
							alert("Updated Successfully");
							
						}
					});
				},*/
				
				//EVENT RESIZED//
				/*eventResize: function (event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view) {
					alert('event was resized, new start time:'+ event.start + 'new endtime: ' + event.end);
				},*/
				//eventClick: function (calEvent, jsEvent, view) {
				//},
				eventResize: function(event,dayDelta,minuteDelta,revertFunc) {
					//var start = $.fullCalendar.formatDate(event.start, "yyyy-MM-dd HH:mm:ss");
					//var end = $.fullCalendar.formatDate(event.end, "yyyy-MM-dd HH:mm:ss");
					/*if(dayDelta >= 1 && !event.allDay) {
						revertFunc();
				
						for (var i = 0 ; i < dayDelta ; i ++) {
						   var newEvent = {
							id: event.id,
							title : event.title,
							start : new Date(event.start),
							end : new Date(event.end),
							allDay : event.allDay
						   };
				
						   newEvent.start.setDate(newEvent.start.getDate()+(i+1));
						   newEvent.end.setDate(newEvent.end.getDate()+(i+1));
						   $('#calendar').fullCalendar( 'renderEvent', newEvent , 'stick');
						}
					}*/
					$.ajax({
						url: '../php/update_events.php',
						data: 'title='+ event.title+'&start='+ event.start.format() +'&end='+ event.end.format() +'&id='+ event.id ,
						type: "POST",
						success: function(json) {
							alert("Updated Successfully");
						}
					});
				},
				//EVENT DROP//
				/*drop: function(date) { // this function is called when something is dropped
			
					// retrieve the dropped element's stored Event Object
					var originalEventObject = $(this).data('eventObject');
					
					// we need to copy it, so that multiple events don't have a reference to the same object
					var copiedEventObject = $.extend({}, originalEventObject);
					
					// assign it the date that was reported
					copiedEventObject.start = date;
					
					// render the event on the calendar
					// the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
					$('#calendar').fullCalendar('renderEvent', copiedEventObject, true);
					
					// is the "remove after drop" checkbox checked?
					if ($('#drop-remove').is(':checked')) {
						// if so, remove the element from the "Draggable Events" list
						$(this).remove();
					}
				},*/
				//DAY CLICK//
				//dayClick: function(date,allDay, jsEvent, view) {

					//alert('Clicked on: ' + date.format());
			
					//alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
			
					//alert('Current view: ' + view.name);
			
					// change the day's background color just for fun
					//$(this).css('background-color', 'red');
					//var moment = $('#calendar').fullCalendar('getDate');
					//alert(moment);
					//alert(date.format());
				//},
				//EVENT MOUSEOVER//
				//eventMouseover: function (event, jsEvent) {
				//},
				//DRAGSTOP//
				//eventDragStop: function (event, jsEvent, ui, view) {
				//	alert(jsEvent);
				//},
				//LOADING RENDER//
				loading: function(bool) {
					//$('#loading').toggle(bool);
					console.log(bool);
				},
				//EVENTS//
				events: {
					
					url: '../php/events.php',
					//error: function() {
					//	$('#script-warning').show();
					//}
				},
				eventColor: '#378006',
				//EVENT CLICK//
				eventClick: function(event){
				   //$('#calendar').fullCalendar('removeEvents',event.id);
				   //alert(event.title);
				  /* var del = confirm("Are you sure you want to delete this event?");
				   if(del){
				   //var choice = confirm("Press 'OK' to visit URL, 'CANCEL' to Delete");
				  // if(choice){
					//   if(event.url=="" || event.url==null || event.url=="null"){
					//	   return false; 
					//   } else {
					//		return true;   
					//   }
				  // } else {
					   //var decision = confirm("Do you really want to delete this event?"); 
						//if (decision) {
							$.ajax({
								type: "POST",
								url: "../php/delete_events.php",
								data: "&id=" + event._id,
								success: function(data) {
									alert("Successfully Deleted");
									//$('#calendar').fullCalendar("rerenderEvents");
									$('#calendar').fullCalendar('removeEvents', event._id);
									//location.reload();
								}
							});
						//}
						//return false;
				  // }
				   }*/
				   $('#txtTitle').val(event.title);
				   $('#txtLoc').val(event.descpt);
				   $('#txtSt').val(moment(event.start).format())
				   $('#btnEdit').click();
				},
				//nextDayThreshold: "05:00:00",
				//dayRender: function (event,date, cell) {
					/*if(event.date === date){
						cell.css("background-color", "red");
					}*/
					//$('.fc-other-months .fc-past').css("background-color", "red");
				//},
				
				//EVENT RENDER//
				eventRender: function(event, element, view) {
					//$('.fc-day[data-date="' + event.start.format() + '"]').css('background', "red");
					if (event.start.hasZone()) {
						el.find('.fc-event-title').after(
							$('<div class="tzo"/>').text(event.start.format('Z'))
						);
					}
					//if (event.allDay === 'true') {
					//	event.allDay = true;
					//} else {
					//	event.allDay = false;
					//}
				}
			});
			
		}
		
		renderCalendar();
	});

