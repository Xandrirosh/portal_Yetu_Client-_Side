import { Toaster } from "react-hot-toast"
import { Outlet } from "react-router-dom"
import Axios from "./utils/Axios"
import SummaryApi from "./common/SummaryApi"
import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { setUserDetails } from './store/userSlice.js'
import '@n8n/chat/style.css'
import { createChat } from '@n8n/chat'
function App() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user);
  const fetchUserDatails = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.userDetails
      })
      if (response.data?.user) {
        dispatch(setUserDetails(response.data.user));
        localStorage.setItem('loginData', JSON.stringify({ user: response.data.user }));
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const storedLogin = localStorage.getItem('loginData');
    if (storedLogin) {
      const parsed = JSON.parse(storedLogin);
      if (parsed?.user) {
        dispatch(setUserDetails(parsed.user)); // Redux will update asynchronously
      }
    } else {
      fetchUserDatails(); // Also dispatches setUserDetails
    }
  }, []);


  useEffect(() => {
    const chatId = 'n8n-chat';
    const isChatMounted = () => !!document.getElementById(chatId);

    if (user?.role === 'Admin' && !isChatMounted()) {
      createChat({
        webhookUrl: 'https://gioko.app.n8n.cloud/webhook/756cf3b7-3cd2-48fd-9564-13f73fb503fc/chat',
        defaultLanguage: 'en',
        initialMessages: [
          'Hi there! 👋',
          'My name is Jessica. How can I assist you today?'
        ],
        i18n: {
          en: {
            title: 'Hi there! 👋',
            subtitle: "Start a chat. We're here to help you 24/7.",
            footer: '',
            getStarted: 'New Conversation',
            inputPlaceholder: 'Type your question..',
          },
        }
      });
    }

    if (user?.role !== 'Admin' && isChatMounted()) {
      const chatEl = document.getElementById(chatId);
      if (chatEl) chatEl.remove();
    }
  }, [user?.role]); // 👈 This now waits for Redux to update

  return (
    <>
      <main className='lg:min-h-[75vh] min-h-[75vh]'>
        <Outlet />
      </main>
      <Toaster />
    </>
  )
}

export default App
