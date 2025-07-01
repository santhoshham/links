import { ProfileHeader } from "@/components/ProfileHeader";
import { SocialLinks } from "@/components/SocialLinks";
import { ContactSection } from "@/components/ContactSection";
import { ThemeCustomizer } from "@/components/ThemeCustomizer";
import { Footer } from "@/components/Footer";

export default function Home() {
  const userId = 1; // Default user for demo
  const profileId = 1; // Default profile for demo

  return (
    <>
      <ThemeCustomizer />
      
      {/* Main Container */}
      <div className="container mx-auto px-4 py-8 max-w-md">
        <ProfileHeader userId={userId} />
        <SocialLinks profileId={profileId} />
        <ContactSection />
        <Footer />
      </div>

      {/* Background Decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary bg-opacity-10 rounded-full blur-3xl animate-bounce-gentle"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-secondary bg-opacity-10 rounded-full blur-3xl animate-bounce-gentle animation-delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-24 h-24 bg-purple-500 bg-opacity-10 rounded-full blur-3xl animate-bounce-gentle animation-delay-2000"></div>
      </div>
    </>
  );
}
