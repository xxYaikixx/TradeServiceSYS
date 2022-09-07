import React from "react";
import { Avatar, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Heading, IconButton, Menu, MenuButton, MenuItem, MenuList, Spacer } from '@chakra-ui/react'
import { AddIcon, HamburgerIcon, QuestionOutlineIcon, SearchIcon } from "@chakra-ui/icons";

import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';
// import { Login } from "./Login";

export const Header = (props) => {
    const navigate = useNavigate();

    const logoutSubmit = (e) => {
        e.preventDefault();
        axios.post(`/api/logout`).then(res => {
            if (res.data.status === 200) {
                localStorage.removeItem('auth_token', res.data.token);
                localStorage.removeItem('auth_name', res.data.username);
                swal("ログアウトしました", res.data.message, "success");
                navigate('/login');
                location.reload();
            }
        });
    }

    var AuthElements = '';
    const { btnRef, onOpen, isOpen, onClose } = props;
    if (localStorage.getItem('auth_token')) {
        AuthElements =
            (
                <>
                    <IconButton
                        ref={btnRef} onClick={onOpen}
                        aria-label='Call Segun'
                        size='lg'
                        icon={<HamburgerIcon />}
                        bg='transparent'
                        _hover='transparent' _active='transparent'
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
                                    <Link to="/new">新規作成</Link>
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
                        <Link to="/"><Heading size='md'>ガチャガチャ景品マッチングサービス</Heading></Link>
                    </Box>
                    <Spacer />
                    <Flex minWidth='max-content' alignItems='center' gap='2' py={1} bg='#a3d1ff' color='gray.600'>
                        {AuthElements}
                        <Menu>
                            <MenuButton as={Button} bg='transparent'
                                _hover='transparent'
                                _active='transparent'
                            >
                                <Avatar bg='teal.500' />
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={logoutSubmit}>ログアウト</MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                </>
            );
    } else {
        AuthElements = (
            <>
                <IconButton
                    ref={btnRef} onClick={onOpen}
                    aria-label='Call Segun'
                    size='lg'
                    icon={<HamburgerIcon />}
                    bg='transparent'
                    _hover='transparent' _active='transparent'
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
                                <Link to="/new">新規作成</Link>
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
                    <Link to="/"><Heading size='md'>ガチャガチャ景品マッチングサービス</Heading></Link>
                </Box>
                <Spacer />
                <Flex minWidth='max-content' alignItems='center' gap='2' py={1} bg='#a3d1ff' color='gray.600'>
                    <Menu>
                        <MenuList>
                            <Link to="/login">ログイン</Link>
                        </MenuList>
                    </Menu>
                </Flex>
            </>
        )
    }




    return (
        <>
            <Flex minWidth='max-content' alignItems='center' gap='2' py={1} bg='#a3d1ff' color='gray.600'>
                {AuthElements}
            </Flex>
        </>
    );
}
