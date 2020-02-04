import React from 'react'
import io from 'socket.io-client'

export const CTX = React.createContext()



const initState = {
    'General': [
        // {
        //     avatar: 'https://picsum.photos/40', 
        //     from: 'Zach', 
        //     time: '12:22pm', 
        //     msg: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec quam ut dolor venenatis ornare consectetur non metus. Aenean ultricies risus a arcu rutrum, ac suscipit lacus dictum.' 
        // }, 
        
        // {
        //     avatar: 'https://picsum.photos/41', 
        //     from: 'Brian', 
        //     time: '12:23pm', 
        //     msg: 'Lucas ipsum dolor sit amet hutt kenobi kit lando vader skywalker lando darth bespin chewbacca. Calrissian palpatine vader kessel fett antilles moff coruscant darth. Skywalker dantooine wampa moff dooku antilles watto. Yavin skywalker jango boba fett skywalker aayla. Lando boba ponda dagobah mace kessel kessel qui-gon.' 
        // },
        
        // {
        //     avatar: 'https://picsum.photos/42', 
        //     from: 'Bri', 
        //     time: '12:24pm', 
        //     msg: 'Hey! you there, with the hands. Freak human out make funny noise mow mow mow mow mow mow success now attack human this is the day roll on the floor purring your whiskers off for stinky cat munch, munch, chomp, chomp, but spill litter box, scratch at owner, destroy all furniture, especially couch.' 
        // }
    ],
    'Topic 2': [
        // {
        //     avatar: 'https://picsum.photos/37', 
        //     from: 'Zach2', 
        //     time: '12:22pm', 
        //     msg: 'Different 1' 
        // }, 
        
        // {
        //     avatar: 'https://picsum.photos/38', 
        //     from: 'Brian2', 
        //     time: '12:22pm', 
        //     msg: 'Different 2' 
        // },
        
        // {
        //     avatar: 'https://picsum.photos/39', 
        //     from: 'Bri2', 
        //     time: '12:22pm', 
        //     msg: 'Different 3'
        // }
    ],
    'Topic 3' : [
        // {
        //     avatar: 'https://picsum.photos/43', 
        //     from: 'Zach3', 
        //     time: '12:22pm', 
        //     msg: 'Different 4' 
        // }, 
        
        // {
        //     avatar: 'https://picsum.photos/44', 
        //     from: 'Brian3', 
        //     time: '12:22pm', 
        //     msg: 'Different 5' 
        // },
        
        // {
        //     avatar: 'https://picsum.photos/45', 
        //     from: 'Bri3', 
        //     time: '12:22pm', 
        //     msg: 'Different 6' 
        // }
    ]
}

function reducer(state, action) {
    //destructuring action.payload from message variables
    const { topic, avatar, from, time, msg } = action.payload

    switch(action.type) {
        //different action go here
        case 'RECIEVE_MESSAGE':
            return {
                //bringing forward the whole current state 
                ...state,
                    //overwriting topic and defining as new array
                    [topic]: [
                        //bringing forward contents of topic to add new message to end
                        ...state[topic],
                            //adding new message
                            { avatar, from, time, msg }

                    ]
            }

        default: 
            return state
    }
}

let socket;

function sendChatAction(value) {
    socket.emit('chat message', value);
}

export default function Store(props) {


    //destructuring iterable 
    const [allChats, dispatch] = React.useReducer(reducer, initState)

    if(!socket) {
        socket = io(':3001')
        socket.on('chat message', function(msg){
            dispatch({type: 'RECIEVE_MESSAGE', payload: msg})
          });
    }


    return (
        <CTX.Provider value={{allChats, sendChatAction}}>
            {props.children}
        </CTX.Provider>
    )
}