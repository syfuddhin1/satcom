export function Card({ children, className }) {
  return (
    <div className={`bg-white shadow-xl rounded-lg p-6 ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}
export function Input({ className, ...props }) {
  return (
    <input className={`border p-2 rounded w-full ${className}`} {...props} />
  );
}
export function Button({ children, className, ...props }) {
  return (
    <button
      className={`bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded font-semibold shadow-lg ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
