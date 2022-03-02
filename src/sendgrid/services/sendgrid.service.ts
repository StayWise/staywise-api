import { Injectable } from "@nestjs/common";
import config from "src/config";
import ISendGrid, { MailDataRequired } from "@sendgrid/mail";
import { ETemplateID } from "../enums/templateId.enum";
const sgMail:typeof ISendGrid = require('@sendgrid/mail');

export type MailData = Omit<MailDataRequired, "from"> & { from?: string }; 

sgMail.setApiKey(config.sendgrid.key);

@Injectable()
export class SendgridService {
    constructor() {}

    public async sendMeetFormConfirmation({ to, name, url, address }) {
        return await this.sendEmail({
            to,
            subject: 'Meet Form Confirmation',
            dynamicTemplateData: {
                name,
                propertyURL: url,
                address,
            },
            templateId: ETemplateID.MEET_FORM_CONFIRMATION,
        });
    }

    public async sendMeetFormNotification({ to, fields }) {
        return await this.sendEmail({
            to,
            subject: "New Tenant Request Form",
            dynamicTemplateData: {
                ...fields
            },
            templateId: ETemplateID.MEET_FORM_NOTIFICATION
        });
    }

    public async sendEmail({ ...fields } : MailData) {
        const email: MailData = {
            from: config.sendgrid.from as string,
            ...fields,
        }
        await sgMail.send(email as MailDataRequired).catch((error) => { console.error(error) });
    }
}