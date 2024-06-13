import {
  Box,
  HStack,
  Heading,
  Image,
  VStack,
  useToast,
} from "@chakra-ui/react";
import JordanFlag from "@assets/images/jordanFlag.svg";
import { ElectionBrand } from "@assets/icons";
import { GradientButton, Input } from "@components/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./schema";
import APIClient from "@services/api";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@store/AuthStore";
import { useMutation } from "@tanstack/react-query";
import LoginForm from "./login";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const api = new APIClient("/account/token/");
  const toast = useToast();
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const loginUser = useMutation({
    mutationFn: (data: LoginForm) => api.post(data),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (res: any) => {
      console.log(res, "res");
      if (res.status) {
        // CryptoStorage.setItem("token", res.data.access);
        login(res.data);
        toast({
          title: `تسجيل الدخول`,
          description: "تم تسجيل الدخول بنجاح",
          status: "success",
          duration: 10000,
          isClosable: true,
          position: "bottom-left",
        });
        navigate("/");
      } else {
        toast({
          title: "تسيجل الدخول",
          description: res.error,
          status: "error",
          duration: 10000,
          isClosable: true,
          position: "bottom-left",
        });
      }
    },
  });

  const onSubmit = (data: LoginForm) => {
    loginUser.mutate({
      mobile_number: data.mobile_number,
      password: data.password,
      user_type: "5",
    });
  };

  return (
    <Box
      w="100%"
      minH="100vh"
      bg="#F5F5F5"
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {/* form */}

      <Box
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        w="450px"
        bg="#fff"
        borderRadius="12px"
        p="32px"
      >
        <VStack spacing="20px" mt="20px">
          <ElectionBrand />
          <Heading fontSize="24px" fontWeight="700" mt="20px">
            تسجيل الدخول
          </Heading>
        </VStack>
        <VStack>
          <Input
            type="number"
            label="رقم الجوال"
            placeholder="رقم الجوال"
            register={register("mobile_number")}
            error={errors.mobile_number?.message}
            dir="ltr"
          />
          <Input
            type="password"
            label=" كلمة المرور"
            placeholder="ادخل كلمة المرور"
            register={register("password")}
            error={errors.password?.message}
          />
        </VStack>
        <GradientButton
          type="submit"
          h="45px"
          mt="24px"
          w="100%"
          isLoading={loginUser.isPending}
        >
          تسجيل الدخول
        </GradientButton>
        <HStack
          fontSize="14px"
          mt="20px"
          alignItems="center"
          justifyContent="center"
        >
          <Box>نسيت كلمة المرور ؟</Box>
          <Box color="primary.200">تواصل مع الدعم الفني</Box>
        </HStack>
      </Box>
      {/* form */}
      <Image
        src={JordanFlag}
        alt="jordan flag"
        position="absolute"
        w="250px"
        h="200px"
        bottom={0}
        left={0}
      />
    </Box>
  );
};

export default LoginPage;
