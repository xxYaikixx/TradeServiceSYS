import { Box, ChakraProvider, Flex, Heading, useDisclosure, Wrap, WrapItem } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react'
import { Header } from './Header';
import { ItemInfo } from './ItemInfo';
import axios from 'axios';

export const Top = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const loginflg = true

    //postsの状態を管理する
    const [items, setItems] = useState([]);
    useEffect(() => {
        getItemsData();
    }, [])
    //バックエンドからpostsの一覧を取得する処理
    const getItemsData = () => {
        axios
            .get('/api/posts')
            .then(response => {
                setItems(response.data);     //バックエンドから返ってきたデータでpostsを更新する
                console.log(localStorage);
            })
            .catch(() => {
                console.log('通信に失敗しました');
            });
    }

    let contents = [];
    items.map((item) =>
        contents.push({
            name: item.name,
            status: item.status,
            comment: item.comment,
            image: "https://via.placeholder.com/300",
            user_id: item.user_id,
            // editBtn: <Button color="secondary" variant="contained">編集</Button>,
            // deleteBtn: <Button color="primary" variant="contained">完了</Button>,
        })
    );
    return (
        <>
            <div >
                <ChakraProvider>
                    <Header btnRef={btnRef} onOpen={onOpen} isOpen={isOpen} onClose={onClose} loginflg={loginflg} />
                    <Box bg='white' w='100%' p={4} color='gray.900' >
                        <Heading as='h3' size='lg' color='steelblue' > 新着 </Heading>
                    </Box>
                    <Wrap spacing='16px' justify='center'>
                        {contents.map((content, index) => (
                            <ItemInfo key={index}
                                imageSrc={content.image}
                                itemName={content.name}
                                itemStatus={content.status}
                                itemAuthor={content.user_id}
                                changeItemName="aaa"
                                changeItemStatus="1"
                                shippingMethod="2"
                                itemComment={content.comment} />
                        ))}
                    </Wrap>
                </ChakraProvider>
            </div >
        </>
    );
}