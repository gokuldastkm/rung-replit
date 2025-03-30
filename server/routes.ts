import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes
  setupAuth(app);

  // API endpoints
  app.post("/api/newsletter", async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      
      // In a real app, save to database and integrate with email service
      // For this MVP, we'll just return success
      
      res.status(200).json({ message: "Subscription successful" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  app.post("/api/enrollments", async (req: Request, res: Response) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      const { courseId } = req.body;
      
      if (!courseId) {
        return res.status(400).json({ message: "Course ID is required" });
      }
      
      // In a real app, save enrollment to database
      // For this MVP, we'll just return success
      
      res.status(200).json({ message: "Enrollment request submitted" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
