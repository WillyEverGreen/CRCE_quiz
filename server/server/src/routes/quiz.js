import express from "express";
import { db } from "../firebase.js";

const router = express.Router();

// Get all quizzes for a user
router.get("/", async (req, res) => {
  try {
    const { hostId } = req.query;
    let query = db.collection("quizzes");

    if (hostId) {
      query = query.where("hostId", "==", hostId);
    }

    const snapshot = await query.orderBy("createdAt", "desc").get();
    const quizzes = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(quizzes);
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({ error: "Failed to fetch quizzes" });
  }
});

// Get a single quiz
router.get("/:id", async (req, res) => {
  try {
    const doc = await db.collection("quizzes").doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: "Quiz not found" });
    }
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error("Error fetching quiz:", error);
    res.status(500).json({ error: "Failed to fetch quiz" });
  }
});

// Create a new quiz
router.post("/", async (req, res) => {
  try {
    const { title, description, hostId, questions, timePerQuestion } = req.body;

    if (!title || !hostId || !questions || questions.length === 0) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const quizData = {
      title,
      description: description || "",
      hostId,
      timePerQuestion: timePerQuestion || 30,
      questions: questions.map((q, idx) => ({
        id: `q${idx + 1}`,
        text: q.text,
        options: q.options,
        correctIndex: q.correctIndex,
        timeLimit: q.timeLimit || timePerQuestion || 20,
        points: q.points || 1000,
      })),
      createdAt: new Date().toISOString(),
      questionCount: questions.length,
      sessionCount: 0,
    };

    const docRef = await db.collection("quizzes").add(quizData);
    res.status(201).json({ id: docRef.id, ...quizData });
  } catch (error) {
    console.error("Error creating quiz:", error);
    res.status(500).json({ error: "Failed to create quiz" });
  }
});

// Update a quiz
router.put("/:id", async (req, res) => {
  try {
    const { title, description, questions, hostId, timePerQuestion } = req.body;
    const docRef = db.collection("quizzes").doc(req.params.id);

    const doc = await docRef.get();
    if (!doc.exists) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    // Check ownership
    if (doc.data().hostId !== hostId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const updateData = {
      title,
      description: description || "",
      timePerQuestion: timePerQuestion || 30,
      questions: questions.map((q, idx) => ({
        id: q.id || `q${idx + 1}`,
        text: q.text,
        options: q.options,
        correctIndex: q.correctIndex,
        timeLimit: q.timeLimit || timePerQuestion || 20,
        points: q.points || 1000,
      })),
      questionCount: questions.length,
      updatedAt: new Date().toISOString(),
    };

    await docRef.update(updateData);
    res.json({ id: req.params.id, ...updateData });
  } catch (error) {
    console.error("Error updating quiz:", error);
    res.status(500).json({ error: "Failed to update quiz" });
  }
});

// Delete a quiz
router.delete("/:id", async (req, res) => {
  try {
    const { hostId } = req.query;
    const docRef = db.collection("quizzes").doc(req.params.id);

    const doc = await docRef.get();
    if (!doc.exists) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    // Check ownership
    if (doc.data().hostId !== hostId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await docRef.delete();
    res.json({ message: "Quiz deleted successfully" });
  } catch (error) {
    console.error("Error deleting quiz:", error);
    res.status(500).json({ error: "Failed to delete quiz" });
  }
});

export default router;
