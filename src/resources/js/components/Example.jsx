import React from 'react';
import { ChakraProvider, useDisclosure } from '@chakra-ui/react'
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Header } from './Header';
import { Top } from "./Top";
import { Login } from "./Login";
import { createRoot } from 'react-dom/client';

export const Example = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const loginflg = true
    return (
        <>
            <React.StrictMode>
                <BrowserRouter>
                    <>
                        <ChakraProvider>
                            <Header btnRef={btnRef} onOpen={onOpen} isOpen={isOpen} onClose={onClose} loginflg={loginflg} />
                        </ChakraProvider>
                        <Routes>
                            <Route path="/" element={<Top />} />
                            <Route path="/login" element={<Login />} />;
                        </Routes>
                    </>
                </BrowserRouter>
            </React.StrictMode>
        </>
    );
}

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<Example />);