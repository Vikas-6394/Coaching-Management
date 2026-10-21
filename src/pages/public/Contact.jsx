import React from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from '../../context/ToastContext';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export const Contact = () => {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful }
  } = useForm();

  const onSubmit = (data) => {
    // Client-side demo submission
    toast.success(
      `Thank you ${data.name}! We have received your inquiry regarding "${data.subject}". Our admissions counselor will contact you at ${data.phone}.`,
      "Inquiry Submitted"
    );
    reset();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Contact Our Admissions Team
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          Have questions regarding JEE/NEET batches, scholarship tests, or fee structures? Speak with an academic advisor today.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-6">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              Campus Headquarters
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-slate-800 dark:text-slate-200 block">Noida Main Campus</strong>
                  EduManage Tower, Plot 14, Sector 62, Institutional Area, Noida, UP 201309
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-slate-800 dark:text-slate-200 block">Student Helpline</strong>
                  +91 1800-200-9944 / +91 98110 99881
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-slate-800 dark:text-slate-200 block">Email Admissions</strong>
                  admissions@edumanage.com / counseling@edumanage.com
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-slate-800 dark:text-slate-200 block">Counseling Hours</strong>
                  Monday to Saturday: 8:30 AM – 7:30 PM (IST)
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-xs text-blue-800 dark:text-blue-300">
            <p className="font-bold mb-1">Scholarship & Aptitude Test (EST):</p>
            <p className="opacity-90">Walk-in diagnostic assessment available every Sunday at 10 AM. Up to 100% merit tuition waiver for top rankers.</p>
          </div>
        </div>

        {/* Contact Form with React Hook Form validation */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-6">
              Send an Academic Inquiry
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    {...register("name", { required: "Full name is required" })}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 ${
                      errors.name ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  />
                  {errors.name && <p className="text-xs text-rose-500">{errors.name.message}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Please enter a valid email"
                      }
                    })}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 ${
                      errors.email ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  />
                  {errors.email && <p className="text-xs text-rose-500">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    {...register("phone", {
                      required: "Phone number is required",
                      minLength: { value: 10, message: "Enter at least 10 digits" }
                    })}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 ${
                      errors.phone ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  />
                  {errors.phone && <p className="text-xs text-rose-500">{errors.phone.message}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Target Course / Subject <span className="text-rose-500">*</span>
                  </label>
                  <select
                    {...register("subject", { required: "Please select a target program" })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="">Select a course</option>
                    <option value="JEE Advanced Pinnacle">JEE Advanced Pinnacle Batch</option>
                    <option value="NEET Elite Medical">NEET Elite Medical Foundation</option>
                    <option value="Class 12 Boards Accelerator">Class 12 Boards Accelerator</option>
                    <option value="Full Stack Web Mastery">Full Stack Web Mastery</option>
                    <option value="Mathematics Olympiad">Mathematics Olympiad & Calculus</option>
                    <option value="General Counseling">General Admission Counseling</option>
                  </select>
                  {errors.subject && <p className="text-xs text-rose-500">{errors.subject.message}</p>}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Message / Questions <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your current class, syllabus questions, or campus visit preference..."
                  {...register("message", {
                    required: "Message is required",
                    minLength: { value: 10, message: "Please enter at least 10 characters" }
                  })}
                  className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 ${
                    errors.message ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
                {errors.message && <p className="text-xs text-rose-500">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all hover:scale-101 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry (Demo)</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
