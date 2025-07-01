import { users, profiles, socialLinks, themes, type User, type InsertUser, type Profile, type InsertProfile, type SocialLink, type InsertSocialLink, type Theme, type InsertTheme } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getProfile(userId: number): Promise<Profile | undefined>;
  createProfile(profile: InsertProfile): Promise<Profile>;
  updateProfile(userId: number, profile: Partial<InsertProfile>): Promise<Profile | undefined>;
  
  getSocialLinks(profileId: number): Promise<SocialLink[]>;
  createSocialLink(link: InsertSocialLink): Promise<SocialLink>;
  updateSocialLink(id: number, link: Partial<InsertSocialLink>): Promise<SocialLink | undefined>;
  deleteSocialLink(id: number): Promise<boolean>;
  incrementLinkClick(id: number): Promise<void>;
  
  getThemes(): Promise<Theme[]>;
  getTheme(id: number): Promise<Theme | undefined>;
  createTheme(theme: InsertTheme): Promise<Theme>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private profiles: Map<number, Profile>;
  private socialLinks: Map<number, SocialLink>;
  private themes: Map<number, Theme>;
  private currentUserId: number;
  private currentProfileId: number;
  private currentSocialLinkId: number;
  private currentThemeId: number;

  constructor() {
    this.users = new Map();
    this.profiles = new Map();
    this.socialLinks = new Map();
    this.themes = new Map();
    this.currentUserId = 1;
    this.currentProfileId = 1;
    this.currentSocialLinkId = 1;
    this.currentThemeId = 1;
    
    this.initializeDefaultData();
  }

  private initializeDefaultData() {
    // Create default user and profile
    const user: User = {
      id: 1,
      username: "alexjohnson",
      password: "password123"
    };
    this.users.set(1, user);

    const profile: Profile = {
      id: 1,
      userId: 1,
      name: "Alex Johnson",
      title: "Digital Creator & Entrepreneur",
      bio: "Passionate about technology, design, and helping others build their digital presence. Let's connect! 🚀",
      profileImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      followers: 12500,
      totalLinks: 8,
      totalViews: 45200,
      isVerified: true
    };
    this.profiles.set(1, profile);

    // Create default social links
    const defaultLinks: SocialLink[] = [
      {
        id: 1,
        profileId: 1,
        platform: "instagram",
        url: "https://instagram.com/alexjohnson",
        title: "Instagram",
        description: "@alexjohnson",
        isActive: true,
        clickCount: 0,
        sortOrder: 1
      },
      {
        id: 2,
        profileId: 1,
        platform: "youtube",
        url: "https://youtube.com/alexjohnson",
        title: "YouTube Channel",
        description: "Tech & Lifestyle",
        isActive: true,
        clickCount: 0,
        sortOrder: 2
      },
      {
        id: 3,
        profileId: 1,
        platform: "linkedin",
        url: "https://linkedin.com/in/alexjohnson",
        title: "LinkedIn",
        description: "Professional Network",
        isActive: true,
        clickCount: 0,
        sortOrder: 3
      },
      {
        id: 4,
        profileId: 1,
        platform: "twitter",
        url: "https://twitter.com/alexjohnson",
        title: "Twitter",
        description: "Daily thoughts",
        isActive: true,
        clickCount: 0,
        sortOrder: 4
      },
      {
        id: 5,
        profileId: 1,
        platform: "tiktok",
        url: "https://tiktok.com/@alexjohnson",
        title: "TikTok",
        description: "Quick tips & fun",
        isActive: true,
        clickCount: 0,
        sortOrder: 5
      },
      {
        id: 6,
        profileId: 1,
        platform: "website",
        url: "https://alexjohnson.com",
        title: "My Website",
        description: "Portfolio & Blog",
        isActive: true,
        clickCount: 0,
        sortOrder: 6
      },
      {
        id: 7,
        profileId: 1,
        platform: "newsletter",
        url: "https://alexjohnson.com/newsletter",
        title: "Newsletter",
        description: "Weekly insights",
        isActive: true,
        clickCount: 0,
        sortOrder: 7
      },
      {
        id: 8,
        profileId: 1,
        platform: "spotify",
        url: "https://open.spotify.com/user/alexjohnson",
        title: "Spotify Playlist",
        description: "Work vibes",
        isActive: true,
        clickCount: 0,
        sortOrder: 8
      }
    ];

    defaultLinks.forEach(link => {
      this.socialLinks.set(link.id, link);
    });

    // Create default themes
    const defaultThemes: Theme[] = [
      {
        id: 1,
        name: "Default",
        primaryColor: "#6366F1",
        secondaryColor: "#EC4899",
        backgroundColor: "#F8FAFC",
        textColor: "#1E293B",
        cardColor: "#FFFFFF",
        isDefault: true
      },
      {
        id: 2,
        name: "Purple",
        primaryColor: "#8B5CF6",
        secondaryColor: "#3B82F6",
        backgroundColor: "#F8FAFC",
        textColor: "#1E293B",
        cardColor: "#FFFFFF",
        isDefault: false
      },
      {
        id: 3,
        name: "Nature",
        primaryColor: "#10B981",
        secondaryColor: "#3B82F6",
        backgroundColor: "#F0FDF4",
        textColor: "#1E293B",
        cardColor: "#FFFFFF",
        isDefault: false
      },
      {
        id: 4,
        name: "Sunset",
        primaryColor: "#F59E0B",
        secondaryColor: "#EF4444",
        backgroundColor: "#FFFBEB",
        textColor: "#1E293B",
        cardColor: "#FFFFFF",
        isDefault: false
      },
      {
        id: 5,
        name: "Dark",
        primaryColor: "#6366F1",
        secondaryColor: "#EC4899",
        backgroundColor: "#0F172A",
        textColor: "#F8FAFC",
        cardColor: "#1E293B",
        isDefault: false
      },
      {
        id: 6,
        name: "Cosmic",
        primaryColor: "#F472B6",
        secondaryColor: "#8B5CF6",
        backgroundColor: "#FDF2F8",
        textColor: "#1E293B",
        cardColor: "#FFFFFF",
        isDefault: false
      }
    ];

    defaultThemes.forEach(theme => {
      this.themes.set(theme.id, theme);
    });

    this.currentUserId = 2;
    this.currentProfileId = 2;
    this.currentSocialLinkId = 9;
    this.currentThemeId = 7;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getProfile(userId: number): Promise<Profile | undefined> {
    return Array.from(this.profiles.values()).find(profile => profile.userId === userId);
  }

  async createProfile(insertProfile: InsertProfile): Promise<Profile> {
    const id = this.currentProfileId++;
    const profile: Profile = { 
      ...insertProfile, 
      id,
      profileImageUrl: insertProfile.profileImageUrl || null,
      followers: insertProfile.followers || 0,
      totalLinks: insertProfile.totalLinks || 0,
      totalViews: insertProfile.totalViews || 0,
      isVerified: insertProfile.isVerified || false
    };
    this.profiles.set(id, profile);
    return profile;
  }

  async updateProfile(userId: number, updates: Partial<InsertProfile>): Promise<Profile | undefined> {
    const profile = Array.from(this.profiles.values()).find(p => p.userId === userId);
    if (!profile) return undefined;
    
    const updatedProfile = { ...profile, ...updates };
    this.profiles.set(profile.id, updatedProfile);
    return updatedProfile;
  }

  async getSocialLinks(profileId: number): Promise<SocialLink[]> {
    return Array.from(this.socialLinks.values())
      .filter(link => link.profileId === profileId)
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  }

  async createSocialLink(insertLink: InsertSocialLink): Promise<SocialLink> {
    const id = this.currentSocialLinkId++;
    const link: SocialLink = { 
      ...insertLink, 
      id, 
      clickCount: 0,
      description: insertLink.description || null,
      isActive: insertLink.isActive ?? true,
      sortOrder: insertLink.sortOrder || 0
    };
    this.socialLinks.set(id, link);
    return link;
  }

  async updateSocialLink(id: number, updates: Partial<InsertSocialLink>): Promise<SocialLink | undefined> {
    const link = this.socialLinks.get(id);
    if (!link) return undefined;
    
    const updatedLink = { ...link, ...updates };
    this.socialLinks.set(id, updatedLink);
    return updatedLink;
  }

  async deleteSocialLink(id: number): Promise<boolean> {
    return this.socialLinks.delete(id);
  }

  async incrementLinkClick(id: number): Promise<void> {
    const link = this.socialLinks.get(id);
    if (link) {
      link.clickCount = (link.clickCount ?? 0) + 1;
      this.socialLinks.set(id, link);
    }
  }

  async getThemes(): Promise<Theme[]> {
    return Array.from(this.themes.values());
  }

  async getTheme(id: number): Promise<Theme | undefined> {
    return this.themes.get(id);
  }

  async createTheme(insertTheme: InsertTheme): Promise<Theme> {
    const id = this.currentThemeId++;
    const theme: Theme = { 
      ...insertTheme, 
      id,
      isDefault: insertTheme.isDefault ?? false
    };
    this.themes.set(id, theme);
    return theme;
  }
}

export const storage = new MemStorage();
