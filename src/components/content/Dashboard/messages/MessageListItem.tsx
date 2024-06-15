import React from 'react'
import EditIcon from './EditIcon'
import { Button, Flex } from '@chakra-ui/react'
import DeleteIcon from './DeleteIcon'

export default function MessageListItem({
    title,
    id
}: {
    title: string,
    id: number
}) {
    function handleOnEdit(){
        console.log("🚀 ~ handleOnEdit ~ handleOnEdit:", id)

    }
    function handleOnDelete(){
    console.log("🚀 ~ handleOnDelete ~ handleOnDelete:", id)

    }
  return <Flex gap={'12px'} padding={'26px 16px'} borderBottom={'1px solid #0000001F'} justifyContent={'space-between'} alignItems={'center'}>
    <h6 className='list__title'>{title}</h6>

    <div className="">
        <Button w={'24px'} height={'24px'} backgroundColor={'transparent'} paddingX={0} paddingY={'18px'} onClick={handleOnEdit}><EditIcon /></Button>
        <Button w={'24px'} height={'24px'} backgroundColor={'transparent'} paddingX={0} paddingY={'18px'} onClick={handleOnDelete}><DeleteIcon /></Button>
    </div>

  </Flex>
}
