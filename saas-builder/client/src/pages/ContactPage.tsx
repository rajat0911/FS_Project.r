import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ContactPage() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "", });

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value, }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        console.log("Contact Form:", formData);
        alert("Contact form submitted. Backend integration coming next.");

        setFormData({ name: "", email: "", subject: "", message: "", });
    }

    return (
        <div className="min-h-screen px-6 py-12">

            <div className="max-w-6xl mx-auto">
                {/* HEADER */}

                <div className="mb-10 flex items-center justify-between">
                    <div>

                        <h1 className="text-5xl font-bold mb-3"> Contact Us </h1>

                        <p className="text-slate-400 text-lg">
                            Have questions, feedback, or partnership ideas?
                            We'd love to hear from you.
                        </p>
                    </div>

                    <button onClick={() => navigate("/")} className=" px-5 py-3 rounded-2xl border border-slate-700 hover:border-cyan-500/30 transition cursor-pointer " >
                        Back Home
                    </button>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* FORM */}

                    <div className=" lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-8 " >

                        <h2 className="text-2xl font-bold mb-6"> Send a Message </h2>

                        <form onSubmit={handleSubmit} className="space-y-5" >

                            <input type="text"
                                name="name" placeholder="Your Name" value={formData.name}
                                onChange={handleChange}
                                className=" w-full bg-slate-800 border border-slate-700 rounded-2xl px-4 py-3 outline-none " required />

                            <input type="email" name="email" placeholder="Your Email"
                                value={formData.email} onChange={handleChange}
                                className=" w-full bg-slate-800 border border-slate-700 rounded-2xl px-4 py-3 outline-none " required />

                            <input type="text" name="subject" placeholder="Subject"
                                value={formData.subject} onChange={handleChange}
                                className=" w-full bg-slate-800 border border-slate-700 rounded-2xl px-4 py-3 outline-none " required />

                            <textarea name="message" placeholder="Tell us how we can help..."
                                value={formData.message} onChange={handleChange} rows={6}
                                className=" w-full bg-slate-800 border border-slate-700 rounded-2xl px-4 py-3 outline-none resize-none " required />

                            <button type="submit"
                                className=" bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-8 py-3 rounded-2xl transition cursor-pointer " >
                                Send Message
                            </button>

                        </form>

                    </div>

                    {/* INFO PANEL */}

                    <div className=" bg-slate-900 border border-slate-800 rounded-3xl p-8 " >

                        <h2 className="text-2xl font-bold mb-6"> Get In Touch </h2>
                        <div className="space-y-6">

                            <div>
                                <p className="text-slate-400 mb-1"> Support Email </p>
                                <p> support@sparkai.com </p>
                            </div>

                            <div>
                                <p className="text-slate-400 mb-1"> Business Inquiries </p>
                                <p> partnerships@sparkai.com </p>
                            </div>

                            <div>
                                <p className="text-slate-400 mb-1"> Response Time </p>
                                <p> Within 24–48 hours </p>
                            </div>

                            <div>
                                <p className="text-slate-400 mb-1"> Product </p>
                                <p> AI SaaS Consultant Platform </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactPage;