import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export function e15aTOd() {
    const today = dayjs();
    console.log(today.add(7, 'day').format('MM-DD'));
    console.log(today.add(1, 'month').format('MM-dd'));
    console.log(today.subtract(1, 'month').format('MM-dddd'));    
}

export function isWeekend(date) {
    const dateInWeek = date.format('dddd');
    if (dateInWeek === 'Sunday'||dateInWeek === 'Saturday') {
        return true;
    } else {
        return false;
    }
}

export default {
  e15aTOd,
  isWeekend,
};