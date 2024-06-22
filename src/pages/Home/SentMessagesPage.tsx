import React from 'react'
import "./MessagePage.css"
import { Box, Button, Center, Flex, Grid, GridItem, HStack, Text } from '@chakra-ui/react'
import NameListChecked from './NameListChecked'
import { Controller, useForm } from 'react-hook-form';
import { InputSelect, Input, Btn } from '@components/core';
import { ElectionBrand } from '@assets/icons';
import { useNavigate } from "react-router-dom";

export default function SentMessagesPage() {
    const navigate = useNavigate();

    const {
        handleSubmit,
        control,
        reset,
        register,
        formState: { errors, isDirty },
    } = useForm({
        defaultValues: {
        },
    });
    function handleFilter(data: any){
        if(data.success){
            reset()
        }
    }
    return <div className='message__page--container'>
        <HStack gridGap="16px" mb="24px" flexWrap="wrap">
        <Box w="1%" flexGrow="1">
        <Center onClick={() => navigate("/")} cursor="pointer">
        <ElectionBrand />
      </Center>
            </Box>
            <Box w="1%" flexGrow="1">
                <div className="divider"></div>
            </Box>
            <Box w="10%" flexGrow="1">
                <Input
                    type="text"
                    placeholder="الإسم كاملاً"
                    register={register("name")}
                    error={errors.name?.message}
                />
            </Box>

            <Box w="10%" flexGrow="1">
                <Controller
                    control={control}
                    name="group"
                    render={({ field: { onChange, value } }) => (
                        <InputSelect
                            // loading={isLoading}
                            // options={
                            //   data?.data
                            //     ? data?.data?.map((el) => ({
                            //         label: el.name || "",
                            //         value: el.id || "",
                            //       }))
                            //     : []
                            // }
                            options={[{
                                label: 'تست',
                                value: 'تست'
                            }]}
                            multi={false}
                            placeholder="اسم الأب"
                            onChange={onChange}
                            value={value}
                            error={errors.group?.message}
                            key={value}
                        />
                    )}
                />
            </Box>
            <Box w="10%" flexGrow="1">
                <Controller
                    control={control}
                    name="group"
                    render={({ field: { onChange, value } }) => (
                        <InputSelect
                            // loading={isLoading}
                            // options={
                            //   data?.data
                            //     ? data?.data?.map((el) => ({
                            //         label: el.name || "",
                            //         value: el.id || "",
                            //       }))
                            //     : []
                            // }
                            options={[{
                                label: 'تست',
                                value: 'تست'
                            }]}
                            multi={false}
                            placeholder="اسم الجد"
                            onChange={onChange}
                            value={value}
                            error={errors.group?.message}
                            key={value}
                        />
                    )}
                />
            </Box>
            <Box w="10%" flexGrow="1">
                <Controller
                    control={control}
                    name="group"
                    render={({ field: { onChange, value } }) => (
                        <InputSelect
                            // loading={isLoading}
                            // options={
                            //   data?.data
                            //     ? data?.data?.map((el) => ({
                            //         label: el.name || "",
                            //         value: el.id || "",
                            //       }))
                            //     : []
                            // }
                            options={[{
                                label: 'تست',
                                value: 'تست'
                            }]}
                            multi={false}
                            placeholder="اسم الهائلة"
                            onChange={onChange}
                            value={value}
                            error={errors.group?.message}
                            key={value}
                        />
                    )}
                />
            </Box>
            <Box w="1%" flexGrow="1">
            <Btn
                w="fit-content"
                type="solid"
                onClick={handleSubmit(handleFilter)}
                >
                <Text>بحث</Text>
                </Btn>
            </Box>
        </HStack>
        <Box mr={'100px'}>
            <div className="alert alert__warning">
                <p>الرسالة صالحة لمدة 24 ساعة فقط</p>
            </div>
            <Grid
                // height={200}
                templateColumns='repeat(5, 1fr)'
                gap={'64px'}
            >
                <GridItem rowSpan={3} className='profile'>
                    <img src='/profile.svg' />
                    <h3>ياسر أحمد علي</h3>
                    <p>هنالك العديد من الأنواع المتوفرة لنصوص لوريم إيبسوم، ولكن الغالبية تم تعديلها بشكل ما عبر إدخال بعض النوادر أو الكلمات العشوائية إلى النص.</p>
                </GridItem>
                <GridItem colSpan={2} className='addNames'>
                    <Flex alignItems={'center'} justifyContent={'space-between'} padding={'12px 16px'} mb={'12px'}>
                        <h6>الأسماء</h6>
                        <Button>أضافة</Button>
                    </Flex>
                    <NameListChecked name='محمد أحمد علي خالد' onChange={() => console.log("checked")} />
                </GridItem>
                <GridItem colSpan={2} className='sentNames' >
                    <Flex alignItems={'center'} justifyContent={'space-between'} padding={'12px 16px'} mb={'12px'}>
                        <h6>الأسماء المضافة</h6>
                        <Button>إرسال الأسماء</Button>
                    </Flex>
                    <NameListChecked name='محمد أحمد علي خالد' onChange={() => console.log("checked")} />

                </GridItem>
            </Grid>
        </Box>
    </div>
}
