
"use client";

import { useRef, useState } from "react";
import {
  Image as ImageIcon,
  Upload,
  Link as LinkIcon,
  X,
  Check,
  LoaderCircle,
} from "lucide-react";
import { toast } from "sonner";

export default function ImagePicker({
  value = "",
  onChange,
  alt = "",
  onAltChange,
  accept = "image/png,image/jpeg,image/webp,image/gif",
  maxSizeMB = 5,
}) {
  const [activeTab, setActiveTab] = useState("upload");
  const [url, setUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [previewError, setPreviewError] = useState(false);
  const fileInputRef = useRef(null);

  const selectFile = async (file) => {
    if (!file) return;

    const allowedTypes = accept
      .split(",")
      .map((type) => type.trim());

    if (!allowedTypes.includes(file.type)) {
      toast.error("Choose a PNG, JPG, WEBP, or GIF image.");
      return;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      toast.error(`Image must be smaller than ${maxSizeMB} MB.`);
      return;
    }

    setUploading(true);

    try {
      const body = new FormData();
      body.append("image", file);

      const response = await fetch("/api/admin/media/upload", {
        method: "POST",
        body,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Image upload failed.");
      }

      onChange?.(result.url);
      onAltChange?.(alt || file.name.replace(/\.[^.]+$/, ""));
      setPreviewError(false);

      toast.success("Image uploaded successfully.");
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error(error.message || "Could not upload image.");
    } finally {
      setUploading(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const useUrl = () => {
    const nextUrl = url.trim();

    if (!nextUrl) {
      toast.error("Enter an image URL.");
      return;
    }

    try {
      const parsed = new URL(nextUrl);

      if (!["https:", "http:"].includes(parsed.protocol)) {
        throw new Error("Invalid protocol");
      }
    } catch {
      toast.error("Enter a valid HTTP or HTTPS image URL.");
      return;
    }

    onChange?.(nextUrl);
    setPreviewError(false);
    toast.success("Image URL selected.");
  };

  const clearImage = () => {
    onChange?.("");
    setPreviewError(false);
  };

  const tabs = [
    { id: "upload", label: "Upload", icon: Upload },
    { id: "url", label: "Image URL", icon: LinkIcon },
  ];

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="grid grid-cols-2 rounded-lg bg-[#F4F6FA] p-1">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveTab(id)}
            className={`inline-flex h-9 items-center justify-center gap-2 rounded-md text-sm font-medium transition ${
              activeTab === id
                ? "bg-white text-[#2852A0] shadow-sm"
                : "text-[#777777] hover:text-[#081828]"
            }`}
          >
            <Icon size={15} />
            {label}
          </button>
        ))}
      </div>

      {/* Upload tab */}
      {activeTab === "upload" && (
        <div
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => {
            event.preventDefault();
            setDragging(false);
            selectFile(event.dataTransfer.files?.[0]);
          }}
          className={`rounded-xl border border-dashed p-5 text-center transition ${
            dragging
              ? "border-[#2852A0] bg-blue-50"
              : "border-[#D5D5D5] bg-white"
          }`}
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F4F6FA] text-[#2852A0]">
            {uploading ? (
              <LoaderCircle size={22} className="animate-spin" />
            ) : (
              <ImageIcon size={22} />
            )}
          </div>

          <p className="mt-3 text-sm font-medium text-[#081828]">
            {uploading ? "Uploading image..." : "Choose an image"}
          </p>

          <p className="mt-1 text-xs text-[#888888]">
            PNG, JPG, WEBP or GIF · Up to {maxSizeMB} MB
          </p>

          <button
            type="button"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
            className="mt-4 inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-[#2852A0] px-4 text-sm font-medium text-white hover:bg-[#1F4386] disabled:opacity-50"
          >
            <Upload size={15} />
            Browse files
          </button>

          <p className="mt-3 text-xs text-[#999999]">
            Or drag and drop an image here
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            className="hidden"
            onChange={(event) => selectFile(event.target.files?.[0])}
          />
        </div>
      )}

      {/* Image URL tab */}
      {activeTab === "url" && (
        <div className="space-y-3 rounded-xl border border-[#EEEEEE] p-4">
          <label
            htmlFor="shared-image-url"
            className="text-sm font-medium text-[#081828]"
          >
            Image URL
          </label>

          <input
            id="shared-image-url"
            type="url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                useUrl();
              }
            }}
            placeholder="https://example.com/image.jpg"
            className="h-10 w-full rounded-lg border border-[#EEEEEE] px-3 text-sm outline-none focus:border-[#2852A0]"
          />

          <button
            type="button"
            onClick={useUrl}
            className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-[#EEEEEE] text-sm font-medium text-[#2852A0] hover:bg-blue-50"
          >
            <Check size={15} />
            Use this URL
          </button>

          <p className="text-xs leading-5 text-[#888888]">
            External URLs are used as provided. They are not copied into
            your project's images folder.
          </p>
        </div>
      )}

      {/* Selected image preview */}
      {value && (
        <div className="overflow-hidden rounded-xl border border-[#EEEEEE]">
          {previewError ? (
            <div className="flex min-h-28 items-center justify-center bg-[#F9F9F9] p-4 text-sm text-[#888888]">
              Image preview is unavailable.
            </div>
          ) : (
            <img
              key={value}
              src={value}
              alt={alt || "Selected image"}
              onError={() => setPreviewError(true)}
              onLoad={() => setPreviewError(false)}
              className="max-h-56 w-full bg-[#F9F9F9] object-contain"
            />
          )}

          <div className="flex items-center justify-between gap-3 border-t border-[#EEEEEE] p-3">
            <p className="min-w-0 break-all text-xs text-[#777777]">
              {value}
            </p>

            <button
              type="button"
              onClick={clearImage}
              aria-label="Remove selected image"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#777777] hover:bg-red-50 hover:text-red-600"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Alt text */}
      {onAltChange && (
        <div>
          <label
            htmlFor="shared-image-alt"
            className="text-sm font-medium text-[#081828]"
          >
            Image Alt Text
          </label>

          <input
            id="shared-image-alt"
            value={alt}
            onChange={(event) => onAltChange(event.target.value)}
            placeholder="Describe the image"
            className="mt-1.5 h-10 w-full rounded-lg border border-[#EEEEEE] px-3 text-sm outline-none focus:border-[#2852A0]"
          />
        </div>
      )}
    </div>
  );
}
