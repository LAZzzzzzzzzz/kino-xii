const SessionsIntro = ({ summary }) => {
  return (
    <div className="flex flex-col gap-1.75">
      <h2 className="text-xl font-extrabold">Sessions</h2>
      <p className="text-xs leading-body text-secondary">{summary}</p>
    </div>
  );
};

export default SessionsIntro;
