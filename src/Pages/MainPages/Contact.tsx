import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";

function Contact() {
  const form = useRef<HTMLFormElement | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm(
          "your_service_id", // replace with your EmailJS service ID
          "your_template_id", // replace with your EmailJS template ID
          form.current,
          "your_user_id" // replace with your EmailJS user ID
        )
        .then(
          (result) => {
            console.log(result.text);
            setIsSubmitted(true);
            setError(null); // Clear any previous errors
          },
          (error) => {
            console.error(error.text);
            setError("Failed to send message. Please try again.");
          }
        );
    }
  };

  return (
    <div className="flex items-center justify-center mt-20 p-6">
      <div className="bg-white shadow-lg p-8 rounded-lg max-w-[600px] w-full">
        <h1 className="text-2xl font-bold text-yellow-500 mb-6">Contact Us</h1>

        {isSubmitted ? (
          <div className="text-green-500 text-center">
            <p>Your message has been sent successfully!</p>
          </div>
        ) : (
          <form
            ref={form}
            onSubmit={sendEmail}
            className="flex flex-col space-y-4"
          >
            <label className="text-lg text-semiBlack">
              Name:
              <input
                type="text"
                name="user_name"
                className="w-full border border-gray-300 p-2 mt-1 rounded-lg"
                required
              />
            </label>

            <label className="text-lg text-semiBlack">
              Email:
              <input
                type="email"
                name="user_email"
                className="w-full border border-gray-300 p-2 mt-1 rounded-lg"
                required
              />
            </label>

            <label className="text-lg text-semiBlack">
              Message:
              <textarea
                name="message"
                className="w-full border border-gray-300 p-2 mt-1 rounded-lg"
                rows={5}
                required
              />
            </label>

            <button
              type="submit"
              className="bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
            >
              Send Message
            </button>

            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          </form>
        )}
      </div>
    </div>
  );
}

export default Contact;
