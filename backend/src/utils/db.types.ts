type User = {
    first_name: string;
    last_name: string;
    email: string;
    username: string;
}

type Project = {
    project_name: string;
    project_start_date: Date;
    duration: number;
    days_till_renew: number;
    completed: boolean;
    // project_list_id: number;
}

type ProjectList = {
    project_list_id: number;
    user_id: number;
}

type Activity = {
    activity_name: string;
    activity_number: number;
    duration: number;
    completed: boolean;
    note: string;
}

type ActivityList = {
    activity_list_id: number;
    project_id: number;
}

type Task = {
    task_name: string;
    task_number: number;
    days_till_due: number;
    completed: boolean;
    note: string;
}

type TaskList = {
    task_list_id: number;
    activity_id: number;
}

type Tag = {
    tag_name: string;
}

type ActivityTagList = {
    activity_tag_list_id: number;
    activity_id: number;
}

type TaskTagList = {
    task_tag_list_id: number;
    task_id: number;
}

export type { 
    User, 
    Project,
    ProjectList,
    Activity,
    ActivityList,
    Task,
    TaskList,
    Tag,
    ActivityTagList,
    TaskTagList,
};