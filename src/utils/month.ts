export function getMonthName(monthNumber: number) {
    const date = new Date();
    date.setMonth(monthNumber);

    // 👇️ using visitor's default locale
    return date.toLocaleString([], {
        month: 'long',
    });
}


export enum DayStatusEnum {
    prev = "prev",
    next = "next",
    cur = "cur"
}

export interface IDay {
    date: Date;
    status: DayStatusEnum;
    today: boolean;
}

export function getDaysByMonth(year: number, monthIndx: number): IDay[][] {
    const today = new Date();
    const todayDay = today.getDate();
    const todayMonth = today.getMonth();
    const curMonth = new Date(year, monthIndx, 1);
    const weekDay = curMonth.getDay();
    curMonth.setDate(curMonth.getDate() - 1);
    const prevMonthLastDay = curMonth.getDate();
    const nextMonth = new Date(year, monthIndx + 1, 1);
    nextMonth.setDate(nextMonth.getDate() - 1);
    const curMonthLastDay = nextMonth.getDate();

    const fullDays: IDay[][] = [];

    const days: IDay[] = [];

    //set current month days
    for (let i = 0; i < curMonthLastDay; i++) {
        var isToday = i + 1 === todayDay && monthIndx === todayMonth;
        days.push({ date: new Date(year, monthIndx, i + 1), status: DayStatusEnum.cur, today: isToday });
    }

    //set prev month days
    for (let w = 0; w < weekDay - 1; w++) {
        const d = prevMonthLastDay - w;
        days.unshift({ date: new Date(year, monthIndx - 1, d), status: DayStatusEnum.prev, today: false });
    }

    const rowNeededCount = 7;
    const curRowCount = Math.ceil(days.length / 7);
    //set next month days
    const daysLast = (rowNeededCount - curRowCount) * 7 - (days.length % 7 - 1);
    for (let d = 1; d < daysLast; d++) {
        days.push({ date: new Date(year, monthIndx + 1, d), status: DayStatusEnum.next, today: false });
    }

    //set rows    
    var rowIdx = -1;
    days.forEach((day, i) => {
        if (i % 7 === 0) {
            rowIdx++;
            fullDays.push([]);
        }
        fullDays[rowIdx].push(day);
    })
    return fullDays;
}