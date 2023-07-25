import { env } from "process";
import { db } from "../utils/db.server";
import { ActivityReminder, TaskReminder } from "@prisma/client";

const nodemailer = require('nodemailer');
const fs = require('fs');
const mjml2html = require('mjml');

const mjmlTemplate = fs.readFileSync('D:/GitHub/MindMemo/backend/src/utils/template.mjml', 'utf8');
const { html } = mjml2html(mjmlTemplate, {});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

export const createActivityReminder = async (reminder: Omit<ActivityReminder, 'activity_reminder_id'>): Promise<ActivityReminder> => {
    return db.activityReminder.create({
        data: reminder,
        select: {
            activity_reminder_id: true,
            activity_id: true,
            reminder_date: true,
            user_id: true,
        }
    });
}

export const createTaskReminder = async (reminder: Omit<TaskReminder, 'task_reminder_id'>): Promise<TaskReminder> => {
    return db.taskReminder.create({
        data: reminder,
        select: {
            task_reminder_id: true,
            task_id: true,
            reminder_date: true,
            user_id: true,
        }
    });
}

export const getActivityReminders = async (user_id: string): Promise<ActivityReminder[]> => {
    return db.activityReminder.findMany({
        where: {
            user_id,
        },
        select: {
            activity_reminder_id: true,
            activity_id: true,
            reminder_date: true,
            user_id: true,
        }
    });
}

export const getTaskReminders = async (user_id: string): Promise<TaskReminder[]> => {
    return db.taskReminder.findMany({
        where: {
            user_id,
        },
        select: {
            task_reminder_id: true,
            task_id: true,
            reminder_date: true,
            user_id: true,
        }
    });
}

export const updateTaskReminder = async (reminder: TaskReminder): Promise<TaskReminder | null> => {
    return db.taskReminder.update({
        where: {
            task_reminder_id: reminder.task_reminder_id,
        },
        data: reminder,
        select: {
            task_reminder_id: true,
            task_id: true,
            reminder_date: true,
            user_id: true,
        }
    });
}

export const updateActivityReminder = async (reminder: ActivityReminder): Promise<ActivityReminder | null> => {
    return db.activityReminder.update({
        where: {
            activity_reminder_id: reminder.activity_reminder_id,
        },
        data: reminder,
        select: {
            activity_reminder_id: true,
            activity_id: true,
            reminder_date: true,
            user_id: true,
        }
    });
}

export const deleteActivityReminder = async (activity_reminder_id: number): Promise<ActivityReminder | null> => {
    return db.activityReminder.delete({
        where: {
            activity_reminder_id,
        },
        select: {
            activity_reminder_id: true,
            activity_id: true,
            reminder_date: true,
            user_id: true,
        }
    });
}

export const deleteTaskReminder = async (task_reminder_id: number): Promise<TaskReminder | null> => {
    return db.taskReminder.delete({
        where: {
            task_reminder_id,
        },
        select: {
            task_reminder_id: true,
            task_id: true,
            reminder_date: true,
            user_id: true,
        }
    });
}

export const sendActivityReminder = async (date: Date): Promise<Boolean> => {
    let reminders = await db.activityReminder.findMany({
        where: {
            reminder_date: date,
        },
        select: {
            activity_id: true,
            user_id: true,
        }
    });

    for (const reminder of reminders) {
        console.log("Sending activity reminder for activity " + reminder.activity_id);
        let user = await db.user.findUnique({
            where: {
                user_id: reminder.user_id,
            },
            select: {
                email: true,
            },
        });
        let activity = await db.activity.findUnique({
            where: {
                activity_id: reminder.activity_id,
            },
            select: {
                activity_name: true,
            },
        });

        if (user != null && activity != null) {
            const placeholders = {
                '{{type}}': 'Upcoming Activity',
                '{{name}}': activity.activity_name,
                '{{date}}': date.toDateString(),
                // Add more placeholders and their values as needed
              };
           
            // Function to replace placeholders in the HTML
            function replacePlaceholders(html: string, placeholders: Record<string, string>): string {
                const placeholderRegex = new RegExp(Object.keys(placeholders).join('|'), 'g');
                return html.replace(placeholderRegex, (matched) => placeholders[matched]);
              }
  
            // Use the replacePlaceholders function
            const replacedHtml = replacePlaceholders(html, placeholders);

            const mailOptions = {
                from: process.env.EMAIL,
                to: {},
                subject: 'Hello from MindMemo',
                html: replacedHtml,
              };

            mailOptions.to = 'bkghaghda@gmail.com';
            transporter.sendMail(mailOptions, function (error: any, info: { response: any; }) {
                if (error) {
                  console.log('Error:', error);
                } else {
                  console.log('Email sent:', info.response);
                }
              });
        }
    }

    return true;
}

export const sendTaskReminder = async (date: Date): Promise<Boolean> => {
    let reminders = await db.taskReminder.findMany({
        where: {
            reminder_date: date,
        },
        select: {
            task_id: true,
            user_id: true,
        }
    });

    for (const reminder of reminders) {
        console.log("Sending activity reminder for activity " + reminder.task_id);
        let user = await db.user.findUnique({
            where: {
                user_id: reminder.user_id,
            },
            select: {
                email: true,
            },
        });
        let task = await db.task.findUnique({
            where: {
                task_id: reminder.task_id,
            },
            select: {
                task_name: true,
            },
        });

        if (user != null && task != null) {
            const placeholders = {
                '{{type}}': 'Upcoming Task',
                '{{name}}': task.task_name,
                '{{date}}': date.toDateString(),
                // Add more placeholders and their values as needed
              };
           
            // Function to replace placeholders in the HTML
            function replacePlaceholders(html: string, placeholders: Record<string, string>): string {
                const placeholderRegex = new RegExp(Object.keys(placeholders).join('|'), 'g');
                return html.replace(placeholderRegex, (matched) => placeholders[matched]);
              }
  
            // Use the replacePlaceholders function
            const replacedHtml = replacePlaceholders(html, placeholders);

            const mailOptions = {
                from: process.env.EMAIL,
                to: {},
                subject: 'MindMemo',
                html: replacedHtml,
              };

            mailOptions.to = 'bkghaghda@gmail.com';
            transporter.sendMail(mailOptions, function (error: any, info: { response: any; }) {
                if (error) {
                  console.log('Error:', error);
                } else {
                  console.log('Email sent:', info.response);
                }
              });
        }
    }

    return true;
}

