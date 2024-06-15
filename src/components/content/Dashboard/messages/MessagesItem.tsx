import { Flex } from '@chakra-ui/react'
import React from 'react'

export default function MessagesItem({
    text
}: {
    text: string
}) {
  return <div className="message__card--body">
    <p>{text}</p>
    <Flex gap={'12px'}>
        <span>القائمة <strong>A</strong></span>
        <span>القائمة <strong>B</strong></span>
        <span>القائمة <strong>C</strong></span>
    </Flex>
  </div>
}
