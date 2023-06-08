export interface ICalendar {
    id: string,
    events: Array<ICalendarEvent>;
}
export interface ICalendarEvent {
    id: string,
    type: string, // "holiday"
    name: string, // "Auffahrt"
    start: Date,
    end: Date,
}