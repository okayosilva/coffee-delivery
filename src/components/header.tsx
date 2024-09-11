import { MapPin } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import logo from '../assets/logo.svg';

type GeoLocationProps = {
  city: string;
  principalSubdivision: string;
};

export function Header() {
  const [geoLocation, setGeoLocation] = useState<GeoLocationProps | null>(null);
  const getCurrentPosition = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const getCityName = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=pt`,
      );
      const data = await response.json();
      setGeoLocation({
        city: data.city,
        principalSubdivision: data.principalSubdivision,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getLocation = async () => {
    try {
      const position = await getCurrentPosition();
      const { latitude, longitude } = position.coords;
      await getCityName(latitude, longitude);
    } catch (error) {
      console.log('Error getting location', error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <header className="flex justify-between px-10 py-8 md:px-40">
      <img src={logo} alt="" className="h-10 w-20" />

      <nav>
        <div className="flex items-center justify-center gap-1 rounded-md bg-purple-light px-2 py-[10px]">
          <MapPin size={22} weight="fill" className="text-purple-default" />
          <span className="text-sm text-purple-dark">
            {geoLocation
              ? `${geoLocation.city}, ${geoLocation.principalSubdivision}`
              : 'Não habilitado'}
          </span>
        </div>
      </nav>
    </header>
  );
}
