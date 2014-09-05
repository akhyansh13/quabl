$(document).ready(function(){
	$('.jumbotron').not(".level-1").not('#Post').hide();
	$(".addsimp-toggle-post").click(function(){		//toggles simpler addition text area.
		$(this).parent().parent().parent().find(".simpler-textarea").toggle("slow");
	});
	
	$(".addsimp-toggle").click(function(){		//toggles simpler addition text area.
		$(this).parent().parent().parent().find(".simpler-textarea").toggle("slow");
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
			var simpler_id = $(this).attr('id');
			var highlight = String(getSelected());
			uri = '/define/'+ $(this).attr('data') + '/' + simpler_id +'/'+ highlight+'/';
			window.location.href = uri;
		});

		$(".glyphicon-trash").click(function(){
			var $t = $(this).parent().parent()/*.parent()*/;
			$(this).toggle("slow",function(){
				$t.find(".remove, .go-back").show("slow");
			});			
		});

		$(".go-back").click(function(){
			var $t = $(this).parent().parent()/*.parent()*/;
			$(this).toggle("slow",function(){
				$t.find(".remove, .glyphicon-trash").toggle("200");
			});			
		});

		$(".remove").click(function(){				//Deletes the simpler and its children and immediately removes them out of the page [AJAX].
			var $t = $(this).parent().parent()/*.parent()*/;
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
		
		$(".checkedhigh").on("change", function(){
			var aHrefVals = [];
			
			$('.checkedhigh').filter(":checked").each(function() {
				aHrefVals.push($(this).val());
			});
			if (aHrefVals.length != 0) {
				var highlight = aHrefVals.join("xhex");
				var simpler_id = $(this).parent().attr('id');
				var post_id = $(this).parent().attr('data');
				uri = '/highlight/' + post_id + '/' + simpler_id + '/' + highlight + '/';
				$(this).parent().parent().parent().parent().find(".addhigh").attr('href', uri);
				$(this).parent().parent().parent().parent().find(".addness").attr('class', "btn btn-success addness");
			}
			else {
				$(this).parent().parent().parent().parent().find(".addhigh").removeAttr('href');
				$(this).parent().parent().parent().parent().find(".addness").attr('class', 'btn btn-default addness');
			}
		});

		$(".addhigh").click(function(){
			var uri = $(this).attr('data');
			window.locaion.href = uri;
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