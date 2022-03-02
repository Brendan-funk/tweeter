/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

let writeToggle = true;
$(document).ready(function () {
  const scrollFunction = function () {
    const button = document.getElementById('top');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      button.style.display = 'block';
    } else {
      button.style.display = 'none';
    }
  }

  const loadtweets = function () {
    $.ajax('/tweets', { method: 'GET' })
      .then(function (arr) {
        renderTweets(arr);
      })
  };

  const safeHTML = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  const createTweetElement = function (data) {
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

  const renderTweets = function (arr) {
    $('#tweets-container').empty();
    const array = arr.reverse();
    for (let obj of array) {
      const $tweet = createTweetElement(obj);
      $('#tweets-container').append($tweet);
    }
  }
  $('#tweet-form').submit(function (event) {
    event.preventDefault();
    const $textarea = $(this).find('textarea');
    const $counter = $(this).find('.counter');
    const $error = $(this).find('#error-message');
    if ($textarea.val() === "") {
      $error.slideDown('slow');
      $error.addClass('error');
    } else if ($textarea.val().length > 140) {
      $error.removeClass('warning');
      $error.addClass('error');
      $error.slideDown();
    } else {
      $error.text('');
      const body = $(this).serialize();
      $.post('/tweets', body);
      $textarea.val('');
      $counter.text(140);
      loadtweets();
    }
  });
  $('#write-new').on('click', function () {
    if (writeToggle) {
      $('.new-tweet').slideUp();
      writeToggle = false;
    } else {
      $('.new-tweet').slideDown();
      writeToggle = true;
    }
  })
  $('#top').on('click', function() {
    window.scrollTo({top: 0, behavior: "smooth"});
  })
  window.onscroll = function () { scrollFunction() };
  loadtweets();
});

