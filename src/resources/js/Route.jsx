import React from 'react';
import { ChakraProvider, useDisclosure } from '@chakra-ui/react'
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Header } from './components/Header';
import { Top } from "./components/Top";
import { Login } from "./components/Login";
import { NewItem } from "./components/NewItem";
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
                        <Routes>
                            <Route path="/" element={<Top />} />
                            <Route path="/login" element={<Login />} />;
                            <Route path="/new" element={<NewItem />} />;
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