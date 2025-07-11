import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="p-1 pt-4 w-full max-w-4xl">
            <div className="flex gap-4 justify-start">
                {['HOME', 'ABOUT', 'PROJECTS', 'CONTACT'].map((item) => (
                    <Link href={`/${item.toLowerCase()}`} key={item}>{item}</Link>
                ))}
            </div>
        </nav>
    );
}
