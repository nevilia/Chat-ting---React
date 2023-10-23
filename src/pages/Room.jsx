import { useState, useEffect } from 'react'
import {databases, DATABASE_ID, COLLECTION_ID_MESSAGES} from '../appwriteConfig'
import {ID, Query} from 'appwrite'
import {Trash2} from 'react-feather'


export default function Room() {

    const [messages, setMessages] = useState([])
    const [messageBody,setMessageBody] = useState('')

    useEffect(() => {getMessages()}, [])

    const handleSubmit= async (e) => {
        e.preventDefault()

        let payload = {
            body: messageBody
        }

        let response = await databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID_MESSAGES,
            ID.unique(),
            payload,
            
        )

        console.log('Created!', response)
        setMessages(prevState => [response, ...messages])
        setMessageBody('')
    }

    const getMessages = async () => {
        const response = await databases.listDocuments(
            DATABASE_ID, 
            COLLECTION_ID_MESSAGES,
            [
                Query.orderDesc('$createdAt'),
                Query.limit(20)
            ]
            )
        console.log('RESPONSE', response)
        setMessages(response.documents)
    }

    const deleteMessage = async (message_id) => {
        databases.deleteDocument(DATABASE_ID, COLLECTION_ID_MESSAGES, message_id)
        setMessages(prevState => messages.filter(message => message.$id !== message_id))
    }

  return (
    <main className='container'>
        <div className="room--container">

            <form onSubmit={handleSubmit} id="message--form">
                <div>
                    <textarea required maxLength="1000" placeholder="Say Something..." id="" onChange={(e) => setMessageBody(e.target.value)  } value={messageBody}>
                        
                    </textarea>
                </div>
                <div className='send-btn--wrapper'>
                    <input className='btn btn--secondary' type="submit" value="Send" />
                </div>
            </form>

            <div>
                {messages.map(message => (
                    <div key={message.$id} className='message--wrapper'>
                        <div className='message--header'>
                            <small className='message-timestamp'>{new Date(message.$createdAt).toLocaleString()}</small>
                        
                            <Trash2 className='delete--btn' 
                            onClick={() => {deleteMessage(message.$id)}}/>
                        
                        
                        </div>
                        
                        <div className='message--body'>
                            <span>{message.body}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </main>
  )
}