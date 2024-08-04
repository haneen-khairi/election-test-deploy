import React from 'react'
import "./MessagePage.css"
import { Box, Button, Center, Flex, Grid, GridItem, HStack, Text } from '@chakra-ui/react'
import NameListChecked from './NameListChecked'
import { Controller, useForm } from 'react-hook-form';
import { InputSelect, Input, Btn } from '@components/core';
import Profile from './Profile';

export default function SentMessagesPage() {

    const {
        handleSubmit,
        control,
        reset,
        register,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: "",
            father: "",
            grandfather: "",
            family: ""
        },
    });
    function handleFilter(data: any) {
        if (data.success) {
            reset()
        }
    }
    return <div className='message__page--container'>
        <Flex  mb="24px" gap={'16px'} alignItems={'center'}>
            
                    <img width={'57px'} height={'57px'} src='/logo-favi.svg' />
                <Box position={'relative'}>
                <div className="message__page--divider"></div>

                </Box>
            {/* <Box w="1%" flexGrow="1" position={'relative'}>
            </Box> */}
                <Input
                    type="text"
                    placeholder="الإسم كاملاً"
                    register={register("name")}
                    error={errors.name?.message}
                />

                <Controller
                    control={control}
                    name="father"
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
                            error={errors.father?.message}
                            key={value}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="grandfather"
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
                            error={errors.grandfather?.message}
                            key={value}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="family"
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
                            error={errors.family?.message}
                            key={value}
                        />
                    )}
                />
                <Btn
                    w="fit-content"
                    type="solid"
                    borderRadius={'50px'}
                    onClick={handleSubmit(handleFilter)}
                >
                    <Text>بحث</Text>
                </Btn>
        </Flex>
        <Box mr={'100px'}>
            <div className="alert alert__warning">
                <p>الرسالة صالحة لمدة 24 ساعة فقط</p>
            </div>
            <Grid
                // height={200}
                templateColumns='repeat(5, 1fr)'
                gap={'64px'}
            >
                <GridItem rowSpan={3} >
                    {/* <img src='/profile.svg' />
                    <h3>ياسر أحمد علي</h3>
                    <p>هنالك العديد من الأنواع المتوفرة لنصوص لوريم إيبسوم، ولكن الغالبية تم تعديلها بشكل ما عبر إدخال بعض النوادر أو الكلمات العشوائية إلى النص.</p> */}
                    <Profile 
                    img='/profile.svg' 
                    title='ياسر أحمد علي'
                    description='هنالك العديد من الأنواع المتوفرة لنصوص لوريم إيبسوم، ولكن الغالبية تم تعديلها بشكل ما عبر إدخال بعض النوادر أو الكلمات العشوائية إلى النص.'
                    />
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
