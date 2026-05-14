"use client";
import { FormEvent, useState } from "react";

type FormState = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<FormState>("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          ...data,
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      setStatus("success");
      form.reset();
    } catch (err) {
      console.error("Web3Forms error:", err);
      setStatus("error");
    }
  };

  return (
    <>
      <section
        id="contact"
        className="section-contact-2 position-relative pb-60 overflow-hidden"
      >
        <div className="container position-relative z-1">
          <div className="row align-items-center">
            <div className="col-lg-7 pb-5 pb-lg-0">
              <div className="position-relative">
                <div className="position-relative z-2">
                  <h3 className="text-primary-2 mb-3">Let's connect</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <input
                          type="text"
                          className="form-control bg-3 border border-1 rounded-3"
                          id="name"
                          name="name"
                          placeholder="Your name"
                          aria-label="username"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <input
                          type="text"
                          className="form-control bg-3 border border-1 rounded-3"
                          id="phone"
                          name="phone"
                          placeholder="Phone"
                          aria-label="phone"
                        />
                      </div>
                      <div className="col-md-6">
                        <input
                          type="email"
                          className="form-control bg-3 border border-1 rounded-3"
                          id="email"
                          name="email"
                          placeholder="Email"
                          aria-label="email"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <input
                          type="text"
                          className="form-control bg-3 border border-1 rounded-3"
                          id="subject"
                          name="subject"
                          placeholder="Subject"
                          aria-label="subject"
                          required
                        />
                      </div>
                      <div className="col-12">
                        <textarea
                          className="form-control bg-3 border border-1 rounded-3"
                          id="message"
                          name="message"
                          placeholder="Message"
                          aria-label="With textarea"
                          rows={5}
                          required
                          defaultValue={""}
                        />
                      </div>
                      <div className="col-12">
                        <button
                          type="submit"
                          className="btn btn-primary-2 rounded-2"
                          disabled={status === "sending"}
                        >
                          {status === "sending" ? "Sending..." : "Send Message"}
                          <i className="ri-arrow-right-up-line" />
                        </button>
                        {status === "success" && (
                          <p className="text-primary-2 mt-2 mb-0">
                            Message sent successfully!
                          </p>
                        )}
                        {status === "error" && (
                          <p className="text-danger mt-2 mb-0">
                            Failed to send. Please email directly at siamk417@gmail.com
                          </p>
                        )}
                      </div>
                    </div>
                  </form>
                </div>
                <div className="z-0 bg-primary-dark rectangle-bg z-1 rounded-3" />
              </div>
            </div>
            <div className="col-lg-5 d-flex flex-column ps-lg-8">
              <div className="d-flex align-items-center mb-3 position-relative d-inline-flex">
                <div className="d-inline-block">
                  <div className="icon-flip flex-nowrap icon-shape icon-xxl border border-1 rounded-3 bg-3">
                    <i className="ri-phone-fill text-primary-2 fs-26" />
                  </div>
                </div>
                <div className="ps-3 h-100">
                  <span className="text-400 fs-6">Phone Number</span>
                  <h6 className="mb-0">+880 1625 236569</h6>
                </div>
                <a
                  href="tel:+8801625236569"
                  className="position-absolute top-0 start-0 w-100 h-100"
                />
              </div>
              <div className="d-flex align-items-center mb-3 position-relative d-inline-flex">
                <div className="d-inline-block">
                  <div className="icon-flip flex-nowrap icon-shape icon-xxl border border-1 rounded-3 bg-3">
                    <i className="ri-mail-fill text-primary-2 fs-26" />
                  </div>
                </div>
                <div className="ps-3 h-100">
                  <span className="text-400 fs-6">Email</span>
                  <h6 className="mb-0">siamk417@gmail.com</h6>
                </div>
                <a
                  href="mailto:siamk417@gmail.com"
                  className="position-absolute top-0 start-0 w-100 h-100"
                />
              </div>
              <div className="d-flex align-items-center mb-3 position-relative d-inline-flex">
                <div className="d-inline-block">
                  <div className="icon-flip flex-nowrap icon-shape icon-xxl border border-1 rounded-3 bg-3">
                    <i className="ri-map-2-fill text-primary-2 fs-26" />
                  </div>
                </div>
                <div className="ps-3 h-100">
                  <span className="text-400 fs-6">Address</span>
                  <h6 className="mb-0">Dhaka, Bangladesh</h6>
                </div>
                <a
                  href="https://maps.google.com/maps?q=Dhaka,Bangladesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="position-absolute top-0 start-0 w-100 h-100"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
