$(document).ready(function(){

  window.clicked_highlight = '';

  $(".highlighthtml").each(function(){
    var htmlarr = $(this).html().split("xdelimitx");
    var highlight_id = $(this).data('id');
    var selector1 = htmlarr[1];
    var firstline_full = $(selector1).first().html();
    var rep = htmlarr[0].split('&gt;').join('>').split('&lt;').join('<');         //Removes the unicode encoding for '>' and '<' to let the replacing happen.
    if(firstline_full.search('highlight')==-1){                   //Doesn't support overlapping highlights.
      $(selector1).first().html(firstline_full.replace(rep, '<span class="highlight" data-id="'+ highlight_id +'"></span>'+rep));
    }
  });

  $(".t span").each(function(){
    if($(this).html().trim() != ''){
      $(this).css("display", "inline");
    }
  });

  window.selectmode = false;

  window.onehmode = false;

  $(document).mouseup(function(){

    $("#queswrapper").hide();

    $("#quesboxwrapper").hide();

    if(window.onehmode==true){

      $(".quablques").each(function(){
        $(this).hide();
      });

      $("#qinst").hide();

      $("#quesboxwrapper").hide();

      $(".instruct").show();

      $(".highlight_wrapper").each(function(){
        var hhtml = $(this).html();
        $(this).replaceWith(hhtml);
      });

      window.onehmode = false;

    }

    if(getSelectionHtml().trim() != ''){

      setTimeout(function(){
        window.selectmode = true;
      }, 10);

      window.line_arr = [];

      if($(window.getSelection().getRangeAt(0).commonAncestorContainer).closest(".t").length == 1){
        var oneclass = $(window.getSelection().getRangeAt(0).commonAncestorContainer).closest(".t").attr("class");
        window.line_arr.push(oneclass);
        $("#empty").append('<div class="'+ oneclass +'">'+ getSelectionHtml() +'</div>');
      }
      else{
        $("#empty").append(getSelectionHtml());
      }

      $("#empty").find(".t").each(function(){
        window.line_arr.push($(this).attr("class"));
      });
      var selector1 = '.' + window.line_arr[0].split(" ").join('.');
      var selector2 = '.' + window.line_arr[window.line_arr.length-1].split(" ").join('.');
      var firstline_full = $(selector1).first().html();
      var first_selection_html = $("#empty").find(selector1).html();
      var last_selection_html = $("#empty").find(selector2).html();
      var lastline_full = $(selector2).first().html();

      $(selector1).first().html(firstline_full.replace(first_selection_html, '<span class="highlight_wrapper">'+first_selection_html+'</span>'));
      $(selector2).first().html(lastline_full.replace(last_selection_html, '<span class="highlight_wrapper">'+last_selection_html+'</span>'));

      var l;
      for (l = 1; l < window.line_arr.length-1; ++l) {
        var selector = "." + window.line_arr[l].split(" ").join('.');
        var shtml = $(selector).first().html();
        $(selector).first().html('<span class="highlight_wrapper">' + shtml + "</span>");
      }

      $("#quesboxwrapper").show();
      $("#contextquesbox").focus();

      $("body").addClass("noselect");

      $(".instruct").html('Enter the related question below.');
    }
    if(window.selectmode){

        $(".instruct").html('Select any text to add a question<br/> Or, click on a dot to view related question(s).')

        $(".instruct").show('fast');

        $("#qinst").hide();

        $("body").removeClass("noselect");

        $(".highlight_wrapper").each(function(){
          var hhtml = $(this).html();
          $(this).replaceWith(hhtml);
        });

        clearSelection();

        window.line_arr = [];

        $("#empty").empty();

        window.selectmode = false;

      }
  });

  $(document).keyup(function(){				//Code for the deactivation/activation of the Add Answer button.

    if (!($("#contextquesbox").val().trim())) {
      $(".askcontques").attr("disabled", "true");
    }
    else{
      $(".askcontques").removeAttr("disabled");
    }

    if (!($("#quesbox").val().trim())) {
      $(".askques").attr("disabled", "true");
    }
    else{
      $(".askques").removeAttr("disabled");
    }

  });

  $(document).on("click", ".highlight", function(){

      window.onehmode = true;

      window.clicked_highlight = $(this).data('id');

      openquabl($(this).data('id'));

      $(".quablques").each(function(){
        if($(this).data('id')==window.clicked_highlight){
          $(this).show();
        }
      });

      $(".instruct").hide('fast');
      $("#qinst").show();
      $("#queswrapper").show();

  });

  $("#quescrate").click(function(evt){
    evt.stopPropagation();
  });

  $("#contextquesbox").click(function(evt){
    evt.stopPropagation();
  });

  $("#quesbox").click(function(evt){
    evt.stopPropagation();
  });

  $(".askcontques").click(function(evt){
    evt.stopPropagation();
  });

  $(".askques").click(function(evt){
    evt.stopPropagation();
  });

  $(".anoncheck").click(function(evt){
    evt.stopPropagation();
  });

  $(".assigncheck").click(function(evt){
    evt.stopPropagation();
  });

  $("#quescrate").mouseup(function(evt){
    evt.stopPropagation();
  });

  $("#contextquesbox").mouseup(function(evt){
    evt.stopPropagation();
  });

  $("#quesbox").mouseup(function(evt){
    evt.stopPropagation();
  });

  $(".askcontques").mouseup(function(evt){
    evt.stopPropagation();
  });

  $(".askques").mouseup(function(evt){
    evt.stopPropagation();
  });

  $(".anoncheck").mouseup(function(evt){
    evt.stopPropagation();
  });

  $(".assigncheck").mouseup(function(evt){
    evt.stopPropagation();
  });

  $(".askcontques").click(function(){
    var ques = $("#contextquesbox").val();
    var selector1 = '.' + window.line_arr[0].split(" ").join('.');
    var selector2 = '.' + window.line_arr[window.line_arr.length-1].split(" ").join('.');
    var first_selection_html = $("#empty").find(selector1).html();
    var last_selection_html = $("#empty").find(selector2).html();
    var firstline_full = $(selector1).first().html();
    var final = first_selection_html;

    var l;
    for (l = 0; l < window.line_arr.length; ++l) {
      var selector = "." + window.line_arr[l].split(" ").join('.');
      final = final + 'xdelimitx' + selector;
      if(l == window.line_arr.length-1){
        final = final + 'xdelimitx' + last_selection_html;
      }
    }
    window.final = final;
    $.get(('/addquabl/'), {final:final, ques:ques}, function(data){
      $(selector1).first().html(firstline_full.replace(first_selection_html, '<span class="highlight" data-id="'+ data.split('xdatax')[0] +'"></span>'+first_selection_html));
      $("#harr").append('<div class="hq"><span class="highlighthtml" data-id="'+ data.split('xdatax')[0] +'">'+ window.final +'</span><span class="hquestion">'+ ques +'</span></div>');
      $("#hqs").append('<div class="hques"><span class="hhtml" data-id="'+ data.split('xdatax')[0] +'" style="display:none;">'+ window.final +'</span><span class="quablques" data-id="'+ data.split('xdatax')[0] +'"><a href="/question/'+ data.split('xdatax')[1] +'/">'+ ques +'</a></span></div>');

      $("#qinst").show();

      $("#contextquesbox").val('');

      $(".instruct").html('Select any text to add a question<br/> Or, click on a dot to view related question(s).')

      $(".instruct").hide();

      $("body").removeClass("noselect");

      clearSelection();

      window.line_arr = [];

      $("#empty").empty();

      window.selectmode = false;

      setTimeout(function(){
        window.onehmode = true;
        window.clicked_highlight = data.split('xdatax')[0];
      }, 5);
      //<div class="hq"><span class="highlighthtml" data-id="{{hq.highlight.id}}">{{hq.highlight.highlight}}</span><span class="hquestion">{{hq.question}}</span></div>

    });
  });

  $(".askques").click(function(){
    var newques = $("#quesbox").val();
    $.get(('/addquablnew/'), {hid: window.clicked_highlight, ques : newques}, function(data){
      $("#quesbox").val('');
      var hid = data.split("xdatax")[0];
      var qid = data.split("xdatax")[1];
      var ques = data.split("xdatax")[2];
      $("#hqs").append('<div class="hques"><span class="quablques" data-id="'+ hid +'"><a href="/question/'+ qid +'/">'+ ques +'</a></span></div>');
    });
  });

});       //document.ready closes.

function clearSelection() {
  if ( document.selection ) {
    document.selection.empty();
  } else if ( window.getSelection ) {
    window.getSelection().removeAllRanges();
  }
}

function getSelectionHtml() {
  var html = "";
  if (typeof window.getSelection != "undefined") {
    var sel = window.getSelection();
    if (sel.rangeCount) {
      var container = document.createElement("div");
      for (var i = 0, len = sel.rangeCount; i < len; ++i) {
        container.appendChild(sel.getRangeAt(i).cloneContents());
      }
      html = container.innerHTML;
    }
  } else if (typeof document.selection != "undefined") {
    if (document.selection.type == "Text") {
      html = document.selection.createRange().htmlText;
    }
  }
  return html;
}

function hidehighlights(){

  var hldefer = $.Deferred();

  $('.highlight').css('visibility', 'collapse');

  setTimeout(function(){
    hldefer.resolve();
  },5);

  return hldefer;
}

function striptag_jq(element){
  element.contents().unwrap();
}

function openquabl(hid){

  $(".highlighthtml").each(function(){

    if($(this).data('id') == hid ){

      var htmlarr = $(this).html().split("xdelimitx");
      var highlight_id = $(this).data('id');
      var selector1 = htmlarr[1];
      var selector2 = htmlarr[htmlarr.length - 2];
      var firstline_full = $(selector1).first().html();
      var lastline_full = $(selector2).first().html();
      var last_selection_html = htmlarr[htmlarr.length-1].split('&gt;').join('>').split('&lt;').join('<');
      var rep = htmlarr[0].split('&gt;').join('>').split('&lt;').join('<');         //Removes the unicode encoding for '>' and '<' to let the replacing happen.
      $(selector1).first().html(firstline_full.replace('<span class="highlight" data-id="'+ highlight_id +'"></span>'+rep, '<span class="highlight_wrapper"><span class="highlight" data-id="'+ highlight_id +'"></span>'+rep + '</span>'));
      $(selector2).first().html(lastline_full.replace(last_selection_html, '<span class="highlight_wrapper">'+last_selection_html+'</span>'));
      var l;
      for (l = 2; l < htmlarr.length-2; ++l) {
        var selector = htmlarr[l];
        var shtml = $(selector).first().html();
        $(selector).first().html('<span class="highlight_wrapper">' + shtml + "</span>");
      }

      }
  });

}

// function inArray(r, inarr){
//   var l;
//   for (l = 0; l < inarr.length; ++l) {
//     if(inarr[l]==r){
//       return true;
//       break;
//     }
//     else(){
//
//     }
//   }
// }
