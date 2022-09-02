import React from "react";
import { Badge, Box, Button, Container, Image } from '@chakra-ui/react'
import { ModalWindow } from './ModalWindow';

export const ItemInfo = (props) => {
    const { imageSrc, itemName, itemStatus, changeItemName, changeItemStatus, shippingMethod, itemComment, itemAuthor } = props;
    return (
        <>
            <Container maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'  >
                <Container align="center" py="2">
                    <Image src={imageSrc} borderRadius='lg' maxW='sm' boxSize='300px' />
                </Container>
                <Box p='6'>
                    <Box display='flex' alignItems='baseline'>
                        <Badge borderRadius='full' px='2' colorScheme='teal'>
                            New
                        </Badge>
                        <Box
                            color='gray.500'
                            fontWeight='semibold'
                            letterSpacing='wide'
                            fontSize='xs'
                            textTransform='uppercase'
                        >
                            <Container>
                                商品名:{itemName}
                            </Container>
                            <Container>
                                状態:{itemStatus}
                            </Container>
                            <Container>
                                交換対象:{changeItemName}
                            </Container>
                            <Container>
                                交換条件:{changeItemStatus}
                            </Container>
                            <Container>
                                配送方法:{shippingMethod}
                            </Container>
                            <ModalWindow imageSrc={imageSrc} itemComment={itemComment} itemAuthor={itemAuthor} />
                        </Box>
                    </Box>
                </Box>
            </Container>
        </>
    );
};
