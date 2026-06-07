export async function saveMessage(
  messageData: {
    chat_id: string;
    role: string;
    content: string;
    timestamp: string;
  }
) 
{
  const response = await fetch( "/api/message/save",
    {
      method: "POST",
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify( messageData ),
    }
  );

  if (!response.ok) {
    throw new Error( "Failed to save message" );
  }

  return await response.json();
}