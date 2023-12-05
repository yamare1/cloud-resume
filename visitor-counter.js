function visitorCounter(){
  fetch("https://ejcxxb8hci.execute-api.us-east-1.amazonaws.com/visitorCounter")
    .then(response => response.text())
    .then((body) => {
      document.getElementById("visitor-counter").innerHTML=body
    })

}

/* function visitorCounter() {
  const element = document.getElementById("visitor-counter");

  if (element) {
      fetch("https://ejcxxb8hci.execute-api.us-east-1.amazonaws.com/visitorCounter")
          .then(response => response.text())
          .then((body) => {
              element.innerHTML = body;
          })
          .catch(error => {
              console.error('Error fetching visitor count:', error);
              // Handle fetch error (optional)
          });
  } else {
      console.error('Element with ID "visitor-counter" not found');
      // Handle null element scenario (optional)
  }
}

// Call visitorCounter function after DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
  visitorCounter();
  // You can call other functions or perform additional actions here if needed
}); */
