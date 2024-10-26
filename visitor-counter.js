function visitorCounter(){
  fetch("https://ejcxxb8hci.execute-api.us-east-1.amazonaws.com/visitorCounter")
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then((body) => {
      document.getElementById("visitor-counter").innerHTML = body;
    })
    .catch((error) => {
      console.error('Error fetching visitor count:', error);
      document.getElementById("visitor-counter").innerHTML = "N/A";
    });
}