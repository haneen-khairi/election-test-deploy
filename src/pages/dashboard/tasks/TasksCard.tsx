import React from 'react'
import taskCss from "./tasks.module.css"
import { Flex } from '@chakra-ui/react'

export default function TasksCard({
    title,
    text,
    representative,
    representativeType,
    representativeMission,
    date,
    time
}: {
    title: string,
    text: string,
    representative: string,
    representativeType: string,
    representativeMission: string
    date: string,
    time: string
}) {
  return <div className={taskCss.task_card}>
    <h4>{title}</h4>
    <p>{text}</p>
    <Flex alignItems={'center'} justifyContent={'space-between'}>
        <p>اسم المندوب</p>
        <p>{representative}</p>
    </Flex>
    <Flex alignItems={'center'} justifyContent={'space-between'}>
        <span className={taskCss.task_card_details}>نوع المندوب</span>
        <span className={taskCss.task_card_details_answer}>{representativeType}</span>
    </Flex>
    <Flex alignItems={'center'} justifyContent={'space-between'}>
        <span className={taskCss.task_card_details}>نوع المهمة</span>
        <span className={taskCss.task_card_details_answer}>{representativeMission}</span>
    </Flex>
    <Flex alignItems={'center'} justifyContent={'space-between'}>
        <span className={taskCss.task_card_details}>التاريخ</span>
        <span className={taskCss.task_card_details_answer}>{date}</span>
    </Flex>
    <Flex alignItems={'center'} justifyContent={'space-between'}>
        <span className={taskCss.task_card_details}>الوقت</span>
        <span className={taskCss.task_card_details_answer}>{time}</span>
    </Flex>
  </div>
}
