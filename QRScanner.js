import React, { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import axios from 'axios';

function QRScanner() {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', { fps: 10, qrbox: 250 });
    scanner.render(async (decodedText) => {
      alert(`Scanned: ${decodedText}`);
      await axios.post('http://localhost:5000/api/attendance', { qrData: decodedText });
      scanner.clear();
    });
  }, []);

  return (
    <div className="card">
      <h2>Scan QR Code</h2>
      <div id="reader"></div>
    </div>
  );
}

export default QRScanner;
