/* eslint-disable @typescript-eslint/no-explicit-any */
import { Circle, MapContainer, TileLayer } from "react-leaflet";
import "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngTuple } from "leaflet";

const data: {
  center: any[];
  count: number;
}[] = [
  {
    center: [31.15528277717891, 36.5526912241781],
    count: 70000,
  },
  {
    center: [31.5434291, 35.8526912241781],
    count: 330000,
  },
  {
    center: [32.1434291, 35.8526912241781],
    count: 500,
  },
];

const minRadius = 10000;
const maxRadius = 30000;

const getScale = (userValue: number, userMin: number, userMax: number) => {
  const userRange = userMax - userMin;
  const definedRange = maxRadius - minRadius;
  const normalizedValue = (userValue - userMin) / userRange;
  const definedValue = minRadius + normalizedValue * definedRange;

  return definedValue;
};

const GeoMap = () => {
  if (!data || data?.length === 0) return <></>;

  const { userMin, userMax } = data.reduce(
    (acc, curr) => {
      let max = acc.userMax;
      let min = acc.userMin;

      if (curr.count > max) max = curr.count;
      if (curr.count < min) min = curr.count;

      return {
        userMin: min,
        userMax: max,
      };
    },
    {
      userMin: data[0].count,
      userMax: data[0].count,
    },
  );

  return (
    <MapContainer
      center={[31.15528277717891, 36.5526912241781]}
      style={{ margin: "auto", width: "100%", height: "500px" }}
    >
      <TileLayer
        url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=0iJA54X1IzokXZZgrx94"
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />

      {data.map(({ center, count }) => {
        return (
          <Circle
            center={center as LatLngTuple}
            radius={getScale(count, userMin, userMax)}
            pathOptions={{
              color: "transparent",
              fill: true,
              fillColor: "#136f6099",
              fillRule: "nonzero",
              fillOpacity: 1,
            }}
            eventHandlers={{
              mouseover: (e) => {
                const layer = e.target;
                layer.setStyle({
                  fillColor: "#BD0026",
                  fillOpacity: 0.7,
                });
              },
              mouseout: (e) => {
                const layer = e.target;
                layer.setStyle({
                  fillOpacity: 0.7,
                  fillColor: "#136f6099",
                });
              },
              // click: (e) => {},
            }}
          />
        );
      })}

      {/* {data4.features.map((state) => {
        const coordinates: any = state.geometry.coordinates.map((cord) =>
          cord.map((item) => [item[0], item[1]]),
        );

        return (
          <Polygon
            pathOptions={{
              fillColor: "#FD8D3C",
              fillOpacity: 0.7,
              weight: 2,
              opacity: 1,
              color: "white",
            }}
            positions={coordinates}
            eventHandlers={{
              mouseover: (e) => {
                const layer = e.target;
                layer.setStyle({
                  dashArray: "",
                  fillColor: "#BD0026",
                  fillOpacity: 0.7,
                  weight: 2,
                  opacity: 1,
                  color: "white",
                });
              },
              mouseout: (e) => {
                const layer = e.target;
                layer.setStyle({
                  fillOpacity: 0.7,
                  weight: 2,
                  dashArray: "3",
                  color: "white",
                  fillColor: "#FD8D3C",
                });
              },
              //   click: (e) => {},
            }}
          />
        );
      })} */}
    </MapContainer>
  );
};

export default GeoMap;
