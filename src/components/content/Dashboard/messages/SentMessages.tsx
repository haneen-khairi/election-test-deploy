import React from 'react'
import "./messages.css"
import { Grid } from '@chakra-ui/react'
import MessagesItem from './MessagesItem'
export default function SentMessages() {
  return <div className="messages__card">
    <h5>الرسائل المرسلة</h5>
    <Grid flexDirection={'column'} gap={'24px'}>
        <MessagesItem text='هنالك العديد من الأنواع المتوفرة لنصوص لوريم إيبسوم، ولكن الغالبية تم تعديلها بشكل ما عبر إدخال بعض النوادر أو الكلمات...' />

    </Grid>
  </div>
}
