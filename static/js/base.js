function deferred_up(){

		var defer = $.Deferred();

		window.scrollTo(0,0);

		setTimeout(function(){
			defer.resolve();
		}, 50);

		return defer;
	}

$(document).ready(function(){

	var upopen_tb_offset = -200;		//Initialising variable with proper scope.
	var lastst = 0;

	$("img").not("#profimg").each(function(){                //Correcting the img-src inconsistency using JS. Find a better solution.
		proper_src = $(this).attr("src").replace("http:/", "http://");
		$(this).attr("src",proper_src);
	});

	$(".getup").click(function(){

		$this = $(this);

		$.when(deferred_up()).then(function(){

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

		$(".header").css("position", "static");

		$("#profblock").slideDown("slow", function(){
			upopen_tb_offset = $(".header").offset().top;
		});
		
		$("body").css("padding-top", "0px");
		})

		$("#menubtns").hide();

		$("#scrollinstruct").show();

	});

	$(document).on('scroll', function(){
        
        var st = $(document).scrollTop();
        
        if($(document).scrollTop() > upopen_tb_offset){

            $(".header").css({position: "fixed", top:0});   
            $("#menubtns").show();
			$("#scrollinstruct").hide();
			
        }

        else if($(document).scrollTop() <= upopen_tb_offset && lastst >= upopen_tb_offset){
            
            $("#profblock").hide();
            window.scrollTo(0,0); 
            $(".header").css({position: "fixed", top: 0}); 
            $("body").css("padding-top", "100px");

        } 

        lastst = st;   

    });    
});