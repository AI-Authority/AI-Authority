export default function Cancel() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl font-bold text-red-600">Payment Cancelled ❌</h1>
      <p className="mt-4 text-lg">Your payment process was cancelled.</p>
      <a href="/payment" className="mt-6 text-blue-600 underline">
        Try Again
      </a>
    </div>
  );
}
