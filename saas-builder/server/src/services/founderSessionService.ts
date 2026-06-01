import { supabase } from "../config/supabase";
console.log( "SUPABASE URL:", process.env.SUPABASE_URL );

export async function saveFounderSession(
  sessionId: string,
  answers: Record<string, any>,
  report: any
) {
  console.log("SAVE FOUNDER SESSION STARTED");
  console.log("SESSION ID:", sessionId);
  console.log("ANSWERS:", answers);

  const contact =
    answers.founder_name || "";

  let founder_name = "";
  let founder_email = "";

  const emailMatch =
    contact.match(
      /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/
    );

  if (emailMatch) {

    founder_email =
      emailMatch[0];

    founder_name =
      contact
        .replace(
          founder_email,
          ""
        )
        .replace(",", "")
        .trim();

  } else {

    founder_name =
      contact.trim();
  }

  const { data, error } =
    await supabase
      .from("founder_sessions")
      .insert([{
        session_id: sessionId,

        founder_name,
        founder_email,

        founder_phone:
          answers.founder_phone,

        founder_city:
          answers.founder_city,

        founder_country:
          answers.founder_country,

        idea_raw_description:
          answers.idea_raw_description,

        idea_motivation:
          answers.idea_motivation,

        idea_type:
          answers.idea_type,

        business_stage:
          answers.business_stage,

        launch_city:
          answers.launch_city,

        launch_country:
          answers.launch_country,

        existing_businesses_count:
          answers.existing_businesses_count,

        existing_businesses_description:
          answers.existing_businesses_description,

        platform_preference:
          JSON.stringify(
            answers.platform_preference
          ),

        revenue_model:
          JSON.stringify(
            answers.revenue_model
          ),

        requires_ai:
          answers.requires_ai,

        ai_usecase_description:
          answers.ai_usecase_description,

        target_generation:
          JSON.stringify(
            answers.target_generation
          ),

        target_age_range:
          answers.target_age_range,

        target_gender:
          answers.target_gender,

        overall_score:
          report?.overall_score ?? null,

        report: report ?? null,
      }]).select();

  console.log("INSERT DATA:");
  console.log(data);

  console.log("INSERT ERROR:");
  console.log(error);

  if (error) {

    console.log(
      "FOUNDER SAVE ERROR"
    );

    console.log(error);
  }
}