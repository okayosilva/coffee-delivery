import { GeoLocationProvider } from './contexts/useGeoLocation';
import { Router } from './router/router';

function App() {
  return (
    <GeoLocationProvider>
      <Router />
    </GeoLocationProvider>
  );
}

export default App;
