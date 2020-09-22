import React from 'react'
import { IAttendee } from '../../../app/models/activity';
import { List, Image, Popup } from 'semantic-ui-react';

interface IProps {
    attendees: IAttendee[];
}

const ActivityListItemAttendees: React.FC<IProps> = ({ attendees }) => {
    return (
        <List horizontal>
            {attendees.map(attendee => (
                <List.Item key={attendee.username}>
                    <Popup
                        header={attendee.displayName}
                        trigger={
                            <Image size='mini' circular src={attendee.image || '/assets/user.png'} />
                        }
                    />
                </List.Item>
            ))}
        </List>
    )
}


export default ActivityListItemAttendees