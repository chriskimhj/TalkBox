// fetches a socket connection using the hardcoded address
// TODO: move server address to a publicly inaccessible config file
// This function returns a connected websocket, but lacks a connection id
// The page following connection must wait for the id to be assigned before
// replacing the onmessage listener

// NOTE: if it refuses to establish a proper connection, you must
// navigate to https://70.72.184.45:8080 , select advanced and allow
// alternatively, https://localhost:8080 if you are working just on your local machine
let getSocket = (setSocketID) => {
    console.log('establishing socket connection')

    // for connecting to a test server on your local machine
    // let ws = new WebSocket("wss://localhost:8080")
    
    // for connecting to the persistant development server
    let ws = new WebSocket("wss://talk-box-server.herokuapp.com")

    ws.addEventListener('open', (e) => { 
        console.log("socket connection established")
    })

    ws.onmessage = (e) => {
        let msg = e.data
        console.log('received from socket: ', msg)
        // set context socket id to received value
        if (msg.startsWith('connection id:'))
            setSocketID(parseInt(msg.split(':')[1]))
    }

    ws.onclose = () => {
        setSocketID(-1)
    }

    // window.onbeforeunload = () => {
    //     setSocketID(-1)
    //     ws.onclose = () => {}
    //     ws.close()
    // }

    return ws;
}

export default getSocket;
