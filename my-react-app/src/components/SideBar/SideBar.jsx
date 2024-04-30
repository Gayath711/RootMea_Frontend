import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  toggleSidebar,
  selectIsSidebarExpanded,
} from "../../store/slices/utilsSlice";

import MenuDropDownArrow from "../images/side_bar/menu-down-arrow.svg";

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
    children: [
      {
        id: "staff-directory",
        to: "/staff-directory",
        title: "Staff Directory",
      },
      {
        id: "program-directory",
        to: "/program-directory",
        title: "Program  Directory",
      },
    ],
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

  // const [showTitle, setShowTitle] = useState(false);

  const [showNested, setShowNested] = useState([]);

  const isSidebarExpanded = useSelector(selectIsSidebarExpanded);
  const dispatch = useDispatch();

  const handleToggleSidebar = (payload) => {
    dispatch(toggleSidebar(payload));
  };

  return (
    <div
      onMouseEnter={() => {
        handleToggleSidebar(true);
        // setShowTitle(true);
      }}
      onMouseLeave={() => {
        handleToggleSidebar(false);
        // setShowTitle(false);
      }}
      style={{
        width: `${isSidebarExpanded ? "165px" : "50px"}`,
        transition: "all ease 0.3s",
      }}
      className={`bg-white shadow-2xl rounded-br-[2rem] sticky left-0 top-[12%]`}
    >
      <div
        className={`flex flex-col ${
          isSidebarExpanded ? "justify-start px-3" : "items-center"
        } space-y-12 pt-8 pb-24`}
        style={{
          overflowY: "auto",
        }}
      >
        {sidebarLinks.map((link, index) => {
          const isActive = location.pathname === link.to;
          const bgColor = isActive ? "#D4EDEC" : "#EAECEB";

          return (
            <div
              key={index}
              onMouseEnter={() => {
                if (!showNested.includes(index)) {
                  setShowNested((prev) => {
                    return [...prev, index];
                  });
                }
              }}
              onMouseLeave={() => {
                if (showNested.includes(index)) {
                  setShowNested((prev) => {
                    return prev.filter((idx) => idx !== index);
                  });
                }
              }}
            >
              {/* // Render parent link with dropdown menu */}
              <div>
                <Link to={link.to} className="hover:text-teal-500">
                  <div className="flex items-center gap-2 justify-start w-100">
                    <img
                      className={`p-1 bg-[${bgColor}] size-6`}
                      id={link.id}
                      src={
                        isActive ? link.activeImageSrc : link.inactiveImageSrc
                      }
                      alt={`icon${index + 1}`}
                      title={link.title}
                    />
                    {isSidebarExpanded && (
                      <span className="text-xs truncate">{link.title}</span>
                    )}
                    {link.children && isSidebarExpanded && (
                      <img src={MenuDropDownArrow} className="w-2 h-100" />
                    )}
                  </div>
                </Link>
                {link.children && showNested.includes(index) && (
                  <div className="flex flex-column gap-3 ms-4 mt-2">
                    {isSidebarExpanded &&
                      link.children.map((child, childIndex) => (
                        <Link
                          key={childIndex}
                          to={child.to}
                          className="hover:text-teal-500"
                        >
                          <div className="flex items-center gap-2 justify-start w-100 ms-2">
                            <span className="text-xs truncate">
                              {child.title}
                            </span>
                          </div>
                        </Link>
                      ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
