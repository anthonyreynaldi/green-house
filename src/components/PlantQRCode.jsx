import React, { useRef, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
// import {htmlToImage} from 'html-to-image';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import { saveAs } from 'file-saver';
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton, Typography } from '@material-tailwind/react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';

export default function PlantQRCode({ link, name, nameLatin }) {
  const qrCodeRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  }

  const handleDownload = async () => {
    if (qrCodeRef.current) {
        const node = qrCodeRef.current;
        const blob = await htmlToImage.toBlob(node);
        saveAs(blob, name + '.png');
    }
  };

  return (
        <>
            <div className="h-20 w-20 rounded-md border border-blue-gray-50 p-1" onClick={handleOpen}>
                <QRCodeSVG value={link} className='w-full h-full'/>
            </div>

            <Dialog size="xs" open={open} handler={handleOpen}>
                <DialogHeader className="justify-between">
                    <div className="flex items-center gap-3">
                        <div className="-mt-px flex flex-col">
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-medium"
                            >
                                {name}
                            </Typography>
                            <Typography
                                variant="small"
                                color="gray"
                                className="text-xs font-normal italic"
                            >
                                {nameLatin}
                            </Typography>
                        </div>
                    </div>

                    <Button color="green" size="sm" onClick={handleDownload}>
                        <div className="flex items-center gap-2">
                            <ArrowDownTrayIcon className='w-4 h-4'/>
                            Download QR
                        </div>
                    </Button>
                    
                </DialogHeader>

                <DialogBody divider={true}>
                    <div ref={qrCodeRef} className="bg-white p-3 flex flex-col justify-content-center place-items-center place-content-center gap-1">
                        <QRCodeSVG value={link} className='w-40 h-40'/>

                        <Typography variant='h2' className='mt-10 uppercase text-center'>
                            {name}
                        </Typography>

                        <Typography variant='h4' className='italic text-center'>
                            {nameLatin}
                        </Typography>
                    </div>
                </DialogBody>

                <DialogFooter className="justify-between">
                    {""}
                </DialogFooter>
            </Dialog>
        </>
  );
}
