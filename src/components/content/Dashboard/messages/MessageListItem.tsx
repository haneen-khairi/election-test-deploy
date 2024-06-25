import React from 'react'
import EditIcon from './EditIcon'
import { Button, Flex } from '@chakra-ui/react'
import DeleteIcon from './DeleteIcon'
import axios from 'axios'
import useAuthStore from '@store/AuthStore'

export default function MessageListItem({
    title,
    id,
    onClick = (id: string, name: string) => { },
    onDelete = () => {}
}: {
    title: string,
    id: string,
    onClick: (id: string, name: string) => void,
    onDelete: () => void
}) {
    const {data} = useAuthStore()
    function handleOnEdit() {
        console.log("🚀 ~ handleOnEdit ~ handleOnEdit:", id)

    }
    function handleOnDelete() {
        console.log("🚀 ~ handleOnDelete ~ handleOnDelete:", id)
        deleteList(id)
    }
    async function deleteList(id: string){
        try {
          const response = await axios.delete(`${import.meta.env.VITE_PRIVATE_API_URL}/sms/list/details/${id}/`, {
              headers: {
                'Authorization': `Bearer ${data?.tokens?.access}`
              }
            })
            console.log("🚀 ~ deleteList ~ response:", response.data)
          } catch (error) {
            console.log("🚀 ~ deleteList ~ error:", error)
    
          }
      }
    return <button onClick={() => onClick(id, title)}>
        <Flex gap={'12px'} padding={'26px 16px'} borderBottom={'1px solid #0000001F'} justifyContent={'space-between'} alignItems={'center'}>

            <h6 className='list__title'>{title}</h6>


            <div className="">
                <Button w={'24px'} height={'24px'} backgroundColor={'transparent'} paddingX={0} paddingY={'18px'} onClick={handleOnEdit}><EditIcon /></Button>
                <Button w={'24px'} height={'24px'} backgroundColor={'transparent'} paddingX={0} paddingY={'18px'} onClick={handleOnDelete}><DeleteIcon /></Button>
            </div>
        </Flex>
    </button>
}
