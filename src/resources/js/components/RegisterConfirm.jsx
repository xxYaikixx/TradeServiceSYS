
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Button, Center, ChakraProvider, Container, Flex, FormLabel, HStack, Input, InputGroup, InputRightElement, Spacer, Stack, useDisclosure } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';

export const RegisterConfirm = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const location = useLocation();
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    const navigate = useNavigate();
    const createPost = (e) => {
        const data = {
            name: location.state.name,
            nickname: location.state.nickname,
            email: location.state.email,
            zipcode: location.state.zipcode,
            address: location.state.address,
            address2: location.state.address2,
            password: location.state.password,
            password2: location.state.password2,
        }
        axios.post('/api/posts/register', data)
            .then(res => {
                navigate("/login");
            }
            )
            .catch(error => {
                console.log(error);
                if (error.response.status === 400) {
                    setFormData({ ...location.state, error_list: error.response.data.validation_errors });
                } else {
                    console.log('通信に失敗しました');
                }
            });
    }


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
                            <Center>
                                <HStack spacing='24px' textAlign="center">
                                    <Button onClick={() => { navigate("/register") }} colorScheme='teal' variant='outline'>戻る</Button>
                                    <Button onClick={createPost} colorScheme='teal' variant='solid'>登録</Button>
                                </HStack>
                            </Center>
                        </form>
                    </Container>
                </Stack>
            </ChakraProvider>
        </>
    )
}
