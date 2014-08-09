$(document).ready(function(){
	$('.jumbotron').not(".level-1").not('#Post').hide();
	$(".addsimp-toggle-post").click(function(){		//toggles simpler addition text area.
		$(this).parent().parent().parent().find(".simpler-textarea").toggle("slow");
	});
	
	$(".addsimp-toggle").click(function(){		//toggles simpler addition text area.
		$(this).parent().parent().parent().parent().find(".simpler-textarea").toggle("slow");
	});

		
		$(".glyphicon-align-center").click(function(){		//hierarchy button code.
			var $this = $(this);
			var $t = $this.parent().parent().parent();
			var this_level = $(this).parent().parent().parent().attr("class");	//Gets the current level.
			var level = this_level.split("level-");
			level = parseInt(level[(level.length-1)]);
			curr_level_string = String(level)
			var curr_jumbotron = "#"+$this.parent().parent().parent().attr("id");
			var curr_jumbotron_class = "."+$this.parent().parent().parent().attr("id");
			$this.hide('slow', function(){
					$(curr_jumbotron_class).show();
					$("#Post").hide();
					$(".jumbotron").not(curr_jumbotron).not(curr_jumbotron_class).not("#Post").hide(function(){
					$.scrollTo($t.position().top, 100);
				});
			});
			
	});
			
		$(".addsimp").click(function(){					//add simpler button code [AJAX].
			var simpler_id = $(this).attr('id');
			var post_id = $(this).attr("data");
			
			if(simpler_id == 'level1-simp'){			//handles level1 simplers.

			var simpler_textarea_id = 'level1-textarea';
			var simpler_text = CKEDITOR.instances[simpler_textarea_id].getData();
				$.get(('/makesimpler/'),{simpler_id:simpler_id, simpler_text:simpler_text, post_id:post_id,}, function(data){
				    location.reload();
				});
		}
		else{											//handles simplers of level greater than or equal to 2.											
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
			var highlight = String(getSelected());
			uri = '/define/'+ $(this).attr('data') + '/' + simpler_id +'/'+ highlight+'/';
			window.location.href= uri;
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

		$(".remove").click(function(){				//Deletes the simpler and its children and immediately removes them out of the page [AJAX].
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
});

function getSelected() {					//Gets selected text.
    if(window.getSelection){ 
    	return window.getSelection(); 
    }
    else if(document.getSelection){ 
        return document.getSelection(); 
    }
    else{
        var selection = document.selection && document.selection.createRange();
        if(selection.text) { 
        	return selection.text; 
        }
        return false;
    }
    return false;
}
			

