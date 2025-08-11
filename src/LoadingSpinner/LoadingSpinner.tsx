

export default function LoadingSpinner({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center my-4">
      <div
        className="spinner-border text-info"
        role="status"
        style={{ width: "3rem", height: "3rem" }}
      >
        <span className="visually-hidden">{text}</span>
      </div>
      <p className="mt-2 text-info">{text}</p>
    </div>
  );
}
