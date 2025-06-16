import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import { EventInput } from '@fullcalendar/core';
import { Aula } from '../../types/Aula';
import { useTema } from '../../hooks/useTema';
import './Calendar.css';

interface Props {
    aulas: Aula[];
}

const Calendar: React.FC<Props> = ({ aulas }) => {
    const [eventos, setEventos] = useState<EventInput[]>([]);
    const { corFundo } = useTema();

    useEffect(() => {
        const titulo = document.querySelector('.fc-toolbar-title');
        if (titulo) {
            (titulo as HTMLElement).style.color = corFundo;
        }
    }, [corFundo]);

    useEffect(() => {
        const eventosConvertidos: EventInput[] = [];
        aulas.forEach((aula) => {
            aula.presencas.forEach((presenca) => {
               const cor = presenca.presenca ? '#4CAF50' : '#F44336';

                eventosConvertidos.push({
                    title: aula.aula_nome,
                    start: new Date(presenca.dia_aula).toISOString().split('T')[0] + 'T' + aula.horario_inicio,
                    end: new Date(presenca.dia_aula).toISOString().split('T')[0] + 'T' + aula.horario_fim,
                    backgroundColor: cor
                });
            });
        });

        setEventos(eventosConvertidos);
    }, [aulas]);

    return (
        <div className='calendar-container'>
            <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin]} 
            initialView="timeGridWeek" 
            events={eventos} 
            height="auto" 
             locale={ptBrLocale}
            timeZone='local' 
            eventDisplay="block"
            slotMinTime="07:00:00"
            slotMaxTime="23:00:00"
        />
        </div>
    );
};

export default Calendar;