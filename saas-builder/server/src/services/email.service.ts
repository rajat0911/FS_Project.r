import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

/* ----------------------------- */

export async function sendThankYouEmail(
  name: string,
  email: string,
  subject: string,
  message: string
) {

  try {

    await resend.emails.send({

      from: "onboarding@resend.dev",

      to: email,

      subject: "Thank you for contacting SparkAI",

      html: `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: auto;">

          <h1>Thank You, ${name}</h1>

          <p>
            We have received your message and our team
            will review it shortly.
          </p>

          <hr />

          <h2>Your Submission</h2>

          <p>
            <strong>Subject:</strong>
            ${subject}
          </p>

          <p>
            <strong>Message:</strong>
          </p>

          <p>
            ${message}
          </p>

          <hr />

          <h2>About SparkAI</h2>

          <p>
            AI SaaS Consultant Platform
          </p>

          <p>
            Helping founders validate, build,
            and scale startup ideas.
          </p>

          <hr />

          <h2>Startup Analysis Report</h2>

          <p>
            No report generated yet.
          </p>

          <p>
            Complete a startup analysis
            inside SparkAI to receive
            personalized recommendations.
          </p>

          <hr />

          <p>
            Regards,
            <br />
            SparkAI Team
          </p>

        </div>
      `
    });

    console.log(
      "Thank-you email sent."
    );

  }

  catch (error) {

    console.log(
      "Email Error:",
      error
    );
  }
}