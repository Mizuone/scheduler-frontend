import { RGBColor } from "../theme/Colors";

export const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export interface CurrentDayDate {
    date: Date;
    dayOfWeek: string;
    dayOfMonth: string;
    isCurrentDay: boolean;
}

export const getCurrentWeekDates = (): CurrentDayDate[] => {
    const currentDate: Date = new Date();
    const currentDay: number = currentDate.getDay();

    return daysOfWeek.reduce((acc: CurrentDayDate[], dayOfWeek: string, index: number) => {
        const date = new Date(currentDate);
        const dayDiff = index - currentDay;

        if (dayDiff !== 0) {
            date.setDate(currentDate.getDate() + dayDiff);
        }

        acc.push({
            date,
            dayOfWeek,
            dayOfMonth: date.getDate().toString(),
            isCurrentDay: dayDiff === 0
        });

        return acc;
    }, []);
}

export const getShortSchedule = (): CurrentDayDate[] => {
    const currentDate: Date = new Date();
    let currentDay: number = currentDate.getDay();

    let previousDay: number = currentDay - 1;
    let nextDay: number = currentDay + 1;

    if (currentDay + 1 > daysOfWeek.length) nextDay = 0;
    if (currentDay - 1 < 0) previousDay = 6;

    const previousDate = new Date();
    previousDate.setDate(currentDate.getDate() - 1);

    const nextDate = new Date();
    nextDate.setDate(currentDate.getDate() + 1);

    let closestDates: CurrentDayDate[] = [
        {
            date: previousDate,
            dayOfWeek: daysOfWeek[previousDay],
            dayOfMonth: previousDate.getDate().toString(),
            isCurrentDay: false,
        },
        {
            date: currentDate,
            dayOfWeek: daysOfWeek[currentDay],
            dayOfMonth: currentDate.getDate().toString(),
            isCurrentDay: true,
        },
        {
            date: nextDate,
            dayOfWeek: daysOfWeek[nextDay],
            dayOfMonth: nextDate.getDate().toString(),
            isCurrentDay: false,
        },
    ];

    return closestDates;
}

export const hexToRGB = (hex: string): RGBColor => {
    const hexRegex = /^#?([A-Fa-f\d]{6}|[A-Fa-f\d]{3})$/;
    if (!hexRegex.test(hex)) {
        throw new Error('Invalid hex color format');
    }
    hex = hex.replace('#', '');
    const separatedHex = hex.match(/.{2}/g);

    const [r, g, b] = separatedHex ? separatedHex.map(value => parseInt(value, 16)) : [0, 0, 0];

    return { r, g, b };
}

export const getComputedStyleValue = (propertyName: string): string => {
    return getComputedStyle(document.documentElement).getPropertyValue(propertyName);
}