import { useCallback, useEffect, useRef, useState } from 'react';

const DEFAULT_OPTIONS = {
  enableHighAccuracy: false,
  timeout: 15000,
  maximumAge: 60_000,
};

const RETRY_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 20_000,
  maximumAge: 0,
};

async function queryGeolocationPermission() {
  if (!navigator.permissions?.query) return null;
  try {
    return await navigator.permissions.query({ name: 'geolocation' });
  } catch {
    return null;
  }
}

const DENIED_MESSAGE =
  'Location is blocked in your browser. Open site settings (lock icon in the address bar), allow location access, then tap Try again.';

/**
 * Browser geolocation wrapper with explicit status for UI.
 * @returns {{ status, coords, error, request, retry }}
 * status: idle | loading | success | denied | error | unsupported
 */
export function useGeolocation({ auto = true } = {}) {
  const [state, setState] = useState({
    status: auto ? 'loading' : 'idle',
    coords: null,
    error: null,
  });

  const requestInFlight = useRef(false);

  const runGetCurrentPosition = useCallback((options, isRetry) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        requestInFlight.current = false;
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
        requestInFlight.current = false;
        let message = 'Unable to get your location. Please try again.';
        let status = 'error';

        const deniedCode =
          typeof GeolocationPositionError !== 'undefined'
            ? GeolocationPositionError.PERMISSION_DENIED
            : 1;

        if (err.code === deniedCode || err.code === 1) {
          status = 'denied';
          message = DENIED_MESSAGE;
        } else if (err.code === 2) {
          message = 'Your location is unavailable. Please try again later.';
        } else if (err.code === 3) {
          message = 'Location request timed out. Please try again.';
        }

        setState({
          status,
          coords: null,
          error: message,
        });
      },
      options,
    );
  }, []);

  const request = useCallback(
    async ({ isRetry = false } = {}) => {
      if (!navigator.geolocation) {
        setState({
          status: 'unsupported',
          coords: null,
          error: 'Geolocation is not supported in this browser.',
        });
        return;
      }

      if (requestInFlight.current) return;
      requestInFlight.current = true;

      setState((prev) => ({
        ...prev,
        status: 'loading',
        error: null,
      }));

      if (isRetry) {
        const permission = await queryGeolocationPermission();
        if (permission?.state === 'denied') {
          setState((prev) => ({
            ...prev,
            status: 'loading',
            error: DENIED_MESSAGE,
          }));
        }
      }

      runGetCurrentPosition(isRetry ? RETRY_OPTIONS : DEFAULT_OPTIONS, isRetry);
    },
    [runGetCurrentPosition],
  );

  const retry = useCallback(() => {
    requestInFlight.current = false;
    request({ isRetry: true });
  }, [request]);

  useEffect(() => {
    if (!auto) return undefined;

    request({ isRetry: false });

    let permissionStatus = null;
    let onPermissionChange = null;

    (async () => {
      permissionStatus = await queryGeolocationPermission();
      if (!permissionStatus) return;

      onPermissionChange = () => {
        if (permissionStatus.state === 'granted') {
          request({ isRetry: true });
        }
      };
      permissionStatus.addEventListener('change', onPermissionChange);
    })();

    return () => {
      if (permissionStatus && onPermissionChange) {
        permissionStatus.removeEventListener('change', onPermissionChange);
      }
    };
  }, [auto, request]);

  return {
    status: state.status,
    coords: state.coords,
    error: state.error,
    request: () => request({ isRetry: false }),
    retry,
  };
}
