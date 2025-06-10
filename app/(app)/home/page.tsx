"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import VideoCard from "@/components/VideoCard";
import { Pdf, Video } from "@/types";
import { useUser } from "@clerk/nextjs";
import PdfCard from "@/components/PdfCard";
import { Loader2 } from "lucide-react";
function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [pdfs, setPdfs] = useState<Pdf[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();
  const fetchPdfs = useCallback(async () => {
    try {   
      const response = await axios.get("/api/pdfs");
      if (Array.isArray(response.data)) {
        setPdfs(response.data);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.log(error); 
      setError("Failed to fetch PDFs");
    }
    finally {
      setLoading(false);
    }
  }, []);


  const fetchVideos = useCallback(async () => {
    try {
      const response = await axios.get("/api/videos");
      if (Array.isArray(response.data)) {
        setVideos(response.data);
      } else {
        throw new Error(" Unexpected response format");
      }
    } catch (error) {
      console.log(error);
      setError("Failed to fetch videos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
    fetchPdfs();
  }, [fetchVideos, fetchPdfs]);



  const handleDownload = useCallback((url: string, title: string) => {
    {
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("target", "_blank");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading Resources <Loader2 className="animate-spin mx-2"/>
      </div>
    );
  }

  return (
     
    <div className="container mx-auto p-4  ">
      <h1 className="text-2xl font-bold mb-4">Hi 👋, <span className="capitalize">{user?.firstName}</span>!</h1>
      {videos.length === 0 && pdfs.length === 0 ? (
        <div className="text-center text-lg text-gray-500">
          No videos or PDFs available
        </div>
      ) : (
        <div>
         <h1 className="text-2xl font-bold mb-4">Videos</h1>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onDownload={handleDownload}
            />
          ))}
        </div>
      <div className="container mx-auto p-4">
<h1 className="text-2xl font-bold mb-4 mt-10">PDFs</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center ">
          
          {pdfs.map((pdf) => (
            <PdfCard
              key={pdf.id}
              pdf={pdf}
              onDownload={handleDownload}
            />
          ))}
        </div>
      </div>
       </div>
      )}
    </div>
  );
}

export default Home;
