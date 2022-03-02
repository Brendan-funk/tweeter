$(document).ready(function() {
  $('#tweet-text').on('input', function(event){
    const max = 140;
    const $counter = $(this).closest('form').find('.counter');
    if (max - this.value.length < 0) {
      $counter.css('color', 'red');
    } else {
      $counter.css('color','black');
    }
    $counter.text(max - this.value.length);
  })
});
