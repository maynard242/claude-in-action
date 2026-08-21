export function MaterialViewer({
  title,
  content,
}: {
  title: string;
  content: string | null;
}) {
  return (
    <section className="mt-6 card p-5" aria-labelledby="material-viewer-heading">
      <p className="label-mono mb-2">Learner material</p>
      <h3 id="material-viewer-heading" className="display text-2xl mb-3">{title}</h3>
      {content ? (
        <pre className="overflow-x-auto whitespace-pre-wrap rounded bg-code-bg p-4 text-sm text-code-ink"><code>{content}</code></pre>
      ) : (
        <p className="m-0 text-sm text-ink-soft">This bounded material is not available in the preview.</p>
      )}
    </section>
  );
}
