import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { EventClickArg, EventInput } from '@fullcalendar/core';
import { Aula } from '../../types/Aula';
import { useTema } from '../../hooks/useTema';
import './Calendar.css';

interface Props {
    aulas: Aula[];
    agendaSelecionada: number | null;
    abrirModalCriarAula: (dia: string, hora: string) => void;
    abrirModalEditarAula: (aula: Aula, data: string) => void;
}

const Calendar: React.FC<Props> = ({ aulas, agendaSelecionada, abrirModalCriarAula, abrirModalEditarAula }) => {
    const [eventos, setEventos] = useState<EventInput[]>([]);
    const { corFundo } = useTema();

    
    useEffect(() => {
        const titulo = document.querySelector('.fc-toolbar-title');
        if (titulo) {
            (titulo as HTMLElement).style.color = corFundo;
        }
    }, [corFundo]);

    useEffect(() => {
        if (!agendaSelecionada) {
            setEventos([]);
            return
        }

        const aulasFiltradas = aulas.filter((a) => a.agendas_id === agendaSelecionada);
        if (aulasFiltradas.length === 0) {
            setEventos([]);
            return
        }

        if (!aulas.length) return;

        const hoje = new Date();
        const InicioSemana = new Date(hoje);
        InicioSemana.setDate(hoje.getDate() - hoje.getDay());

        const diasDaSemana: Record<string, number> = {
            domingo: 0,
            segunda: 1,
            terca: 2,
            quarta: 3,
            quinta: 4,
            sexta: 5,
            sabado: 6
        };

        const eventosConvertidos: EventInput[] = [];

        aulas.forEach((aula) => {
            if (!aula.dia_da_semana) {
                console.error('Aula sem dia_da_semana:', aula)
                return;
            }
            
            const numeroDiaSemana = diasDaSemana[aula.dia_da_semana.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()];
            if (numeroDiaSemana === undefined) return;

            const dataAtual = new Date(InicioSemana);
            dataAtual.setDate(dataAtual.getDate() + (numeroDiaSemana - dataAtual.getDay() +7) % 7);

            const ateQuando = new Date();
            ateQuando.setMonth(ateQuando.getMonth() + 3);

            while (dataAtual <= ateQuando) {
                const dataFormatada = dataAtual.toISOString().split('T')[0];
                
                const presencaDoDia = aula.presencas.find((p) => {
                    const dataPresenca = new Date(p.dia_aula).toISOString().split('T')[0];
                return dataPresenca === dataFormatada;
            });
            const cor = presencaDoDia ? presencaDoDia.presenca === 1 ? '#4CAF50' : '#F44336' : '#BDBDBD';

            eventosConvertidos.push({
                id: `${aula.id}-${dataFormatada}`,
                title: aula.aula_nome,
                start: `${dataFormatada}T${aula.horario_inicio}`,
                end: `${dataFormatada}T${aula.horario_fim}`,
                backgroundColor: cor
            });

            dataAtual.setDate(dataAtual.getDate() + 7);
            }
        });

        setEventos(eventosConvertidos);
    }, [aulas]);

    const handleDateClick = (info: DateClickArg) => {   
        const [dia, hora] = info.dateStr.split('T');
        abrirModalCriarAula(dia, hora?.slice(0, 5) || '08:00');
    }

    const handleEventClick = (info: EventClickArg) => {
        const idPartes = info.event.id.split('-');
        const aulaId = Number(idPartes[0]);
        const dataStr = idPartes.slice(1).join('-');
        const aula = aulas.find((a) => a.id === aulaId);
        if (aula) {
            abrirModalEditarAula(aula, dataStr);
        }
    }

    return (
        <div className='calendar-container'>
            <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} 
            initialView="timeGridWeek" 
            events={eventos} 
            height="auto" 
            locale={ptBrLocale}
            timeZone='local' 
            allDaySlot={false}
            eventDisplay="block"
            slotMinTime="07:00:00"
            slotMaxTime="22:00:00"
            dateClick={handleDateClick}
            eventClick={handleEventClick}
        />
        </div>
    );
};

export default Calendar;