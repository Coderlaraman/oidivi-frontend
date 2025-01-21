import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { uploadProfilePhoto } from '@/lib/api';

interface ProfilePhotoUploaderProps {
  currentPhotoUrl: string;
  onPhotoUpdated: (newUrl: string) => void;
}

const ProfilePhotoUploader: React.FC<ProfilePhotoUploaderProps> = ({
  currentPhotoUrl,
  onPhotoUpdated,
}) => {
  const [photoPreview, setPhotoPreview] = useState(currentPhotoUrl);
  const [newPhoto, setNewPhoto] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewPhoto(file);
      const reader = new FileReader();
      reader.onload = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSavePhoto = async () => {
    if (!newPhoto) return;
    setMessage('');
    try {
      await uploadProfilePhoto(newPhoto);
      setMessage('Photo updated successfully!');
      onPhotoUpdated(photoPreview);
      setNewPhoto(null);
    } catch {
      setMessage('Failed to update photo. Please try again.');
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="relative">
      {/* Imagen de perfil */}
      <img
        src={photoPreview}
        alt="Profile"
        className="w-32 h-32 rounded-full object-cover border-4 border-red-600 dark:border-red-700 cursor-pointer"
        onClick={toggleModal}
      />

      {/* Botón para editar */}
      <label
        htmlFor="photoInput"
        className="absolute bottom-0 right-0 bg-white p-1 m-1 rounded-md cursor-pointer dark:bg-transparent hover:bg-white border-2 hover:border-4 dark:hover:bg-red-600 border-red-600 dark:border-white"
      >
        <FontAwesomeIcon
          icon={faPen}
          className="text-red-600 dark:text-white"
        />
      </label>
      <input
        type="file"
        id="photoInput"
        accept="image/*"
        onChange={handlePhotoChange}
        className="hidden"
      />

      {/* Botón para guardar */}
      {newPhoto && (
        <button
          onClick={handleSavePhoto}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-500 transition"
        >
          Save Photo
        </button>
      )}

      {/* Mensaje */}
      {message && (
        <p className="text-sm mt-2 text-red-600 dark:text-red-500">{message}</p>
      )}

      {/* Modal para la imagen ampliada */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={toggleModal}
        >
          <img
            src={photoPreview}
            alt="Expanded Profile"
            className="max-w-full max-h-full cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoUploader;
