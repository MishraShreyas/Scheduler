export default class Event {
    title!: string;
    description: string | undefined;
    start!: Date;
    end!: Date;
    userId!: string;
    location: string | undefined;
    isAllDay!: boolean;
    isRecurring!: boolean;
    recurrence!: {
        frequency: string;
        interval: number;
        daysOfWeek: number[]; // 0-6
        end: Date;
    }
    remindBefore: number | undefined;
    createdAt!: Date;
}