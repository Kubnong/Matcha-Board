import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black gap-y-8">
      <div className="text-5xl font-bold">
        ⚠️ Sorry, something went wrong
      </div>
      <Link href={'/'} className="p-3 border border-white rounded-2xl">
          back to page
      </Link>
    </div>
  )
}