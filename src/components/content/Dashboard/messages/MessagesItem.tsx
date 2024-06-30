import { Flex } from '@chakra-ui/react'
import React from 'react'

export default function MessagesItem({
    text,
    lists
}: {
    text: string,
    lists: string[]
}) {
  return <div className="message__card--body">
    <p>{text}</p>
    {lists?.length ? <Flex gap={'12px'}>
    {lists.map((item, index) => (
        <span key={index}>{item} {lists} ,</span>
      ))}
      </Flex>: ""}
  </div>
}
