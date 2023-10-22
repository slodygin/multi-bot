console.log('Client-side code running');

setInterval(function() {
  fetch('/getCount', {method: 'GET'})
    .then(function(response) {
      if(response.ok) return response.json();
      throw new Error('Request failed.');
    })
    .then(function(data) {
      document.getElementById('counter').innerHTML = `In mongodb there are  ${data.result} saved messages`;
    })
    .catch(function(error) {
      console.log(error);
    });
}, 1000);
