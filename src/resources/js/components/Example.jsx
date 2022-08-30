import React from 'react';
import ReactDOM from 'react-dom';
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

if (document.getElementById('app')) {
    ReactDOM.render(<Example />, document.getElementById('app'));
}
