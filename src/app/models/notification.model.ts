export class Notification {
    constructor(public notificationId: number, public senderId: number, public receiverId: number, public pollId: number, public type: string, public accepted: boolean, public answered: boolean, public senderName: string, public pollName: string, public receiverName: string) {
    }
}
