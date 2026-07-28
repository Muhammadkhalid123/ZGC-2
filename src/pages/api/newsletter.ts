import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email } = body;

    // Server-side validation
    if (!email?.trim()) {
      return new Response(
        JSON.stringify({ success: false, message: 'Email address is required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ success: false, message: 'Please enter a valid email address.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Mock processing - print details to console (can be connected to Mailchimp, Loops, etc.)
    console.log(`[Form Submission] Newsletter subscription received:
Email: ${email}`);

    return new Response(
      JSON.stringify({ success: true, message: 'Successfully subscribed to the newsletter.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: 'Invalid payload or server error.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
