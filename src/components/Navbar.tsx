import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { signIn } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const prevScrollY = useRef(0);

  useEffect(() => {
    // update to check if navbar still in view
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (prevScrollY.current !== currentScrollY) {
        setIsOpen(false);
      }
      prevScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  const linkStyles =
    "h-full px-1 font-medium text-base flex items-center justify-center hover:border-t-2 hover:border-sky-600 border-t-transparent transition-all duration-200 ease-in-out";
  const linkMobileStyles =
    "h-full px-2 py-4 font-medium text-base flex items-center justify-center hover:border-x-4 hover:border-sky-600 border-x-transparent transition-all duration-200 ease-in-out";
  return (
    <div className="sticky top-0 flex h-16 w-full items-center justify-between bg-neutral-800 px-6 text-gray-300 shadow-lg">
      {/* Left */}
      <div className="flex">
        {/* Logo */}
        <div className="flex items-center">
          <Link href={'/'} className="ml-1 text-2xl">Recur</Link>
        </div>
      </div>
      {/* Middle */}
      <div className="hidden h-full flex-[2] justify-center sm:flex ">
        {/* Navlinks Container */}
        <div className="flex h-full items-center">
          {/* Nav Wrapper */}
          <ul className="flex h-full w-full items-center justify-center gap-2 ">
            {/* Navlinks */}
            <li className={linkStyles}>
              <Link href="/">Home</Link>
            </li>
            <li className={linkStyles}>
              <Link href="/upload">Upload</Link>
            </li>
            <li className={linkStyles}>
              <Link href="/explore">Explore</Link>
            </li>
            <li className={linkStyles}>
              <Link href="/about">About</Link>
            </li>
            <li className={linkStyles}>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
      {/* Right Side */}
      <div className="flex">
        <div className="relative flex items-center gap-4 sm:hidden">
          {session ? (
            <div className="flex items-center gap-2">
              <Link href={`/profile/${session.user?.name}`}>{session.user?.name}</Link>
              <Image
                className="rounded-full"
                width={32}
                height={32}
                src={session.user?.image as string}
                alt={`Image of ${session.user?.name}`}
              />
            </div>
          ) : (
            <></>
          )}
          {isOpen ? (
            <FiX
              size={28}
              className="cursor-pointer text-gray-200"
              onClick={() => setIsOpen(false)}
            />
          ) : (
            <div>
              <FiMenu
                size={28}
                className="cursor-pointer text-gray-200"
                onClick={() => setIsOpen(true)}
              />
            </div>
          )}
          {isOpen ? (
            // ========== //
            <div className="hamburger absolute right-[-24px] top-11 w-screen bg-neutral-800">
              <ul className="flex flex-col gap-4">
                <Link href="/">
                  <li className={linkMobileStyles}>Home</li>
                </Link>
                <Link href="/upload">
                  <li className={linkMobileStyles}>Upload</li>
                </Link>
                <Link href="/explore">
                  <li className={linkMobileStyles}>Explore</li>
                </Link>
                <Link href="/about">
                  <li className={linkMobileStyles}>About</li>
                </Link>
                <Link href="/contact">
                  <li className={linkMobileStyles}>Contact</li>
                </Link>
              </ul>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="hidden sm:flex">
          {session ? (
            <div className="flex items-center gap-2">
              <Link href={`/profile/${session.user?.name}`}>{session.user?.name}</Link>
              <Image
                className="rounded-full"
                width={32}
                height={32}
                src={session.user?.image as string}
                alt={`Image of ${session.user?.name}`}
              />
              <button
                type="button"
                className="rounded bg-sky-600 px-4 py-1 font-semibold"
                onClick={() => {
                  signOut();
                }}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div>
              <button
                type="button"
                className="rounded bg-sky-600 px-4 py-1 font-semibold"
                onClick={() => {
                  signIn();
                }}
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
