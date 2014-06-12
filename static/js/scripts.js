$(document).ready(function(){
	$("#Post .glyphicon-chevron-down").click(function(){
		$(this).parent().parent().parent().find("form").toggle('slow');
	});
	$(".glyphicon-chevron-down").not("#Post .glyphicon-chevron-down").click(function(){
		$(this).parent().parent().parent().find("textarea").toggle("slow");
		$(this).parent().parent().parent().find("button").toggle("slow");
	});
		
		$(".glyphicon-align-center").click(function(){
			var $this = $(this);
			var $t = $(this).parent().parent().parent();
			var jum_id = $(this).parent().parent().parent().attr("id");
			var jclass = ".parent"+jum_id;
			var jid = "#" + jum_id;
			$(".jumbotron").not(jid).not(jclass).toggle('slow',function(){
		        $.scrollTo($t.position().top, 300);
				$(".glyphicon-align-center").hide("slow",function(){
					$(".glyphicon-chevron-up").show();
				});
			});
	});
	
	$(".glyphicon-chevron-up").click(function(){
		$(".jumbotron").show("slow");
		$(".glyphicon-chevron-up").hide("slow", function(){
	        $.scrollTo($("html").position().top, 300);
			$(".glyphicon-align-center").show('slow');
		});		
});
			
		$(".addsimp").click(function(){
			var simpler_id = $(this).attr('id');
			var simpler_text = $(this).parent().parent().find("textarea").val();
				$.get(('/makesimpler/'),{simpler_id:simpler_id, simpler_text:simpler_text }, function(data){
				    location.reload();
				});
			});
		$(".reqsimp").click(function(){
			$button = $(this);
			var simpler_id = $(this).attr('id');
			$.get(('/requestsimpler/'), {simpler_id:simpler_id},function(){
				$button.toggle("slow");
				$button.parent().html("Done!We'll notify you.");
			});
		});
			
		 		
});
