import React, { useState, useRef } from "react";
import {
  Upload,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  X,
} from "lucide-react";
import { UploadedFile } from "../App";

interface FileUploadPanelProps {
  files: UploadedFile[];
  setFiles: (files: UploadedFile[]) => void;
}

const languages = [
  { code: "en", name: "English" },
  { code: "ta", name: "Tamil" },
  { code: "hi", name: "Hindi" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
];

export default function FileUploadPanel({
  files,
  setFiles,
}: FileUploadPanelProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/jpg",
    ];
    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a PDF, PNG, or JPG file.");
      return;
    }

    setIsUploading(true);

    // Create new file entry
    const newFile: UploadedFile = {
      id: Date.now().toString(),
      name: file.name,
      uploadDate: new Date().toISOString().split("T")[0],
      status: "pending",
      language:
        languages.find((l) => l.code === selectedLanguage)?.name || "English",
    };

    setFiles([newFile, ...files]);

    // Simulate upload and processing
    setTimeout(() => {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === newFile.id ? { ...f, status: "processing" } : f
        )
      );

      setTimeout(() => {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === newFile.id
              ? {
                  ...f,
                  status: "done",
                  ocrText:
                    "Sample OCR text extracted from the uploaded file. This would contain the actual text content from the document.",
                  simplifiedText:
                    "This is a simpler version of the text that is easier to read and understand.",
                  translatedText:
                    selectedLanguage !== "en"
                      ? "यह अनुवादित पाठ का एक उदाहरण है।"
                      : undefined,
                  audioUrl: "#",
                  aiImages: [
                    "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=300",
                  ],
                }
              : f
          )
        );
        setIsUploading(false);
      }, 3000);
    }, 2000);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getStatusIcon = (status: UploadedFile["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "processing":
        return (
          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        );
      case "done":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusText = (status: UploadedFile["status"]) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "processing":
        return "Processing...";
      case "done":
        return "Ready";
      case "error":
        return "Error";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
        <Upload className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
        Upload Content
      </h2>

      {/* Language Selector */}
      <div className="mb-6">
        <label
          htmlFor="language"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Translate To
        </label>
        <select
          id="language"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      {/* Upload Area */}
      <div className="mb-6">
        <label
          htmlFor="file-upload"
          className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200 ${
            isUploading
              ? "border-blue-300 bg-blue-50 dark:bg-blue-900/20"
              : "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
          }`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {isUploading ? (
              <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mb-2" />
            ) : (
              <Upload className="w-8 h-8 text-gray-400 dark:text-gray-500 mb-2" />
            )}
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              {isUploading ? (
                <span className="font-medium text-blue-600 dark:text-blue-400">
                  Processing upload...
                </span>
              ) : (
                <>
                  <span className="font-medium text-blue-600 dark:text-blue-400">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </>
              )}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              PDF, PNG, JPG (MAX. 10MB)
            </p>
          </div>
          <input
            ref={fileInputRef}
            id="file-upload"
            type="file"
            className="hidden"
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={handleFileUpload}
            disabled={isUploading}
          />
        </label>
      </div>
    </div>
  );
}
