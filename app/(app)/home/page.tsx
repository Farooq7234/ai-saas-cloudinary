"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import VideoCard from "@/components/VideoCard";
import { Pdf, Video } from "@/types";
import { useUser } from "@clerk/nextjs";
import PdfCard from "@/components/PdfCard";
import { Loader2 } from "lucide-react";
import PaymentButton from "@/components/PaymentButton";
function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [pdfs, setPdfs] = useState<Pdf[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();
  const [isPro, setIsPro] = useState(false); // State to manage Pro status, you can replace this with your own logic


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

    const fetchUserStatus = async () => {
    try {
      const response = await fetch("/api/user-status");
      if (!response.ok) {
        throw new Error("Failed to fetch user status");
      }
      const data = await response.json();
      if (data.message === "User is a Pro member") {
        setIsPro(true);
      }
    } catch (error) {
      console.error("Error fetching user status:", error);
      return null;
    }
  };

  useEffect(() => {
    fetchVideos();
    fetchPdfs();
    fetchUserStatus()
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
        Loading Resources <Loader2 className="animate-spin mx-2" />
      </div>
    );
  }

  return (

    <div className="container mx-auto p-4  ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Hi 👋, <span className="capitalize">{user?.firstName}</span>!</h1>
        { <PaymentButton loading= {loading}/>}
      </div>
      {videos.length === 0 && pdfs.length === 0 ? (
        <div className="text-center text-lg text-gray-500">
          No videos or PDFs available
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold mb-4">Videos</h1>
        {videos.length === 0 ? "Upload Video and get compressed video Here":(  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
            {videos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onDownload={handleDownload}
              />
            ))}
          </div>)}
            <h1 className="text-2xl font-bold mb-4 mt-10">PDFs</h1>
          {pdfs.length === 0 ? "Upload PDFs to get compressed pdf Here":(<div className="container mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center ">

              {pdfs.map((pdf) => (
                <PdfCard
                  key={pdf.id}
                  pdf={pdf}
                  onDownload={handleDownload}
                />
              ))}
            </div>
          </div>)}
        </div>
      )}
    </div>
  );
}

export default Home;
