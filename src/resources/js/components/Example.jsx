import React from 'react';
import { ChakraProvider, useDisclosure } from '@chakra-ui/react'
import { Header } from './Header';

export const Example = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const loginflg = true
    return (
        <>
            <ChakraProvider>
                <Header btnRef={btnRef} onOpen={onOpen} isOpen={isOpen} onClose={onClose} loginflg={loginflg} />
            </ChakraProvider>
        </>
    );
}

export default Example;

// After
import { createRoot } from 'react-dom/client';
const container = document.getElementById('app');
const root = createRoot(container);
root.render(<Example />);