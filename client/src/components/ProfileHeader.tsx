import { useQuery } from "@tanstack/react-query";
import { Profile } from "@shared/schema";
import { CheckCircle } from "lucide-react";

interface ProfileHeaderProps {
  userId: number;
}

export function ProfileHeader({ userId }: ProfileHeaderProps) {
  const { data: profile, isLoading } = useQuery<Profile>({
    queryKey: [`/api/profile/${userId}`],
  });

  if (isLoading) {
    return (
      <div className="text-center mb-8 animate-pulse">
        <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6"></div>
        <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
        <div className="h-12 bg-gray-200 rounded w-80 mx-auto"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center mb-8">
        <p className="text-gray-500">Profile not found</p>
      </div>
    );
  }

  return (
    <div className="text-center mb-8 animate-float">
      {/* Profile Image with Gradient Border */}
      <div className="relative inline-block mb-6">
        <div className="p-1 rounded-full gradient-bg animate-gradient">
          <img
            src={profile.profileImageUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"}
            alt="Profile picture"
            className="w-32 h-32 rounded-full object-cover ring-4 ring-white shadow-xl"
          />
        </div>
        {profile.isVerified && (
          <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center">
            <CheckCircle className="text-white w-4 h-4" />
          </div>
        )}
      </div>

      {/* Profile Info */}
      <h1 className="text-2xl font-bold text-text mb-2">{profile.name}</h1>
      <p className="text-gray-600 mb-4 font-medium">{profile.title}</p>
      <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">{profile.bio}</p>

      {/* Stats */}
      <div className="flex justify-center space-x-6 mt-6">
        <div className="text-center">
          <div className="text-xl font-bold text-primary">
            {profile.followers >= 1000 ? `${(profile.followers / 1000).toFixed(1)}K` : profile.followers}
          </div>
          <div className="text-xs text-gray-500">Followers</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-secondary">{profile.totalLinks}</div>
          <div className="text-xs text-gray-500">Links</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-purple-500">
            {profile.totalViews >= 1000 ? `${(profile.totalViews / 1000).toFixed(1)}K` : profile.totalViews}
          </div>
          <div className="text-xs text-gray-500">Views</div>
        </div>
      </div>
    </div>
  );
}
