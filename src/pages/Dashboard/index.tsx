import React, {useCallback, useEffect, useMemo, useState} from "react";
import {isToday, format, parseISO, isAfter} from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import {useAuth} from "../../hooks/auth";
import DayPicker, {DayModifiers} from "react-day-picker";

import {
    Container,
    Header,
    HeaderContent,
    Profile,
    Content,
    Schedule,
    Calendar,
    NextAppointment,
    Section,
    Appointment
} from "./styles";
import 'react-day-picker/lib/style.css';

import logoImg from '../../assets/logo.svg';
import {FiClock, FiPower} from "react-icons/all";
import api from "../../services/api";

interface MonthAvailabilityItem {
    day: number;
    available: boolean;
}

interface AppointmentData {
    id: string;
    date: string;
    formattedHour: string;
    user: {
        name: string;
        avatar_url: string;
    }
}

const Dashboard: React.FC = () => {
    const { user, signOut } = useAuth();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [monthAvailability, setMonthAvailability] = useState<MonthAvailabilityItem[]>([]);
    const [appointments, setAppointments] = useState<AppointmentData[]>([]);

    const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
        if (modifiers.available && !modifiers.disabled) {
            setSelectedDate(day);
        }
    }, []);

    const handleMonthChange = useCallback((month: Date) => {
        setCurrentMonth(month);
    }, []);

    useEffect(() => {
        api.get(`/providers/${user.id}/month-availability`, {
            params: {
                year: currentMonth.getFullYear(),
                month: currentMonth.getMonth() + 1,
            }
        }).then(response => {
            setMonthAvailability(response.data);
        });
    }, [currentMonth, user.id]);

    useEffect(() => {
        api.get<AppointmentData[]>('/appointments/me', {
            params: {
                year: currentMonth.getFullYear(),
                month: currentMonth.getMonth() + 1,
                day: selectedDate.getDate(),
            }
        }).then(response => {
            const formattedAppointments = response.data.map(appointment => {
                return {
                    ...appointment,
                    formattedHour: format(parseISO(appointment.date), 'HH:mm'),
                }
            });

            setAppointments(formattedAppointments);
        });
    }, [currentMonth, selectedDate]);

    const morningAppointments = useMemo(() => {
        return appointments.filter(appointment => parseISO(appointment.date).getHours() <= 12);
    }, [appointments]);

    const afterNoonAppointments = useMemo(() => {
        return appointments.filter(appointment => parseISO(appointment.date).getHours() >= 13);
    }, [appointments]);

    const disableDays = useMemo(() => {
        return monthAvailability.filter(monthDay => !monthDay.available)
            .map(monthDay => new Date( currentMonth.getFullYear(), currentMonth.getMonth(), monthDay.day));
    }, [currentMonth, monthAvailability]);

    const selectedDateAsText = useMemo(() => format(selectedDate, "MMMM dd", {
        locale: enUS
    }), [selectedDate]);

    const selectedWeekDayAsText = useMemo(() => format(selectedDate, "cccc", {
        locale: enUS
    }), [selectedDate]);

    const nextAppointment = useMemo(() => {
        return appointments.find(appointment => isAfter(parseISO(appointment.date), new Date()));
    }, [appointments]);

    return (
        <Container>
            <Header>
                <HeaderContent>
                    <img src={logoImg} alt={"Go Barber"} />

                    <Profile>
                        { <img
                            src={user?.avatar_url ?? `https://ui-avatars.com/api/?name=${user.name}`}
                            alt={user.name}
                        />}

                        <div>
                            <span>Welcome,</span>
                            <strong>
                                {user.name}
                            </strong>
                        </div>
                    </Profile>

                    <button type="button" onClick={signOut}>
                        <FiPower />
                    </button>
                </HeaderContent>
            </Header>

            <Content>
                <Schedule>
                    <h1>Scheduled times</h1>
                    <p>
                        {isToday(selectedDate) && <span>Today</span>}
                        <span>{selectedDateAsText}</span>
                        <span>{selectedWeekDayAsText}</span>
                    </p>

                    {
                        isToday(selectedDate) && nextAppointment &&
                        <NextAppointment>
                            <strong>Next appointment</strong>
                            <div>
                                <img
                                    src={nextAppointment.user?.avatar_url ?? `https://ui-avatars.com/api/?name=${nextAppointment.user.name}`}
                                    alt={nextAppointment.user.name}
                                />
                                <strong>{nextAppointment.user.name}</strong>
                                <span>
                                    <FiClock />
                                    {nextAppointment.formattedHour}
                                </span>
                            </div>
                        </NextAppointment>
                    }

                    <Section>
                        <strong>Morning</strong>
                        {morningAppointments.length === 0 && (
                            <p>No appointments for this morning</p>
                        )}

                        {morningAppointments.map(appointment => (
                            <Appointment key={appointment.id}>
                                <span>
                                    <FiClock />
                                    {appointment.formattedHour}
                                </span>

                                <div>
                                    <img
                                        src={appointment.user?.avatar_url ?? `https://ui-avatars.com/api/?name=${appointment.user.name}`}
                                        alt={appointment.user.name}
                                    />
                                    <strong>{appointment.user.name}</strong>
                                </div>
                            </Appointment>
                        ))}
                    </Section>

                    <Section>
                        <strong>Afternoon</strong>

                        {afterNoonAppointments.length === 0 && (
                            <p>No appointments for this afternoon</p>
                        )}

                        {afterNoonAppointments.map(appointment => (
                            <Appointment key={appointment.id}>
                                <span>
                                    <FiClock />
                                    {appointment.formattedHour}
                                </span>

                                <div>
                                    <img
                                        src={appointment.user?.avatar_url ?? `https://ui-avatars.com/api/?name=${appointment.user.name}`}
                                        alt={appointment.user.name}
                                    />

                                    <strong>{appointment.user.name}</strong>
                                </div>
                            </Appointment>
                        ))}
                    </Section>
                </Schedule>
                <Calendar>
                    <DayPicker
                        disabledDays={[{ daysOfWeek: [0, 6] }, ...disableDays]}
                        modifiers={{
                            available: { daysOfWeek: [1, 2, 3, 4, 5]}
                        }}
                        onMonthChange={handleMonthChange}
                        selectedDays={selectedDate}
                        onDayClick={handleDateChange}
                        fromMonth={new Date()}
                    />
                </Calendar>
            </Content>
        </Container>
    );
};

export default Dashboard;
