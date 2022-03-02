/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  // Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}
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
  $('#tweet-form').submit(function(event){
    event.preventDefault();
    const body = $(this).serialize();
    console.log(body);
    $.post('/tweets',body,);
  });
  const $tweet = createTweetElement(tweetData);
  $('#tweets-container').append($tweet);
})
