$(document).ready(function() {
  const tweetText = document.getElementById('tweet-text');
  const counter = document.getElementById('counter');
  const max = 140;
  tweetText.addEventListener('input',() => {
    const length = tweetText.value.length;
    if(max - length < 0) {
      counter.classList.add('red');
    } else {
      counter.classList.remove('red');
    }
    counter.innerHTML = max - length;
  });
});
