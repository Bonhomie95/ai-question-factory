import { exportQuestions } from "../utils/exporter.js";

try {
  const file = exportQuestions({
    category: "history",
    count: 20,
    difficulty: null, // or "easy" / "medium" / "hard"
    format: "json",
  });

  console.log("📦 Export complete:", file);
} catch (err) {
  console.error("❌ Export failed:", err);
}
