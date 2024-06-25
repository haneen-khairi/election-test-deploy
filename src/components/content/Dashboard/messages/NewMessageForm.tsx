import { Textarea } from '@chakra-ui/react'
import { GradientButton } from '@components/core'
import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
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
    const [lists, setLists] = useState([])
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm()
    function getForms(e: any){
        setLists(e)
    }
    function onSubmit(data: any) {
        let newMessage = {
            content: data.content,
            segments: lists?.map((item: any) => item.value),
            is_qr_code: lists.length ? false : true
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
            reset()
            setLists([])
            onSuccess()
          } catch (error) {
            console.log("🚀 ~ sentSmsHistory ~ error:", error)
            
          }
      }
    const listsOptions = listsArray.map((item: any) =>  ({
            value: item.id,
            label: item.name,
    }))
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
        <Textarea 
        placeholder='الرسالة...' 
        {...register('content', { required: true })}
        borderRadius={'16px'}
        boxShadow={' 6px 6px 54px 0px #0000000D'}
        border={'1px solid #E5E5E5'}
        mb={'24px'}
        />
        <GradientButton mr={'auto'} type='submit' borderRadius={'50px'}>
            ارسال
        </GradientButton>
    </form>
  )
}
