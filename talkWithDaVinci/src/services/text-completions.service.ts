export class TextCompletionService {
  private static instance: TextCompletionService | null = null;

  private constructor() {}

  public static service() {
    if (!this.instance) {
      this.instance = new TextCompletionService();
    }
    return this.instance;
  }

  public complete(question: string) {
    return fetch(import.meta.env.VITE_OPEN_AI_API_HOST + "completions", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPEN_AI_API_KEY}`,
      },
      method: "POST",
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: question,
        temperature: 0,
        max_tokens: 200,
      }),
    })
      .then((resp) => resp.json())
      .then((jsonResponse) => jsonResponse.choices[0].text);
  }

  public completeCreative(question: string) {
    return fetch(import.meta.env.VITE_OPEN_AI_API_HOST + "completions", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPEN_AI_API_KEY}`,
      },
      method: "POST",
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: question,
        temperature: 0.9,
        max_tokens: 200,
      }),
    })
      .then((resp) => resp.json())
      .then((jsonResponse) => jsonResponse.choices[0].text);
  }
}
