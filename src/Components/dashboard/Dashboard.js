import React from 'react'
// import timon from './images/timon.jpg'
// import pumba from './images/pumba.jpg'
import SelectBox from '../select-box/SelectBox'
import styled from 'styled-components'
import { CTX } from '../../Store'


export default function Dashboard() {

    // CTX store
    const {allChats, sendChatAction} = React.useContext(CTX);
    
    const topics = Object.keys(allChats);

    const [activeTopic, changeActiveTopic] = React.useState(topics[0]);
    const [msgTextValue, changeMsgTextValue] = React.useState('');
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes();

    return(
        // Grid Parent
        <ChatWrapper >

            <Navigation>
                <SelectBox
                    items= {topics}
                    activeItem={activeTopic}
                    onChange={changeActiveTopic}
                />
            </Navigation>
    
            <ChatWindow>
                {
                allChats[activeTopic].map((chat, i) => (
                    <ChatContainer key={i}>
                        <UserAvatar src={chat.avatar} alt="User Avatar"/>

                        <Header>{chat.from} <ChatTime>{chat.time}</ChatTime></Header>

                        <ChatMessage>{chat.msg}</ChatMessage>
                    </ChatContainer>
                ))
                }

            </ChatWindow>
    
            {/* text input with button to send messages */}
            <MessageWindow>
                <MessageText
                    type="text" 
                    placeholder="Send a chat" 
                    value={msgTextValue} 
                    onChange={e => changeMsgTextValue(e.target.value)} 
                    onKeyPress={e => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          sendChatAction(
                            {
                                avatar:'https://picsum.photos/40', 
                                from: 'me', 
                                time: time, 
                                msg: msgTextValue,
                                topic: activeTopic
                            }
                        );
                        changeMsgTextValue('');
                        }
                      }}
                />
                <MessageButton
                    type="button"
                    onClick={() => {
                        sendChatAction(
                            {
                                avatar:'https://picsum.photos/40', 
                                from: 'me', 
                                time: time, 
                                msg: msgTextValue,
                                topic: activeTopic
                            }
                        );
                        changeMsgTextValue('');
                    }
                    }
                        >
                    Send
                </MessageButton>
            </MessageWindow>
    
        </ChatWrapper>
    )
}

const ChatWrapper = styled.section`
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 3rem 1fr 4rem;
        height: 100%;
    `;

    const Navigation = styled.nav`
        grid-row-start: 1;
        grid-row-end: 2;
        background-color: #ff9900;
        border-radius: 0 0 0.2rem 0.2rem;
        position: fixed;
        top: 0;
        width: 100%;
        height: 3rem;
    `;

    const ChatWindow = styled.section`
        display: flex;
        flex-direction: column;
        overflow: auto;
        grid-row-start: 2;
        grid-row-end: 3;
    `;

    const ChatContainer = styled.article`
        display: grid;
        grid-template-columns: 50px 1fr;
        grid-template-rows: 40px 1fr;
        grid-template-areas:
            "a b"
            "a c";
        height: min-content;
        min-width: calc(100% - 1rem);
        margin: 1rem 0.5rem 0 0.5rem;       
    `;

    const UserAvatar = styled.img`
        width: 40px;
        height: 40px;
        grid-area:a;        
    `;

    const Header = styled.header`
        font-weight: bold;
        grid-area: b;
    `;

    const ChatTime = styled.span`
        color: #888888;
        font-weight: 600;
    `;
    
    const ChatMessage = styled.p`
        grid-area: c;
    `;

    const MessageWindow = styled.form`
        grid-row-start: 3;
        grid-row-end: 4;
        background-color: #ff9900;
        border-radius: 0.2rem 0.2rem 0 0;
        height: 3rem;
        padding-bottom:1rem;
        display: grid;
        grid-template-columns: 4fr 1fr;
        position: fixed;
        bottom: 0;
        width: 100vw;
    `;

    const MessageText = styled.input`
        border:none;
        background-color: inherit;
        border-radius: 0.3rem;
        border-bottom: solid 1px rgb(129, 129, 129);
        margin-left: 0.5rem;
        align-self: end;
        font-size: 1.4rem;
        :focus {
            border: solid 2px#4466ff;
            background-color: white;
        }
    `;

    const MessageButton = styled.button`
        margin: 0 0.5rem 0 0.5rem;
        color: white;
        background-color: #4466ff;
        border: none;
        border-radius: 0.2rem;
        height: 2rem;
        align-self: end;
        cursor: pointer;
    `;