export type SessionState = {
  sessionId: string;

  currentStepIndex: number;

  answers: Record<string, any>;

  started: boolean;

  completed: boolean;

  createdAt: number;

  updatedAt: number;
};

/* ---------------------------- */

const sessions =
  new Map<string, SessionState>();

/* ---------------------------- */

export function createSession(
  sessionId: string
): SessionState {

  const newSession: SessionState = {

    sessionId,

    currentStepIndex: 0,

    answers: {},

    started: true,

    completed: false,

    createdAt: Date.now(),

    updatedAt: Date.now(),
  };

  sessions.set(
    sessionId,
    newSession
  );

  return newSession;
}

/* ---------------------------- */

export function getSession(
  sessionId: string
): SessionState {

  let session =
    sessions.get(sessionId);

  if (!session) {

    session =
      createSession(
        sessionId
      );
  }

  return session;
}

/* ---------------------------- */

export function updateSession(
  sessionId: string,

  updates: Partial<SessionState>
) {

  const session =
    getSession(sessionId);

  const updatedSession = {

    ...session,

    ...updates,

    updatedAt: Date.now(),
  };

  sessions.set(
    sessionId,
    updatedSession
  );

  return updatedSession;
}

/* ---------------------------- */

export function clearSession(
  sessionId: string
) {

  sessions.delete(
    sessionId
  );
}