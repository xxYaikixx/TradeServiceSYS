
import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { Box, Button, ChakraProvider, Container, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input, Radio, RadioGroup, Spacer, Stack, TagLabel, Text, Textarea, useDisclosure } from '@chakra-ui/react';
import { Header } from './Header';

export const NewItem = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const loginflg = true
    const btnRef = React.useRef()
    const [posts, setPosts] = useState([]);

    const [formData, setFormData] = useState({
        itemName: '',
        itemStatus: '0',
        comment: '',
        itemTargetName: '',
        itemTargetStatus: '0',
    });
    const createPost = async () => {
        if (formData == '') {
            return;
        }
        await axios
            .post('/api/posts/create', {
                itemName: formData.itemName,
                itemStatus: formData.itemStatus,
                comment: formData.comment,
                itemTargetName: formData.itemTargetName,
                itemTargetStatus: formData.itemTargetStatus,
            })
            .then(response => {
                const tempPosts = posts
                tempPosts.push(response.data);
                setPosts(tempPosts)
                setFormData({
                    itemName: '',
                    itemStatus: '0',
                    comment: '',
                    itemTargetName: '',
                    itemTargetStatus: '0',
                });
            })
            .catch(error => {
                console.log(error);
                console.log('通信に失敗しました');
            });
    }

    const inputChange = (key, value) => {
        formData[key] = value;
        let data = Object.assign({}, formData);
        setFormData(data);
    }
    return (
        <>
            <ChakraProvider>
                <Header btnRef={btnRef} onOpen={onOpen} isOpen={isOpen} onClose={onClose} loginflg={loginflg} />
                <Box my={5} >

                    <Container minWidth='max-content' borderWidth='1px' borderRadius='lg' alignContent='center' align="center" p={10}>
                        <Stack spacing={5}>

                            <FormLabel>アイテム名</FormLabel>
                            <Input type='text'
                                value={formData.itemName} name="itemName" onChange={(e) => inputChange("itemName", e.target.value)} />
                            <FormLabel>ステータス</FormLabel>
                            <RadioGroup value={formData.itemStatus} onChange={(v) => inputChange("itemStatus", v)}>
                                <Stack direction='row'>
                                    <Radio value='0'><Text fontSize='sm'>カプセル未開封</Text></Radio>
                                    <Radio value='1'><Text fontSize='sm'>カプセルのみ開封済み</Text></Radio>
                                    <Radio value='2'><Text fontSize='sm'>カプセルおよび内包装開封済み（新品同様）</Text></Radio>
                                    <Radio value='3'><Text fontSize='sm'>開封済中古品</Text></Radio>
                                </Stack>
                            </RadioGroup>
                            <FormLabel>画像</FormLabel>
                            <input type="file" accept="image/*" multiple name="image" />
                            <FormLabel>コメント・補足</FormLabel>
                            <Textarea type='text'
                                onChange={(e) => inputChange("comment", e.target.value)} value={formData.comment} name="comment" />
                            <FormLabel>交換対象</FormLabel>
                            <Input type='text'
                                onChange={(e) => inputChange("itemTargetName", e.target.value)} value={formData.itemTargetName} name="itemTargetName" />
                            <FormLabel>交換条件</FormLabel>
                            <RadioGroup onChange={(v) => inputChange("itemTargetStatus", v)} value={formData.itemTargetStatus} name="itemTargetStatus">
                                <Stack direction='row'>
                                    <Radio value='0'><Text fontSize='sm'>カプセル未開封</Text></Radio>
                                    <Radio value='1'><Text fontSize='sm'>カプセルのみ開封済み</Text></Radio>
                                    <Radio value='2'><Text fontSize='sm'>カプセルおよび内包装開封済み（新品同様）</Text></Radio>
                                    <Radio value='3'><Text fontSize='sm'>開封済中古品</Text></Radio>
                                </Stack>
                            </RadioGroup>
                            <Button colorScheme='blue' onClick={createPost}>確認</Button>
                        </Stack>
                    </Container>
                </Box>

            </ChakraProvider >


        </>
    );
}
