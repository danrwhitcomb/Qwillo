$(document).ready(function() {
  $('.image-edit-button').click(function(e){
    var $imageBox = $('.image-edit-box');
    if($imageBox.is(":visible")){
          $imageBox.animate({
            height: 0},
            300, function() {
              $imageBox.hide();
          });
    } else {
      $imageBox.show();
      $imageBox.animate({height: 68}, 300);
    }
  });

  $('.image-edit-submit').click(function(){
    var data = {imageUrl: $('.image-edit-input').val(), topic: model.title}
    $.ajax({
      url: '/topic/image',
      method: "POST",
      data: data
    }).done(function(result){
      if(result.status == 100){
        document.location.reload();
      }
    });
  });

  $('.useful').each(function($button){
    var id = $button.attr('pid');
    sendUpvote($button, id);
  });

    $('.useless').each(function($button){
    var id = $button.attr('pid');
    sendDownvote($button, id);
  });

  $

});