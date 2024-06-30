import { Box, Checkbox, Text, Textarea, useToast } from '@chakra-ui/react'
import { GradientButton } from '@components/core'
import { EToast } from '@constants/functions/toast'
import axios from 'axios'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import ReactSelect from 'react-select'
export default function NewMessageForm({
    listsArray,
    token,
    onSuccess = () => {}
}:{
    listsArray: any[],
    token: string | null,
    onSuccess: () => void
}) {
    const toast = useToast()
    const [lists, setLists] = useState([])
    const [qrCode, setQrCode] = useState<false>(false)
    const [messageLength, setMessageLength] = useState(0)
    const {
        register,
        control,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm()
    function getForms(e: any){
        setLists(e)
    }
    const [messages, setMessages] = useState<any[]>([]);

    const calculateMessages = () => {
      const numMessages = Math.floor(messageLength / 150);
      const excess = messageLength % 150 >= 10 ? 1 : 0;
      setMessages(Array.from({ length: numMessages + excess }, () => "Message"));
    };
    function onSubmit(data: any) {
        let newMessage = {
            content: data.content,
            segments: lists?.map((item: any) => item.value),
            is_qr_code: qrCode
        }
        sentSmsHistory(newMessage)
        console.log("🚀 ~ onSubmit ~ newMessage:", newMessage)
        // reset()
    }
    async function sentSmsHistory(data: any){
        try {
          const response = await axios.post(`${import.meta.env.VITE_PRIVATE_API_URL}/sms/send/`, data, {
            headers: {
              'Authorization': `Bearer ${token}` 
            }
          })
            console.log("🚀 ~ sentSmsHistory ~ response:", response.data)
            if(response.data.status){
                reset()
                setLists([])
                onSuccess()
                EToast({
                    toast: toast,
                    status: "success",
                    title: "نجاح العملية",
                    description: "تم الأرسال بنجاح",
                  });
                // setMessages([])
                // setMessageLength(0)
                // calculateMessages()
            }
          } catch (error: any) {
            console.log("🚀 ~ sentSmsHistory ~ error:", error)
            
          }
      }
    const listsOptions = listsArray.map((item: any) =>  ({
            value: item.id,
            label: item.name,
    }))
    const onCallBackChange = (onChange: any) => (event: any) => {
        onChange(event);
        if(qrCode){
            setMessageLength(event?.target?.value?.length + 42)
        }else{
            setMessageLength(event?.target?.value?.length)
        }
        calculateMessages();
        // onCallBackChangeForParent(event);
        console.log("🚀 ~ onCallBackChange ~ event?.target?.value?.length:", event?.target?.value?.length)
      };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <ReactSelect
        className='react-select'
        placeholder='اختار قائمة'
        onChange={getForms}
        isMulti
        styles={{
            control: (baseStyles, state) => ({
                ...baseStyles,
                minHeight: '48px',
                display: 'flex',
                border: "1px solid #E5E5E5",
                borderRadius: '12px',
            }),
            menu: (baseStyles: any) => ({
                ...baseStyles,
                zIndex: 99999999999,
            }),
            option: (baseStyles: any, state: any) => ({
                ...baseStyles,
                padding: "10px 12px 10px 24px",
                backgroundColor: state.isSelected ? "#318973" : "",
                ":hover": {
                    backgroundColor: "var(--neutral-200)",
                },
            }),
        }}
        classNames={{
            multiValue: (state: any) =>
                !state.isSelected ? 'react-select__multiple--selected' : '',
            multiValueLabel: (state: any) => !state.isSelected ? 'react-select__multiple--selected-label' : '',
        }}
        // {...register('form', { required: true })}
        options={listsOptions}
        />
                <Controller
                    control={control}
                    name="content"
                    rules={{required: true}}
                    render={({ field: { onChange, value } }) => (
                        <Textarea 
                        onChange={onCallBackChange(onChange)}
                        value={value}
                        placeholder='الرسالة...' 
                        // {...register('content', { required: true })}
                        borderRadius={'16px'}
                        boxShadow={' 6px 6px 54px 0px #0000000D'}
                        border={'1px solid #E5E5E5'}
                        mb={'24px'}
                        />
                    )}
                    />
                    <label htmlFor="">
                        <Checkbox onChange={(e: any) => {
                            if(e.target.checked){
                                setMessageLength(messageLength + 42)
                            }else{
                                setMessageLength(messageLength - 42)
                            }
                            setQrCode(e.target.checked)}} >Qr code</Checkbox>

                    </label>
                    <Box width={'100%'}>
                        <Text>عدد كلمات الرسأل : {messageLength}</Text>
                        <Text>عدد الرسأل : {messages.length}</Text>
                    </Box>
        <GradientButton mr={'auto'} type='submit' borderRadius={'50px'}>
            ارسال
        </GradientButton>
    </form>
  )
}
