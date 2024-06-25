import MessageBlackIcon from '@assets/icons/MessageBlackIcon'
import {
  Box, Button, Flex, Grid, GridItem, Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer, useDisclosure,
  HStack,
  VStack,
  Heading,
  Text,
  list
} from '@chakra-ui/react'
import CreateMyselfModal from '@components/content/Dashboard/messages/CreateMyselfModal'
import DeleteIcon from '@components/content/Dashboard/messages/DeleteIcon'
import EditIcon from '@components/content/Dashboard/messages/EditIcon'
import MessageListItem from '@components/content/Dashboard/messages/MessageListItem'
import NewMenuFormModal from '@components/content/Dashboard/messages/NewMenuForm'
import NewMessageForm from '@components/content/Dashboard/messages/NewMessageForm'
import SentMessages from '@components/content/Dashboard/messages/SentMessages'
import { Btn } from '@components/core'
import useAuthStore from '@store/AuthStore'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { BsPlus } from 'react-icons/bs'

export default function MessagesPage() {
  const { data } = useAuthStore();
  const [messagesLists, setMessagesLists] = useState([])
  const [messagesSmsHistory, setMessagesSmsHistory] = useState([])
  const [listInfo, setListInfo] = useState({
    id: "",
    name: ""
  })
  const [listRecords, setListRecords] = useState([])
  const [newKeyForm, setNewKeyForm] = useState(0)
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclosure()
  const {
    isOpen: isOpenMenuModal,
    onOpen: onOpenMenuModal,
    onClose: onCloseMenuModal
  } = useDisclosure()
  function handleOnEdit() {
    console.log("🚀 ~ handleOnEdit ~ handleOnEdit:")

  }
  function handleOnDelete() {
    console.log("🚀 ~ handleOnDelete ~ handleOnDelete:")
  }
  async function getLists(){
    try {
      const response = await axios.get(`${import.meta.env.VITE_PRIVATE_API_URL}/sms/list/`, {
          headers: {
            'Authorization': `Bearer ${data?.tokens?.access}` 
          }
        })
        setMessagesLists(response.data.data)
        console.log("🚀 ~ getLists ~ response:", response.data)
      } catch (error) {
        console.log("🚀 ~ getLists ~ error:", error)
        
      }
  }

  async function getListDetails(id: string , name: string){
    setListInfo({
      id: id,
      name: name
    })
    try {
      const response = await axios.get(`${import.meta.env.VITE_PRIVATE_API_URL}/sms/list/items/${id}/`, {
          headers: {
            'Authorization': `Bearer ${data?.tokens?.access}` 
          }
        })
        if(response.data.data.length > 0){
          setListRecords(response.data.data)
        }
        console.log("🚀 ~ getListDetails ~ response:", response.data)
      } catch (error) {
        console.log("🚀 ~ getListDetails ~ error:", error)
        
      }
  }
  async function getSmsHistory(){
    try {
      const response = await axios.get(`${import.meta.env.VITE_PRIVATE_API_URL}/sms/history/`, {
          headers: {
            'Authorization': `Bearer ${data?.tokens?.access}` 
          }
        })
        setMessagesSmsHistory(response.data.data)
        console.log("🚀 ~ getSmsHistory ~ response:", response.data)
      } catch (error) {
        console.log("🚀 ~ getSmsHistory ~ error:", error)
        
      }
  }
  function onSubmitNewSms(){
    getSmsHistory()
    setNewKeyForm(newKeyForm +1)
  }
  useEffect(() => {
    getLists()
    getSmsHistory()
    return () => {
      
    }
  }, [])
  
  return <>
      <HStack padding={'16px'} bgColor={'#fff'} mb={'12px'} borderRadius={'12px'} w="100%" justifyContent="space-between">
        <VStack alignItems="start">
          <Heading size="md" display="flex" gap="10px">
            <Text>مرحبا</Text>
            <Text>{data?.user?.name || "الاسم غير معروف,"}</Text>
          </Heading>
          <Text fontSize="md">
          ,هذه هي لوحة التحكم الخاصة بك حيث يمكنك عرض وإدارة جميع الرسائل المتعلقة بانتخابات عام 2024.
          </Text>
        </VStack>

        <Btn
          type="solid"
          borderRadius="50px"
          iconPlacment="right"
          bg="#318973"
          color="#fff"
          fontSize="17px"
          onClick={()=> onOpenMenuModal()}
          // onClick={add.onOpen}
          padding="20px 25px"
          mb="auto"
        >
          <Text>إنشاء قائمة جديدة</Text>
        </Btn>
      </HStack>
    <Grid
      templateColumns='repeat(3, 1fr)'
      gap={4}
    >
      <GridItem colSpan={2} >
        <Box paddingY={'21px'} paddingX={'16px'} className='messages__counter--card' >
          <Flex justifyContent={'space-between'} alignItems={'center'} gap={'8px'} width={'100%'}>
            <div className="messages__counter">
              <MessageBlackIcon />
              <p>عدد الرسائل المتاحة</p>
            </div>
            <div className='messages__count'>56</div>
          </Flex>
        </Box>
        <Box className='new__message--card' >
          <h4 className="">رسالة جديدة</h4>
          <NewMessageForm key={newKeyForm} onSuccess={onSubmitNewSms} token={data?.tokens?.access || ""} listsArray={messagesLists} />
        </Box>
      </GridItem>
      <GridItem rowSpan={2} colSpan={1} >
        <SentMessages messages={messagesSmsHistory} />
      </GridItem>
    </Grid>
    <Grid templateColumns={'repeat(2, 1fr)'} gap={'24px'}>
      <Box className='messages__card--list'>
        <h4 className="messages__card__header">القوائم</h4>
        <Flex flexDirection={'column'}>
          {messagesLists?.length ? messagesLists?.map((list: any) => <MessageListItem onDelete={getLists} onClick={getListDetails}  key={list.id} id={list.id} title={list.name} />) :""}
          {/* <MessageListItem id={1} title="المهام الجديدة" />
          <MessageListItem id={4} title="المهام الجديدة" /> */}
        </Flex>
      </Box>
      {listInfo?.id ? <Box className='messages__card--list'>
        <Flex justifyContent={'space-between'} alignItems={'center'}>

          <h4 className="messages__card__header">معلومات {listInfo?.name}</h4>
          <Button onClick={onOpen} className='add__my-info'>
            <BsPlus size={'24px'} />
            أضافة أسم من أصواتي</Button>
        </Flex>
        <TableContainer>
          <Table variant='simple'>
            <Thead backgroundColor={'#F3F3F3'} borderBottom={' 1px solid var(--3, #E2E5E9)'}>
              <Tr>
                <Th textAlign={'start'}>الأسم</Th>
                <Th textAlign={'start'} >رقم الهاتف</Th>
                <Th textAlign={'start'}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {listRecords?.map((list: any) =><Tr key={list.id}>
                <Td>{list.name}</Td>
                <Td>{list.mobile_number}</Td>
                <Td isNumeric>
                  <Button w={'24px'} height={'24px'} backgroundColor={'transparent'} paddingX={0} paddingY={'18px'} onClick={handleOnEdit}><EditIcon /></Button>
                  <Button w={'24px'} height={'24px'} backgroundColor={'transparent'} paddingX={0} paddingY={'18px'} onClick={handleOnDelete}><DeleteIcon /></Button>
                </Td>
              </Tr>)}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>: ""}
    </Grid>
    <CreateMyselfModal
      token={data?.tokens?.access || ""}
      id={listInfo?.id}
      isOpen={isOpen}
      onClose={onClose}
      onSuccess={()=> getListDetails(listInfo.id, listInfo.name)}
    />
    <NewMenuFormModal 
      onSuccess={getLists}
      token={data?.tokens?.access || ""}
      isOpen={isOpenMenuModal}
      onClose={onCloseMenuModal}
    />
  </>
}
