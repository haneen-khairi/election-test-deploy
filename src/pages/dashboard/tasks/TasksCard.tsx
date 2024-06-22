import taskCss from "./tasks.module.css"
import { Flex, Tag, TagLabel } from '@chakra-ui/react'
import ArrowIcon from './ArrowIcon'

export default function TasksCard({
    title,
    text,
    representative,
    representativeType,
    representativeMission,
    status,
    date,
    time
}: {
    title: string,
    text: string,
    representative: string,
    representativeType: string,
    representativeMission: string
    status: string,
    date: string,
    time: string
}) {
  return <div className={taskCss.task_card}>
    <h4>{title}  {status ===  "تم الانتهاء" ? <Tag
      borderRadius='full'
      variant='solid'
      backgroundColor='#2F80ED1A'
    >
      <TagLabel color={'#15B2CE'}>تم انجازه</TagLabel>
      <ArrowIcon />
    </Tag>: "" }</h4>
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
