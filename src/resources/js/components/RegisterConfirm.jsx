
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Button, ChakraProvider, FormControl, FormLabel, Heading, Input, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { Header } from './Header';
import axios from 'axios';
import { usePostalJp } from 'use-postal-jp'

export const RegisterConfirm = (props) => {
    const { values, hideConfirmation } = props
    console.log(values);
    //propsで渡ってきたvaluesを受けとって入力内容確認画面で表示
    return (
        <>
            <h2>確認画面</h2>
            <Box>
                <p>氏名：{values.name}</p>
                <p>表示名：{values.nickname}</p>
                <p>メールアドレス：{values.email}</p>
                <p>郵便番号：{values.zipcode}</p>
                <p>住所：{values.address}</p>
                <p>住所（続き）：{values.address2}</p>
                <p>パスワード：{values.password}</p>
                <Button onClick={hideConfirmation} value='登録' />
            </Box>
        </>
    )
}
