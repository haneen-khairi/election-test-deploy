/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Box } from "@chakra-ui/react";
import { MapVoter } from "@services/hooks/insights/Insights";

// const data: {
//   center: google.maps.LatLngLiteral;
//   count: number;
// }[] = [
//   {
//     center: { lat: 31.15528277717891, lng: 36.5526912241781 },
//     count: 70000,
//   },
//   {
//     center: { lat: 31.5434291, lng: 35.8526912241781 },
//     count: 330000,
//   },
//   {
//     center: { lat: 32.1434291, lng: 35.8526912241781 },
//     count: 500,
//   },
// ];

const minRadius = 10000;
const maxRadius = 30000;

const getScale = (userValue: number, userMin: number, userMax: number) => {
  if (userMax === userMin && userValue === userMax) return minRadius;

  const userRange = userMax - userMin;
  const definedRange = maxRadius - minRadius;
  const normalizedValue = (userValue - userMin) / userRange;
  const definedValue = minRadius + normalizedValue * definedRange;

  return definedValue;
};

declare global {
  interface Window {
    initMap: () => void;
  }
}

const GoogleGeoMap = ({ mapVoters }: { mapVoters: MapVoter[] }) => {
  const { userMin, userMax } = useMemo(
    () =>
      mapVoters.reduce(
        (acc, curr) => {
          let max = acc.userMax;
          let min = acc.userMin;

          if (curr?.boxes_count || 0 > max) max = curr?.boxes_count || 0;
          if (curr?.boxes_count || 0 < min) min = curr?.boxes_count || 0;

          return {
            userMin: min,
            userMax: max,
          };
        },
        {
          userMin: mapVoters[0]?.boxes_count || 0,
          userMax: mapVoters[0]?.boxes_count || 0,
        },
      ),
    [mapVoters],
  );

  const mapRef = useRef<HTMLDivElement>(null);

  const position = {
    lat: 31.15528277717891,
    lng: 36.5526912241781,
  };

  const [_map, setMap] = useState<google.maps.Map | null>(null);
  const [_loader, setLoader] = useState<Loader | null>(null);

  useEffect(() => {
    const mapInit = async () => {
      const loader = new Loader({
        apiKey: import.meta.env.VITE_PRIVATE_Map_Key as string,
        libraries: ["places"],
        version: "weekly",
      });

      if (loader) {
        setLoader(loader);
      } else {
        return;
      }

      const { Map } = await loader.importLibrary("maps");

      const mapOptions = {
        center: position,
        zoom: 7,
        mapId: "map-id",
      };

      const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

      setMap(map);

      mapVoters.forEach(({ boxes_count, latitude, longitude }) => {
        new google.maps.Circle({
          map,
          strokeColor: "transparent",
          fillColor: "#136f60",
          fillOpacity: 0.6,
          center: {
            lat: Number(latitude),
            lng: Number(longitude),
          },
          radius: getScale(boxes_count, userMin, userMax),
        });
      });
    };

    mapInit();
  }, []);

  return (
    <Box>
      <div ref={mapRef} style={{ height: "500px", width: "100%" }} />
    </Box>
  );
};

export default GoogleGeoMap;
