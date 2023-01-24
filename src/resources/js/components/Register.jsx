import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, ChakraProvider, FormControl, FormLabel, Input, Stack, useDisclosure, Container, FormErrorMessage } from '@chakra-ui/react';
import { Header } from './Header';
import { usePostalJp } from 'use-postal-jp';
import { useForm } from 'react-hook-form';


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

    const {
        getValues,
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm()

    function onSubmit() {
        return navigate('/register/confirm', { state: getValues() });
    }

    return (
        <>
            <ChakraProvider>
                <Header btnRef={btnRef} onOpen={onOpen} isOpen={isOpen} onClose={onClose} />
                <Stack spacing={5}>
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
                                <FormControl isInvalid={errors.nickname}>
                                    <FormLabel>表示名</FormLabel>
                                    <Input
                                        id='nickname'
                                        placeholder='表示名'
                                        {...register("nickname", {
                                            required: '表示名を入力してください',
                                        })} />
                                    <FormErrorMessage>
                                        {errors.nickname && errors.nickname.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormLabel>サムネイル</FormLabel>
                                <FormControl isInvalid={errors.email}>
                                    <FormLabel>メールアドレス</FormLabel>
                                    <Input
                                        id='email'
                                        placeholder='メールアドレス'
                                        {...register("email", {
                                            required: 'メールアドレスを入力してください',
                                        })} />
                                    <FormErrorMessage>
                                        {errors.email && errors.email.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={errors.zipcode}>
                                    <FormLabel>郵便番号</FormLabel>
                                    <Input
                                        id='zipcode'
                                        placeholder='郵便番号'
                                        {...register("zipcode", {
                                            required: '郵便番号を入力してください',
                                        })}
                                        onChange={(e) => setZipcode(e.target.value)}
                                    />
                                    <FormErrorMessage>
                                        {errors.zipcode && errors.zipcode.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={errors.address}>
                                    <FormLabel>住所</FormLabel>
                                    <Input isReadOnly={true}
                                        id='address'
                                        placeholder='住所'
                                        value={zipcode.length < 7 || loading || !address ? '' : address.prefecture + address.address1 + address.address2 + address.address3 + address.address4}
                                        {...register("address",
                                            {
                                                required: '住所を入力してください',
                                            })} />
                                    <FormErrorMessage>
                                        {errors.address && errors.address.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={errors.address2}>
                                    <FormLabel>住所（続き）</FormLabel>
                                    <Input
                                        id='address2'
                                        placeholder='住所（続き）'
                                        {...register("address2",
                                            {
                                                required: '住所（続き）を入力してください',
                                            })} />
                                    <FormErrorMessage>
                                        {errors.address2 && errors.address2.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={errors.password}>
                                    <FormLabel>パスワード</FormLabel>
                                    <Input
                                        type='password'
                                        id='password'
                                        placeholder='パスワード'
                                        {...register("password", {
                                            required: 'パスワードを入力してください',
                                        })} />
                                    <FormErrorMessage>
                                        {errors.password && errors.password.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={errors.password2}>
                                    <FormLabel>パスワード（確認）</FormLabel>
                                    <Input
                                        type='password'
                                        id='password2'
                                        placeholder='パスワード（確認）'
                                        {...register("password2", {
                                            validate: (value) => {
                                                return (
                                                    value === getValues("password") || "パスワードが一致しません"
                                                );
                                            }
                                        })}
                                    />
                                    <FormErrorMessage>
                                        {errors.password2 && errors.password2.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
                                    確認
                                </Button>
                            </form>
                        </Container>
                    </Box>
                </Stack>
            </ChakraProvider >
        </>
    );
}
