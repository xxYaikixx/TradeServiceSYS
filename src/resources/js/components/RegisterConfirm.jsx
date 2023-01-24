
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Button, ChakraProvider, FormControl, FormLabel, Heading, Input, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

export const RegisterConfirm = () => {
    const location = useLocation();
    console.log("aaa");
    console.log(location.state.name);
    return (
        <>
            <h2>確認画面</h2>
            <Box>
                <p>氏名：{location.state.name}</p>
                {/*<p>表示名：{location.state.nickname}</p> */}
                {/* <p>メールアドレス：{location.state.email}</p> */}
                {/* <p>郵便番号：{location.state.zipcode}</p>
                <p>住所：{location.state.address}</p>
                <p>住所（続き）：{location.state.address2}</p>
                <p>パスワード：{location.state.password}</p> */}
                <Button value='登録' />
            </Box>
        </>
    )
}
