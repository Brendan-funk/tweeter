$(document).ready(function() {
  $('#tweet-text').on('input', function(event){
    const max = 140;
    const $counter = $(this).closest('form').find('.counter');
    const $error = $(this).closest('form').find('#error-message');
    if (max - this.value.length < 0) {
      $counter.css('color', 'red');
      $error.addClass('warning');
      $('#error-type').text("Too Many Characters");
      $error.slideDown();
    } else {
      $counter.css('color','black');
      $error.hide();
      $error.removeClass('warning');
    }
    $counter.text(max - this.value.length);
  })
});
