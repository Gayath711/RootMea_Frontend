import React, { useEffect, useMemo, useState } from "react";
import axios from "../../helper/axiosInstance";
import Switch from "@mui/material/Switch";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export default function PermissionsView({
  permissionsState = [],
  setPermissionsState = () => {},
}) {
  //   const [permissionsState, setPermissionsState] = useState([]);
  const [permissionsData, setPermissionsData] = useState([]);
  const [loading, setLoading] = useState(true);
  //   const [permissionsData, setPermissionsData] = useState([
  //     {
  //       id: 1,
  //       category_name: "System",
  //       subcategory_name: null,
  //       permissions: [
  //         {
  //           id: 145,
  //           name: "Can add user",
  //           codename: "add_customuser",
  //         },
  //         {
  //           id: 146,
  //           name: "Can change user",
  //           codename: "change_customuser",
  //         },
  //         {
  //           id: 147,
  //           name: "Can delete user",
  //           codename: "delete_customuser",
  //         },
  //         {
  //           id: 148,
  //           name: "Can view user",
  //           codename: "view_customuser",
  //         },
  //       ],
  //     },
  //     {
  //       id: 2,
  //       category_name: "Assignment & Referrals",
  //       subcategory_name: null,
  //       permissions: [],
  //     },
  //     {
  //       id: 3,
  //       category_name: "Client Documentation",
  //       subcategory_name: "Forms",
  //       permissions: [],
  //     },
  //     {
  //       id: 4,
  //       category_name: "Client Documentation",
  //       subcategory_name: "Care Plans",
  //       permissions: [],
  //     },
  //     {
  //       id: 5,
  //       category_name: "Client Documentation",
  //       subcategory_name: "Priority Lists",
  //       permissions: [],
  //     },
  //     {
  //       id: 6,
  //       category_name: "Client Documentation",
  //       subcategory_name: "Client Chart",
  //       permissions: [],
  //     },
  //     {
  //       id: 7,
  //       category_name: "Client Documentation",
  //       subcategory_name: "Encounter Notes",
  //       permissions: [],
  //     },
  //     {
  //       id: 8,
  //       category_name: "Client Documentation",
  //       subcategory_name: "Calendar",
  //       permissions: [],
  //     },
  //     {
  //       id: 9,
  //       category_name: "Data Management",
  //       subcategory_name: null,
  //       permissions: [],
  //     },
  //   ]);

  const [value, setValue] = useState("");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const togglePermission = (permission) => {
    const isActive = permissionsState.find((itm) => itm.id === permission.id);

    if (isActive) {
      setPermissionsState((prev) => {
        return prev.filter((itm) => itm.id !== permission.id);
      });
    } else {
      setPermissionsState((prev) => {
        return [...prev, permission];
      });
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/permission-category");
      setPermissionsData(data);
      if (data.length > 0) {
        setValue(data[0].id + ":" + data[0].category_name);
      }
    } catch (error) {
      // Handle errors here
      console.error("Error fetching permission category :", error);
    } finally {
      setLoading(false);
    }
  };

  const tabsLabel = useMemo(() => {
    return permissionsData.map((itm) => {
      return {
        id: itm.id,
        category_name: itm.category_name,
        label: itm.id + ":" + itm.category_name,
      };
    });
  }, [permissionsData]);

  const tabsComponent = useMemo(() => {
    if (value === "") {
      return [];
    } else {
      let idOfCat = value.split(":")[0];
      return permissionsData.filter((pd) => +pd.id === +idOfCat);
    }
  }, [permissionsData, value]);

  return (
    <div>
      <p className="text-base mb-2.5">Permissions</p>
      <div className="flex flex-column gap-4">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="wrapped label tabs example"
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabsLabel.map((t) => (
            <Tab value={t.label} label={t.label.split(":")[1]} wrapped />
          ))}
        </Tabs>

        {loading ? (
          <p className="mt-1 animate-pulse text-xs w-100 text-center">
            Loading...
          </p>
        ) : (
          <div className="container p-2">
            <div className="flex w-100 gap-4">
              {tabsComponent.length === 0 && (
                <p className="text-xs my-3">No Permission Category Exist</p>
              )}
              {tabsComponent.map((category) => {
                return (
                  <div
                    key={category.id}
                    className="border border-teal-500 p-4 rounded-lg w-100"
                  >
                    {/* <h2 className="text-base font-bold text-teal-700">
                      {category.category_name}
                    </h2> */}

                    <div className="hidden flex items-center justify-between">
                      <h2 className="text-base font-bold text-teal-700">All</h2>
                      <Switch
                        size="small"
                        // checked={isActive}
                        // onChange={(e) => togglePermission(permission)}
                      />
                    </div>
                    {category.subcategory_name && (
                      <h3 className="text-xs text-teal-600">
                        {category.subcategory_name}
                      </h3>
                    )}
                    {category.permissions.length > 0 ? (
                      <ul className="mt-4">
                        {category.permissions.map((permission) => {
                          const isActive = permissionsState.find(
                            (itm) => itm.id === permission.id
                          );

                          return (
                            <li
                              key={permission.id}
                              className="my-2 flex items-center justify-between"
                            >
                              <span className="text-xs">{permission.name}</span>

                              <Switch
                                size="small"
                                checked={isActive}
                                onChange={(e) => togglePermission(permission)}
                              />
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <p className="text-xs text-gray-500 my-3 mt-4">
                        No permissions available.
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
