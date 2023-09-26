const scanner = new Html5QrcodeScanner("reader", {
  qrbox: {
    width: 250,
    height: 250,
  },
  fps: 20, // Fps attempt a scan
});

scanner.render(success, error);
function success(result) {
  var nisnResult = result.slice(0, 8); 
  var endResult = result.slice(8); 

  document.getElementById("result").innerHTML = `
      <h2>Success!</h2>
      <h4>[General Participan]</h4>
      <p><a href="${result}" style="text-decoration: none;">${nisnResult} <br> ${endResult}</a></p>
      `;

  scanner.clear();

  document.getElementById("reader").remove();
}

function error(err) {
  console.error(err);
}