const SESSION_KEY =
  "spark_session_id";

/* -------------------------- */

function getSessionId() {

  let sessionId =
    localStorage.getItem(
      SESSION_KEY
    );

  if (!sessionId) {

    sessionId =
      crypto.randomUUID();

    localStorage.setItem(
      SESSION_KEY,
      sessionId
    );
  }

  return sessionId;
}

/* -------------------------- */

export async function sendMessage(
  message: string
) {

  const sessionId =
    getSessionId();

  const response =
    await fetch(
      "/chat",
      {

        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({

          message,

          sessionId,
        }),
      }
    );

  const data =
    await response.json();

  return data;
}

/* -------------------------- */

export async function startConversation() {

  const sessionId =
    getSessionId();

  const response =
    await fetch(
      "/chat",
      {

        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({

          message: "",

          sessionId,
        }),
      }
    );

  const data =
    await response.json();

  return data;
}

/* -------------------------- */

export async function resetChat() {

  const sessionId =
    getSessionId();

  await fetch(
    "/chat/reset",
    {

      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        sessionId,
      }),
    }
  );

  localStorage.removeItem(
    SESSION_KEY
  );
}