const SESSION_KEY = "spark_session_id";

/* --------- */

function createNewSession() {

  const sessionId = crypto.randomUUID();

  localStorage.setItem( SESSION_KEY, sessionId );

  return sessionId; }

/* ------------ */

function getSessionId() {

  let sessionId = localStorage.getItem( SESSION_KEY );

  if (!sessionId) { sessionId = createNewSession(); }

  return sessionId; }

/* ----------- */

export async function sendMessage( message: string ) {

  const sessionId = getSessionId();

  const response = await fetch( "/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({ message, sessionId, }),
      }
    );
  return await response.json();
}

/* ----- */

export async function startConversation() {

  const sessionId = getSessionId();

  const response = await fetch( "/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({ message: "", sessionId, }),
      }
    );
  return await response.json();
}

/* ------- */

export async function resetChat() {
  const sessionId = getSessionId();

  await fetch( "/api/chat/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify({ sessionId, }),
    }
  );

  localStorage.removeItem( SESSION_KEY );
}

/* -------------------------- */

export async function resetAndStartConversation() {
  await resetChat();
  createNewSession();
  return await startConversation();
}