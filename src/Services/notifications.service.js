
const AWS = require("aws-sdk");
const ServiceResponse = require('../Entity/Responses/service.response');
require('dotenv').config();


class NotificationsService {
    #snsDriver = null;
    constructor() {
        AWS.config.update({
            region: process.env.AWS_SNS_ACCESS_REGION,
            accessKeyId: process.env.AWS_SNS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SNS_SECRET_ACCESS_KEY
        });
        /** @var AWS.SNS #snsDriver */
        this.#snsDriver = new AWS.SNS({ apiVersion: "2010-03-31" });
    }

    async listTopics() {
        let response = new ServiceResponse();
        try {
            const {Topics} = await this.#snsDriver.listTopics({}).promise();
            if(Topics)
                response.success(Topics);
            else response.error(Topics);
        } catch (error) {
            response.error(error.message);
        } finally{
            return response.serialize();
        }
    }

    async publishEmail(subject, message) {
        let response = new ServiceResponse();
        try {
            const published = await this.#snsDriver.publish({
                TopicArn: "arn:aws:sns:us-west-1:332792034112:alarms",
                Subject: subject,
                Message: message
            }).promise();
            if(published)
                response.success(published.MessageId);
            else response.error(Topics);
        } catch (error) {
            response.error(error.message);
        } finally{
            return response.serialize();
        }
    }
}

module.exports = new NotificationsService();