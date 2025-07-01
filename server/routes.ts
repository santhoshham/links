import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSocialLinkSchema, insertProfileSchema, insertThemeSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Profile routes
  app.get("/api/profile/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const profile = await storage.getProfile(userId);
      
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      
      res.json(profile);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/profile/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const profileData = insertProfileSchema.parse(req.body);
      
      const updatedProfile = await storage.updateProfile(userId, profileData);
      
      if (!updatedProfile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      
      res.json(updatedProfile);
    } catch (error) {
      res.status(400).json({ message: "Invalid profile data" });
    }
  });

  // Social links routes
  app.get("/api/profile/:profileId/links", async (req, res) => {
    try {
      const profileId = parseInt(req.params.profileId);
      const links = await storage.getSocialLinks(profileId);
      res.json(links);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/profile/:profileId/links", async (req, res) => {
    try {
      const profileId = parseInt(req.params.profileId);
      const linkData = insertSocialLinkSchema.parse({
        ...req.body,
        profileId
      });
      
      const newLink = await storage.createSocialLink(linkData);
      res.status(201).json(newLink);
    } catch (error) {
      res.status(400).json({ message: "Invalid link data" });
    }
  });

  app.put("/api/links/:linkId", async (req, res) => {
    try {
      const linkId = parseInt(req.params.linkId);
      const linkData = req.body;
      
      const updatedLink = await storage.updateSocialLink(linkId, linkData);
      
      if (!updatedLink) {
        return res.status(404).json({ message: "Link not found" });
      }
      
      res.json(updatedLink);
    } catch (error) {
      res.status(400).json({ message: "Invalid link data" });
    }
  });

  app.delete("/api/links/:linkId", async (req, res) => {
    try {
      const linkId = parseInt(req.params.linkId);
      const deleted = await storage.deleteSocialLink(linkId);
      
      if (!deleted) {
        return res.status(404).json({ message: "Link not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/links/:linkId/click", async (req, res) => {
    try {
      const linkId = parseInt(req.params.linkId);
      await storage.incrementLinkClick(linkId);
      res.status(200).json({ message: "Click tracked" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Themes routes
  app.get("/api/themes", async (req, res) => {
    try {
      const themes = await storage.getThemes();
      res.json(themes);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/themes/:themeId", async (req, res) => {
    try {
      const themeId = parseInt(req.params.themeId);
      const theme = await storage.getTheme(themeId);
      
      if (!theme) {
        return res.status(404).json({ message: "Theme not found" });
      }
      
      res.json(theme);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/themes", async (req, res) => {
    try {
      const themeData = insertThemeSchema.parse(req.body);
      const newTheme = await storage.createTheme(themeData);
      res.status(201).json(newTheme);
    } catch (error) {
      res.status(400).json({ message: "Invalid theme data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
