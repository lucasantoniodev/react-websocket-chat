export class ChatRepository {
      static async findAll() {
            const response = await fetch("http://localhost:3000/chat");
            const data = await response.json();
            return data;
      }

      static async countMessages() {
            const response = await fetch("http://localhost:3000/chat/count");
            const data = await response.json();
            return data;
      }
}
