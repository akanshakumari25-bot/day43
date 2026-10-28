
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

function CreatePostForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // POST request function
  const createPostFn = async (newPost) => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create post");
    }

    return response.json();
  };

  // useMutation
  const mutation = useMutation({
    mutationFn: createPostFn,

    onSuccess: () => {
      alert("Post created successfully!");
      setTitle("");
      setBody("");
    },

    onError: () => {
      alert("Something went wrong!");
    },
  });

  // Form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    mutation.mutate({ title, body });
  };

  // Disable button while submitting
  const { isPending } = mutation;

  return (
    <div>
      <h2>Create New Post</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <br /><br />

        <textarea
          placeholder="Enter post body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />

        <br /><br />

        <button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}

export default CreatePostForm;
