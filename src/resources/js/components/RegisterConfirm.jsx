
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Button, Center, ChakraProvider, Container, FormControl, FormLabel, Heading, Input, InputGroup, InputRightElement, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';

export const RegisterConfirm = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const location = useLocation();
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    return (
        <>
            <ChakraProvider>
                <Header btnRef={btnRef} onOpen={onOpen} isOpen={isOpen} onClose={onClose} />
                <Stack spacing={5}>
                    <Container minWidth='max-content' borderWidth='1px' borderRadius='lg' alignContent='center' align="center" p={10}>
                        <form>
                            <FormLabel
                                htmlFor=''
                                textAlign="center">氏名</FormLabel>
                            <Input
                                textAlign="center"
                                border='0px'
                                isReadOnly={true}
                                defaultValue={location.state.name} />
                            <FormLabel htmlFor='' textAlign="center">表示名</FormLabel>
                            <Input
                                textAlign="center"
                                border='0px'
                                isReadOnly={true}
                                defaultValue={location.state.nickname} />
                            <FormLabel htmlFor='' textAlign="center">メールアドレス</FormLabel>
                            <Input
                                textAlign="center"
                                border='0px'
                                isReadOnly={true}
                                defaultValue={location.state.email} />
                            <FormLabel htmlFor='' textAlign="center">郵便番号</FormLabel>
                            <Input
                                textAlign="center"
                                border='0px'
                                isReadOnly={true}
                                defaultValue={location.state.zipcode} />
                            <FormLabel htmlFor='' textAlign="center">住所</FormLabel>
                            <Input
                                textAlign="center"
                                border='0px'
                                isReadOnly={true}
                                defaultValue={location.state.address} />
                            <FormLabel htmlFor='' textAlign="center">住所（続き）</FormLabel>
                            <Input
                                textAlign="center"
                                border='0px'
                                isReadOnly={true}
                                defaultValue={location.state.address2} />
                            <FormLabel htmlFor='' textAlign="center">パスワード</FormLabel>
                            <InputGroup size='md'>
                                <Input
                                    textAlign="center"
                                    border='0px'
                                    isReadOnly={true}
                                    type={show ? 'text' : 'password'}
                                    defaultValue={location.state.password}
                                />
                                <InputRightElement width='4.5rem'>
                                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                                        {show ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            <Button>登録</Button>
                        </form>
                    </Container>
                </Stack>
            </ChakraProvider>
        </>
    )
}
