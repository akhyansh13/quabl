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
      $("#logocontainer img").fadeOut('fast');
      $('#ftopbar').css({
        position: 'static'
      });
    }
  });

}); //document.ready closed.
