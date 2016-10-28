export class Endpoint {

    constructor(private env: string) {
    }

    query(params?: string) {

        if (this.env === 'dev') {
            return "/rest/data.json";
        } else if (this.env === 'prod') {
            return "/rest/message" + (params ? params : '');
        } else {
            return this.env + "/rest/message" + (params ? params : '');
        }
    }

    type(type: string) {

        if (this.env === 'dev') {
            return "/rest/data.unread.json";
        } else if (this.env === 'prod') {
            return "/rest/message/type/" + type;
        } else {
            return this.env + "/rest/message/type/" + type;
        }
    }

    sse() {

        if (this.env === 'dev') {
            return "/see";
        } else if (this.env === 'prod') {
            return "/sse";
        } else {
            return this.env + "/sse";
        }
    }
}

export default Endpoint;