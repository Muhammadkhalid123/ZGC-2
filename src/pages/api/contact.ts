import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, phone, email, message } = body;

    // Server-side validation
    if (!name?.trim() || !phone?.trim() || !email?.trim() || !message?.trim()) {
      return new Response(
        JSON.stringify({ success: false, message: 'All fields are required.' }),
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

    if (phone.trim().length < 10) {
      return new Response(
        JSON.stringify({ success: false, message: 'Please enter a valid phone number.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Mock processing - print details to console (can be connected to EmailJS, Resend, or database)
    console.log(`[Form Submission] Contact query received:
Name: ${name}
Phone: ${phone}
Email: ${email}
Message: ${message}`);

    return new Response(
      JSON.stringify({ success: true, message: 'Message logged successfully.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: 'Invalid payload or server error.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
