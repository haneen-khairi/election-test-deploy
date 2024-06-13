import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  InfoBox,
} from "@react-google-maps/api";
import { VotingCentersType } from "@services/hooks/centers/Centers";
import { useGetVotingCenters } from "@services/hooks/centers/useCenters";
import { useCallback, useEffect, useState } from "react";
import { Box, HStack, Text, useDisclosure } from "@chakra-ui/react";
import { CenterInfoModal } from "../modals";
import { BoxIcon } from "@assets/icons";

const containerStyle: React.CSSProperties = {
  width: "100%",
  height: "calc(100vh - 144px)",
};

type LatLngLiteral = {
  lat: number;
  lng: number;
};

const center: LatLngLiteral = {
  lat: 32.0,
  lng: 36,
};

const MapSection = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_PRIVATE_Map_Key,
  });
  const [votingCenters, setVotingCenters] = useState<VotingCentersType[]>([]);
  const { data, isLoading } = useGetVotingCenters(isLoaded);

  const onLoad = useCallback(function callback() {}, []);

  const onUnmount = useCallback(function callback() {
    // We don't need to set map to null
  }, []);

  useEffect(() => {
    if (!isLoading && data) {
      setVotingCenters(data?.data || []);
    }
  }, [data, isLoading]);

  // Modal When Click On Marker
  const CenterModal = useDisclosure();
  const [item, setItem] = useState<VotingCentersType>();

  return (
    <>
      <CenterInfoModal
        isOpen={CenterModal.isOpen}
        onClose={CenterModal.onClose}
        center={item}
      />
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {!isLoading &&
            votingCenters.map((item, index) => (
              <Marker
                position={{
                  lat: Number(item.latitude),
                  lng: Number(item.longitude),
                }}
                key={index}
                draggable={false}
                onClick={() => {
                  setItem(item), CenterModal.onOpen();
                }}
              >
                <InfoBox
                  position={
                    new window.google.maps.LatLng(
                      Number(item.latitude),
                      Number(item.longitude)
                    )
                  }
                  options={{
                    closeBoxURL: "",
                    enableEventPropagation: false,
                    pixelOffset: new window.google.maps.Size(-70, 5),
                    boxStyle: {
                      width: "fit-content",
                      alignItems: "center",
                      justifyContent: "center",
                    },
                  }}
                >
                  <Box
                    bg="white"
                    p="8px"
                    rounded="8px"
                    fontFamily="Aljazeera"
                    w="fit-content"
                    onClick={() => {
                      setItem(item), CenterModal.onOpen();
                    }}
                  >
                    <Text fontSize="12px" fontWeight="700">
                      {item.name}
                    </Text>
                    <HStack
                      color="primary.200"
                      alignItems="center"
                      spacing="2px"
                    >
                      <BoxIcon />
                      <Text fontSize="14px" fontWeight="700">
                        {item.boxes_count} صناديق
                      </Text>
                    </HStack>
                  </Box>
                </InfoBox>
              </Marker>
            ))}
        </GoogleMap>
      ) : (
        <></>
      )}
    </>
  );
};

export default MapSection;
