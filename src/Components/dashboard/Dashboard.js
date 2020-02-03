import React from 'react'
import timon from './images/timon.jpg'
import pumba from './images/pumba.jpg'
import SelectBox from '../select-box/SelectBox'
import styled from 'styled-components'
import { CTX } from '../../Store'



export default function Dashboard() {

   

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

    const MessageWindow = styled.section`
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

     // CTx store
     const [allChats] = React.useContext(CTX)
     console.log(allChats)
 
     const topics = Object.keys(allChats)
 
     const [activeTopic, changeActiveTopic] = React.useState(topics[0])
     const [msgTextValue, changeMsgTextValue] = React.useState('')

    return(
        // Grid Parent
        <ChatWrapper >

            <Navigation>
                        <SelectBox
                            topics= {topics}
                            onChange={changeActiveTopic}
                        />
                        <h1>!{activeTopic}!</h1>
            </Navigation>
    
            <ChatWindow>

                <ChatContainer>
                    <UserAvatar src={pumba} alt="User Avatar"/>

                    <Header>Pumba1234 <ChatTime>12:24pm</ChatTime></Header>

                    <ChatMessage>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus perferendis recusandae incidunt quos quisquam ratione laboriosam officia reprehenderit pariatur facere, atque, illum quidem? Voluptas, cupiditate nemo. Perferendis unde odit dolorem?
                    </ChatMessage>
                </ChatContainer>

                <ChatContainer>
                    <UserAvatar src={timon} alt="User Avatar"/>

                    <Header>Timon8996 <ChatTime>12:30pm</ChatTime></Header>

                    <ChatMessage>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus perferendis recusandae incidunt quos quisquamratione laboriosam officia reprehenderit pariatur facere, atque, illum quidem? Voluptas, cupiditate nemo.Perferendis unde odit dolorem?
                    </ChatMessage>
                </ChatContainer>

            </ChatWindow>
    
            {/* text input with button to send messages */}
            <MessageWindow>
                <MessageText type="text" placeholder="Send a chat" value={msgTextValue} onChange={e => changeMsgTextValue(e.target.value)} />
                <MessageButton type="button">Send</MessageButton>
            </MessageWindow>
    
        </ChatWrapper>
    )
}