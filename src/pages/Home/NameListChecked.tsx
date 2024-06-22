import { Box, Flex } from '@chakra-ui/react'
import { CheckBox } from '@components/core'
import React from 'react'

export default function NameListChecked({
    onChange = () => {},
    name
}: {
    onChange: () => void,
    name: string
}) {
  return (
    <Box padding={'32px 16px'} borderBottom={'1px solid  #E2E5E9'}>
        <Flex alignItems={'center'} gap={'12px'}>
            <CheckBox onChange={onChange} />
            <p>{name}</p>
        </Flex>
    </Box>
  )
}
