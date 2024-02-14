'use client'
 
export default function Error({ error, reset }) {
  return (
    <div className="flex flex-col h-[70vh] justify-center items-center">
      <h2 className="font-livvic">Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}