import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import toast, { Toaster } from "react-hot-toast";

function Contact() {
  const form = useRef<HTMLFormElement | null>(null);

  // State for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Basic email validation function
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    if (name.trim() === "") {
      toast.error("Name is required");
      return false;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (message.trim().length < 10) {
      toast.error("Message must be at least 10 characters long");
      return false;
    }

    return true;
  };

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm() && form.current) {
      emailjs
        .sendForm(
          "service_83b9wr8", // replace with your EmailJS service ID
          "template_z86a72b", // replace with your EmailJS template ID
          form.current,
          "vMwh9erRXyZVYeoOs" // replace with your EmailJS user ID
        )
        .then(
          (result) => {
            console.log(result.text);
            setName("");
            setEmail("");
            setMessage("");
            toast.success("Your message has been sent successfully!");
            // Clear any previous errors
          },
          (error) => {
            console.error(error.text);
            toast.error("Failed to send message. Please try again.");
          }
        );
    }
  };

  return (
    <div className=" flex-1 flex items-center justify-center mt-20 p-6">
      <Toaster position="top-right" reverseOrder={false} />{" "}
      <div className="bg-white shadow-lg p-8 rounded-lg max-w-[600px] w-full">
        <h1 className="text-2xl font-bold text-yellow-500 mb-6">Contact Us</h1>

        <form
          ref={form}
          onSubmit={sendEmail}
          className="flex flex-col space-y-4"
        >
          {/* Name input */}
          <label className="text-lg text-semiBlack">
            Name:
            <input
              type="text"
              name="user_name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 p-2 mt-1 rounded-lg focus:outline-none"
              required
            />
          </label>

          {/* Email input */}
          <label className="text-lg text-semiBlack">
            Email:
            <input
              type="email"
              name="user_email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-2 mt-1 rounded-lg focus:outline-none"
              required
            />
          </label>

          {/* Message input */}
          <label className="text-lg text-semiBlack">
            Message:
            <textarea
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-gray-300 p-2 mt-1 rounded-lg focus:outline-none"
              rows={5}
              required
            />
          </label>

          <button
            type="submit"
            className="bg-yellow text-white py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
