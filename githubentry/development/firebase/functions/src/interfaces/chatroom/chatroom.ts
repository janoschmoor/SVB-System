import { IUserPreview } from "../user/user";

export default interface IChatRoom {
    readonly id: string;
    title: string;
    description: string;
    users: Array<IUserPreview>
    messages: Array<IMessage>
}
export interface IChatRoomPreview {
    readonly id: string;
    title: string;
    description: string;
}

export interface IMessage {
    readonly id: string;
    sender_id: string;
    message: string;
    time_numeric: number;
}