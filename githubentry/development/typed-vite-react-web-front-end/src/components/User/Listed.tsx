import React, { FunctionComponent } from 'react'
import { CheckCircle, CheckSquareFill, DashSquareFill, HourglassSplit, Pause, PauseBtnFill, PauseCircle } from 'react-bootstrap-icons';
import { IUserPreviewAdmin } from '../../interfaces/user/user';

export default function ListedUserPreview(props: {user: IUserPreviewAdmin, onClick: any}) {

    return (
        <tr onClick={() => {props.onClick(props.user)}}>
            <td>{props.user.status == "active" ? <CheckCircle color="rgb(40, 200, 10)"/> : <PauseCircle color="rgb(250, 200, 10)"/>}</td>
            <td>{props.user.first_name}</td>
            <td>{props.user.last_name}</td>
            <td>{props.user.email}</td>
            <td>{props.user.date_of_birth}</td>
        </tr>
        
    )
}
