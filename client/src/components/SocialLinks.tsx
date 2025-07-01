import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SocialLink } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { ExternalLink } from "lucide-react";
import { 
  SiInstagram, 
  SiYoutube, 
  SiLinkedin, 
  SiX, 
  SiTiktok, 
  SiSpotify
} from "react-icons/si";
import { Globe, Mail } from "lucide-react";

interface SocialLinksProps {
  profileId: number;
}

const getPlatformIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case "instagram":
      return <SiInstagram className="text-white text-xl" />;
    case "youtube":
      return <SiYoutube className="text-white text-xl" />;
    case "linkedin":
      return <SiLinkedin className="text-white text-xl" />;
    case "twitter":
      return <SiX className="text-white text-xl" />;
    case "tiktok":
      return <SiTiktok className="text-white text-xl" />;
    case "spotify":
      return <SiSpotify className="text-white text-xl" />;
    case "website":
      return <Globe className="text-white text-xl" />;
    case "newsletter":
      return <Mail className="text-white text-xl" />;
    default:
      return <Globe className="text-white text-xl" />;
  }
};

const getPlatformColors = (platform: string) => {
  switch (platform.toLowerCase()) {
    case "instagram":
      return "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400";
    case "youtube":
      return "bg-red-500";
    case "linkedin":
      return "bg-blue-600";
    case "twitter":
      return "bg-blue-400";
    case "tiktok":
      return "bg-black";
    case "spotify":
      return "bg-green-500";
    case "website":
      return "bg-gradient-to-r from-primary to-secondary";
    case "newsletter":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
};

export function SocialLinks({ profileId }: SocialLinksProps) {
  const queryClient = useQueryClient();

  const { data: links = [], isLoading } = useQuery<SocialLink[]>({
    queryKey: [`/api/profile/${profileId}/links`],
  });

  const trackClickMutation = useMutation({
    mutationFn: async (linkId: number) => {
      await apiRequest("POST", `/api/links/${linkId}/click`);
    },
  });

  const handleLinkClick = async (link: SocialLink) => {
    // Track the click
    trackClickMutation.mutate(link.id);
    
    // Open the link
    window.open(link.url, "_blank", "noopener,noreferrer");
  };

  if (isLoading) {
    return (
      <div className="space-y-4 mb-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 rounded-2xl p-5 h-20"></div>
          </div>
        ))}
      </div>
    );
  }

  const activeLinks = links.filter(link => link.isActive);

  return (
    <div className="space-y-4 mb-8">
      {activeLinks.map((link, index) => (
        <button
          key={link.id}
          onClick={() => handleLinkClick(link)}
          className={`social-button block w-full rounded-2xl p-5 shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 ${
            link.platform === "website" 
              ? "bg-gradient-to-r from-primary to-secondary text-white" 
              : "bg-white hover:bg-gray-50"
          }`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${getPlatformColors(link.platform)}`}>
              {getPlatformIcon(link.platform)}
            </div>
            <div className="flex-1 text-left">
              <h3 className={`font-semibold ${link.platform === "website" ? "text-white" : "text-text"}`}>
                {link.title}
              </h3>
              <p className={`text-sm ${link.platform === "website" ? "text-white opacity-90" : "text-gray-500"}`}>
                {link.description}
              </p>
            </div>
            <div className={link.platform === "website" ? "text-white opacity-70" : "text-gray-400"}>
              <ExternalLink className="w-5 h-5" />
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
