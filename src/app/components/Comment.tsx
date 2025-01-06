"use client";

import React, { useState } from 'react';

const CommentSection = () => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([comment, ...comments]);
      setComment("");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Comments</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Submit
        </button>
      </form>
      <div className="mt-6">
        {comments.length > 0 ? (
          <ul className="space-y-3">
            {comments.map((c, index) => (
              <li
                key={index}
                className="p-3 bg-white rounded-md shadow-sm border border-gray-200"
              >
                {c}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
