import React from "react";
import { Avatar, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Heading, IconButton, Menu, MenuButton, MenuItem, MenuList, Spacer } from '@chakra-ui/react'
import { AddIcon, HamburgerIcon, QuestionOutlineIcon, SearchIcon } from "@chakra-ui/icons";

import { Link, Route, Routes } from "react-router-dom";
import { Login } from "./Login";

export const Header = (props) => {
    const { btnRef, onOpen, isOpen, onClose, loginflg } = props;
    return (
        <>
            <Flex minWidth='max-content' alignItems='center' gap='2' py={1} bg='#a3d1ff' color='gray.600'>
                {
                    loginflg &&
                    <>
                        <IconButton
                            ref={btnRef} onClick={onOpen}
                            aria-label='Call Segun'
                            size='lg'
                            icon={<HamburgerIcon />}
                            bg='transparent'
                        // _hover='transparent' _active='transparent'
                        />
                        <Drawer
                            isOpen={isOpen}
                            placement='left'
                            onClose={onClose}
                            finalFocusRef={btnRef}
                        >
                            <DrawerOverlay />
                            <DrawerContent bg='white'
                                opacity='0.9'>
                                <DrawerCloseButton />
                                <DrawerHeader color='gray.700'>Menu</DrawerHeader>
                                <DrawerBody>
                                    <Button w='100%' bg='transparent'>
                                        <AddIcon pr={2} />
                                        新規作成
                                    </Button>
                                    <Button w='100%' bg='transparent'>
                                        <QuestionOutlineIcon pr={2} />
                                        使用ガイド
                                    </Button>
                                    <Button w='100%' bg='transparent'>
                                        <SearchIcon pr={2} />
                                        探す
                                    </Button>
                                </DrawerBody>
                                <DrawerFooter>
                                </DrawerFooter>
                            </DrawerContent>
                        </Drawer>
                        <Box p='2'>
                            <Heading size='md'>ガチャガチャ景品マッチングサービス</Heading>
                        </Box>
                        <Spacer />
                    </>
                }
                <Menu>
                    <MenuButton as={Button} bg='transparent'
                        _hover='transparent'
                        _active='transparent'
                    >
                        {loginflg && <Avatar bg='teal.500' />}
                    </MenuButton>
                    <MenuList>
                        ログアウト
                        {loginflg ? <Link to="/login">ログアウト</Link> : <Link to="/login">ログイン</Link>}

                    </MenuList>
                </Menu>
                {/* <Routes>
                    <Route path="/login" element={<Login />} />
                </Routes> */}

            </Flex>
        </>
    );
};
