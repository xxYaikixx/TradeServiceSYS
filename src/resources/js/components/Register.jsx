import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, ChakraProvider, FormControl, FormLabel, Heading, Input, Stack, Text, useDisclosure, Container, FormErrorMessage } from '@chakra-ui/react';
import { Header } from './Header';
import axios from 'axios';
import { usePostalJp } from 'use-postal-jp';
import { useForm } from 'react-hook-form';
import { RegisterConfirm } from './RegisterConfirm';
import { registerStyles } from '@emotion/utils';

export const Register = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const [posts, setPosts] = useState([]);
    const [zipcode, setZipcode] = useState('')
    const [address, loading, error] = usePostalJp(zipcode, zipcode.length >= 7)
    const navigate = useNavigate();
    // const { register, handleSubmit, watch, reset, errors, getValues } = useForm()


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

    // useEffect(() => {
    //     setFormData({ ...formData, address: address, zipcode: zipcode });
    // }, [address])


    // const handleInput = (e) => {
    //     e.persist();
    //     setFormData({ ...formData, [e.target.name]: e.target.value });
    // }

    const {
        getValues,
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm()

    function onSubmit(values) {
        console.log("submit");
        return navigate('/register/confirm', { state: getValues() });
    }

    return (
        <>
            <ChakraProvider>
                <Header btnRef={btnRef} onOpen={onOpen} isOpen={isOpen} onClose={onClose} />
                <Box my={5} >
                    <Container minWidth='max-content' borderWidth='1px' borderRadius='lg' alignContent='center' align="center" p={10}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormControl isInvalid={errors.name}>
                                <FormLabel htmlFor='name'>氏名</FormLabel>
                                <Input
                                    id='name'
                                    placeholder='氏名'
                                    {...register('name', {
                                        required: '氏名を入力してください',
                                    })}
                                />
                                <FormErrorMessage>
                                    {errors.name && errors.name.message}
                                </FormErrorMessage>
                            </FormControl>
                            <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
                                確認
                            </Button>
                        </form>
                    </Container>
                </Box>
            </ChakraProvider >
            {/* <Box my={5} >
                        <Container minWidth='max-content' borderWidth='1px' borderRadius='lg' alignContent='center' align="center" p={10}>
                            <Heading as='h2' size='xl' align='center' my={5} color='gray.700'>会員登録</Heading>
                            <Stack spacing={5}>
                                <Box>
                                    <FormLabel>氏名</FormLabel>
                                    <Input type='text' name="name" {...register("name")} />
                                    {/* <Input type='text' name="name" onChange={handleInput} value={formData.name} {...register("simei")} /> */}
            {/* <span><Text fontSize='sm' color='red' align='left'>{formData.error_list.name}</Text></span> */}
            {/* </Box>
            <Box>
                <FormLabel>表示名</FormLabel>
                <Input type='text' name="nickname" {...register("nickname")} />
                <span><Text fontSize='sm' color='red' align='left'>{formData.error_list.nickname}</Text></span>
            </Box>
            <FormLabel>サムネイル</FormLabel> */}
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
            {/* <Box>
                                    <FormLabel>メールアドレス</FormLabel>
                                    <Input type='text' name="email" {...register("email")} />
                                    <span><Text fontSize='sm' color='red' align='left'>{formData.error_list.email}</Text></span>
                                </Box>
                                <Box>
                                    <FormLabel>郵便番号</FormLabel>
                                    <Input type='text' name="zipcode" {...register("zipcode")} onChange={(e) => setZipcode(e.target.value)} />
                                    <span><Text fontSize='sm' color='red' align='left'>{formData.error_list.zipcode}</Text></span>
                                </Box>
                                <Box>
                                    <FormLabel>住所</FormLabel>
                                    <Input isReadOnly={true} value={loading || !address ? '' : address.prefecture + address.address1 + address.address2 + address.address3 + address.address4} {...register("address")} />
                                    <span><Text fontSize='sm' color='red' align='left'>{formData.error_list.address}</Text></span>
                                </Box> */}
            {/* <Box>
                                    <FormLabel>住所(続き)</FormLabel>
                                    <Input type='text' name="address2" {...register("address2")} />
                                    <span><Text fontSize='sm' color='red' align='left'>{formData.error_list.address2}</Text></span>
                                </Box>
                                <Box>
                                    <FormLabel>パスワード</FormLabel>
                                    <Input type='password' name="password"
                                        {...register("password")} />
                                    <span><Text fontSize='sm' color='red' align='left'>{formData.error_list.password}</Text></span>
                                </Box>
                                <Box>
                                    <FormLabel>パスワード(確認)</FormLabel>
                                    <Input type='password' name="password2"
                                        {...register("password2")} />
                                    <span><Text fontSize='sm' color='red' align='left'>{formData.error_list.password2}</Text></span>
                                </Box>
                                <Button colorScheme='blue' onClick={() => {
                                    return navigate('/register/confirm', { state: getValues() });
                                }}>確認</Button>
                            </Stack>*/}
        </>
    );
}
