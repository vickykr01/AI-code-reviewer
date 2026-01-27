import "./App.css";
import "prismjs/themes/prism-okaidia.css";
import prism from "prismjs";
import "prismjs/components/prism-javascript";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Editor from "react-simple-code-editor";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"; // You can choose any theme you like

function App() {
  const [code, setCode] = useState(`function sum(a, b) {
  return a + b;
}`);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  async function reviewCode() {
    setLoading(true);
    setReview("");
    try {
      const response = await axios.post("http://localhost:8000/ai/get", {
        prompt: code,
      });
      // console.log("Response from server:", response.data);
      setReview(response.data.response);
    } catch (error) {
      console.error("Error during code review:", error);
      alert("Failed to review code. Check console for details.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    prism.highlightAll();
  }, []);
  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={setCode}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,

                color: "#07aed0ff",
                borderRadius: "0.7rem",
                height: "100%",
                width: "100%",
              }}
            />
          </div>
          <div className="review" onClick={loading ? null : reviewCode}>
            {loading ? "Reviewing" : "Review"}
          </div>
        </div>

        <div className="right">
          <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
        </div>
      </main>
    </>
  );
}

export default App;
