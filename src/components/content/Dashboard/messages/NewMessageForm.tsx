import { Textarea } from '@chakra-ui/react'
import { GradientButton } from '@components/core'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import ReactSelect from 'react-select'
export default function NewMessageForm() {
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
            message: data.message,
            lists
        }
        console.log("🚀 ~ onSubmit ~ newMessage:", newMessage)
        // reset()
    }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <ReactSelect
        className='react-select'
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
        options={[
            { value: 'قائمة A', label: 'قائمة A' },
            { value:'قائمة B', label: 'قائمة B' },
            { value: 'قائمة C', label: 'قائمة C' },
        ]}
        />
        <Textarea 
        placeholder='الرسالة...' 
        {...register('message', { required: true })}
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
