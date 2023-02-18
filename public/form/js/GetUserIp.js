const userIpEl = document.querySelectorAll('input[name="user_ip"]');

fetch('http://ip-api.com/json/')
  .then(response => response.json())
  .then((result) => {
    Array.from(userIpEl).forEach(element => {
        element.value = result.query
    });
  });