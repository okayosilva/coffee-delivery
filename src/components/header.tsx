import { MapPin, Spinner } from '@phosphor-icons/react';
import logo from '../assets/logo.svg';
import { useGeoLocation } from '../contexts/useGeoLocation';

export function Header() {
  const { geoLocation, userDenied } = useGeoLocation();
  return (
    <header className="flex justify-between px-10 py-8 md:px-40">
      <img src={logo} alt="" className="h-10 w-20" />

      <nav>
        <div className="flex items-center justify-center gap-1 rounded-md bg-purple-light px-2 py-[10px]">
          {geoLocation === null && !userDenied ? (
            <div className="flex w-20 justify-center">
              <Spinner size={22} className="animate-spin text-purple-dark" />
            </div>
          ) : (
            <>
              <MapPin size={22} weight="fill" className="text-purple-default" />
              <span className="text-sm text-purple-dark">
                {geoLocation
                  ? `${geoLocation.city}, ${geoLocation.principalSubdivision}`
                  : 'Não habilitado'}
              </span>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
