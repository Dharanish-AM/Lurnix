import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import FileUploadPanel from "./components/FileUploadPanel";
import OCRResultPanel from "./components/OCRResultPanel";
import AllFiles from "./components/AllFiles";
import AccessibilityControls from "./components/AccessibilityControls";
import Footer from "./components/Footer";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AccessibilityProvider } from "./contexts/AccessibilityContext";
import { BlobServiceClient } from "@azure/storage-blob";

export type UserRole = "teacher" | "student";

export interface UploadedFile {
  id: string;
  name: string;
  uploadDate: string;
  status: "pending" | "processing" | "done" | "error";
  language: string;
  ocrText?: string;
  simplifiedText?: string;
  translatedText?: string;
  audioUrl?: string;
  aiImages?: string[];
  folderPath: string;
}

function App() {
  const [userRole, setUserRole] = useState<UserRole>("teacher");
  const [files, setFiles] = useState<UploadedFile[]>([]);

  useEffect(() => {
    const fetchFolders = async () => {
      const sasUrl =
        "https://lurnix.blob.core.windows.net/lurnix-data?sv=2024-11-04&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2025-07-29T22:00:10Z&st=2025-07-29T13:45:10Z&spr=https,http&sig=pTyMYGL0lQK8qMad2EilirviPTbwAxJe6HxxDuh%2FAvY%3D";
      const containerClient = new BlobServiceClient(sasUrl).getContainerClient(
        ""
      );

      const folderSet = new Set<string>();
      for await (const blob of containerClient.listBlobsFlat()) {
        const parts = blob.name.split("/");
        if (parts.length > 1) folderSet.add(parts[0]);
      }

      const fetchedFiles: UploadedFile[] = [];

      for (const folder of folderSet) {
        const blobs = containerClient.listBlobsFlat({ prefix: `${folder}/` });

        const fileData: Partial<UploadedFile> = {
          id: folder,
          name: folder,
          folderPath: folder,
          uploadDate: new Date().toISOString().split("T")[0],
          status: "done",
          language: "Unknown",
        };

        for await (const blob of blobs) {
          const url = `${sasUrl.split("?")[0]}/${blob.name}?${
            sasUrl.split("?")[1]
          }`;
          if (blob.name.includes("original-text"))
            fileData.ocrText = await fetch(url).then((res) => res.text());
          else if (blob.name.includes("simplified-text"))
            fileData.simplifiedText = await fetch(url).then((res) =>
              res.text()
            );
          else if (blob.name.includes("translated-text"))
            fileData.translatedText = await fetch(url).then((res) =>
              res.text()
            );
          else if (blob.name.includes("audio")) fileData.audioUrl = url;
          else if (blob.name.includes("image")) {
            if (!fileData.aiImages) fileData.aiImages = [];
            fileData.aiImages.push(url);
          }
        }

        fetchedFiles.push(fileData as UploadedFile);
      }

      console.log(fetchedFiles)

      setFiles(fetchedFiles);
    };

    fetchFolders().catch(console.error);
  }, []);

  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(
    files.find((f) => f.status === "done") || null
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const renderTeacherUI = () => (
    <main className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-6">
        <div className="w-full">
          <FileUploadPanel files={files} setFiles={setFiles} />
        </div>
        <AllFiles
          files={files}
          onFileSelect={(file) => {
            setSelectedFile(file);
            setIsModalOpen(true);
          }}
          selectedFile={selectedFile}
        />
        <div>
          {selectedFile && selectedFile.status === "done" && isModalOpen && (
            <OCRResultPanel
              closeModal={() => setIsModalOpen(false)}
              file={selectedFile}
            />
          )}
        </div>
      </div>
    </main>
  );

  const renderStudentUI = () => (
    <main className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-6">
        <AccessibilityControls />
        <div className="w-full">
          <AllFiles
            files={files}
            onFileSelect={(file) => {
              setSelectedFile(file);
              setIsModalOpen(true);
            }}
            selectedFile={selectedFile}
          />
        </div>
        <div>
          {selectedFile && selectedFile.status === "done" && isModalOpen && (
            <OCRResultPanel
              closeModal={() => setIsModalOpen(false)}
              file={selectedFile}
            />
          )}
        </div>
      </div>
    </main>
  );

  return (
    <ThemeProvider>
      <AccessibilityProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          <Header userRole={userRole} onRoleChange={setUserRole} />

          {userRole === "teacher" ? renderTeacherUI() : renderStudentUI()}

          <Footer />
        </div>
      </AccessibilityProvider>
    </ThemeProvider>
  );
}

export default App;
