import React, { useRef } from 'react';
import QRCode from 'qrcode.react';
// import htmlToImage from 'html-to-image';
import { saveAs } from 'file-saver';

export default function PlantQRCode({ link, name, nameLatin }) {
  const qrCodeRef = useRef(null);

  const handleDownload = async () => {
    if (qrCodeRef.current) {
    //   const node = qrCodeRef.current;
    //   const blob = await htmlToImage.toBlob(node);
    //   saveAs(blob, name + '.png');
    }
  };

  return (
        <QRCode value={link} s/>
    // <div className="text-center">
    //   <div ref={qrCodeRef}>
    //   </div>
    //   <div className="mt-2">{name}</div>
    //   <button
    //     className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
    //     onClick={handleDownload}
    //   >
    //     Download QR Code
    //   </button>

      
    // </div>
  );
}
