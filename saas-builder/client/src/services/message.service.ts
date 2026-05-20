export async function saveMessage(
  messageData: {
    chat_id: string;
    role: string;
    content: string;
    timestamp: string;
  }
) {

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/message/save`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify(
        messageData
      ),
    }
  );

  return response.json();
}