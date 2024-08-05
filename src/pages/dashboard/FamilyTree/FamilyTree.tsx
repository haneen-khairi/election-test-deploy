/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Box,
    Button,
    Flex,
    Heading,
    Spacer,
    ButtonGroup,
    useDisclosure,
  } from "@chakra-ui/react";
  import FamilyMenu from "./familyMenu";
  import useAuthStore from "@store/AuthStore";
  import { useEffect, useState } from "react";
  import axios from "axios";
  import FamilyTreeCreateModal from "./ModalFamilyTreeCreate";
  import FamilyNames from "./FamilyNames";
  import AddNewMemberFamilyTreeModal from "./AddNewMemberFamilyTreeModal";
  import AddNewFamilyTreeModal from "./AddNewFamilyTreeModal";
  
  const FamilyTree = () => {
    const { data } = useAuthStore();
  
    // Main modal for creating a new family tree
    const {
      isOpen: isCreateTreeOpen,
      onClose: onCloseCreateTree,
      onOpen: onOpenCreateTree,
    } = useDisclosure();
  
    // Modal for adding family names
    const {
      isOpen: isAddNamesOpen,
      onClose: onCloseAddNames,
      onOpen: onOpenAddNames,
    } = useDisclosure();
  
    // Modal for adding a new family
    const {
      isOpen: isAddFamilyOpen,
      onClose: onCloseAddFamily,
      onOpen: onOpenAddFamily,
    } = useDisclosure();
  
    const [familyId, setFamilyId] = useState("");
    const [treeName, setTreeName] = useState<any[]>([]);
    const [familyNamesDetails, setFamilyNamesDetails] = useState<any[]>([]);
  
    console.log("🚀 ~ FamilyTree ~ token:", data?.tokens?.access);
  
    async function getTreeNames() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_PRIVATE_API_URL}/family_tree/trees/`,
          {
            headers: {
              Authorization: `Bearer ${data?.tokens?.access}`,
            },
          }
        );
        console.log("🚀 ~ name ~ res:", res);
        setTreeName(res.data.data);
      } catch (error) {
        console.log("🚀 ~ name ~ error:", error);
      }
    }
  
    async function getFamilyNameById(id: string) {
      try {
        setFamilyId(id);
        const res = await axios.get(
          `${import.meta.env.VITE_PRIVATE_API_URL}/candidate/voters?family_tree_id=${id}`,
          {
            headers: {
              Authorization: `Bearer ${data?.tokens?.access}`,
            },
          }
        );
        console.log("🚀 ~ getFamilyNameById ~ res:", res);
  
        setFamilyNamesDetails(res.data.data);
      } catch (error) {
        console.log("🚀 ~ getFamilyNameById ~ error:", error);
      }
    }
  
    useEffect(() => {
      getTreeNames();
  
      return () => {};
    }, []);
  
    return (
      <>
        <Flex
          minWidth="max-content"
          alignItems="center"
          gap="2"
          mt={"30px"}
          background={"#fff"}
          p={"20px"}
          boxShadow={"1px 1px 10px #c1c1c1"}
          borderRadius={"10px"}
        >
          <Box p="2">
            <Heading size="md" color={"#000"}>
              انشاء شجرة عائلة جديدة
            </Heading>
          </Box>
          <Spacer />
          <Button
            colorScheme="primary"
            color={"#fff"}
            borderRadius={"30px"}
            onClick={onOpenCreateTree}
          >
            إنشاء قائمة جديدة
          </Button>
        </Flex>
        <Flex minWidth="max-content" gap="2" mt={"30px"}>
          <FamilyMenu onClick={getFamilyNameById} families={treeName} />
          <Spacer />
          <Box
            background={"#fff"}
            p={10}
            boxShadow={"1px 1px 10px #c1c1c1"}
            borderRadius={"10px"}
            w={"100%"}
          >
            <ButtonGroup gap="5">
              <Button
                onClick={onOpenAddFamily}
                colorScheme="primary"
                color={"#fff"}
                borderRadius={"30px"}
              >
                اضافة عائلة
              </Button>
              <Button
                onClick={onOpenAddNames}
                colorScheme="primary"
                color={"#fff"}
                borderRadius={"30px"}
              >
                اضافة اسماء
              </Button>
            
            </ButtonGroup>
            {familyNamesDetails.length ? (
                <FamilyNames families={familyNamesDetails} />
              ) : (
                ""
              )}
          </Box>
        </Flex>
        <FamilyTreeCreateModal
          isOpen={isCreateTreeOpen}
          onClose={onCloseCreateTree}
          onSuccess={() => {
            onCloseCreateTree();
            getTreeNames();
          }}
        />
        <AddNewMemberFamilyTreeModal
          onSuccess={() => {}}
          familyId={familyId}
          token={data?.tokens?.access || ""}
          isOpen={isAddNamesOpen}
          onClose={onCloseAddNames}
        />
        <AddNewFamilyTreeModal
          onSuccess={() => {}}
          familyId={familyId}
          token={data?.tokens?.access || ""}
          isOpen={isAddFamilyOpen}
          onClose={onCloseAddFamily}
        />
      </>
    );
  };
  
  export default FamilyTree;
  