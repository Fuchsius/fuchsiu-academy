"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MdUpload, MdClose } from "react-icons/md";

interface FileUploadProps {
  onFileUploaded: (fileUrl: string, fileName: string) => void;
  accept?: string;
  maxSizeMB?: number;
  buttonText?: string;
}

export default function FileUpload({
  onFileUploaded,
  accept = "application/pdf,image/jpeg,image/png",
  maxSizeMB = 10,
  buttonText = "Choose File",
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setError(null);

    if (!selectedFile) return;

    // Check file size
    if (selectedFile.size > maxSizeMB * 1024 * 1024) {
      setError(`File size exceeds ${maxSizeMB}MB limit`);
      return;
    }

    // Check file type
    if (!accept.split(",").some((type) => selectedFile.type === type)) {
      setError("File type not supported");
      return;
    }

    setFile(selectedFile);
  };

  const uploadFile = async () => {
    if (!file) return;

    setUploading(true);
    setProgress(0);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      // Simulate progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            clearInterval(interval);
            return prev;
          }
          return prev + 5;
        });
      }, 100);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      clearInterval(interval);
      setProgress(100);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Upload failed");
      }

      const data = await response.json();

      // Call the callback with the uploaded file URL
      onFileUploaded(data.fileUrl, data.filename);

      // Reset the file input
      setTimeout(() => {
        setFile(null);
        setProgress(0);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }, 1000);
    } catch (err) {
      console.error("Upload error:", err);
      setError((err as Error).message || "Failed to upload file");
      setProgress(0);
    } finally {
      setUploading(false);
    }
  };

  const clearFile = () => {
    setFile(null);
    setError(null);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center gap-2">
          <Input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="flex-1"
            disabled={uploading}
          />
          {file && (
            <Button
              variant="outline"
              size="icon"
              type="button"
              onClick={clearFile}
              disabled={uploading}
            >
              <MdClose className="h-4 w-4" />
            </Button>
          )}
        </div>

        {file && (
          <div className="text-sm text-gray-600 truncate">
            Selected: {file.name} ({(file.size / (1024 * 1024)).toFixed(2)}MB)
          </div>
        )}

        {error && <div className="text-sm text-red-500">{error}</div>}

        {progress > 0 && (
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-myprimary h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
      </div>

      {file && (
        <Button
          onClick={uploadFile}
          disabled={uploading || !file}
          className="w-full"
        >
          <MdUpload className="mr-2 h-4 w-4" />
          {uploading ? "Uploading..." : "Upload File"}
        </Button>
      )}
    </div>
  );
}
