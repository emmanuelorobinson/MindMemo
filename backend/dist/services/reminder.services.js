"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTaskReminder = exports.sendActivityReminder = exports.deleteTaskReminder = exports.deleteActivityReminder = exports.updateActivityReminder = exports.updateTaskReminder = exports.getTaskReminders = exports.getActivityReminders = exports.createTaskReminder = exports.createActivityReminder = void 0;
const db_server_1 = require("../utils/db.server");
const nodemailer = require('nodemailer');
const fs = require('fs');
const mjml2html = require('mjml');
const mjmlTemplate = `
<mjml>
     <mj-head>
         <mj-attributes>
         <mj-all font-family="Arial, sans-serif" />
         <mj-text font-size="16px" line-height="24px" color="#000000" />
         </mj-attributes>
     </mj-head>
     <mj-body>
         <mj-container background-color="#FFFFFF">
         <mj-section padding-bottom="20px">
             <mj-column> 
             <mj-text align="center" font-size="24px" font-weight="bold" color="#000">MindMemo</mj-text>
             <mj-divider border-color="#E5E5E5" padding-bottom="20px" />
                <!-- UPCOMING TASK/ACTIVITY-->
             <mj-text align="center" font-size="36px" font-weight="bold" color="#4F46E5">{{type}}</mj-text>
             <mj-text align="center" padding-top="30px">You have a reminder from MindMemo.</mj-text>
             <mj-text align="center">{{name}} is due on {{date}}</mj-text>
             <mj-button href="https://mind-memo.vercel.app/" background-color="#4F46E5" color="#F9FAFB" font-size="18px" padding="20px 40px" border-radius="4px" font-weight="bold" align="center" inner-padding="10px 25px">View Project</mj-button>
             </mj-column>
         </mj-section>
         </mj-container>
     </mj-body>
 </mjml>
`;
const { html } = mjml2html(mjmlTemplate, {});
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});
const createActivityReminder = (reminder) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.activityReminder.create({
        data: reminder,
        select: {
            activity_reminder_id: true,
            activity_id: true,
            reminder_date: true,
            user_id: true,
        }
    });
});
exports.createActivityReminder = createActivityReminder;
const createTaskReminder = (reminder) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.taskReminder.create({
        data: reminder,
        select: {
            task_reminder_id: true,
            task_id: true,
            reminder_date: true,
            user_id: true,
        }
    });
});
exports.createTaskReminder = createTaskReminder;
const getActivityReminders = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.activityReminder.findMany({
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
});
exports.getActivityReminders = getActivityReminders;
const getTaskReminders = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.taskReminder.findMany({
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
});
exports.getTaskReminders = getTaskReminders;
const updateTaskReminder = (reminder) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.taskReminder.update({
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
});
exports.updateTaskReminder = updateTaskReminder;
const updateActivityReminder = (reminder) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.activityReminder.update({
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
});
exports.updateActivityReminder = updateActivityReminder;
const deleteActivityReminder = (activity_reminder_id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.activityReminder.delete({
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
});
exports.deleteActivityReminder = deleteActivityReminder;
const deleteTaskReminder = (task_reminder_id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.taskReminder.delete({
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
});
exports.deleteTaskReminder = deleteTaskReminder;
const sendActivityReminder = (date) => __awaiter(void 0, void 0, void 0, function* () {
    let reminders = yield db_server_1.db.activityReminder.findMany({
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
        let user = yield db_server_1.db.user.findUnique({
            where: {
                user_id: reminder.user_id,
            },
            select: {
                email: true,
            },
        });
        let activity = yield db_server_1.db.activity.findUnique({
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
            function replacePlaceholders(html, placeholders) {
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
            mailOptions.to = user.email;
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log('Error:', error);
                }
                else {
                    console.log('Email sent:', info.response);
                }
            });
        }
    }
    return true;
});
exports.sendActivityReminder = sendActivityReminder;
const sendTaskReminder = (date) => __awaiter(void 0, void 0, void 0, function* () {
    let reminders = yield db_server_1.db.taskReminder.findMany({
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
        let user = yield db_server_1.db.user.findUnique({
            where: {
                user_id: reminder.user_id,
            },
            select: {
                email: true,
            },
        });
        let task = yield db_server_1.db.task.findUnique({
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
            function replacePlaceholders(html, placeholders) {
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
            mailOptions.to = user.email;
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log('Error:', error);
                }
                else {
                    console.log('Email sent:', info.response);
                }
            });
        }
    }
    return true;
});
exports.sendTaskReminder = sendTaskReminder;
