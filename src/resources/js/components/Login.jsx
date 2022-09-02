
import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, ChakraProvider, Container, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input, Spacer, Stack, TagLabel, Text, useDisclosure } from '@chakra-ui/react';
import { Header } from '../components/Header';
import axios from 'axios';

export const Login = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const loginflg = false

    const navigate = useNavigate();
    const [loginInput, setLogin] = useState({
        email: '',
        password: '',
        error_list: [],
    });
    const handleInput = (e) => {
        e.persist();
        setLogin({ ...loginInput, [e.target.name]: e.target.value });
    }

    const loginSubmit = (e) => {
        e.preventDefault();

        const data = {
            email: loginInput.email,
            password: loginInput.password,
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`api/login`, data).then(res => {
                if (res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    swal("ログイン成功", res.data.message, "success");
                    navigate('/');
                    location.reload();
                } else if (res.data.status === 401) {
                    swal("注意", res.data.message, "warning");
                } else {
                    setLogin({ ...loginInput, error_list: res.data.validation_errors });
                }
            });
        });
    }

    return (
        <>
            <ChakraProvider>
                <Header btnRef={btnRef} onOpen={onOpen} isOpen={isOpen} onClose={onClose} loginflg={loginflg} />
                <Box my={10}>
                    <Container maxW='xl' borderWidth='1px' borderRadius='lg' alignContent='center' align="center" p={10}>
                        <Stack spacing={3}>
                            <form onSubmit={loginSubmit}>
                                <FormLabel>ログインID（メールアドレス）</FormLabel>
                                <Input type='email'
                                    onChange={handleInput} value={loginInput.email} />
                                <span>{loginInput.error_list.password}</span>
                                <FormLabel>パスワード</FormLabel>
                                <Input type='password'
                                    onChange={handleInput} value={loginInput.password} />
                                <span>{loginInput.error_list.password}</span>
                                <Button colorScheme='blue' type="submit">ログイン</Button>
                            </form>
                        </Stack>
                        <Link to='/register'><Text color='RoyalBlue' p={2}>会員登録</Text></Link>
                        <Link to='/forget'><Text color='RoyalBlue' p={2}>ログイン出来ない方はこちら</Text></Link>
                    </Container>
                </Box>

            </ChakraProvider>


        </>
    );
}
