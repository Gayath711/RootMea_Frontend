import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import apiURL from "../../apiConfig";

const DataViewTransferList = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [leftItems, setLeftItems] = useState([]);
  const [rightItems, setRightItems] = useState([]);
  const [databaseList, setDatabaseList] = useState([]);
  const [selectedDatabase, setSelectedDatabase] = useState(null);

  const [loadingData, setLoadingData] = useState(true);
  const [recordData, setRecordData] = useState({});

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const extractedDatabase = Object.keys(recordData).map((each) => {
      let tableDetail = recordData[each];
      return {
        label: tableDetail.name,
        value: tableDetail.name,
        id: tableDetail.id,
        name: tableDetail.name,
        data: tableDetail,
      };
    });
    setDatabaseList(extractedDatabase);
  }, [recordData]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`${apiURL}/api/dataview/list-db-fields`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLoadingData(true);
        setRecordData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Records : ", error);
      })
      .finally(() => {
        setLoadingData(false);
      });
  };

  const handleSelectLeftItem = (item) => {
    setSelectedOption(item);
  };

  const handleSelectRightItem = (item) => {
    setSelectedOption(item);
  };

  const handleMoveToRight = () => {
    if (selectedOption) {
      setRightItems([...rightItems, selectedOption]);
      setLeftItems(
        leftItems.filter((item) => item.value !== selectedOption.value)
      );
      setSelectedOption(null);
    }
  };

  const handleMoveToLeft = () => {
    if (selectedOption) {
      if (selectedOption.db === selectedDatabase.value) {
        setLeftItems([...leftItems, selectedOption]);
        setRightItems(
          rightItems.filter((item) => item.value !== selectedOption.value)
        );
        setSelectedOption(null);
      } else {
        setRightItems((prev) => {
          return prev.filter((item) => item.key !== selectedOption.key);
        });
      }
    }
  };

  const handleDatabase = (e) => {
    setSelectedDatabase(e);
    let db = recordData[e.value];
    let dbItems = db.columns
      .map((item) => {
        const key = `${db.name}.${item.name}`;
        return {
          label: item.name,
          value: item.name,
          columnName: item.name,
          columnID: item.id,
          db: db.name,
          dbID: db.id,
          key: key,
        };
      })
      .filter((eachSelectedDBItem) => {
        console.log({
          eachSelectedDBItem,
          isPresent: rightItems.some(
            (item) => !item.key === eachSelectedDBItem.key
          ),
        });

        return !rightItems.some((item) => item.key === eachSelectedDBItem.key);
      });

    setLeftItems(dbItems);
  };

  const handleSubmit = () => {
    if (dataViewName === "") {
      alert("Please provide data view name");
      return false;
    }

    if (rightItems.length === 0) {
      alert("Atleast one Column required to create");
      return false;
    }
    setIsSubmitting(true);
    let mappings = {};
    rightItems.map((item) => {
      if (mappings[item.dbID]) {
        mappings[item.dbID] = {
          table_id: item.dbID,
          field_ids: [...mappings[item.dbID].field_ids, item.columnID],
        };
      } else {
        mappings[item.dbID] = {
          table_id: item.dbID,
          field_ids: [item.columnID],
        };
      }
    });

    let mappingsArray = Object.values(mappings);

    let postData = {
      name: dataViewName,
      mappings: mappingsArray,
    };

    axios
      .post(`${apiURL}/api/dataview/`, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Data submitted successfully:", response.data);
        alert("Data View Created !");
      })
      .catch((error) => {
        alert("Coud not create Data View !");
        console.error("Error submitting Data:", error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  console.log({ leftItems, rightItems, selectedOption });

  const [dataViewName, setDataViewName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="relative">
      {(loadingData || isSubmitting) && (
        <div className="z-[10] flex flex-column absolute top-0 left-0 items-center justify-center gap-2 w-100 h-100 bg-gray-100/80">
          <svg
            className="animate-spin -ml-1 mr-3 h-8 w-8 text-teal-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="text-base">
            {loadingData
              ? "Loading..."
              : isSubmitting
              ? "Creating..."
              : "Updating..."}
          </p>
        </div>
      )}
      <div className="flex justify-center">
        <div className="w-[68%] flex justify-between items-center gap-4 mb-4">
          <div>
            <Select
              options={databaseList}
              onChange={handleDatabase}
              value={selectedDatabase}
              placeholder="Select table"
              className="w-[270px] max-w-[70vw] placeholder:text-sm"
            />
          </div>
          <div className="flex justify-center items-center gap-2">
            <div>
              <input
                type="text"
                value={dataViewName}
                onChange={(e) => setDataViewName(e.target.value)}
                placeholder="DataView Name"
                className={`placeholder:text-sm appearance-none border-1 border-[#5BC4BF] rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              />
            </div>
            <div>
              <button
                onClick={handleSubmit}
                className="m-auto px-3 py-1 border-1 sm:border-2 rounded-sm border-[#2F9384] text-[#2F9384] text-[13px] font-medium leading-5 hover:bg-[#5BC4BF] hover:text-white"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center gap-4">
        <div className="h-[60vh] w-[30%] overflow-auto border-1 border-teal-900">
          {leftItems.map((item) => (
            <div
              key={item.value}
              onClick={() => handleSelectLeftItem(item)}
              className={`${
                item.key === selectedOption?.key
                  ? "bg-teal-100 border-1 border-b-[2px] border-teal-400"
                  : "bg-white border-b-[1px] border-teal-700"
              } hover:bg-teal-100 text-xs`}
              style={{
                padding: "8px",
                cursor: "pointer",
              }}
            >
              {item.label}
            </div>
          ))}
          {leftItems.length === 0 && (
            <div className="flex items-center justify-center h-100">
              <p className="text-center text-xs">
                {selectedDatabase
                  ? "No Column Available"
                  : "Select any table to get columns"}
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-column gap-2 h-100 justify-center items-center">
          <button
            className="px-3 py-1 border-1 sm:border-2 rounded-sm border-[#2F9384] text-[#2F9384] text-[13px] font-medium leading-5 hover:bg-[#5BC4BF] hover:text-white"
            onClick={handleMoveToRight}
          >
            &gt;&gt;
          </button>
          <button
            className="px-3 py-1 border-1 sm:border-2 rounded-sm border-[#2F9384] text-[#2F9384] text-[13px] font-medium leading-5 hover:bg-[#5BC4BF] hover:text-white"
            onClick={handleMoveToLeft}
          >
            &lt;&lt;
          </button>
        </div>
        <div className="h-[60vh] w-[30%] overflow-auto border-1 border-teal-900">
          {rightItems.map((item) => (
            <div
              key={item.value}
              onClick={() => handleSelectRightItem(item)}
              className={`${
                item.key === selectedOption?.key
                  ? "bg-teal-100 border-1 border-b-[2px] border-teal-400"
                  : "bg-white border-b-[1px] border-teal-700"
              } hover:bg-teal-100 text-xs`}
              style={{
                padding: "8px",
                cursor: "pointer",
              }}
            >
              <p>{item.label}</p>
              <p className="m-0 text-[0.65rem] text-muted">Table : {item.db}</p>
            </div>
          ))}
          {rightItems.length === 0 && (
            <div className="flex items-center justify-center h-100">
              <p className="text-center text-xs">No Column Selected</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataViewTransferList;

var MOCK2 = {
  client_financial_security: {
    id: 4,
    name: "client_financial_security",
    columns: [
      {
        id: 101,
        name: "id",
      },
      {
        id: 102,
        name: "difficulty_paying_bills",
      },
      {
        id: 103,
        name: "income_covers_expenses",
      },
      {
        id: 104,
        name: "skip_meals_due_to_finance",
      },
      {
        id: 105,
        name: "calworks_benefits",
      },
      {
        id: 106,
        name: "social_security_disability_insurance",
      },
      {
        id: 107,
        name: "general_assistance",
      },
      {
        id: 108,
        name: "calfresh_benefits",
      },
      {
        id: 109,
        name: "wic_benefits",
      },
      {
        id: 110,
        name: "unemployment_benefits",
      },
      {
        id: 111,
        name: "state_disability_insurance_benefits",
      },
      {
        id: 112,
        name: "rental_assistance_benefits",
      },
      {
        id: 113,
        name: "financial_security_risk",
      },
      {
        id: 114,
        name: "client_id_id",
      },
    ],
  },
  client_information: {
    id: 1,
    name: "client_information",
    columns: [
      {
        id: 2,
        name: "id",
      },
      {
        id: 3,
        name: "first_name",
      },
      {
        id: 4,
        name: "middle_name",
      },
      {
        id: 5,
        name: "last_name",
      },
      {
        id: 6,
        name: "nickname_preferred_name",
      },
      {
        id: 7,
        name: "preferred_pronouns",
      },
      {
        id: 8,
        name: "email_address",
      },
      {
        id: 9,
        name: "mobile_number",
      },
      {
        id: 10,
        name: "home_phone",
      },
      {
        id: 11,
        name: "work_phone",
      },
      {
        id: 12,
        name: "best_way_to_contact",
      },
      {
        id: 13,
        name: "primary_phone",
      },
      {
        id: 14,
        name: "comfortable_language",
      },
      {
        id: 15,
        name: "other_language",
      },
      {
        id: 16,
        name: "date_of_birth",
      },
      {
        id: 17,
        name: "age",
      },
      {
        id: 18,
        name: "sex",
      },
      {
        id: 19,
        name: "social_security_number",
      },
      {
        id: 20,
        name: "us_armed_forces",
      },
      {
        id: 21,
        name: "describe_the_place_you_live",
      },
      {
        id: 22,
        name: "race",
      },
      {
        id: 23,
        name: "other_race",
      },
      {
        id: 24,
        name: "ethnicity",
      },
      {
        id: 25,
        name: "gender_identity",
      },
      {
        id: 26,
        name: "other_gender_identity",
      },
      {
        id: 27,
        name: "sexual_orientation",
      },
      {
        id: 28,
        name: "other_sexual_orientation",
      },
      {
        id: 29,
        name: "mailing_address_line_1_address_n_usual_location",
      },
      {
        id: 30,
        name: "mailing_address_line_2_address_n_usual_location",
      },
      {
        id: 31,
        name: "city_address_n_usual_location",
      },
      {
        id: 32,
        name: "state_address_n_usual_location",
      },
      {
        id: 33,
        name: "zip_address_n_usual_location",
      },
      {
        id: 34,
        name: "where_can_we_usually_find_you_if_different_from_mailing_address",
      },
      {
        id: 35,
        name: "preferred_pharmacy_name",
      },
      {
        id: 36,
        name: "preferred_pharmacy_location",
      },
      {
        id: 37,
        name: "preferred_pharmacy_phone",
      },
      {
        id: 38,
        name: "insurance_primary_carrier_name",
      },
      {
        id: 39,
        name: "insurance_primary_subscriber_id",
      },
      {
        id: 40,
        name: "insurance_primary_subscriber_name",
      },
      {
        id: 41,
        name: "insurance_primary_group_name",
      },
      {
        id: 42,
        name: "insurance_primary_group_id",
      },
      {
        id: 43,
        name: "insurance_primary_relation_to_insured",
      },
      {
        id: 44,
        name: "insurance_primary_effective_from",
      },
      {
        id: 45,
        name: "insurance_primary_effective_to",
      },
      {
        id: 46,
        name: "insurance_secondary_carrier_name",
      },
      {
        id: 47,
        name: "insurance_secondary_subscriber_id",
      },
      {
        id: 48,
        name: "insurance_secondary_subscriber_name",
      },
      {
        id: 49,
        name: "insurance_secondary_group_name",
      },
      {
        id: 50,
        name: "insurance_secondary_group_id",
      },
      {
        id: 51,
        name: "insurance_secondary_relation_to_insured",
      },
      {
        id: 52,
        name: "insurance_secondary_effective_from",
      },
      {
        id: 53,
        name: "insurance_secondary_effective_to",
      },
      {
        id: 54,
        name: "insurance_tertiary_carrier_name",
      },
      {
        id: 55,
        name: "insurance_tertiary_subscriber_id",
      },
      {
        id: 56,
        name: "insurance_tertiary_subscriber_name",
      },
      {
        id: 57,
        name: "insurance_tertiary_group_name",
      },
      {
        id: 58,
        name: "insurance_tertiary_group_id",
      },
      {
        id: 59,
        name: "insurance_tertiary_relation_to_insured",
      },
      {
        id: 60,
        name: "insurance_tertiary_effective_from",
      },
      {
        id: 61,
        name: "insurance_tertiary_effective_to",
      },
      {
        id: 62,
        name: "emergency_contact_1_name",
      },
      {
        id: 63,
        name: "emergency_contact_1_email_address",
      },
      {
        id: 64,
        name: "emergency_contact_1_relationship",
      },
      {
        id: 65,
        name: "emergency_contact_1_address_line_1",
      },
      {
        id: 66,
        name: "emergency_contact_1_address_line_2",
      },
      {
        id: 67,
        name: "emergency_contact_1_city",
      },
      {
        id: 68,
        name: "emergency_contact_1_state",
      },
      {
        id: 69,
        name: "emergency_contact_1_zip",
      },
      {
        id: 70,
        name: "emergency_contact_1_phone",
      },
      {
        id: 71,
        name: "emergency_contact_2_name",
      },
      {
        id: 72,
        name: "emergency_contact_2_email_address",
      },
      {
        id: 73,
        name: "emergency_contact_2_relationship",
      },
      {
        id: 74,
        name: "emergency_contact_2_address_line_1",
      },
      {
        id: 75,
        name: "emergency_contact_2_address_line_2",
      },
      {
        id: 76,
        name: "emergency_contact_2_city",
      },
      {
        id: 77,
        name: "emergency_contact_2_state",
      },
      {
        id: 78,
        name: "emergency_contact_2_zip",
      },
      {
        id: 79,
        name: "emergency_contact_2_phone",
      },
      {
        id: 80,
        name: "system_information_original_data_source",
      },
      {
        id: 81,
        name: "system_information_import_notes",
      },
      {
        id: 82,
        name: "system_information_import_date",
      },
      {
        id: 83,
        name: "system_information_prn",
      },
      {
        id: 84,
        name: "system_information_chart_number",
      },
      {
        id: 85,
        name: "system_information_system_id",
      },
    ],
  },
  client_medications: {
    id: 2,
    name: "client_medications",
    columns: [
      {
        id: 86,
        name: "id",
      },
      {
        id: 87,
        name: "start_date",
      },
      {
        id: 88,
        name: "stop_date",
      },
      {
        id: 89,
        name: "medication",
      },
      {
        id: 90,
        name: "comments",
      },
      {
        id: 91,
        name: "status",
      },
      {
        id: 92,
        name: "last_updated_date",
      },
      {
        id: 93,
        name: "last_updated_by",
      },
      {
        id: 94,
        name: "client_id_id",
      },
    ],
  },
  client_svs_home: {
    id: 3,
    name: "client_svs_home",
    columns: [
      {
        id: 95,
        name: "id",
      },
      {
        id: 96,
        name: "current_residence_description",
      },
      {
        id: 97,
        name: "location_if_no_housing",
      },
      {
        id: 98,
        name: "slept_in_emergency_shelter",
      },
      {
        id: 99,
        name: "housing_risk",
      },
      {
        id: 100,
        name: "client_id_id",
      },
    ],
  },
};
