import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { v4 } from 'uuid';
import { ChatRepository } from '../../repository/chat.repository';
import { AppInput } from '../Input';
import { MessageInfo, useSocket } from './hooks/useSocket';
import './styles.css';

export const Chat = () => {
    console.log("Componente redenrizado")

    const idRef = useRef<string | undefined>();
    const clearButtonRef = useRef<boolean>(false);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const { data, status } = useQuery('chat', ChatRepository.findAll);
    const { messages, setMessages, socket } = useSocket();
    const form = useForm();


    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        idRef.current = idRef.current || v4();
        if (data && !clearButtonRef.current) {
            setMessages(data);
        }
    }, [data]);


    const onSubmit = async (data: any) => {
        socket.emit('msgToServer', {
            userId: idRef.current,
            username: data.name,
            message: data.message
        } satisfies MessageInfo);
        form.setValue('message', '');
    }

    if (status === 'loading') {
        return <p>Carregando...</p>;
    }

    if (status === 'error') {
        return <p>Erro ao carregar dados do chat.</p>;
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="chat-box">
                <div className='label-user-register'><label>Usuário registrado com id: {idRef?.current}</label></div>
                <div className='input-box-name'>
                    <AppInput form={form} required={true} key='name' formControlName='name' placeholder='Your name...' />
                </div>
                <div className="message-box" ref={messagesContainerRef}>
                    {messages.map((message, index) => {
                        return (<div key={index} className={idRef.current === message.userId ? 'user-message-box' : 'guest-message-box'}>
                            <label htmlFor="message">{message.username} diz:</label>
                            <span id='message'>{message.message}</span>
                        </div>
                        )
                    })}
                </div>
                <div className='box-total-messages'>
                    <button type='button' onClick={() => { clearButtonRef.current = true; setMessages([]) }}>Limpar chat</button>
                    <label>Total de mensagens: {messages?.length}</label>
                </div>
                <div className='box-message'>
                    <div className='input-box-message'>
                        <AppInput form={form} key='message' formControlName='message' placeholder='Your message...' />
                    </div>
                    <div className='button-box-message'>
                        <button type='submit'>Send</button>
                    </div>
                </div>
            </div>
        </form>
    );
}