export interface AddressLocation {
  address: string;
  zip_code: string;
  latitude: number;
  longitude: number;
}

export interface User extends AddressLocation {  // Se usa AddressLocation para evitar repetir código
  id: number;
  name: string;
  email: string;
  phone: string;
  roles: string[];
  profile_photo_url: string | null;
  profile_video_url: string | null;
}

export interface LocationSuggestion {
  place_id: string;
  lat: string;
  lon: string;
  display_name: string;
  // Otros campos que consideres necesarios
}

