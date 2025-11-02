import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useEffect, useState } from 'react';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import EventForm from './EventForm';
import toast from 'react-hot-toast';

const EventCalendar = ({ onSuccess }) => {
    const [events, setEvents] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedDateInfo, setSelectedDateInfo] = useState(null);


    const handleDateClick = (info) => {
        setSelectedDateInfo(info);
        setModalOpen(true);
    };

    const handleAddEvent = async (newEvent) => {
        try {
            const response = await Axios({
                ...SummaryApi.createEvent,
                data: newEvent
            })
            const { data: responseData } = response
            if (responseData.success && responseData.data) {
                toast.success(responseData.message || 'Event added successfully');
                setEvents((prevEvents) => [...prevEvents, responseData.data]);
                setModalOpen(false);
                onSuccess && onSuccess();
            } else {
                toast.error(responseData.message || 'Failed to add event');
                console.warn('Unexpected response format:', responseData);
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    return (
        <div className='w-full h-full'>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                height="100%"
                events={events}
                dateClick={handleDateClick}
            />
            <EventForm
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleAddEvent}
                dateInfo={selectedDateInfo}
            />
        </div>

    )
}

export default EventCalendar