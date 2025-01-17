import React, { useState, useRef } from 'react';
import { useLoadScript, Autocomplete, Libraries } from '@react-google-maps/api';
import axios from 'axios';

const libraries: Libraries = ['places'];

interface AddressInputProps {
  onAddressSelected: (data: {
    address: string;
    zip_code: string;
    latitude: number;
    longitude: number;
  }) => void;
  inputClassName?: string;
}

const AddressInput: React.FC<AddressInputProps> = ({
  onAddressSelected,
  inputClassName = '',
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDDCZP7Ow_RnWP9HnK8lqLkkTXByT2UFn0', // API Key Google Maps
    libraries,
  });

  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [address, setAddress] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleLoad = (autoC: google.maps.places.Autocomplete) => {
    setAutocomplete(autoC);
  };

  const handlePlaceChanged = async () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      const addressComponents = place.address_components || [];
      let zip_code =
        addressComponents.find((comp) => comp.types.includes('postal_code'))
          ?.long_name || '';
      const location = place.geometry?.location;

      if (location) {
        const latitude = location.lat();
        const longitude = location.lng();

        // Si no se encuentra ZIP code en Google Places, usa Geocoding
        if (!zip_code) {
          try {
            const geocodeResponse = await axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDDCZP7Ow_RnWP9HnK8lqLkkTXByT2UFn0`
            );
            const geocodeComponents =
              geocodeResponse.data.results[0]?.address_components || [];
            zip_code =
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              geocodeComponents.find((comp: any) =>
                comp.types.includes('postal_code')
              )?.long_name || '';
          } catch (error) {
            console.error(
              'Error trying to get ZIP code with Geocoding:',
              error
            );
          }
        }

        const selectedAddress = place.formatted_address || '';
        onAddressSelected({
          address: selectedAddress,
          zip_code,
          latitude,
          longitude,
        });
        setAddress(selectedAddress);

        // Actualiza el campo de entrada con la dirección seleccionada
        if (inputRef.current) {
          inputRef.current.value = selectedAddress;
        }
      }
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <label className="block text-sm font-medium mb-1">Address</label>
      <Autocomplete onLoad={handleLoad} onPlaceChanged={handlePlaceChanged}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className={`block w-full p-3 border border-gray-300 rounded bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none ${inputClassName}`}
        />
      </Autocomplete>
    </div>
  );
};

export default AddressInput;
