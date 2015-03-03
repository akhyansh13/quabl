$(document).ready(function(){

  window.clicked_highlight = '';

  $(".highlighthtml").each(function(){
    var htmlarr = $(this).html().split("xdelimitx");
    var highlight_id = $(this).data('id');
    var selector1 = htmlarr[1];
    var firstline_full = $(selector1).first().html();
    var rep = htmlarr[0].split('&gt;').join('>').split('&lt;').join('<');         //Removes the unicode encoding for '>' and '<' to let the replacing happen.
    $(selector1).first().html(firstline_full.replace(rep, '<span class="highlight" data-id="'+ highlight_id +'"></span>'+rep));
  });

  $(".t span").each(function(){
    if($(this).html().trim() != ''){
      $(this).css("display", "inline");
    }
  });

  window.selectmode = false;

  window.onehmode = false;

  $(document).mouseup(function(){

    if(window.onehmode==true){

      $(".quablques").each(function(){
        $(this).hide();
      });

      $("#qinst").hide();

      $("#quesboxwrapper").hide();

      $(".instruct").show();

      window.onehmode = false;

    }

    if(getSelectionHtml().trim() != ''){

      window.selectmode = true;

      window.line_arr = [];

      $("#empty").append(getSelectionHtml());

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
    else if(window.selectmode && getSelectionHtml().trim()==''){

        $(".instruct").html('Select any text to add a question<br/> Or, click on a dot to view related question(s).')

        $(".instruct").show('fast');

        $("#qinst").hide();

        $("#quesboxwrapper").hide();

        $("#queswrapper").hide();

        $("body").removeClass("noselect");

        window.selectmode = false;

        clearSelection();

        var l;
        for (l = 0; l < window.line_arr.length; ++l) {
          var selector = "." + window.line_arr[l].split(" ").join('.');
          var hwhtml = $(selector).first().find(".highlight_wrapper").html();
          $(selector).first().find(".highlight_wrapper").replaceWith(hwhtml);
          if(l==window.line_arr.length-1){
            window.line_arr = [];
            $("#empty").empty();
          }
        }

      }
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
    $.get(('/addquabl/'), {final:final, ques:ques}, function(data){
      $(selector1).first().html(firstline_full.replace(first_selection_html, '<span class="highlight"></span>'+first_selection_html));
    });
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
      $("#quesboxwrapper").show();

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

  // $(document).on("click",function(){
  //   if()
  // });

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

    console.log(hid);

    if($(this).data('id') == highlight_id ){

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
