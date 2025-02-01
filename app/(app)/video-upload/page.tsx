"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

// Import shadcn/ui components (adjust paths as needed)
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

function VideoUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter();

  // Maximum file size of 70 MB
  const MAX_FILE_SIZE = 70 * 1024 * 1024;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      alert("File size too large");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("originalSize", file.size.toString());

    try {
      await axios.post("/api/video-upload", formData);
      router.push("/");
    } catch (error) {
      console.error(error);
      // Add notification logic here if needed
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-xl mx-auto bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-black">
            Upload Video
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title Field */}
            <div>
              <Label htmlFor="title" className="mb-1 text-black">
                Title
              </Label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter video title"
                required
                className="bg-white border border-gray-300 text-black"
              />
            </div>

            {/* Description Field */}
            <div>
              <Label htmlFor="description" className="mb-1 text-black">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter video description"
                className="bg-white border border-gray-300 text-black"
              />
            </div>

            {/* File Upload Field */}
            <div>
              <Label htmlFor="file" className="mb-1 text-black">
                Video File
              </Label>
              <Input
                id="file"
                type="file"
                accept="video/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                required
                className="bg-white border border-gray-300 text-black"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isUploading}
              className="w-full bg-black text-white hover:bg-black"
            >
              {isUploading ? "Uploading..." : "Upload Video"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default VideoUpload;
