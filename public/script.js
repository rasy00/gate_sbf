const URL_SERVER = "192.168.110.8";

const config = { fps: 30, qrbox: { width: 250, height: 250 } };

function startScanner() {
  Html5Qrcode.getCameras()
    .then((devices) => {
      /**
       * devices would be an array of objects of type:
       * { id: "id", label: "label" }
       */

      if (devices && devices.length) {
        let cameraId = devices[0].id;

        const scanner = new Html5Qrcode("reader");
        scanner
          .start(
            cameraId,
            {
              fps: 10, // Optional, frame per seconds for qr code scanning
              qrbox: { width: 250, height: 250 }, // Optional, if you want bounded box UI
            },
            // onScanSuccess
            (result) => {
              console.log(result);
              // window reload
              // window.location.reload();
              // send data
              sendData(result).then((val) => {
                scanner.stop();
                checkingSuccess(val);
              });

              setTimeout(() => {
                startScanner();
              }, 3000);
            }
          )
          .catch((err) => {
            // Start failed, handle it.
            alert(err);
          });
      }
    })
    .catch((err) => {
      // handle err
      alert(err);
    });
}

startScanner();

async function sendData(no_induk) {
  const res = await fetch("/checking", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ no_induk: no_induk }),
  });

  return res.json();
}

function checkingSuccess(data) {
  if (data.error) {
    document.getElementById("failed_checking").classList.remove("hidden");
  } else {
    const akses = data.akses + 1;
    if (akses <= 1) {
      // success
      const success = document.getElementById("success_checking");
      const name = success.children[0].children[1];
      const kelas = success.children[0].children[2];

      name.innerHTML = data.nama;
      kelas.innerHTML = data.kelas;
      success.classList.remove("hidden");
    } else {
      // scanned
      const scanned = document.getElementById("scanned_checking");
      scanned.classList.remove("hidden");
    }
  }
  setTimeout(() => {
    window.location.reload();
  }, 3000);
}
