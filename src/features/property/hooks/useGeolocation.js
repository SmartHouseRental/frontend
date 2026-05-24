import { useCallback, useEffect, useState } from 'react';

const DEFAULT_OPTIONS = {
  enableHighAccuracy: false,
  timeout: 15000,
  maximumAge: 60_000,
};

/**
 * Browser geolocation wrapper with explicit status for UI.
 * @returns {{ status, coords, error, request }}
 * status: idle | loading | success | denied | error | unsupported
 */
export function useGeolocation({ auto = true } = {}) {
  const [state, setState] = useState({
    status: auto ? 'loading' : 'idle',
    coords: null,
    error: null,
  });

  const request = useCallback(() => {
    if (!navigator.geolocation) {
      setState({
        status: 'unsupported',
        coords: null,
        error: 'Geolocation is not supported in this browser.',
      });
      return;
    }

    setState((prev) => ({ ...prev, status: 'loading', error: null }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          status: 'success',
          coords: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          error: null,
        });
      },
      (err) => {
        let message = 'Unable to get your location. Please try again.';
        let status = 'error';

        if (err.code === err.PERMISSION_DENIED) {
          status = 'denied';
          message =
            'Location access was denied. Enable location in your browser settings to see nearby properties.';
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          message = 'Your location is unavailable. Please try again later.';
        } else if (err.code === err.TIMEOUT) {
          message = 'Location request timed out. Please try again.';
        }

        setState({
          status,
          coords: null,
          error: message,
        });
      },
      DEFAULT_OPTIONS,
    );
  }, []);

  useEffect(() => {
    if (auto) {
      request();
    }
  }, [auto, request]);

  return {
    status: state.status,
    coords: state.coords,
    error: state.error,
    request,
  };
}
