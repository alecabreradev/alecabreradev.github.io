/** Requests the real app would send to the REST API, newest first. */
export default function ApiLog({ entries }) {
  return (
    <div className="api-log" aria-live="polite">
      <p className="api-log__title">API REST · localhost:3000</p>
      <ol className="api-log__list">
        {entries.map(({ id, method, path, status }) => (
          <li key={id} className="api-log__entry">
            <span className={`api-log__method api-log__method--${method.toLowerCase()}`}>
              {method}
            </span>
            <span className="api-log__path">{path}</span>
            <span className="api-log__status">{status}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
