$(function() {

	var name = $("#name"), start_date = $("#start_date"), end_date = $("#end_date"), priority = $("#priority"), type = $("#type"), repetitive = $("#repetitive"), allFields = $([]).add(name).add(start_date).add(end_date).add(priority).add(type).add(repetitive), tips = $(".validateTips");

	start_date.datepicker();
	end_date.datepicker();

	function updateTips(t) {
		tips.text(t).addClass("ui-state-highlight");
		setTimeout(function() {
			tips.removeClass("ui-state-highlight", 1500);
		}, 500);
	}

	function checkLength(o, n, min, max) {
		if (o.val().length > max || o.val().length < min) {
			o.addClass("ui-state-error");
			updateTips("Length of " + n + " must be between " + min + " and " + max + ".");
			return false;
		} else {
			return true;
		}
	}

	function checkRegexp(o, regexp, n) {
		if (!( regexp.test(o.val()) )) {
			o.addClass("ui-state-error");
			updateTips(n);
			return false;
		} else {
			return true;
		}
	}


	$("#dialog-form").dialog({
		autoOpen : false,
		height : 300,
		width : 350,
		modal : true,
		buttons : {
			"Create task" : function() {
				var bValid = true;
				allFields.removeClass("ui-state-error");

				bValid = bValid && checkLength(name, "name", 3, 16);
				// bValid = bValid && checkLength( password, "password", 5, 16 );

				// bValid = bValid && checkRegexp( name, /^[a-z]([0-9a-z_])+$/i, "Username may consist of a-z, 0-9, underscores, begin with a letter." );
				// // From jquery.validate.js (by joern), contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
				// bValid = bValid && checkRegexp( email, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, "eg. ui@jquery.com" );
				// bValid = bValid && checkRegexp( password, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9" );

				if (bValid) {
					$("#tasks-prepared").append("<div id=\"54321\" class='task ui-corner-all'>" + "<h3>" + name.val() + "</h3>" +  "</div>");
					createTasks();
					$(this).dialog("close");
				}
			},
			Cancel : function() {
				$(this).dialog("close");
			}
		},
		close : function() {
			allFields.val("").removeClass("ui-state-error");
		}
	});

	function createTasks(){
		$(".task").draggable({
			revert : "invalid", // when not dropped, the item will revert back to its initial position});
			containment : "#timeline",
			grid : [50, 20],
			helper : "clone",
		});
	}

	createTasks();

	$(".task-section").droppable({
		accept : ".task",
		//activeClass: "ui-state-highlight",
		//activeClass: "ui-state-default",
		hoverClass : "ui-state-hover",
		//hoverClass: "ui-state-active",
		drop : function(event, ui) {
			//deleteImage( ui.draggable );
			//alert(ui.draggable.html());
			$(this).append(ui.draggable);

		}
	})
	;

	$("#create-task").button().click(function() {
		$("#dialog-form").dialog("open");
	});
	
	if(localStorage){
		//alert('supported');
		//    function listAllItems(){
		//alert(localStorage.length)  
        for (i=0; i<=localStorage.length-1; i++)  
        {   
            key = localStorage.key(i);  
            val = localStorage.getItem(key);   
        }  
	}else{
		alert('not supported');
	}
});

