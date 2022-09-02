
import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { Box, Button, ChakraProvider, Container, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input, Radio, RadioGroup, Spacer, Stack, TagLabel, Text, Textarea, useDisclosure } from '@chakra-ui/react';
import { Header } from './Header';

export const NewItem = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const loginflg = true

    const btnRef = React.useRef()
    const [itemName, setItemName] = useState('')
    const [itemStatus, setItemStatus] = useState('')
    const [itemTargetName, setItemTargetName] = useState('')
    const [itemTargetStatus, setItemTargetStatus] = useState('')
    const [isError, setIsError] = useState(false)


    return (
        <>
            <ChakraProvider>
                <Header btnRef={btnRef} onOpen={onOpen} isOpen={isOpen} onClose={onClose} loginflg={loginflg} />
                <Box my={5} >
                    <Container minWidth='max-content' borderWidth='1px' borderRadius='lg' alignContent='center' align="center" p={10}>
                        <Stack spacing={5}>
                            <FormLabel>アイテム名</FormLabel>
                            <Input type='text'
                                value={itemName} />
                            <FormLabel>ステータス</FormLabel>
                            <RadioGroup value={itemStatus}>
                                <Stack direction='row'>
                                    <Radio value='0'><Text fontSize='sm'>カプセル未開封</Text></Radio>
                                    <Radio value='1'><Text fontSize='sm'>カプセルのみ開封済み</Text></Radio>
                                    <Radio value='2'><Text fontSize='sm'>カプセルおよび内包装開封済み（新品同様）</Text></Radio>
                                    <Radio value='3'><Text fontSize='sm'>開封済中古品</Text></Radio>
                                </Stack>
                            </RadioGroup>
                            <FormLabel>画像</FormLabel>
                            <input type="file" accept="image/*" multiple />
                            <FormLabel>コメント・補足</FormLabel>
                            <Textarea type='text'
                                value={itemTargetName} />
                            <FormLabel>交換対象</FormLabel>
                            <Input type='text'
                                value={itemTargetName} />
                            <FormLabel>交換条件</FormLabel>
                            <RadioGroup value={itemTargetStatus}>
                                <Stack direction='row'>
                                    <Radio value='0'><Text fontSize='sm'>カプセル未開封</Text></Radio>
                                    <Radio value='1'><Text fontSize='sm'>カプセルのみ開封済み</Text></Radio>
                                    <Radio value='2'><Text fontSize='sm'>カプセルおよび内包装開封済み（新品同様）</Text></Radio>
                                    <Radio value='3'><Text fontSize='sm'>開封済中古品</Text></Radio>
                                </Stack>
                            </RadioGroup>
                            <Button colorScheme='blue'>確認</Button>
                        </Stack>
                    </Container>
                </Box>

            </ChakraProvider>


        </>
    );
}
