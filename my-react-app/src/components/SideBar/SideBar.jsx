import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import DashboardActive from "../images/side_bar/dashboard-active.png";
import DashboardInActive from "../images/side_bar/dashboard-inactive.png";

import CalendarActive from "../images/side_bar/calendar-active.png";
import CalendarInActive from "../images/side_bar/calendar-inactive.png";

import FormBuilderActive from "../images/side_bar/formbuilder-active.png";
import FormBuilderInActive from "../images/side_bar/formbuilder-inactive.png";

import NewClientActive from "../images/side_bar/newclient-active.png";
import NewClientInActive from "../images/side_bar/newclient-inactive.png";

import DirectoryActive from "../images/side_bar/directory-active.png";
import DirectoryInActive from "../images/side_bar/directory-inactive.png";

import YetAnotherLinkActive from "../images/side_bar/yetanotherlink-active.png";
import YetAnotherLinkInActive from "../images/side_bar/yetanotherlink-inactive.png";

let sidebarLinks = [
  {
    id: "dashboard-page",
    to: "/",
    title: "Dashboard",
    activeImageSrc: DashboardActive,
    inactiveImageSrc: DashboardInActive,
    isActive: false,
  },
  {
    id: "calendar-page",
    to: "/calendar",
    title: "Calendar",
    activeImageSrc: CalendarActive,
    inactiveImageSrc: CalendarInActive,
    isActive: false,
  },
  {
    id: "form-builder-page",
    to: "/form_builder",
    title: "Form Builder",
    activeImageSrc: FormBuilderActive,
    inactiveImageSrc: FormBuilderInActive,
    isActive: false,
  },
  {
    id: "directory-page",
    to: "/directory",
    title: "Directory",
    activeImageSrc: DirectoryActive,
    inactiveImageSrc: DirectoryInActive,
    isActive: false,
  },
  {
    id: "client-profile-new",
    to: "/clientprofilenew",
    title: "Client Profile",
    activeImageSrc: NewClientActive,
    inactiveImageSrc: NewClientInActive,
    isActive: false,
  },
  {
    title: "Log out",
    to: "/#",
    activeImageSrc: YetAnotherLinkActive,
    inactiveImageSrc: YetAnotherLinkInActive,
    isActive: false,
  },
  // Add more links if needed
];
const Sidebar = () => {
  const location = useLocation();

  const [isExpand, setIsExpand] = useState(false);
  // const [showTitle, setShowTitle] = useState(false);

  return (
    <div
      onMouseEnter={() => {
        setIsExpand(true);
        // setShowTitle(true);
      }}
      onMouseLeave={() => {
        setIsExpand(false);
        // setShowTitle(false);
      }}
      style={{
        width: `${isExpand ? "150px" : "50px"}`,
        transition: "all ease 0.3s",
      }}
      className={`flex flex-col ${
        isExpand ? "justify-start px-3" : "items-center"
      } space-y-12 pt-8 pb-24 bg-white shadow-2xl rounded-br-[2rem] sticky left-0 top-[100px]`}
    >
      {sidebarLinks.map((link, index) => {
        const isActive = location.pathname === link.to;
        const bgColor = isActive ? "#D4EDEC" : "#EAECEB";
        return (
          <Link
            key={index}
            to={link.to}
            // onMouseEnter={(e) => {
            //   if (!link.isActive) {
            //     e.target.style.backgroundColor = "#D4EDEC";
            //     e.target.src = link.activeImageSrc;
            //   }
            // }}
            // onMouseLeave={(e) => {
            //   if (!link.isActive) {
            //     e.target.style.backgroundColor = "#EAECEB";
            //     e.target.src = link.inactiveImageSrc;
            //   }
            // }}
          >
            <div className="flex items-center gap-2 justify-start w-100">
              <img
                className={`p-1 bg-[${bgColor}] size-6`}
                id={link.id}
                src={isActive ? link.activeImageSrc : link.inactiveImageSrc}
                alt={`icon${index + 1}`}
                title={link.title}
              />
              {/* {isExpand && (
                <span
                  className="text-xs"
                  style={{
                    opacity: isExpand ? "1" : "0",
                    transition: "all ease-out 1s",
                  }}
                >
                  {link.title}
                </span>
              )} */}

              {isExpand && (
                <span
                  className="text-xs truncate"
                  style={{
                    transform: !isExpand
                      ? "translateX(-50px)"
                      : "translateX(0px)",
                    opacity: isExpand ? "1" : "0",
                    transition: "all ease-out 0.3s",
                  }}
                >
                  {link.title}
                </span>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Sidebar;
