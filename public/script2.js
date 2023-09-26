function sendScannedDataToServer(nisnResult, endResult) {
    const dataToSend = {
        nisnResult: nisnResult,
        endResult: endResult,
    };

    fetch('/database.php', {
        method: 'POST',
        body: JSON.stringify(dataToSend),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.existsInDatabase) {
            document.getElementById("result").innerHTML = `
                <h2>Success!</h2>
                <h4 class="h4-success">[NISN terdaftar!]</h4>
                <p><a href="#" style="text-decoration: none;">${nisnResult} <br> ${endResult}</a></p>
            `;
        } else {
            document.getElementById("result").innerHTML = `
            <h2>Failed!</h2>
            <h4 class="h4-failed">[NISN tidak terdaftar!]</h4>`;
        }
    })
    .catch(error => {
        console.error(error);
    });
}

const scanner = new Html5QrcodeScanner("reader", {
    qrbox: {
        width: 250,
        height: 250,
    },
    fps: 20,
});

scanner.render(handleQRScan);

function handleQRScan(result) {
    var nisnResult = result.slice(0, 8);
    var endResult = result.slice(8);

    document.getElementById("result").innerHTML = `
        <h2>Success!</h2>
        <h4>[General Participan]</h4>
        <p><a href="#" style="text-decoration: none;">${nisnResult} <br> ${endResult}</a></p>
    `;

    scanner.clear();
    document.getElementById("reader").remove();

    sendScannedDataToServer(nisnResult, endResult); 
}

function error(err) {
    console.error(err);
}
