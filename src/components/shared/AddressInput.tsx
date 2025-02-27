import React, { useState, useRef, useCallback } from 'react';
import axios from 'axios';

interface AddressInputProps {
  onAddressSelected: (data: {
    address: string;
    zip_code: string;
    latitude: number;
    longitude: number;
  }) => void;
  inputClassName?: string;
}

// Función debounce para evitar llamadas excesivas mientras el usuario escribe
function debounce(func: (...args: any[]) => void, delay: number) {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

const AddressInput: React.FC<AddressInputProps> = ({
  onAddressSelected,
  inputClassName = '',
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Función para llamar a la API de Autocomplete de LocationIQ
  const fetchSuggestions = async (value: string) => {
    try {
      const response = await axios.get('https://us1.locationiq.com/v1/autocomplete', {
        params: {
          key: process.env.NEXT_PUBLIC_LOCATIONIQ_API_KEY, // Tu token en .env.local
          q: value,
          limit: 5,
          format: 'json',
        },
      });
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error al obtener sugerencias:', error);
    }
  };

  const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 300), []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 2) {
      debouncedFetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  // Función para obtener el código postal mediante Reverse Geocoding
  const getPostalCode = async (lat: string, lon: string) => {
    try {
      const response = await axios.get('https://us1.locationiq.com/v1/reverse', {
        params: {
          key: process.env.NEXT_PUBLIC_LOCATIONIQ_API_KEY,
          lat,
          lon,
          format: 'json',
        },
      });
      return response.data.address.postcode || '';
    } catch (error) {
      console.error('Error al obtener el código postal:', error);
      return '';
    }
  };

  // Maneja la selección de una sugerencia
  const handleSuggestionClick = async (suggestion: any) => {
    // Actualiza el input con la dirección seleccionada y limpia las sugerencias
    setQuery(suggestion.display_name);
    setSuggestions([]);

    const latitude = parseFloat(suggestion.lat);
    const longitude = parseFloat(suggestion.lon);

    // Llama a Reverse Geocoding para obtener el código postal
    const postal = await getPostalCode(suggestion.lat, suggestion.lon);

    // Invoca la función callback con los datos requeridos
    onAddressSelected({
      address: suggestion.display_name,
      zip_code: postal,
      latitude,
      longitude,
    });

    // Actualiza el valor del input (opcional, ya que ya lo hemos asignado)
    if (inputRef.current) {
      inputRef.current.value = suggestion.display_name;
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-1">Dirección</label>
      <input
        ref={inputRef}
        type="text"
        placeholder="Ingresa tu dirección"
        value={query}
        onChange={handleInputChange}
        className={`block w-full p-3 border border-gray-300 rounded bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none ${inputClassName}`}
      />
      {suggestions.length > 0 && (
        <ul className="border mt-2 rounded-lg shadow">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.place_id}
              onClick={() => handleSuggestionClick(suggestion)}
              className="p-2 cursor-pointer hover:bg-gray-200"
            >
              {suggestion.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddressInput;
