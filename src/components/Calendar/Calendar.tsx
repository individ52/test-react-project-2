import React, { FC, useState, useEffect, useMemo } from 'react';
import { useActions } from '../../hooks/useActions';
import { formateDate } from '../../utils/date';
import { DayStatusEnum, getDaysByMonth, getMonthName, IDay } from '../../utils/month';
import "./Calendar.css";
interface CalendartProps {

}

const Calendar: FC<CalendartProps> = ({ }) => {
    const [days, setDays] = useState<IDay[][]>([]);
    const [curDate, setCurDate] = useState<{ month: number, year: number, name: string }>();
    const [curDay, setCurDay] = useState<IDay>();

    const { fetchEvents, setDate } = useActions();


    useEffect(() => {
        const today = new Date();
        setCurDay({ date: today, status: DayStatusEnum.cur, today: true });
        setDate(formateDate(today));
        updateCurDate(today);
    }, []);

    const updateCurDate = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const monthName = getMonthName(month);
        setCurDate({ month, year, name: `${monthName}, ${year}` });
    }

    const setNextMonth = () => {
        if (curDate) {
            const nextMonth = new Date(curDate.year, curDate.month + 1, 1);
            updateCurDate(nextMonth);
        }
    };

    const setPrevMonth = () => {
        if (curDate) {
            const prevMonth = new Date(curDate.year, curDate.month - 1, 1);
            updateCurDate(prevMonth);
        }
    };

    useMemo(async () => {
        if (curDate) {
            const fullDays = await getDaysByMonth(curDate.year, curDate.month);
            setDays(fullDays);
        }
    }, [curDate]);

    useMemo(async () => {
        if (curDay && curDay.date) {
            setDate(formateDate(curDay.date));
        }
    }, [curDay]);

    return (    
        <div className="container">
            <div className="calendar">
                <header>
                    <h2>{curDate?.name}</h2>
                    <div onClick={setPrevMonth} className="btn-prev"><i className='arrow left'></i></div>
                    <div onClick={setNextMonth} className="btn-next"><i className='arrow right'></i></div>
                </header>
                <table>
                    <thead>
                        <tr>
                            <td>Mo</td>
                            <td>Tu</td>
                            <td>We</td>
                            <td>Th</td>
                            <td>Fr</td>
                            <td>Sa</td>
                            <td>Su</td>
                        </tr>
                    </thead>
                    <tbody>
                        {days.map((row, i) => {
                            return (
                                <tr key={i}>
                                    {row.map(day => {
                                        const classes = ["pulse"];

                                        if (day.today) classes.push("today");
                                        if (day.date.toLocaleDateString("en-US") === curDay?.date.toLocaleDateString("en-US")) classes.push("current-day");

                                        if (day.status === DayStatusEnum.prev) {
                                            classes.push("prev-month");
                                        } else if (day.status === DayStatusEnum.next) {
                                            classes.push("next-month");
                                        }

                                        return (
                                            <td
                                                key={day.date.getDate()}
                                                onClick={() => setCurDay(day)}
                                                className={classes.join(" ")}>
                                                {day.date.getDate()}
                                            </td>);

                                    })}
                                </tr>
                            )
                        })}
                        {/* <tr>
                            <td className="prev-month pulse">26</td>
                            <td className="prev-month pulse">27</td>
                            <td className="prev-month pulse">28</td>
                            <td className="prev-month pulse">29</td>
                            <td className="prev-month pulse">30</td>
                            <td className="prev-month pulse">31</td>
                            <td className="pulse">1</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>3</td>
                            <td>4</td>
                            <td>5</td>
                            <td>6</td>
                            <td>7</td>
                            <td>8</td>
                        </tr>
                        <tr>
                            <td>9</td>
                            <td className="event">10</td>
                            <td>11</td>
                            <td>12</td>
                            <td>13</td>
                            <td>14</td>
                            <td>15</td>
                        </tr>
                        <tr>
                            <td>16</td>
                            <td>17</td>
                            <td>18</td>
                            <td>19</td>
                            <td>20</td>
                            <td className="event">21</td>
                            <td>22</td>
                        </tr>
                        <tr>
                            <td className="current-day event">23</td>
                            <td>24</td>
                            <td>25</td>
                            <td>26</td>
                            <td>27</td>
                            <td>28</td>
                            <td>29</td>
                        </tr>
                        <tr>
                            <td>30</td>
                            <td className="next-month">1</td>
                            <td className="next-month">2</td>
                            <td className="next-month">3</td>
                            <td className="next-month">4</td>
                            <td className="next-month">5</td>
                            <td className="next-month">6</td>
                        </tr> */}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Calendar;