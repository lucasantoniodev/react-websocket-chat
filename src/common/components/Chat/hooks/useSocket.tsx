import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export interface MessageInfo {
    userId?: string;
    username: string;
    message: string;
}

export const useSocket = () => {
    const [messages, setMessages] = useState<MessageInfo[]>([]);
    const [socket] = useState(io('http://localhost:3333'));

    useEffect(() => {
        const handleReceiveMessage = (message: MessageInfo) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        };

        socket.on('msgToClient', handleReceiveMessage);

        return () => {
            // Limpar o listener quando o componente é desmontado
            socket.off('msgToClient', handleReceiveMessage);
        };
    }, [socket]);

    return { messages, setMessages, socket };
};