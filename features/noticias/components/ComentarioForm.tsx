"use client";

export const ComentarioForm = () => (
  <form className="nd-comment-form" onSubmit={(e) => e.preventDefault()}>
    <div className="nd-comment-field">
      <textarea placeholder="Comment *" rows={6} />
    </div>
    <div className="nd-comment-row">
      <input type="text" placeholder="Name *" />
      <input type="email" placeholder="Email *" />
      <input type="url" placeholder="Website" />
    </div>
    <label className="nd-comment-consent">
      <input type="checkbox" />
      Save my name, email, and website in this browser for the next time I comment.
    </label>
    <button type="submit" className="nd-comment-submit">Post Comment</button>
  </form>
);
