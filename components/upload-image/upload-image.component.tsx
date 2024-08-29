import { ChangeEvent, FC, useEffect, useState } from "react";
import SvgIcon from "../svg-icon/svg-icon.component";
import Image from "next/image";
import { toast } from "react-toastify";

interface IProps {
  getImage: (e: string | ArrayBuffer | null | undefined) => void;
  currentImage?: string;
}

const UploadImage: FC<IProps> = ({ getImage, currentImage }) => {
  const [showInput, setShowInput] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [imageUrl, setImageUrl] = useState("");
  const [dataURL, setDataURL] = useState<
    string | ArrayBuffer | null | undefined
  >("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (!files?.[0]) {
      return;
    }

    const item = files[0];

    const size = Number(item.size ?? 0);

    if (size > 0.5 * 1024 * 1024) {
      toast.error(`File size must be less than 500 kb`);

      return;
    }

    if (
      item.type === "image/jpeg" ||
      item.type === "image/jpg" ||
      item.type === "image/png"
    ) {
      setSelectedFile(item);
      setImageUrl(URL.createObjectURL(item));

      const reader = new FileReader();
      reader.readAsDataURL(item);
      reader.onload = function (e) {
        const dataUrl = e.target?.result; // The base64 encoded data URL
        setDataURL(dataUrl);
      };

      setShowInput(false);
    } else {
      toast.error("Please select suitable file");
    }
  };

  const handleDeleteImage = () => {
    setShowInput(true);
    setSelectedFile(undefined);
    setImageUrl("");
  };

  useEffect(() => {
    if (currentImage) {
      setImageUrl(currentImage);
      setShowInput(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedFile) {
      getImage(dataURL);
    } else {
      //   getImage("");
    }
  }, [selectedFile, getImage, dataURL]);

  return (
    <div className="h-[126px] p-4 border rounded-[8px] flex justify-center items-center">
      {showInput ? (
        <div className="flex flex-col justify-between items-center">
          <SvgIcon width={40} height={40} iconName="upload" />
          <p className="text-[14px]">
            <input
              accept="image/*"
              type="file"
              id="task_cover"
              className="hidden"
              onChange={handleChange}
            />
            <label
              htmlFor="task_cover"
              className="text-[#6941C6] cursor-pointer"
            >
              Click to upload
            </label>{" "}
            or drag and drop
          </p>
          <p className="text-[12px]">PNG or JPG</p>
        </div>
      ) : (
        <div className="flex w-full justify-between items-center overflow-clip gap-4">
          <Image
            id={"uploaded_image"}
            sizes={"100%"}
            className="rounded-lg"
            objectFit="contain"
            width={80}
            height={12}
            src={imageUrl}
            alt="preview_image"
          />

          {selectedFile && (
            <div style={{ width: "50%" }}>
              <p className="font-medium text-[14px] text-[#344054]">
                {selectedFile?.name}
              </p>
              <p className="font-regular text-[14px] text-[#667085]">
                {(Number(selectedFile?.size) / 1024).toFixed(0)} KB
              </p>
            </div>
          )}

          <SvgIcon iconName="delete" onClick={handleDeleteImage} />
        </div>
      )}
    </div>
  );
};

export default UploadImage;
