// import React from 'react'
// import io from "socket.io-client";

// class Dummy extends React.Component {
//     constructor(props) {
//         super(props)
//     }

//     componentDidMount() {
//         // console.log("mounted!")
//     	// var socket = io.io('http://127.0.0.1:9080');
//         this.testing()
//     }

//     // useSocket(url) {
//     //     const [socket, setSocket] = useState(null)

//     //     useEffect(() => {
//     //         const socketIo = io(url)

//     //         setSocket(socketIo)

//     //         function cleanup() {
//     //             socketIo.disconnect()
//     //         }
//     //         return cleanup

//     //         // should only run once and not on every re-render,
//     //         // so pass an empty array
//     //     }, [])

//     //     return socket
//     // }

//     testing() {
//         // const socket = io('http://127.0.0.1:3000')
// 		// var socket = io({transports: ['websocket']});
//         var socket = io()


//         // useEffect(() => {
//         //     function handleEvent(payload) {
//         //         console.log(payload)
//         //         // HelloWorld
//         //     }
//         //     // if (socket) {
//         //     //     socket.on('SOME_EVENT', handleEvent)
//         //     // }
//         // }, [socket])

//       }

//     render() {
//         return (
//             <div>
//                 Dummystuff!
//             </div>
//         )
//     }
// }

// export default Dummy;


import { useEffect } from 'react'
import io from 'socket.io-client'

const Dummy = () => {
  useEffect(() => {
    fetch('/api/socketio').finally(() => {
      const socket = io()

      socket.on('connect', () => {
        console.log('connect')
        socket.emit('hello')
      })

      socket.on('hello', data => {
        console.log('hello', data)
      })

      socket.on('a user connected', () => {
        console.log('a user connected')
      })

      socket.on('disconnect', () => {
        console.log('disconnect')
      })
    })
  }, []) // Added [] as useEffect filter so it will be executed only once, when component is mounted

  return <h1>Socket.io</h1>
}

export default Dummy;