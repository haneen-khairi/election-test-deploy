import { Text, VStack } from "@chakra-ui/react";
import { useRefreshToken } from "@services/hooks/auth/useAuth";
import useAuthStore from "@store/AuthStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserVerfication = () => {
  const refresh = useRefreshToken();
  const { data, updateTokens, logout } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (data?.tokens?.refresh) {
      refresh.mutateAsync({ refresh: data.tokens.refresh }).then((res) => {
        const response = res as unknown as {
          data: { refresh: string; access: string };
          error: string;
        };
        if (response.error) {
          logout();
          navigate("/login");
        } else {
          updateTokens({
            access: response.data.access,
            refresh: response.data.refresh,
          });
        }

        navigate("/");
      });
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <VStack alignItems="center" justifyContent="center" h="100vh">
      <Text fontSize="20px">جار التحقق الرجاء الإنتظار...</Text>
    </VStack>
  );
};

export default UserVerfication;
