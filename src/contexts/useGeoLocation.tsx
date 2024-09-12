import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface GeoLocationProps {
  geoLocation: GeolocationPositionProps | null;
  userDenied: boolean;
}

type GeolocationPositionProps = {
  city: string;
  principalSubdivision: string;
};

type GeoLocationContextType = {
  children: ReactNode;
};

const UseGeoLocationContext = createContext({} as GeoLocationProps);

export function GeoLocationProvider({ children }: GeoLocationContextType) {
  const [geoLocation, setGeoLocation] =
    useState<GeolocationPositionProps | null>(null);
  const [userDenied, setUserDenied] = useState<boolean>(false);

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
      setUserDenied(true);
      console.log('Error getting location', error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <UseGeoLocationContext.Provider
      value={{
        geoLocation,
        userDenied,
      }}
    >
      {children}
    </UseGeoLocationContext.Provider>
  );
}

export const useGeoLocation = () => useContext(UseGeoLocationContext);
