$(document).ready(function(){
	$('.jumbotron').not(".level-1").not('#Post').hide();
	$('.checkedhigh').hide();
	$(".next").hide(function(){
		$(".level-1").parent().find(".next").show();
	});

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
			$reqsimp = $(this);						
			var simpler_id = $(this).attr('id');
			var post_id = $(".addsimp").attr('data');
			var selection = window.getSelection().getRangeAt(0);
    		var selectedText = selection.extractContents();
    		var highlight = String(selectedText.textContent);
    		var span = $("<span class='curr_highlight' id='"+simpler_id+"' data='"+post_id+"'>" + highlight +"&nbsp<input type='checkbox' class='curr_checkedhigh' value='"+highlight.replace(" ","_")+"' name='highlight'/></span>");
    		//The new highlight has class curr_highlight and the new checkbox has class curr_checkedhigh. They have related CSS.
    		selection.insertNode(span[0]);

   			$(".curr_checkedhigh").hide(); //Fixes the anomaly where the checkbox appears after pressing Ask.

    		if (selectedText.childNodes[1] != undefined){
        		console.log(selectedText.childNodes[1]);
        		$(selectedText.childNodes[1]).remove();
    		}
    
     		clearSelection();
			var new_simpler = String($reqsimp.parent().parent().find('.simpler-html').html());
			uri = '/define/'+ $(this).attr('data') + '/' + simpler_id +'/'+ new_simpler+'/';
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
                $(this).parent().parent().parent().parent().parent().find(".addhigh").attr('href', uri);
                $(this).parent().parent().parent().parent().parent().find(".addness").attr('class', "btn btn-success addness");
            }
            else {
                $(this).parent().parent().parent().parent().parent().find(".addhigh").removeAttr('href');
                $(this).parent().parent().parent().parent().parent().find(".addness").attr('class', 'btn btn-default addness');
            }
        });

		$(".addhigh").click(function(){
			var uri = $(this).attr('data');
			window.locaion.href = uri;
		});
		$(".next").click(function(){
			$(this).parent().find(".btn-group").show("slow", function(){
				$(this).parent().find(".checkedhigh").show();
			});
		});
		$(".next").click(function(){		
			var $this = $(this);
			var $t = $this.parent().find(".jumbotron");
			var this_level = $t.attr("class");	//Gets the current level.
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
});
function clearSelection() {
    if ( document.selection ) {
        document.selection.empty();
    } else if ( window.getSelection ) {
        window.getSelection().removeAllRanges();
    }
}