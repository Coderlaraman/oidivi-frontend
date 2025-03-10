import React, { useState, useRef, useCallback, useMemo } from "react";
import axios from "axios";

interface AddressInputProps {
  onAddressSelected: (data: {
    address: string;
    zip_code: string;
    latitude: number;
    longitude: number;
  }) => void;
  inputClassName?: string;
}

interface Suggestion {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
}

// Función debounce para evitar llamadas excesivas mientras el usuario escribe
function debounce(func: (value: string) => void, delay: number) {
  let timeoutId: NodeJS.Timeout;
  return (...args: [string]) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

const AddressInput: React.FC<AddressInputProps> = ({
  onAddressSelected,
  inputClassName = "",
}) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Memorizamos fetchSuggestions para mantener su identidad entre renders.
  const fetchSuggestions = useCallback(async (value: string) => {
    try {
      const response = await axios.get(
        "https://us1.locationiq.com/v1/autocomplete",
        {
          params: {
            key: process.env.NEXT_PUBLIC_LOCATIONIQ_API_KEY, // Tu token en .env.local
            q: value,
            limit: 5,
            format: "json",
          },
        }
      );
      setSuggestions(response.data as Suggestion[]);
    } catch (error) {
      console.error("Error al obtener sugerencias:", error);
    }
  }, []);

  // Usamos useMemo para crear la función debounced solo cuando fetchSuggestions cambie.
  const debouncedFetchSuggestions = useMemo(
    () => debounce(fetchSuggestions, 300),
    [fetchSuggestions]
  );

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
      const response = await axios.get(
        "https://us1.locationiq.com/v1/reverse",
        {
          params: {
            key: process.env.NEXT_PUBLIC_LOCATIONIQ_API_KEY,
            lat,
            lon,
            format: "json",
          },
        }
      );
      const data = response.data as { address: { postcode: string } };
      return data.address.postcode || "";
    } catch (error) {
      console.error("Error al obtener el código postal:", error);
      return "";
    }
  };

  // Maneja la selección de una sugerencia
  const handleSuggestionClick = async (suggestion: Suggestion) => {
    setQuery(suggestion.display_name);
    setSuggestions([]);

    const latitude = parseFloat(suggestion.lat);
    const longitude = parseFloat(suggestion.lon);
    const postal = await getPostalCode(suggestion.lat, suggestion.lon);

    onAddressSelected({
      address: suggestion.display_name,
      zip_code: postal,
      latitude,
      longitude,
    });

    if (inputRef.current) {
      inputRef.current.value = suggestion.display_name;
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter your address"
        value={query}
        onChange={handleInputChange}
        className={`block w-full p-3 border border-gray-300 rounded bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-1 focus:ring-red-500 focus:outline-none ${inputClassName}`}
      />
      {suggestions.length > 0 && (
        <ul className="border mt-2 rounded-lg shadow">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.place_id}
              onClick={() => handleSuggestionClick(suggestion)}
              className="p-2 cursor-pointer hover:bg-gray-500"
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
