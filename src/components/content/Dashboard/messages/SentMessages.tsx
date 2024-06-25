import React from 'react'
import "./messages.css"
import { Grid } from '@chakra-ui/react'
import MessagesItem from './MessagesItem'
export default function SentMessages({
  messages
}: {
  messages: any[]
}) {
  return <div className="messages__card">
    <h5>الرسائل المرسلة</h5>
    <Grid flexDirection={'column'} maxHeight={'300px'} overflow={'auto'} gap={'24px'}>
        {messages?.length ? messages.map((message:any) =><MessagesItem key={message.id} text={message.content} />): ""}

    </Grid>
  </div>
}
