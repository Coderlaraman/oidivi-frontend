"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Camera } from "lucide-react";
import AddressInput from "@/components/shared/AddressInput";
import {
  updateProfileData,
  uploadProfilePhoto,
  uploadProfileVideo,
  deleteProfilePhoto,
} from "@/lib/api";
import { User } from "@/types";
import { useRouter } from "next/navigation";
import useDashboard, { dashboardEvents } from "@/hooks/useDashboard";

interface EditProfileProps {
  user: User | null;
  onClose: () => void;
}

export default function EditProfile({ user, onClose }: EditProfileProps) {
  const { refreshDashboard, forceRefresh } = useDashboard();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    zip_code: user?.zip_code || "",
    latitude: user?.latitude || 0,
    longitude: user?.longitude || 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(
    user?.profile_photo_url || null
  );
  const [videoPreview, setVideoPreview] = useState<string | null>(
    user?.profile_video_url || null
  );
  const [isUploading, setIsUploading] = useState(false);

  const photoInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddressSelected = (location: {
    address: string;
    zip_code: string;
    latitude: number;
    longitude: number;
  }) => {
    setFormData({
      ...formData,
      address: location.address,
      zip_code: location.zip_code,
      latitude: location.latitude,
      longitude: location.longitude,
    });
  };

  const handleFileSelect =
    (type: "photo" | "video") =>
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      try {
        setIsUploading(true);
        setErrorMessage("");

        if (type === "photo") {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPhotoPreview(reader.result as string);
          };
          reader.readAsDataURL(file);

          await uploadProfilePhoto(file);
          await refreshDashboard(); // Refrescar datos inmediatamente

          // Emitir un evento global para notificar la actualización
          dashboardEvents.emitRefresh();

          setSuccessMessage("Profile photo updated successfully!");
        } else if (type === "video") {
          const reader = new FileReader();
          reader.onloadend = () => {
            setVideoPreview(reader.result as string);
          };
          reader.readAsDataURL(file);

          await uploadProfileVideo(file);
          await refreshDashboard();

          // Emitir el evento de actualización
          dashboardEvents.emitRefresh();

          setSuccessMessage("Profile video updated successfully!");
        }
      } catch (error: any) {
        setErrorMessage("Failed to upload file. Please try again.");
        console.error("File upload error:", error);
        if (type === "photo") {
          setPhotoPreview(user?.profile_photo_url || null);
        } else {
          setVideoPreview(user?.profile_video_url || null);
        }
      } finally {
        setIsUploading(false);
      }
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await updateProfileData(formData);
      await refreshDashboard(); // Refrescar datos inmediatamente

      // Emitir el evento de actualización
      dashboardEvents.emitRefresh();

      setSuccessMessage("Profile updated successfully!");

      // Cerrar el modal después de una actualización exitosa
      setTimeout(() => {
        onClose();

        // Forzar actualización antes de navegar
        forceRefresh();

        // Usar setTimeout para asegurar que el state se actualice antes de la navegación
        setTimeout(() => {
          router.push("/dashboard");
        }, 100);
      }, 1000);
    } catch (err: any) {
      console.error("Update error:", err);
      setErrorMessage(
        err.response?.data?.message ||
          err.message ||
          "Failed to update profile. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeFile = (type: "photo" | "video") => {
    if (type === "photo") {
      setSelectedPhoto(null);
      setPhotoPreview(user?.profile_photo_url || null);
      if (photoInputRef.current) photoInputRef.current.value = "";
    } else {
      setSelectedVideo(null);
      setVideoPreview(user?.profile_video_url || null);
      if (videoInputRef.current) videoInputRef.current.value = "";
    }
  };

  const handleDeletePhoto = async () => {
    try {
      setIsUploading(true);
      setErrorMessage("");

      await deleteProfilePhoto();
      await refreshDashboard(); // Refrescar datos inmediatamente

      // Emitir el evento de actualización
      dashboardEvents.emitRefresh();

      setPhotoPreview(null);
      setSelectedPhoto(null);
      setSuccessMessage("Profile photo deleted successfully!");

      if (photoInputRef.current) {
        photoInputRef.current.value = "";
      }
    } catch (error: any) {
      setErrorMessage("Failed to delete profile photo. Please try again.");
      console.error("Delete photo error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handlePhotoClick = () => {
    if (!isUploading) {
      photoInputRef.current?.click();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-200/80 dark:border-neutral-700/90">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Edit Profile
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Media Upload Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Photo Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Profile Photo
              </label>
              <div className="relative h-48 group">
                {photoPreview ? (
                  <div className="relative h-full rounded-lg overflow-hidden border-2 border-red-500">
                    <Image
                      src={photoPreview}
                      alt="Profile Preview"
                      layout="fill"
                      objectFit="cover"
                      className="cursor-pointer transition-opacity group-hover:opacity-75"
                      onClick={() =>
                        !isUploading && photoInputRef.current?.click()
                      }
                    />
                    <button
                      type="button"
                      onClick={handleDeletePhoto}
                      className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors disabled:opacity-50"
                      disabled={isUploading}
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <Camera className="h-8 w-8 text-white" />
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      !isUploading && photoInputRef.current?.click()
                    }
                    disabled={isUploading}
                    className="w-full h-full rounded-lg border-2 border-dashed border-gray-300 dark:border-neutral-700 flex flex-col items-center justify-center text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors disabled:opacity-50"
                  >
                    <Upload className="h-8 w-8 mb-2" />
                    <span className="text-sm">Upload Photo</span>
                  </button>
                )}
                <input
                  ref={photoInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileSelect("photo")}
                  disabled={isUploading}
                />
              </div>
            </div>

            {/* Video Upload */}
            <div className="space-y-2">
              <label className="block text-gray-700 dark:text-gray-300">
                Profile Video
              </label>
              <div className="relative h-40 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                {videoPreview ? (
                  <div className="relative h-full">
                    <video
                      src={videoPreview}
                      className="w-full h-full object-cover"
                      controls
                    />
                    <button
                      type="button"
                      onClick={() => removeFile("video")}
                      className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => videoInputRef.current?.click()}
                    className="w-full h-full flex flex-col items-center justify-center text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                  >
                    <Upload className="h-8 w-8 mb-2" />
                    <span>Upload Video</span>
                  </button>
                )}
                <input
                  ref={videoInputRef}
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={handleFileSelect("video")}
                />
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:border-transparent"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:border-transparent"
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:border-transparent"
              />
            </div>

            {/* Address */}
            <div>
              <AddressInput onAddressSelected={handleAddressSelected} />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors"
              disabled={isSubmitting || isUploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isUploading}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting || isUploading ? "Updating..." : "Save Changes"}
            </button>
          </div>

          {/* Feedback Messages */}
          {(successMessage || errorMessage) && (
            <div
              className={`p-4 rounded-lg mt-4 ${
                successMessage
                  ? "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200"
                  : "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200"
              }`}
            >
              {successMessage || errorMessage}
            </div>
          )}

          {/* Loading State Indicator */}
          {isUploading && (
            <div className="absolute inset-0 bg-black/10 dark:bg-black/20 flex items-center justify-center">
              <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-lg">
                Updating...
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
