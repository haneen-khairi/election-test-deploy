import {
  Avatar,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  WrapItem,
  useDisclosure,
} from "@chakra-ui/react";
import { InfoModal } from "@components/content/Dashboard/Modals";
import useAuthStore from "@store/AuthStore";
import { IoIosArrowDown } from "react-icons/io";
import { LuLogOut } from "react-icons/lu";
// import { MdOutlineAccountCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const AvatarMenu = () => {
  const { logout, data } = useAuthStore();
  const navigate = useNavigate();
  const alert = useDisclosure();
  return (
    <>
      <InfoModal
        isOpen={alert.isOpen}
        onClose={alert.onClose}
        onProceed={() => {
          logout(), navigate("/login");
        }}
        type="delete"
        title="تسجيل الخروج"
        description="هل أنت متأكد من عملية تسجيل الخروج؟"
      />
      <Menu>
        <MenuButton as={Button} variant="unstyled">
          <HStack>
            <WrapItem>
              <Avatar size="sm" src="" />
            </WrapItem>
            <Text fontSize="14px" fontWeight="500">
              {data?.user?.name || "الاسم غير معروف"}
            </Text>
            <Text>
              <IoIosArrowDown />
            </Text>
          </HStack>
        </MenuButton>
        <MenuList
          boxShadow="box-shadow: 0px 4px 6px -2px #10182808; box-shadow: 0px 12px 16px -4px #10182814"
          border="none"
          _selected={{ bg: "none" }}
        >
          {/* <MenuItem fontWeight="500" _hover={{ bg: "none" }}>
          <HStack
            _hover={{ bg: "primary.200/10" }}
            w="100%"
            p="8px"
            rounded="6px"
          >
            <MdOutlineAccountCircle size="20px" />
            <Text>إعدادات الحساب</Text>
          </HStack>
        </MenuItem> */}
          <MenuItem fontWeight="500" _hover={{ bg: "none" }}>
            <HStack
              color="danger.500"
              _hover={{ bg: "primary.200/10" }}
              w="100%"
              p="8px"
              rounded="6px"
              onClick={alert.onOpen}
            >
              <LuLogOut size="20px" />
              <Text>تسجيل الخروج</Text>
            </HStack>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};
