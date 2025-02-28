import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { uploadProfileVideo } from "@/lib/api";

interface ProfileVideoUploaderProps {
  currentVideoUrl: string | null;
  onVideoUpdated: (newUrl: string) => void;
}

const ProfileVideoUploader: React.FC<ProfileVideoUploaderProps> = ({
  currentVideoUrl,
  onVideoUpdated,
}) => {
  const [videoPreview, setVideoPreview] = useState(currentVideoUrl);
  const [newVideo, setNewVideo] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewVideo(file);
      const videoURL = URL.createObjectURL(file);
      setVideoPreview(videoURL);
    }
  };

  const handleSaveVideo = async () => {
    if (!newVideo) return;
    setIsLoading(true);
    setMessage("");
    try {
      await uploadProfileVideo(newVideo);
      setMessage("Video updated successfully!");
      onVideoUpdated(videoPreview!);
      setNewVideo(null);
    } catch {
      setMessage("Failed to update video. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      {videoPreview ? (
        <video
          src={videoPreview}
          controls
          className="w-64 h-36 rounded-lg border-4 border-red-700"
        />
      ) : (
        <p className="text-gray-400">No profile video available</p>
      )}
      <label
        htmlFor="videoInput"
        className="absolute bottom-0 right-0 bg-white p-1 m-1 rounded-md cursor-pointer dark:bg-transparent hover:bg-white border-2 hover:border-4 dark:hover:bg-red-600 border-red-600 dark:border-white"
      >
        <FontAwesomeIcon
          icon={faPen}
          className="text-red-600 dark:text-white"
        />
      </label>
      <input
        type="file"
        id="videoInput"
        accept="video/*"
        onChange={handleVideoChange}
        className="hidden"
      />
      {newVideo && (
        <button
          onClick={handleSaveVideo}
          disabled={isLoading}
          className={`mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Uploading..." : "Save Video"}
        </button>
      )}
      {message && <p className="text-red-500">{message}</p>}
    </div>
  );
};

export default ProfileVideoUploader;
