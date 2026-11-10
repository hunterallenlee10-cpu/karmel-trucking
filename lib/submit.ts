// Front end only for the concept. Forms resolve locally and show the success state.

export type EstimatePayload = {
  services: string[];
  street: string;
  town: string;
  size: string;
  access: string;
  timing: string;
  notes: string;
  photoNames: string[];
  name: string;
  phone: string;
  email: string;
  contact: string;
};

export type QuestionPayload = { name: string; phone: string; question: string };

export async function submitEstimate(payload: EstimatePayload): Promise<void> {
  // TODO: POST to the n8n webhook at launch, e.g.
  // await fetch(process.env.NEXT_PUBLIC_ESTIMATE_WEBHOOK!, { method: "POST", body: JSON.stringify(payload) })
  void payload;
  await new Promise((r) => setTimeout(r, 600));
}

export async function submitQuestion(payload: QuestionPayload): Promise<void> {
  // TODO: POST to the same n8n webhook (type: "question") at launch.
  void payload;
  await new Promise((r) => setTimeout(r, 500));
}
