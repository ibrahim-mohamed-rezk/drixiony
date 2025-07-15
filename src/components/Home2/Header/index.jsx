import React, { useEffect, useReducer, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useAuthData from "@/src/libs/hooks/useAuthData";
// import CardMenu from "../Header/CardMenu";
const initialState = {
  activeMenu: "",
  activeSubMenu: "",
  isSidebarOpen: false,
  isLeftSidebarOpen: false,
};
function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_MENU":
      return {
        ...state,
        activeMenu: state.activeMenu === action.menu ? "" : action.menu,
        activeSubMenu:
          state.activeMenu === action.menu ? state.activeSubMenu : "",
      };
    case "TOGGLE_SUB_MENU":
      return {
        ...state,
        activeSubMenu:
          state.activeSubMenu === action.subMenu ? "" : action.subMenu,
      };
    case "TOGGLE_SIDEBAR":
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen,
      };
    case "setScrollY":
      return { ...state, scrollY: action.payload };
    case "TOGGLE_LEFT_SIDEBAR":
      return {
        ...state,
        isLeftSidebarOpen: !state.isLeftSidebarOpen,
      };
    default:
      return state;
  }
}

function index() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const headerRef = useRef(null);
  const { user, isLoggedIn } = useAuthData();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const userIconRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setShowUserDropdown(false);
  };

  const handleScroll = () => {
    const { scrollY } = window;
    dispatch({ type: "setScrollY", payload: scrollY });
  };
  const currentRoute = useRouter().pathname;
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleSidebar = () => {
    dispatch({ type: "TOGGLE_MENU", menu: "" });
    dispatch({ type: "TOGGLE_SUB_MENU", subMenu: "" });
    dispatch({ type: "TOGGLE_SIDEBAR" });
  };

  const navTabs = [
    {
      name: "الرئيسية",
      icon: "bi bi-house",
      href: "/",
    },
    {
      name: "السيارات",
      icon: "bi bi-bag",
      href: "/cars",
    },
    {
      name: "المقالات",
      icon: "bi bi-bag",
      href: "/blogs",
    },
    {
      name: "اتصل بنا",
      icon: "bi bi-bag",
      href: "/contact",
    },
  ];

  return (
    <>
      <div
        className={`sidebar-menu ${state.isSidebarOpen ? "show-menu" : ""}`}
        dir="rtl"
      >
        <div className="mobile-logo-area d-flex justify-content-between align-items-center">
          <div className="mobile-logo-wrap">
            <Link href="/">
              <span>
                <img
                  style={{ width: "137px", height: "30px" }}
                  alt="الشعار"
                  src="/assets/img/home2/icon/home2-logo.svg"
                />
              </span>
            </Link>
          </div>
          <div onClick={toggleSidebar} className="menu-button menu-close-btn">
            <i className="bi bi-x" />
          </div>
        </div>
        <ul className="menu-list">
          {navTabs.map((tab, index) => (
            <li
              key={index}
              className={`${currentRoute === tab.href ? "active" : ""}`}
            >
              <Link href={tab.href}>{tab.name}</Link>
            </li>
          ))}
        </ul>
        <div className="topbar-right">
          {isLoggedIn && (
            <button
              style={{ width: "100%", marginTop: 8, justifyContent: "center" }}
              className="primary-btn1"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#sellUsModal01"
            >
              <svg
                width={16}
                height={16}
                viewBox="0 0 18 18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.5588 0C17.447 0.00287726 17.3409 0.0492946 17.2629 0.129351L15.4245 1.97099L14.8707 1.4164C14.5627 1.10919 14.2078 0.938606 13.8585 0.928904C13.6483 0.923245 13.4543 0.953158 13.2231 0.985496L10.2237 1.40265C9.12021 1.55626 8.55995 2.02839 7.84852 2.69132L0.470643 9.56715C0.467641 9.5698 0.464677 9.5725 0.46175 9.57523C0.142414 9.89053 0.00416943 10.3206 0.000127199 10.7442C-0.00472348 11.1679 0.12867 11.6166 0.484386 11.9205L0.460133 11.8971L6.10309 17.5417L6.08045 17.5174C6.38443 17.8731 6.8323 18.0057 7.25674 18.0009C7.68036 17.9968 8.11127 17.8586 8.42575 17.54C8.42849 17.5368 8.43119 17.5336 8.43384 17.5303L8.94073 16.9863L10.9586 17.7381C11.1627 17.8161 11.3805 17.8522 11.5988 17.8442C11.8172 17.8361 12.0317 17.7841 12.2295 17.6912C12.6135 17.5109 12.9474 17.2062 13.101 16.7858L15.3161 10.1452C15.9758 9.4378 16.4455 8.87674 16.5983 7.77725L17.0155 4.77792C17.0478 4.5467 17.0777 4.35186 17.0721 4.14248C17.0624 3.79323 16.8926 3.43913 16.5846 3.1303L16.03 2.57652L17.87 0.736494C17.932 0.676327 17.9743 0.598838 17.9915 0.51419C18.0086 0.429542 17.9998 0.341686 17.9661 0.262143C17.9325 0.182601 17.8756 0.115085 17.8029 0.0684494C17.7302 0.0218141 17.6451 -0.00176348 17.5588 0.000808484V0ZM13.8351 1.78505C14.0032 1.78909 14.0372 1.79394 14.2643 2.02192L14.8189 2.57571L13.8351 3.5604C13.6631 3.47636 13.4743 3.43241 13.2829 3.43185C12.5779 3.43185 11.9967 4.01393 11.9967 4.71809C11.9967 5.42306 12.5779 6.00352 13.2821 6.00352C13.9871 6.00352 14.5683 5.42306 14.5683 4.71809C14.5683 4.52083 14.5214 4.33408 14.4406 4.16592L15.4245 3.18123L15.9783 3.73583C16.2062 3.963 16.2111 3.99696 16.2151 4.16431C16.2104 4.33015 16.1942 4.49547 16.1666 4.65907L15.7503 7.65841C15.6209 8.58812 15.342 8.85976 14.6831 9.56796L7.81537 16.9369C7.70462 17.0493 7.47583 17.1407 7.24704 17.1431C7.01825 17.1463 6.8226 17.0647 6.73286 16.9596C6.72537 16.9512 6.71755 16.9431 6.70942 16.9353L1.06647 11.2908C1.05869 11.2826 1.0506 11.2748 1.04221 11.2673C0.937116 11.1784 0.854655 10.9819 0.857888 10.7531C0.860314 10.5252 0.951668 10.2956 1.06404 10.1848L8.43303 3.31786C9.14123 2.65817 9.41286 2.38006 10.3426 2.25071L13.3419 1.83356C13.5731 1.80122 13.7348 1.78181 13.8351 1.78505ZM13.2829 4.28881C13.5246 4.28881 13.7114 4.47637 13.7114 4.71809C13.7114 4.95982 13.5246 5.14657 13.2829 5.14657C13.0404 5.14657 12.8544 4.95982 12.8544 4.71809C12.8544 4.47637 13.0404 4.28881 13.2829 4.28881ZM5.99314 8.99881C5.90784 8.99872 5.82446 9.0241 5.75367 9.07168C5.68288 9.11926 5.6279 9.18689 5.59578 9.2659C5.56365 9.34492 5.55584 9.43172 5.57334 9.5152C5.59084 9.59868 5.63286 9.67504 5.69401 9.7345L8.26568 12.3054C8.6699 12.7096 9.27624 12.1032 8.87201 11.699L6.30035 9.12816C6.26038 9.08717 6.2126 9.05461 6.15984 9.03239C6.10707 9.01017 6.05039 8.99876 5.99314 8.99881ZM4.70771 10.2834C4.62224 10.2832 4.53865 10.3085 4.46769 10.3561C4.39672 10.4037 4.34161 10.4715 4.30945 10.5507C4.27729 10.6299 4.26955 10.7168 4.28721 10.8005C4.30488 10.8841 4.34714 10.9605 4.40858 11.0199L6.98025 13.5908C7.38447 14.0217 8.01749 13.3879 7.58658 12.9845L5.01573 10.4144C4.9758 10.373 4.92795 10.3401 4.87503 10.3176C4.82212 10.2951 4.76521 10.2835 4.70771 10.2834ZM13.9094 11.6537L12.2958 16.4907C12.2408 16.6386 12.071 16.8181 11.8641 16.9151C11.6571 17.0121 11.4493 17.0097 11.32 16.9612L9.57213 16.3072L13.9094 11.6537Z" />
              </svg>{" "}
              إضافه إعلان
            </button>
          )}
          {isLoggedIn && (
            <button
              className="primary-btn1"
              style={{ width: "100%", marginTop: 8, justifyContent: "center" }}
              onClick={handleLogout}
            >
              تسجيل الخروج
            </button>
          )}
          {!isLoggedIn && (
            <button
              type="button"
              className="primary-btn3"
              data-bs-toggle="modal"
              data-bs-target="#logInModal01"
            >
              <svg
                width={16}
                height={16}
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.4311 12.759C15.417 11.4291 16 9.78265 16 8C16 3.58169 12.4182 0 8 0C3.58169 0 0 3.58169 0 8C0 12.4182 3.58169 16 8 16C10.3181 16 12.4058 15.0141 13.867 13.4387C14.0673 13.2226 14.2556 12.9957 14.4311 12.759ZM13.9875 12C14.7533 10.8559 15.1999 9.48009 15.1999 8C15.1999 4.02355 11.9764 0.799983 7.99991 0.799983C4.02355 0.799983 0.799983 4.02355 0.799983 8C0.799983 9.48017 1.24658 10.8559 2.01245 12C2.97866 10.5566 4.45301 9.48194 6.17961 9.03214C5.34594 8.45444 4.79998 7.49102 4.79998 6.39995C4.79998 4.63266 6.23271 3.19993 8 3.19993C9.76729 3.19993 11.2 4.63266 11.2 6.39995C11.2 7.49093 10.654 8.45444 9.82039 9.03206C11.5469 9.48194 13.0213 10.5565 13.9875 12ZM13.4722 12.6793C12.3495 10.8331 10.3188 9.59997 8.00008 9.59997C5.68126 9.59997 3.65049 10.8331 2.52776 12.6794C3.84829 14.2222 5.80992 15.2 8 15.2C10.1901 15.2 12.1517 14.2222 13.4722 12.6793ZM8 8.79998C9.32551 8.79998 10.4 7.72554 10.4 6.39995C10.4 5.07444 9.32559 3.99992 8 3.99992C6.6744 3.99992 5.59997 5.07452 5.59997 6.40003C5.59997 7.72554 6.67449 8.79998 8 8.79998Z"
                />
              </svg>
              تسجيل الدخول
            </button>
          )}
        </div>
      </div>

      <div className="topbar-header" dir="rtl">
        <div className="top-bar style-2">
          <div className="company-logo">
            <Link href="/">
              <img
                style={{
                  width: "170px",
                }}
                src="/assets/img/home2/icon/home2-logo.svg"
                alt="الشعار"
              />
            </Link>
          </div>
          <div className="topbar-right">
            <div className="hotline-area d-xl-flex d-none">
              <div className="icon">
                <svg
                  width={28}
                  height={28}
                  viewBox="0 0 28 28"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M27.2653 21.5995L21.598 17.8201C20.8788 17.3443 19.9147 17.5009 19.383 18.1798L17.7322 20.3024C17.6296 20.4377 17.4816 20.5314 17.3154 20.5664C17.1492 20.6014 16.9759 20.5752 16.8275 20.4928L16.5134 20.3196C15.4725 19.7522 14.1772 19.0458 11.5675 16.4352C8.95784 13.8246 8.25001 12.5284 7.6826 11.4893L7.51042 11.1753C7.42683 11.0269 7.39968 10.8532 7.43398 10.6864C7.46827 10.5195 7.56169 10.3707 7.69704 10.2673L9.81816 8.61693C10.4968 8.08517 10.6536 7.1214 10.1784 6.40198L6.39895 0.734676C5.91192 0.00208106 4.9348 -0.21784 4.18082 0.235398L1.81096 1.65898C1.06634 2.09672 0.520053 2.80571 0.286612 3.63733C-0.56677 6.74673 0.0752209 12.1131 7.98033 20.0191C14.2687 26.307 18.9501 27.9979 22.1677 27.9979C22.9083 28.0011 23.6459 27.9048 24.3608 27.7115C25.1925 27.4783 25.9016 26.932 26.3391 26.1871L27.7641 23.8187C28.218 23.0645 27.9982 22.0868 27.2653 21.5995ZM26.9601 23.3399L25.5384 25.7098C25.2242 26.2474 24.7142 26.6427 24.1152 26.8128C21.2447 27.6009 16.2298 26.9482 8.64053 19.3589C1.0513 11.7697 0.398595 6.75515 1.18669 3.88421C1.35709 3.28446 1.75283 2.77385 2.2911 2.45921L4.66096 1.03749C4.98811 0.840645 5.41221 0.93606 5.62354 1.25397L7.67659 4.3363L9.39976 6.92078C9.60612 7.23283 9.53831 7.65108 9.24392 7.88199L7.1223 9.53232C6.47665 10.026 6.29227 10.9193 6.68979 11.6283L6.85826 11.9344C7.45459 13.0281 8.19599 14.3887 10.9027 17.095C13.6095 19.8012 14.9696 20.5427 16.0628 21.139L16.3694 21.3079C17.0783 21.7053 17.9716 21.521 18.4653 20.8753L20.1157 18.7537C20.3466 18.4595 20.7647 18.3918 21.0769 18.5979L26.7437 22.3773C27.0618 22.5885 27.1572 23.0128 26.9601 23.3399ZM15.8658 4.66809C20.2446 4.67296 23.7931 8.22149 23.798 12.6003C23.798 12.858 24.0069 13.0669 24.2646 13.0669C24.5223 13.0669 24.7312 12.858 24.7312 12.6003C24.7257 7.7063 20.7598 3.74029 15.8658 3.73494C15.6081 3.73494 15.3992 3.94381 15.3992 4.20151C15.3992 4.45922 15.6081 4.66809 15.8658 4.66809Z" />
                  <path d="M15.8658 7.46749C18.699 7.47083 20.995 9.76681 20.9983 12.6001C20.9983 12.7238 21.0475 12.8425 21.135 12.93C21.2225 13.0175 21.3412 13.0667 21.4649 13.0667C21.5887 13.0667 21.7073 13.0175 21.7948 12.93C21.8823 12.8425 21.9315 12.7238 21.9315 12.6001C21.9276 9.25163 19.2142 6.53816 15.8658 6.53433C15.608 6.53433 15.3992 6.74321 15.3992 7.00091C15.3992 7.25862 15.608 7.46749 15.8658 7.46749Z" />
                  <path d="M15.8658 10.2671C17.1536 10.2686 18.1972 11.3122 18.1988 12.6001C18.1988 12.7238 18.2479 12.8425 18.3354 12.93C18.4229 13.0175 18.5416 13.0667 18.6653 13.0667C18.7891 13.0667 18.9078 13.0175 18.9953 12.93C19.0828 12.8425 19.1319 12.7238 19.1319 12.6001C19.1298 10.7971 17.6687 9.33594 15.8658 9.33392C15.608 9.33392 15.3992 9.54279 15.3992 9.8005C15.3992 10.0582 15.608 10.2671 15.8658 10.2671Z" />
                </svg>
              </div>
              <div className="content">
                <span>للمزيد من الاستفسار</span>
                <h6>
                  <a
                    href="tel:+990737621432"
                    style={{ direction: "ltr", unicodeBidi: "embed" }}
                  >
                    +990-737 621 432
                  </a>
                </h6>
              </div>
            </div>
          </div>
        </div>
        {/* Start header section */}
        <header
          ref={headerRef}
          className={
            state.scrollY ? "header-area style-2 sticky" : "header-area style-2"
          }
          dir="rtl"
        >
          <div className="header-logo d-lg-none d-flex">
            <Link href="/">
              <span>
                <img
                  alt="الشعار"
                  className="img-fluid"
                  src="/assets/img/home2/icon/home2-logo.svg"
                />
              </span>
            </Link>
          </div>
          <div
            onClick={toggleSidebar}
            className={`menu-button sidebar-button mobile-menu-btn ${
              state.isSidebarOpen ? "active" : ""
            }`}
          >
            <svg
              width={15}
              height={12}
              viewBox="0 0 15 12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0.75C0 0.551088 0.0790176 0.360322 0.21967 0.21967C0.360322 0.0790178 0.551088 0 0.75 0H10.5C10.6989 0 10.8897 0.0790178 11.0303 0.21967C11.171 0.360322 11.25 0.551088 11.25 0.75C11.25 0.948912 11.171 1.13968 11.0303 1.28033C10.8897 1.42098 10.6989 1.5 10.5 1.5H0.75C0.551088 1.5 0.360322 1.42098 0.21967 1.28033C0.0790176 1.13968 0 0.948912 0 0.75ZM14.25 5.25H0.75C0.551088 5.25 0.360322 5.32902 0.21967 5.46967C0.0790176 5.61032 0 5.80109 0 6C0 6.19891 0.0790176 6.38968 0.21967 6.53033C0.360322 6.67098 0.551088 6.75 0.75 6.75H14.25C14.4489 6.75 14.6397 6.67098 14.7803 6.53033C14.921 6.38968 15 6.19891 15 6C15 5.80109 14.921 5.61032 14.7803 5.46967C14.6397 5.32902 14.4489 5.25 14.25 5.25ZM7.5 10.5H0.75C0.551088 10.5 0.360322 10.579 0.21967 10.7197C0.0790176 10.8603 0 11.0511 0 11.25C0 11.4489 0.0790176 11.6397 0.21967 11.7803C0.360322 11.921 0.551088 12 0.75 12H7.5C7.69891 12 7.88968 11.921 8.03033 11.7803C8.17098 11.6397 8.25 11.4489 8.25 11.25C8.25 11.0511 8.17098 10.8603 8.03033 10.7197C7.88968 10.579 7.69891 10.5 7.5 10.5Z" />
            </svg>
            <span>القائمة</span>
          </div>
          <div className="main-menu">
            <div className="mobile-logo-area d-lg-none d-flex justify-content-between align-items-center">
              <div className="mobile-logo-wrap">
                <Link href="/">
                  <span>
                    <img
                      alt="الشعار"
                      src="/assets/img/home2/icon/home2-logo.svg"
                    />
                  </span>
                </Link>
              </div>
            </div>
            <ul className="menu-list">
              {navTabs.map((tab, index) => (
                <li
                  key={index}
                  className={`${currentRoute === tab.href ? "active" : ""}`}
                >
                  <Link href={tab.href}>{tab.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="nav-right d-flex jsutify-content-end align-items-center">
            <div className="header-right">
              <ul>
                {isLoggedIn && (
                  <li
                    className="user-dropdown-wrapper"
                    style={{ position: "relative", listStyle: "none" }}
                  >
                    <button
                      className="primary-btn1 "
                      style={{
                        cursor: "pointer",
                        border: "1px solid var(--primary-color1)",
                      }}
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#sellUsModal01"
                    >
                      إضافة إعلان
                    </button>
                  </li>
                )}
                {isLoggedIn ? (
                  <li
                    className="user-dropdown-wrapper"
                    style={{ position: "relative", listStyle: "none" }}
                  >
                    <div
                      className="user-icon"
                      style={{ cursor: "pointer" }}
                      onClick={() => setShowUserDropdown((prev) => !prev)}
                      ref={userIconRef}
                    >
                      <img src="/assets/img/user.webp" alt="صورة المستخدم" />
                    </div>
                    {showUserDropdown && (
                      <div
                        className="user-dropdown-menu"
                        style={{
                          position: "absolute",
                          top: "100%",
                          right: "-100%",
                          background: "#ffffff84",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                          borderRadius: 8,
                          minWidth: 120,
                          zIndex: 1000,
                          padding: 8,
                          marginTop: 8,
                        }}
                      >
                        <Link href="/profile" className="user-name">{user?.name}</Link>
                        <button
                          className="primary-btn1"
                          style={{ width: "100%", marginTop: 8 }}
                          onClick={handleLogout}
                        >
                          تسجيل الخروج
                        </button>
                      </div>
                    )}
                  </li>
                ) : (
                  <li>
                    <button
                      type="button"
                      className="primary-btn1"
                      data-bs-toggle="modal"
                      data-bs-target="#logInModal01"
                    >
                      <svg
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M14.4311 12.759C15.417 11.4291 16 9.78265 16 8C16 3.58169 12.4182 0 8 0C3.58169 0 0 3.58169 0 8C0 12.4182 3.58169 16 8 16C10.3181 16 12.4058 15.0141 13.867 13.4387C14.0673 13.2226 14.2556 12.9957 14.4311 12.759ZM13.9875 12C14.7533 10.8559 15.1999 9.48009 15.1999 8C15.1999 4.02355 11.9764 0.799983 7.99991 0.799983C4.02355 0.799983 0.799983 4.02355 0.799983 8C0.799983 9.48017 1.24658 10.8559 2.01245 12C2.97866 10.5566 4.45301 9.48194 6.17961 9.03214C5.34594 8.45444 4.79998 7.49102 4.79998 6.39995C4.79998 4.63266 6.23271 3.19993 8 3.19993C9.76729 3.19993 11.2 4.63266 11.2 6.39995C11.2 7.49093 10.654 8.45444 9.82039 9.03206C11.5469 9.48194 13.0213 10.5565 13.9875 12ZM13.4722 12.6793C12.3495 10.8331 10.3188 9.59997 8.00008 9.59997C5.68126 9.59997 3.65049 10.8331 2.52776 12.6794C3.84829 14.2222 5.80992 15.2 8 15.2C10.1901 15.2 12.1517 14.2222 13.4722 12.6793ZM8 8.79998C9.32551 8.79998 10.4 7.72554 10.4 6.39995C10.4 5.07444 9.32559 3.99992 8 3.99992C6.6744 3.99992 5.59997 5.07452 5.59997 6.40003C5.59997 7.72554 6.67449 8.79998 8 8.79998Z"
                        />
                      </svg>
                      تسجيل الدخول
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </header>
        {/* End header section */}
      </div>
    </>
  );
}

export default index;
