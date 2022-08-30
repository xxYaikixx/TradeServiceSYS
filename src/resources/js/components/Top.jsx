import { Box, ChakraProvider, Flex, Heading, useDisclosure } from '@chakra-ui/react';
import React from 'react'
import { Header } from './Header';
import { ItemInfo } from './ItemInfo';

export const Top = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const props = {
        imageSrc: 'https://via.placeholder.com/300x300.png/09f/fff',
        itemName: '雪の日のボリス',
        changeItemName: 'ミッフィー（黄）',
        changeItemStatus: '未開封希望（カプセル除く）',
        shippingMethod: '郵送',
        itemStatus: 'カプセル未開封'
    }
    const loginflg = true
    return (
        <>
            <div >
                <ChakraProvider>
                    <Header btnRef={btnRef} onOpen={onOpen} isOpen={isOpen} onClose={onClose} loginflg={loginflg} />
                    <Box bg='white' w='100%' p={4} color='gray.900' >
                        <Heading as='h3' size='lg' color='steelblue' > 新着 </Heading>
                    </Box>
                    <Flex gap='2' >
                        <ItemInfo imageSrc={props.imageSrc}
                            itemName={props.itemName}
                            itemStatus={props.itemStatus}
                            changeItemName={props.changeItemName}
                            changeItemStatus={props.changeItemStatus}
                            shippingMethod={props.shippingMethod} />
                        <ItemInfo imageSrc={props.imageSrc}
                            itemName="メラニー"
                            itemStatus="開封済み"
                            changeItemName="ミッフィーのお父さん"
                            changeItemStatus="開封済み"
                            shippingMethod="手渡し（都内限定）" />
                        <ItemInfo imageSrc={props.imageSrc}
                            itemName="ミッフィー（ボーダー）"
                            itemStatus="カプセル開封済み"
                            changeItemName="グランティ"
                            changeItemStatus="カプセル開封済み"
                            shippingMethod="匿名郵便" />
                        <ItemInfo imageSrc={props.imageSrc}
                            itemName="ラバーマグネット（おうち）"
                            itemStatus="カプセル未開封"
                            changeItemName="ラバーマグネット（ピクニックミッフィー）"
                            changeItemStatus="カプセル開封済み"
                            shippingMethod="郵送" />
                    </Flex>
                </ChakraProvider>
            </div >
        </>
    );
}