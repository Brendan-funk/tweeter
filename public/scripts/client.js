/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const safeHTML = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const createTweetElement = function(data) {
  const tweet = `<article>
                    <header>
                      <div id ='avatarName'>
                        <img src = '${(data['user']['avatars'])}'> </img> 
                        <p>${data['user']['name']} </p>
                      </div>
                      <p id = 'username'> ${data['user']['handle']} </p>
                    </header>
                    <p id = past-tweet>${safeHTML(data['content']['text'])} </p>
                    <footer>
                      <p>${timeago.format(data['created_at'])}</p>
                      <p id ="icons"><i class="fa-solid fa-heart interact"></i>  <i class="fa-solid fa-retweet interact"></i>  <i class="fa-solid fa-flag interact"></i></p>
                    </footer>
                  </article>`
  return tweet;
}
const renderTweets = function(arr) {
  $('#tweets-container').empty();
  const array = arr.reverse();
  for (let obj of array) {
    const $tweet = createTweetElement(obj);
    $('#tweets-container').append($tweet);
  }
}
const loadtweets = function(){
  $.ajax('/tweets', { method: 'GET' })
  .then(function (arr) {
    renderTweets(arr);
  })
};


$(document).ready(function() {
  // Test / driver code (temporary). Eventually will get this from the server.
  
  $('#tweet-form').submit(function(event){
    event.preventDefault();
    const $textarea = $(this).find('textarea');
    const $counter = $(this).find('.counter');
    const $error = $(this).find('#error-message');
    $error.css('display', 'none');
    if($textarea.val() === "") {
      $error.slideDown('slow');
      $error.addClass('error');
    } else if ($textarea.val().length > 140) {
      $error.removeClass('warning');
      $error.addClass('error');
      $error.slideDown();
    } else {
      $error.text('');
      const body = $(this).serialize();
      $.post('/tweets',body);
      $textarea.val('');
      $counter.text(140);
      loadtweets();
    }
  });
  
  
  
});
loadtweets();
