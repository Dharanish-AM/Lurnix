import React from "react";
import {
  History,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
} from "lucide-react";
export interface UploadedFile {
  id: string;
  name: string;
  uploadDate: string;
  status: "pending" | "processing" | "done" | "error";
  language: string;
  folderPath?: string;
  ocrText?: string;
  simplifiedText?: string;
  translatedText?: string;
  audioUrl?: string;
  aiImages?: string[];
}

interface HistoryPanelProps {
  files: UploadedFile[];
  onFileSelect: (file: UploadedFile) => void;
  selectedFile: UploadedFile | null;
}

export default function AllFiles({
  files,
  onFileSelect,
  selectedFile,
}: HistoryPanelProps) {

  console.log(selectedFile)

  const getStatusColor = (status: UploadedFile["status"]) => {
    switch (status) {
      case "pending":
        return "border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20";
      case "processing":
        return "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20";
      case "done":
        return "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20";
      case "error":
        return "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
          <History className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
          All Files
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {files.length} uploaded {files.length === 1 ? "file" : "files"}
        </p>
      </div>

      <div className="p-4">
        {files.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              No files uploaded yet
            </p>
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
            {files.map((file) => (
              <div
                key={file.id}
                className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                  selectedFile?.id === file.id
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : getStatusColor(file.status)
                } hover:shadow-sm`}
                onClick={() => file.status === "done" && onFileSelect(file)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <FileText className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {file.name}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-xs text-gray-600 dark:text-gray-400">
                        <span>{file.uploadDate}</span>
                        <span>•</span>
                        <span>{file.language}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        
                        {file.status === "done" && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onFileSelect(file);
                            }}
                            className="flex items-center space-x-1 px-4 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors duration-200"
                            aria-label={`View content for ${file.name}`}
                          >
                            <Eye className="w-3 h-3" />
                            <span>View</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
