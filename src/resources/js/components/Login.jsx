
import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { Box, Button, ChakraProvider, Container, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input, Spacer, Stack, TagLabel, Text, useDisclosure } from '@chakra-ui/react';
import { Header } from '../components/Header';

export const Login = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const loginflg = false

    const [id, setId] = useState('')
    const [password, setPassword] = useState('')
    const [isError, setIsError] = useState(false)
    const handleIdChange = (e) => setId(e.target.value)
    const handlePasswordChange = (e) => setPassword(e.target.value)
    const login = (id, password) => {
        (id === '' || password === '') ? setIsError(false) : window.location.href = "/top";
    }

    return (
        <>
            <ChakraProvider>
                <Header btnRef={btnRef} onOpen={onOpen} isOpen={isOpen} onClose={onClose} loginflg={loginflg} />
                <Box my={10}>
                    <Container maxW='xl' borderWidth='1px' borderRadius='lg' alignContent='center' align="center" p={10}>
                        <Stack spacing={3}>
                            <FormControl isInvalid={isError}>
                                <FormLabel>ログインID（メールアドレス）</FormLabel>
                                <Input type='email'
                                    value={id}
                                    onChange={handleIdChange} />
                                {isError && <FormErrorMessage>メールアドレスは必須です</FormErrorMessage>}
                                <FormLabel>パスワード</FormLabel>
                                <Input type='password'
                                    value={password}
                                    onChange={handlePasswordChange} />
                                {isError && <FormErrorMessage>パスワードは必須です</FormErrorMessage>}
                            </FormControl>
                            <Button colorScheme='blue' onClick={() => login(id, password)}>ログイン</Button>
                        </Stack>
                        <Link to='/register'><Text color='RoyalBlue' p={2}>会員登録</Text></Link>
                        <Link to='/forget'><Text color='RoyalBlue' p={2}>ログイン出来ない方はこちら</Text></Link>
                    </Container>
                </Box>

            </ChakraProvider>


        </>
    );
}
