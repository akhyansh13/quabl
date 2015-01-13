$(document).ready(function(){

  var fixmeTop = $('#ftopbar').offset().top;
  $(window).scroll(function() {
    var currentScroll = $(window).scrollTop();
    if (currentScroll >= fixmeTop) {
      $("#logocontainer img").fadeIn('fast');
      $('#ftopbar').css({
        position: 'fixed',
        top: '0',
        left: '0'
      });
    } else {
      if($("#biglogo").is(":visible")){
        $("#logocontainer img").fadeOut('fast');
      }
      $('#ftopbar').css({
        position: 'static'
      });
    }
  });

  $("#signin").click(function(){
    $(this).hide('fast');
    $("#biglogo").hide();
    $("#introtext").hide();
    $("#login").fadeIn('fast');
    $("#logocontainer img").fadeIn('fast');
  });

}); //document.ready closed.
