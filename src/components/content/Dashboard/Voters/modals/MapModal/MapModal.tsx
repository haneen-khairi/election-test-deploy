import { Popup } from "@components/core";
import React, { useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { UseFormSetValue } from "react-hook-form";
import { PutVoter } from "@services/hooks/voters/Voters";

const containerStyle: React.CSSProperties = {
  width: "100%",
  height: "400px",
};

type LatLngLiteral = {
  lat: number;
  lng: number;
};

const center: LatLngLiteral = {
  lat: 31,
  lng: 37,
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  setValue: UseFormSetValue<PutVoter>;
  location: LatLngLiteral;
}

const MapModal: React.FC<Props> = ({
  isOpen,
  onClose,
  setValue,
  location,
}: Props) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_PRIVATE_Map_Key,
  });

  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const [markerPosition, setMarkerPosition] =
    React.useState<LatLngLiteral | null>(null);

  const onLoad = React.useCallback(function callback(
    instance: google.maps.Map
  ) {
    setMap(instance);
  },
  []);

  useEffect(() => {
    setMarkerPosition(location);
  }, [map]);

  const onUnmount = React.useCallback(function callback() {
    // We don't need to set map to null
  }, []);

  useEffect(() => {
    if (!isOpen) {
      // Reset marker position when the popup is closed
      setMarkerPosition(null);
    }
  }, [isOpen]);

  const onMapClick = React.useCallback(
    (event: google.maps.MapMouseEvent) => {
      if (map) {
        const latLng: LatLngLiteral = {
          lat: event?.latLng?.lat() || 0,
          lng: event?.latLng?.lng() || 0,
        };
        setValue("latitude", latLng.lat);
        setValue("longitude", latLng.lng);
        setMarkerPosition(latLng);
      }
    },
    [map]
  );

  return (
    <Popup title="تحديد الموقع" size="3xl" isOpen={isOpen} onClose={onClose}>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={7}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onClick={onMapClick}
        >
          {markerPosition && (
            <Marker position={markerPosition} draggable={true} />
          )}
        </GoogleMap>
      ) : (
        <></>
      )}
    </Popup>
  );
};

export default MapModal;
