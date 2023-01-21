
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Button, ChakraProvider, FormControl, FormLabel, Heading, Input, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { Header } from './Header';
import axios from 'axios';
import { usePostalJp } from 'use-postal-jp'

export const Register = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const [posts, setPosts] = useState([]);
    const [zipcode, setZipcode] = useState('')
    const [address, loading, error] = usePostalJp(zipcode, zipcode.length >= 7)
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        nickname: '',
        email: '',
        password: '',
        password2: '',
        zipcode: '',
        address: '',
        address2: '',
        // thumbnail: '',
        error_list: [],
    });
    // console.log(formData);

    useEffect(() => {
        setFormData({ ...formData, address: address, zipcode: zipcode });
    }, [address])


    const handleInput = (e) => {
        e.persist();
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const createPost = (e) => {
        e.preventDefault();
        const data = {
            name: formData.name,
            nickname: formData.nickname,
            email: formData.email,
            password: formData.password,
            password2: formData.password2,
            zipcode: formData.zipcode,
            address: formData.address,
            address2: formData.address2,
        }
        axios.post('/api/posts/register', data)
            .then(res => {
                const tempPosts = posts;
                tempPosts.push(res.data);
                setPosts(tempPosts);
                setFormData({
                    name: '',
                    nickname: '',
                    email: '',
                    password: '',
                    password2: '',
                    zipcode: '',
                    address: '',
                    address2: '',
                });
                navigate("/login");
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
                        <Heading as='h2' size='xl' align='center' my={5} color='gray.700'>会員登録</Heading>
                        <Stack spacing={5}>
                            <Box>
                                <FormLabel>氏名</FormLabel>
                                <Input type='text' name="name" onChange={handleInput} value={formData.name} />
                                <span><Text fontSize='sm' color='red' align='left'>{formData.error_list.name}</Text></span>
                            </Box>
                            <Box>
                                <FormLabel>表示名</FormLabel>
                                <Input type='text' name="nickname" onChange={handleInput} value={formData.nickname} />
                                <span><Text fontSize='sm' color='red' align='left'>{formData.error_list.nickname}</Text></span>
                            </Box>
                            <FormLabel>サムネイル</FormLabel>
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
                                <FormLabel>メールアドレス</FormLabel>
                                <Input type='text' name="email" onChange={handleInput} value={formData.email} />
                                <span><Text fontSize='sm' color='red' align='left'>{formData.error_list.email}</Text></span>
                            </Box>
                            <Box>
                                <FormLabel>郵便番号</FormLabel>
                                <Input type='text' name="zipcode" onChange={(e) => setZipcode(e.target.value)} />
                                <span><Text fontSize='sm' color='red' align='left'>{formData.error_list.zipcode}</Text></span>
                            </Box>
                            <Box>
                                <FormLabel>住所</FormLabel>
                                <Input isReadOnly={true} value={loading || !address ? '' : address.prefecture + address.address1 + address.address2 + address.address3 + address.address4} />
                                <span><Text fontSize='sm' color='red' align='left'>{formData.error_list.address}</Text></span>
                            </Box>
                            <Box>
                                <FormLabel>住所(続き)</FormLabel>
                                <Input type='text' name="address2" onChange={handleInput} value={formData.address2} />
                                <span><Text fontSize='sm' color='red' align='left'>{formData.error_list.address2}</Text></span>
                            </Box>
                            <Box>
                                <FormLabel>パスワード</FormLabel>
                                <Input type='password' name="password"
                                    onChange={handleInput} value={formData.password} />
                                <span><Text fontSize='sm' color='red' align='left'>{formData.error_list.password}</Text></span>
                            </Box>
                            <Box>
                                <FormLabel>パスワード(確認)</FormLabel>
                                <Input type='password' name="password2"
                                    onChange={handleInput} value={formData.password2} />
                                <span><Text fontSize='sm' color='red' align='left'>{formData.error_list.password2}</Text></span>
                            </Box>
                            <Button colorScheme='blue' onClick={createPost}>確認</Button>
                        </Stack>
                    </Container>
                </Box>
            </ChakraProvider >
        </>
    );
}
