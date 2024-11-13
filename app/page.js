// app/page.js

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center p-32 items-center">
      <h1 className="border text-5xl p-10">Hello godda!</h1>
      <div className="flex justify-center items-center p-5 gap-10">
        <Link className="border rounded w-24 text-center" href="/play">Play</Link>
        <Link className="border rounded w-24 text-center" href="/register">Register</Link>
      </div>
    </div>
  );
}
