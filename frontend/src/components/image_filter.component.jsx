import React, { useState } from "react";

const ImageFilter = ({ isSensitive, url, className }) => {
  const [sensitive, setSensitive] = useState(isSensitive);
  const [open, setOpen] = useState(false);
  const handleOpenImage = (e) => {
    e.stopPropagation();
    setSensitive(false);
  };
  return (
    <div className="relative border mt-3">
      <img
        alt="ddd"
        src={url}
        className={`${className} ${sensitive ? "blur-xl opacity-30" : ""}`}
      />
      {sensitive && (
        <div
          onClick={() => setOpen(true)}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
        >
          <div className="flex flex-col items-center gap-3">
            <i class="fi fi-rs-crossed-eye text-dark-grey z-10 text-[20px]"></i>
            {open && (
              <div className="flex flex-col items-center gap-1">
                <p>Hình ảnh chứa nội dung phản cảm</p>
                <button
                  className="rounded-full px-3 py-1 text-white bg-black"
                  onClick={(e) => handleOpenImage(e)}
                >
                  Xem hình ảnh
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageFilter;
