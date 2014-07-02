$(document).ready(function(){
	$(".addsimp-toggle").click(function(){
		$(this).parent().parent().parent().parent().find(".simpler-textarea").toggle("slow");
	});
		
		$(".glyphicon-align-center").click(function(){
			var $this = $(this);
			var $t = $(this).parent().parent().parent();
			var jum_id = $t.attr("id");
			var jclass = ".parent"+jum_id;
			var jid = "#" + jum_id;
			$(".jumbotron").not(jid).not(jclass).toggle('slow',function(){
		        $.scrollTo($t.position().top, 300);
				$(".glyphicon-align-center").hide("slow",function(){
					$(".glyphicon-chevron-up").show("slow");
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
			var post_id = $(this).attr("data");
			
			if(simpler_id == 'level1-simp'){

			var simpler_textarea_id = 'level1-textarea';
			var simpler_text = CKEDITOR.instances[simpler_textarea_id].getData();
				$.get(('/makesimpler/'),{simpler_id:simpler_id, simpler_text:simpler_text, post_id:post_id,}, function(data){
				    location.reload();
				});
		}
		else{
			var simpler_textarea_id = 'simp'+ simpler_id;
			var simpler_text = CKEDITOR.instances[simpler_textarea_id].getData();
				$.get(('/makesimpler/'),{simpler_id:simpler_id, simpler_text:simpler_text, post_id:post_id,}, function(data){
				    location.reload();
				});
			}
			});
		$(".reqsimp").click(function(){
			$button = $(this);
			var simpler_id = $(this).attr('id');
			$.get(('/requestsimpler/'), {simpler_id:simpler_id},function(){
				$button.toggle("slow");
				$button.parent().html("Done! We'll notify you.");
			});
		});

		$(".glyphicon-trash").click(function(){
			var $t = $(this).parent().parent().parent();
			$(this).toggle("slow",function(){
				$t.find(".remove, .go-back").show("slow");
			});			
		});

		$(".go-back").click(function(){
			var $t = $(this).parent().parent().parent();
			$(this).toggle("slow",function(){
				$t.find(".remove, .glyphicon-trash").toggle("200");
			});			
		});

		$(".remove").click(function(){
			var $t = $(this).parent().parent().parent();
			var simpler_id = $t.attr("id");
			var parent_class = ".parent"+ simpler_id;
			curr_simp_id = simpler_id;
			$.get(('/deletesimpler/'), {curr_simp_id:curr_simp_id}, function(){
				$(parent_class).hide("slow");
				$(parent_class).remove();
				$t.hide("slow");
				$t.remove();
			});
			$(parent_class).each(function(){
				$s = $(this);
				curr_simp_id = $s.attr('id');
				$.get(('/deletesimpler/'), {curr_simp_id:curr_simp_id});
			});
		});

	function getSelected() {
    if(window.getSelection) { return window.getSelection(); }
        else if(document.getSelection) { return document.getSelection(); }
                    else {
                            var selection = document.selection && document.selection.createRange();
                            if(selection.text) { return selection.text; }
                return false;
            }
            return false;
        }
			
		 		
});
