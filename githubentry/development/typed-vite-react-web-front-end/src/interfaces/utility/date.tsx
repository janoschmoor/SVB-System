export default interface IDate {
    date: string;
    date_numeric: number;
    info?: string; // in case this date falls away due to holidays etc.
}