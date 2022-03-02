/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const createTweetElement = function(data) {
  const tweet = `<article>
                    <header>
                      <div id ='avatarName'>
                        <img src = '${data['user']['avatars']}'> </img> 
                        <p>${data['user']['name']} </p>
                      </div>
                      <p id = 'username'> ${data['user']['handle']} </p>
                    </header>
                    <p id = past-tweet>${data['content']['text']} </p>
                    <footer>
                      <p>${timeago.format(data['created_at'])}</p>
                      <p id ="icons"><i class="fa-solid fa-heart"></i>  <i class="fa-solid fa-retweet"></i>  <i class="fa-solid fa-flag"></i></p>
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
    if($textarea.val() === "") {
      alert('Tweet is empty');
    } else if ($counter < 0) {
      alert('Tweet is too long');
    } else {
      const body = $(this).serialize();
      $.post('/tweets',body);
      $textarea.val('');
      $counter.text(140);
      loadtweets();
    }
  });
  
  
  
});
loadtweets();
