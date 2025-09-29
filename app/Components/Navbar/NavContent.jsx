"use client";
import Image from "next/image";
import Link from "next/link";
import LoginModal from "../LoginModal/LoginContent";
import SignupModal from "../SignupModal/SignupContent";
import { useTheme } from "next-themes";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import { auth, db } from "../../../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import PopupForm from "../PopUp/PopUpContent";
import { FaSpinner } from "react-icons/fa";
const NavPage = () => {
  const desktopProfileRef = useRef(null);
  const mobileProfileRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  const [user, setUser] = useState(null);
  const [isArticlesOpen, setIsArticlesOpen] = useState(false);
  const [isAuthorLoading, setIsAuthorLoading] = useState(true); // NEW

  useEffect(() => {
    setMounted(true);

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const docRef = doc(db, "authors", currentUser.uid);
        const docSnap = await getDoc(docRef);
        setIsAuthor(docSnap.exists());
      } else {
        setUser(null);
        setIsAuthor(false);
      }
      setIsAuthorLoading(false); // Mark as done
    });

    const handleClickOutside = (event) => {
      if (
        desktopProfileRef.current &&
        !desktopProfileRef.current.contains(event.target) &&
        mobileProfileRef.current &&
        !mobileProfileRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      unsubscribe();
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const docRef = doc(db, "authors", currentUser.uid);
        const docSnap = await getDoc(docRef);
        setIsAuthor(docSnap.exists());
      } else {
        setUser(null);
        setIsAuthor(false);
      }
    });

    const handleClickOutside = (event) => {
      if (
        desktopProfileRef.current &&
        !desktopProfileRef.current.contains(event.target) &&
        mobileProfileRef.current &&
        !mobileProfileRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      unsubscribe();
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!mounted) return null;

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  return (
    <div className="w-full border-b-2 border-gray-700">
      <nav className="shadow-2xl bg-white text-black dark:bg-black dark:text-white">
        <div className="flex justify-around items-center p-4">
          <Link href="/" onClick={() => setIsMenuOpen(false)}>
            <div className="text-xl flex items-center dark:text-white text-black">
              <Image
                src="/acquireWithAsh.png"
                alt="My Logo"
                width={50}
                height={50}
              />
              <span className="ml-2 publica-font">
                AcquireWith
                <span className="font-bold text-violet-600">Ash.com</span>
              </span>
            </div>
          </Link>

          {/* Hamburger (Mobile + Tablet) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-2xl"
          >
            <i
              className={`fa-solid ${isMenuOpen ? "fa-xmark" : "fa-bars"}`}
            ></i>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex gap-10 text-sm font-semibold items-center">
            {isAuthorLoading ? (
              <FaSpinner className="animate-spin text-violet-600" />
            ) : (
              isAuthor && (
                <div className="relative flex items-center gap-1">
                  <Link href="/create-blog" className="hover:text-violet-700">
                    Create Articles
                  </Link>
                  <button
                    onClick={() => setIsArticlesOpen(!isArticlesOpen)}
                    className="transition-transform duration-300"
                    aria-label="Toggle edit articles menu"
                  >
                    <i
                      className={`fa-solid fa-chevron-up transition-transform duration-300 ${
                        isArticlesOpen ? "rotate-180" : ""
                      }`}
                    ></i>
                  </button>
                  <div
                    className={`absolute top-full left-0 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg mt-2 min-w-[150px] z-50 overflow-hidden transition-all duration-300 ${
                      isArticlesOpen
                        ? "max-h-40 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <Link
                      href="/edit-blog"
                      onClick={() => setIsArticlesOpen(false)}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Edit Articles
                    </Link>
                  </div>
                </div>
              )
            )}

            <Link href="/article" className="hover:text-violet-700">
              Article
            </Link>
            <Link href="/about" className="hover:text-violet-700">
              About
            </Link>
            <Link href="/videos" className="hover:text-violet-700">
              Videos
            </Link>
            <button
              onClick={() => setIsOpen(true)}
              className="bg-violet-600 text-white p-2 px-4 rounded-xl hover:bg-purple-900"
            >
              Newsletter
            </button>

            {user ? (
              <div className="relative" ref={desktopProfileRef}>
                <Image
                  src={user.photoURL || "/placeholderUser.png"}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full cursor-pointer border-2 border-violet-600"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                />
                {isProfileOpen && (
                  <div
                    className="absolute -right-45 top-full mt-3 w-64 bg-white dark:bg-gray-900 
                           border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg p-4 z-[9999]"
                    style={{ minWidth: "250px" }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Image
                        src={user.photoURL || "/placeholderUser.png"}
                        alt="Profile"
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                      <div>
                        <p className="font-semibold">{user.displayName}</p>
                        <p className="text-sm text-gray-500 break-words max-w-[180px]">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsLoginOpen(true)}
                className="bg-violet-600 text-white p-2 px-4 rounded-lg hover:bg-purple-900"
              >
                Login/Signup
              </button>
            )}

            <button
              className="text-2xl"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "dark" ? (
                <FaToggleOn className="text-violet-700" />
              ) : (
                <FaToggleOff className="text-gray-800" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile/Tablet Nav */}
        <div
          className={`lg:hidden transition-all duration-500 ease-in-out ${
            isMenuOpen
              ? "max-h-[500px] opacity-100"
              : "max-h-0 opacity-0 pointer-events-none"
          } bg-white text-black dark:bg-black dark:text-white`}
        >
          <div className="flex flex-col items-center gap-4 py-4">
            <Link href="/article" onClick={() => setIsMenuOpen(false)}>
              Article
            </Link>
            <Link href="/about" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
            <Link href="/videos" onClick={() => setIsMenuOpen(false)}>
              Videos
            </Link>
            <button
              onClick={() => {
                setIsOpen(true);
                setIsMenuOpen(false);
              }}
              className="bg-violet-600 text-white p-2 px-4 rounded-lg hover:bg-purple-900"
            >
              Newsletter
            </button>

            {user ? (
              <div className="relative" ref={mobileProfileRef}>
                <Image
                  src={user.photoURL || "/placeholderUser.png"}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full cursor-pointer border-2 border-violet-600"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                />
                {isProfileOpen && (
                  <div
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-64 bg-white dark:bg-gray-900
                            border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg p-4 z-[9999]"
                    style={{ minWidth: "250px" }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Image
                        src={user.photoURL || "/placeholderUser.png"}
                        alt="Profile"
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                      <div>
                        <p className="font-semibold">{user.displayName}</p>
                        <p className="text-sm text-gray-500 break-words max-w-[180px]">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsLoginOpen(true)}
                className="bg-violet-600 text-white p-2 px-4 rounded-lg hover:bg-purple-900"
              >
                Login/Signup
              </button>
            )}
            <button
              className="text-2xl"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "dark" ? (
                <FaToggleOn className="text-violet-700" />
              ) : (
                <FaToggleOff className="text-gray-800" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Newsletter Modal */}

      <PopupForm isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Modals */}
      {isLoginOpen && (
        <LoginModal
          onClose={() => setIsLoginOpen(false)}
          onSwitchToSignup={() => {
            setIsLoginOpen(false);
            setIsSignupOpen(true);
          }}
        />
      )}

      {isSignupOpen && (
        <SignupModal
          onClose={() => setIsSignupOpen(false)}
          onSwitchToLogin={() => {
            setIsSignupOpen(false);
            setIsLoginOpen(true);
          }}
        />
      )}
    </div>
  );
};

export default NavPage;
