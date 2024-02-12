

const StringToMinutes = (nowIndex, schedules) => {
    const startHourse  = Number(schedules[nowIndex][0][0] + schedules[nowIndex][0][1])
    const startMinutes = Number(schedules[nowIndex][0][3] + schedules[nowIndex][0][4])

    const endHourse    = Number(schedules[nowIndex][1][0] + schedules[nowIndex][1][1])
    const endMinutes   = Number(schedules[nowIndex][1][3] + schedules[nowIndex][1][4])

    const StartTime    = (startHourse * 60) + startMinutes;
    const EndTime      = (endHourse * 60) + endMinutes;

    const TotalTime = StartTime + EndTime;

    return {StartTime, EndTime, TotalTime}
}


export default StringToMinutes;
