
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Button, ChakraProvider, Container, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input, Radio, RadioGroup, Spacer, Stack, TagLabel, Text, Textarea, useDisclosure } from '@chakra-ui/react';
import { Header } from './Header';
import axios from 'axios';

export const NewItem = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    // const { name: previewUrl } = register('preview_url');

    const [formData, setFormData] = useState({
        itemName: '',
        itemStatus: '0',
        // image: '',
        comment: '',
        itemTargetName: '',
        itemTargetStatus: '0',
        shippingMethod: '0',
        error_list: [],
    });
    const handleInput = (e) => {
        e.persist();
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const inputChange = (key, value) => {
        setFormData((prev) => ({ ...formData, [key]: value }));
    }
    const createPost = (e) => {
        e.preventDefault();
        const data = {
            itemName: formData.itemName,
            itemStatus: formData.itemStatus,
            image: formData.image,
            comment: formData.comment,
            user_id: localStorage.auth_id,
            itemTargetName: formData.itemTargetName,
            itemTargetStatus: formData.itemTargetStatus,
            shippingMethod: formData.shippingMethod,
        }
        axios.post('/api/posts/create', data)
            .then(res => {
                const tempPosts = posts;
                tempPosts.push(res.data);
                setPosts(tempPosts);
                setFormData({
                    itemName: '',
                    itemStatus: '0',
                    // image: '',
                    comment: '',
                    user_id: localStorage.auth_id,
                    itemTargetName: '',
                    itemTargetStatus: '0',
                    shippingMethod: '0',
                });
                navigate("/");
            }
            )
            .catch(error => {
                console.log(error);
                if (error.response.status === 400) {
                    setFormData({ ...formData, error_list: error.response.data.validation_errors });
                } else {
                    console.log('通信に失敗しました');
                }
            });



    }

    return (
        <>
            <ChakraProvider>
                <Header btnRef={btnRef} onOpen={onOpen} isOpen={isOpen} onClose={onClose} />
                <Box my={5} >
                    <Container minWidth='max-content' borderWidth='1px' borderRadius='lg' alignContent='center' align="center" p={10}>
                        <Stack spacing={5}>
                            <Box>
                                <FormLabel>アイテム名 </FormLabel>
                                <Input type='text' name="itemName" onChange={handleInput} value={formData.itemName} />
                                <span><Text fontSize='sm' color='red' align='left'>{formData.error_list.itemName}</Text></span>
                            </Box>
                            <Box>
                                <FormLabel>ステータス</FormLabel>
                                <RadioGroup value={formData.itemStatus} onChange={(v) => inputChange("itemStatus", v)}>
                                    <Stack direction='row'>
                                        <Radio value='0'><Text fontSize='sm'>カプセル未開封</Text></Radio>
                                        <Radio value='1'><Text fontSize='sm'>カプセルのみ開封済み</Text></Radio>
                                        <Radio value='2'><Text fontSize='sm'>カプセルおよび内包装開封済み（新品同様）</Text></Radio>
                                        <Radio value='3'><Text fontSize='sm'>開封済中古品</Text></Radio>
                                    </Stack>
                                </RadioGroup>
                                <span><Text fontSize='sm' color='red' align='left'>{formData.error_list.itemStatus}</Text></span>
                            </Box>
                            <FormLabel>画像</FormLabel>
                            {/* <Input
                                id={previewUrl}
                                ref={inputRef}
                                name={previewUrl}
                                type="file"
                                accept="image/*"
                                onChange={onFileInputChange}
                            /> */}
                            {/* <Input type="file" onChange={(e) => {
                                inputChange("image", e.target.files[0]);
                            }} accept="image/*" multiple ref={inputRef} name="image" /> */}
                            <Box>
                                <FormLabel>コメント・補足</FormLabel>
                                <Textarea type='text' name="comment"
                                    onChange={handleInput} value={formData.comment} />
                                <span><Text fontSize='sm' color='red' align='left'>{formData.error_list.comment}</Text></span>
                            </Box>
                            <Box>
                                <FormLabel>交換対象</FormLabel>
                                <Input type='text' name="itemTargetName"
                                    onChange={handleInput} value={formData.itemTargetName} />
                                <span><Text fontSize='sm' color='red' align='left'>{formData.error_list.itemTargetName}</Text></span>
                            </Box>
                            <Box>
                                <FormLabel>交換条件</FormLabel>
                                <RadioGroup name="itemTargetStatus" onChange={(v) => inputChange("itemTargetStatus", v)} value={formData.itemTargetStatus}>
                                    <Stack direction='row'>
                                        <Radio value='0'><Text fontSize='sm'>カプセル未開封</Text></Radio>
                                        <Radio value='1'><Text fontSize='sm'>カプセルのみ開封済み</Text></Radio>
                                        <Radio value='2'><Text fontSize='sm'>カプセルおよび内包装開封済み（新品同様）</Text></Radio>
                                        <Radio value='3'><Text fontSize='sm'>開封済中古品</Text></Radio>
                                    </Stack>
                                </RadioGroup>
                                <span><Text fontSize='sm' color='red' align='left'>{formData.error_list.itemTargetStatus}</Text></span>
                            </Box>
                            <Box>
                                <FormLabel>郵送方法</FormLabel>
                                <RadioGroup name="shippingMethod" onChange={(v) => inputChange("shippingMethod", v)} value={formData.shippingMethod}>
                                    <Stack direction='row'>
                                        <Radio value='0'><Text fontSize='sm'>手渡し</Text></Radio>
                                        <Radio value='1'><Text fontSize='sm'>郵便（記名）</Text></Radio>
                                        <Radio value='2'><Text fontSize='sm'>郵便（匿名）</Text></Radio>
                                        <Radio value='3'><Text fontSize='sm'>宅配（記名）</Text></Radio>
                                        <Radio value='4'><Text fontSize='sm'>宅配（匿名）</Text></Radio>
                                    </Stack>
                                </RadioGroup>
                                <span><Text fontSize='sm' color='red' align='left'>{formData.error_list.shippingMethod}</Text></span>
                            </Box>
                            <Button colorScheme='blue' onClick={createPost}>確認</Button>
                        </Stack>
                    </Container>
                </Box>

            </ChakraProvider >


        </>
    );
}
