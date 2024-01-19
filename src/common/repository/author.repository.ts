export class AuthorRepository {
      static async create(data: any) {
            const response = await fetch(
                  "http://localhost:3000/api/v1/authors",
                  {
                        method: "POST",
                        headers: {
                              "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                  }
            );

            if (!response.ok) {
                  throw new Error("Erro ao enviar dados");
            }

            return response.json();
      }
}
