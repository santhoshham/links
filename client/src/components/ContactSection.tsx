import { Mail, Phone } from "lucide-react";

export function ContactSection() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 mb-8">
      <h3 className="text-lg font-semibold text-text mb-4 text-center">Get In Touch</h3>
      <div className="grid grid-cols-2 gap-3">
        <a
          href="mailto:alex@example.com"
          className="flex items-center justify-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <Mail className="text-gray-600 mr-2 w-4 h-4" />
          <span className="text-sm font-medium text-gray-700">Email</span>
        </a>
        <a
          href="tel:+1234567890"
          className="flex items-center justify-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <Phone className="text-gray-600 mr-2 w-4 h-4" />
          <span className="text-sm font-medium text-gray-700">Call</span>
        </a>
      </div>
    </div>
  );
}
