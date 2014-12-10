function deferred_up(getupinstance){		//Pre-fetching User Profiles.

		var defer = $.Deferred();

		$this = getupinstance;

			var geturl = '/userprof/' + $this.attr("data");
			
			$.get((geturl),function(data){
				$.each($.parseJSON(data), function(key,value){
					if(key =='picurl'){
						$("#profimg").attr("src", value);
					}
					else if(key == 'username'){
						$("#uname").html(value);
					}
					else if(key == 'fullname'){
						$('#fname').html(value);
					}
					else if(key == 'shortbio'){
						$('#sbio').html(value);
					}
				});
			});
			setTimeout(function(){
			defer.resolve();
		}, 100);		//Pre-fetching ETA.
		return defer;
	}

$(document).ready(function(){

	var lastst = 0;

	$("img").not("#profimg").each(function(){                //Correcting the img-src inconsistency using JS. Find a better solution.
		proper_src = $(this).attr("src").replace("http:/", "http://");
		$(this).attr("src",proper_src);
	});

	$(".getup").click(function(){
		$thisgetup = $(this);
		$.when(deferred_up($thisgetup)).then(function(){

			var stl = $(document).scrollTop();

			$("#profblock").slideDown();
			$("#header-wrapper").css("position", "relative");
			$("#profblock").css({position: "absolute", top:stl});
			$(".header").css({position:"absolute", top:stl+400});

			$("#menubtns").hide();

			$("#scrollinstruct").show();

		});
	});

	$(document).on('scroll', function(){

	 	upopen_tb_offset = $(".header").offset().top;

        if($("#profblock").is(":visible")){

	        var st = $(document).scrollTop();
	        
	        if(st > upopen_tb_offset){  //Scrolling lower than topbar.

	            $(".header").css({position: "fixed", top:0});   
	            $("#menubtns").show();
				$("#scrollinstruct").hide();
				$("#profblock").hide();
				$("#profblock").css({position: "fixed", top:0});
				$("#header-wrapper").css({position:"fixed", top:0});

	        }

	        else if(lastst>st){		//Scrolling upwards.
	            
	            var stl = $(document).scrollTop();

				upopen_tb_offset = $(".header").offset().top;
				$("#header-wrapper").css("position", "relative");
				$("#profblock").css({position: "absolute", top:stl});
				$(".header").css({position:"absolute", top:stl+400});   

	        } 

	        lastst = st;

	    }
    });

	$('.vrn').click(function(){
		var text = $(this).html();
		if (text == "View Read Notifications") {
			$(this).html("View Unread Notifications");
			$('.rnotif').show();
			$('.unotif').hide();
		}
		else {
			$(this).html("View Read Notifications");
			$('.unotif').show();
			$('.rnotif').hide();
		}
	});
});