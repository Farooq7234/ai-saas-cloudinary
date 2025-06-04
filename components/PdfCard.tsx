import React, { useCallback } from "react";
import { getCldImageUrl, getCldOgImageUrl } from "next-cloudinary";
import { Download, FileDown, FileUp } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { filesize } from "filesize";
import { Pdf } from "@/types";

dayjs.extend(relativeTime);

interface PdfCardProps {
  pdf: Pdf;
  onDownload?: (url: string, title: string) => void; // Optional callback
}

const PdfCard: React.FC<PdfCardProps> = ({ pdf, onDownload }) => {
      const getThumbnailUrl = useCallback((publicId: string) => {
        return getCldImageUrl({
          src: publicId,
          width: 400,
          height: 225,
          crop: "fill",
          gravity: "auto",
          format: "jpg",
          quality: "auto",
          assetType: "image",
        });
      }, []);


  // ✅ Generate Cloudinary PDF URL
  const getFullPdfUrl = useCallback((publicId: string) => {
    return getCldOgImageUrl({
      src: publicId,
      format: "pdf",
    });
  }, []);

  // ✅ Format size
  const formatSize = useCallback((size: number) => {
    return filesize(size);
  }, []);

  // ✅ Compression % Calculation
  const compressionPercentage = Math.round(
    (1 - Number(pdf.compressedSize) / Number(pdf.originalSize)) * 100
  );




  return (
    <div className="w-[350px] sm:w-[300px] bg-base-100 shadow-xl rounded-md dark:border dark:border-gray-700 transition-transform transform hover:scale-105 cursor-pointer">
      <div className="card-body p-4">
        <img src={getThumbnailUrl(pdf.publicId)} alt={pdf.title} />
        <h2 className="card-title text-lg font-bold mt-5">{pdf.title}</h2>
        <p className="text-sm text-base-content opacity-70 mb-4">
          {pdf.description}
        </p>
        <p className="text-sm text-base-content opacity-70 mb-4">
          Uploaded {dayjs(pdf.createdAt).fromNow()}
        </p>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center">
            <FileUp size={18} className="mr-2 text-primary" />
            <div>
              <div className="font-semibold">Original</div>
              <div className="text-red-500 font-bold">
                {formatSize(Number(pdf.originalSize))}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <FileDown size={18} className="mr-2 text-primary" />
            <div>
              <div className="font-semibold">Compressed</div>
              <div className="text-green-500 font-bold">
                {formatSize(Number(pdf.compressedSize))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="text-sm font-semibold">
            Compression:{" "}
            <span className="text-accent text-green-500 font-bold">
              {compressionPercentage}%
            </span>
          </div>
          <button
            className="btn btn-primary btn-sm"
            onClick={onDownload ? () => onDownload(getFullPdfUrl(pdf.publicId), pdf.title) : undefined}
          >
            <Download size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PdfCard;
