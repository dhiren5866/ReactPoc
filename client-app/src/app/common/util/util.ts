import { IActivity, IAttendee } from "../../models/activity";
import { IUser } from "../../models/user";
import { userInfo } from "os";

export const combineDateandTime = (date: Date, time: Date) => {
    const timestring = time.getHours() + ':' + time.getMinutes() + ':00';
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dateString = `${year}-${month}-${day}`;

    return new Date(dateString + ' ' + timestring);
}

export const setActivityProps = (activity: IActivity, user: IUser) => {
    activity.date = new Date(activity.date);
    activity.isGoing = activity.attendees.some(a => a.username === user.userName);
    activity.isHost = activity.attendees.some(a => a.username === user.userName && a.isHost);
};

export const createAttendee = (user: IUser): IAttendee => {
    return {
        displayName: user.displayName,
        isHost: false,
        username: user.userName,
        image: user.Image!

    }
}