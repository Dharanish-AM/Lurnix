import React, { useState, useEffect } from "react";
import {
  FileText,
  Volume2,
  VolumeX,
  Download,
  Image as ImageIcon,
  Languages,
  Lightbulb,
  Play,
  Pause,
  X,
} from "lucide-react";
import { UploadedFile } from "../App";

interface OCRResultPanelProps {
  file: UploadedFile;
  closeModal: () => void;
}

type TabType = "original" | "simplified" | "translated" | "audio" | "images";

export default function OCRResultPanel({
  file,
  closeModal,
}: OCRResultPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>("original");
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioRef] = useState(() => new Audio(file.audioUrl));

  useEffect(() => {
    return () => {
      audioRef.pause();
    };
  }, []);

  console.log(file);

  const tabs = [
    { id: "original", label: "Original Text", icon: FileText, count: null },
    { id: "simplified", label: "Simplified", icon: Lightbulb, count: null },
    { id: "translated", label: "Translated", icon: Languages, count: null },
    { id: "audio", label: "Audio", icon: Volume2, count: null },
    {
      id: "images",
      label: "AI Images",
      icon: ImageIcon,
      count: file.aiImages?.length || 0,
    },
  ];

  const toggleAudio = () => {
    if (!audioRef) return;
    if (isPlaying) {
      audioRef.pause();
    } else {
      audioRef.play();
    }
    setIsPlaying(!isPlaying);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "original":
        return (
          <div className="prose dark:prose-invert max-w-none">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <pre className="whitespace-pre-wrap text-sm font-mono text-gray-800 dark:text-gray-200 leading-relaxed">
                {file.ocrText}
              </pre>
            </div>
          </div>
        );

      case "simplified":
        return (
          <div className="prose dark:prose-invert max-w-none">
            <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Lightbulb className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mr-2" />
                <span className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
                  Simplified for easier reading
                </span>
              </div>
              <pre className="whitespace-pre-wrap text-gray-800 dark:text-gray-200 leading-relaxed text-sm">
                {file.simplifiedText}
              </pre>
            </div>
          </div>
        );

      case "translated":
        return (
          <div className="prose dark:prose-invert max-w-none">
            {file.translatedText ? (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Languages className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                    <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                      Translated to {file.language}
                    </span>
                  </div>
                </div>
                {(() => {
                  try {
                    const json = JSON.parse(file.translatedText || "[]");
                    const translation = json[0]?.translations?.[0];
                    return (
                      <>
                        <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">
                          Language: {translation?.to?.toUpperCase()}
                        </p>
                        <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-200 leading-relaxed text-lg">
                          {translation?.text}
                        </div>
                      </>
                    );
                  } catch {
                    return (
                      <p className="text-red-500">
                        Invalid translated data format.
                      </p>
                    );
                  }
                })()}
              </div>
            ) : (
              <div className="text-center py-8">
                <Languages className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  No translation available for this content.
                </p>
              </div>
            )}
          </div>
        );

      case "audio":
        return (
          <div className="space-y-6">
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Volume2 className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2" />
                  <span className="font-medium text-purple-800 dark:text-purple-200">
                    Audio Narration
                  </span>
                </div>
                <button
                  onClick={toggleAudio}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
                  aria-label={isPlaying ? "Pause audio" : "Play audio"}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                  <span>{isPlaying ? "Pause" : "Play"}</span>
                </button>
              </div>
            </div>

            <div className="flex justify-center">
              <a
                href={file.audioUrl}
                download
                className="flex text-white items-center space-x-2 px-4 py-2 bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-900 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <Download className="w-4 h-4" />
                <span className="text-white">Download MP3</span>
              </a>
            </div>
          </div>
        );

      case "images":
        return (
          <div className="space-y-6">
            {file.aiImages && file.aiImages.length > 0 ? (
              <>
                <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <ImageIcon className="w-5 h-5 text-orange-600 dark:text-orange-400 mr-2" />
                    <span className="text-sm font-medium text-orange-800 dark:text-orange-200">
                      AI-Generated Visual Aids
                    </span>
                  </div>
                  <p className="text-sm text-orange-700 dark:text-orange-300">
                    These images were generated to help visualize the content
                    and aid comprehension.
                  </p>
                </div>

                <div className="flex flex-col items-center space-y-6">
                  {file.aiImages.map((imgUrl, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={imgUrl}
                        alt={`AI generated visual ${index + 1}`}
                        className="w-96 h-96 aspect-square object-cover rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-200"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-lg transition-all duration-200"></div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <ImageIcon className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  No AI-generated images available for this content.
                </p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-5xl w-full max-h-[90vh] scrollbar-hide overflow-y-auto border border-gray-200 dark:border-gray-700 relative">
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-white"
          aria-label="Close modal"
        >
          <X />
        </button>

        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {file.name}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Uploaded on {file.uploadDate}
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-0 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                      : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                  aria-label={`View ${tab.label}`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {tab.count !== null && tab.count > 0 && (
                    <span className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs px-2 py-0.5 rounded-full">
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">{renderTabContent()}</div>
      </div>
    </div>
  );
}
