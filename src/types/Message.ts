interface Message {
    id: number;
    title: string;
    type: string;
    image: string;
    description: string;
    pubDate: number;
    checked: boolean;
}

export default Message;