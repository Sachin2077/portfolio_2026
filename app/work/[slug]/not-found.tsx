import Link from "next/link";

export default function NotFound() {
  return (
    <div className="case-notfound">
      <p className="case-notfound-eyebrow">404</p>
      <h1 className="case-notfound-title">This project drifted out of orbit.</h1>
      <p className="case-notfound-sub">The case study you&apos;re looking for isn&apos;t here.</p>
      <Link href="/#moons" className="case-notfound-link">
        <span aria-hidden="true">←</span> Back to the work
      </Link>
    </div>
  );
}
