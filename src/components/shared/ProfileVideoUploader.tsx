import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { uploadProfileVideo } from '@/lib/api';

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
  const [message, setMessage] = useState('');

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
    setMessage('');
    try {
      await uploadProfileVideo(newVideo);
      setMessage('Video updated successfully!');
      onVideoUpdated(videoPreview!);
      setNewVideo(null);
    } catch {
      setMessage('Failed to update video. Please try again.');
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
        className="absolute bottom-0 right-0 bg-red-600 p-2 rounded-full cursor-pointer hover:bg-red-700"
      >
        <FontAwesomeIcon icon={faPen} className="text-white" />
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
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Save Video
        </button>
      )}
      {message && <p className="text-red-500">{message}</p>}
    </div>
  );
};

export default ProfileVideoUploader;
