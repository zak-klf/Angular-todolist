//create interface to export to create model for task

export interface Task {
    id?: number,
    text: string,
    day: string,
    reminder: boolean
}