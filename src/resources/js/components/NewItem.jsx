
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Button, ChakraProvider, Container, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input, Radio, RadioGroup, Spacer, Stack, TagLabel, Text, Textarea, useDisclosure } from '@chakra-ui/react';
import { Header } from './Header';

export const NewItem = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const inputRef = useRef < HTMLInputElement > (null);
    const onChange = (event) => {
        const { files } = event.target;
        setValue('preview_url', URL.createObjectURL(files[0])); // 動いた!!
    };

    // const { name: previewUrl } = register('preview_url');

    const [formData, setFormData] = useState({
        itemName: '',
        itemStatus: '0',
        // image: '',
        comment: '',
        itemTargetName: '',
        itemTargetStatus: '0',
        shippingMethod: '0',
    });
    const createPost = async () => {
        if (formData == '') {
            return;
        }
        await axios
            .post('/api/posts/create', {
                itemName: formData.itemName,
                itemStatus: formData.itemStatus,
                image: formData.image,
                comment: formData.comment,
                user_id: localStorage.auth_id,
                itemTargetName: formData.itemTargetName,
                itemTargetStatus: formData.itemTargetStatus,
                shippingMethod: formData.shippingMethod,
            })
            .then((response) => {
                const tempPosts = posts
                tempPosts.push(response.data);
                setPosts(tempPosts)
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
                console.log('通信に失敗しました');
            });



    }

    const inputChange = (key, value) => {
        setFormData((prev) => ({ ...formData, [key]: value }));
    }
    return (
        <>
            <ChakraProvider>
                <Header btnRef={btnRef} onOpen={onOpen} isOpen={isOpen} onClose={onClose} />
                <Box my={5} >

                    <Container minWidth='max-content' borderWidth='1px' borderRadius='lg' alignContent='center' align="center" p={10}>
                        <Stack spacing={5}>

                            <FormLabel>アイテム名 </FormLabel>
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
                            <FormLabel>郵送方法</FormLabel>
                            <RadioGroup onChange={(v) => inputChange("shippingMethod", v)} value={formData.shippingMethod} name="shippingMethod">
                                <Stack direction='row'>
                                    <Radio value='0'><Text fontSize='sm'>手渡し</Text></Radio>
                                    <Radio value='1'><Text fontSize='sm'>郵便（記名）</Text></Radio>
                                    <Radio value='2'><Text fontSize='sm'>郵便（匿名）</Text></Radio>
                                    <Radio value='3'><Text fontSize='sm'>宅配（記名）</Text></Radio>
                                    <Radio value='4'><Text fontSize='sm'>宅配（匿名）</Text></Radio>
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
