import React, { useEffect, useState } from "react";
import Select from "react-select";

const DataViewTransferList = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [leftItems, setLeftItems] = useState([]);
  const [rightItems, setRightItems] = useState([]);
  const [databaseList, setDatabaseList] = useState([]);
  const [selectedDatabase, setSelectedDatabase] = useState(null);

  useEffect(() => {
    const extractedDatabase = Object.keys(MOCK.databases).map((each) => {
      return {
        label: each,
        value: each,
      };
    });
    setDatabaseList(extractedDatabase);
  }, []);

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
    let dbItems = MOCK.databases[e.value]
      .map((item) => {
        const key = `${e.value}.${item}`;
        return {
          label: item,
          value: item,
          db: e.value,
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

  console.log({ leftItems, rightItems, selectedOption });

  return (
    <div>
      <div className="flex justify-center items-center m-auto mb-4">
        <Select
          options={databaseList}
          onChange={handleDatabase}
          value={selectedDatabase}
          className="w-[270px] max-w-[70vw]"
        />
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

var MOCK = {
  databases: {
    client_information: [
      "id",
      "first_name",
      "middle_name",
      "last_name",
      "nickname_preferred_name",
      "preferred_pronouns",
      "email_address",
      "mobile_number",
      "home_phone",
      "work_phone",
      "best_way_to_contact",
      "primary_phone",
      "comfortable_language",
      "other_language",
      "date_of_birth",
      "age",
      "sex",
      "social_security_number",
      "us_armed_forces",
      "describe_the_place_you_live",
      "race",
      "other_race",
      "ethnicity",
      "gender_identity",
      "other_gender_identity",
      "sexual_orientation",
      "other_sexual_orientation",
      "mailing_address_line_1_address_n_usual_location",
      "mailing_address_line_2_address_n_usual_location",
      "city_address_n_usual_location",
      "state_address_n_usual_location",
      "zip_address_n_usual_location",
      "where_can_we_usually_find_you_if_different_from_mailing_address",
      "preferred_pharmacy_name",
      "preferred_pharmacy_location",
      "preferred_pharmacy_phone",
      "insurance_primary_carrier_name",
      "insurance_primary_subscriber_id",
      "insurance_primary_subscriber_name",
      "insurance_primary_group_name",
      "insurance_primary_group_id",
      "insurance_primary_relation_to_insured",
      "insurance_primary_effective_from",
      "insurance_primary_effective_to",
      "insurance_secondary_carrier_name",
      "insurance_secondary_subscriber_id",
      "insurance_secondary_subscriber_name",
      "insurance_secondary_group_name",
      "insurance_secondary_group_id",
      "insurance_secondary_relation_to_insured",
      "insurance_secondary_effective_from",
      "insurance_secondary_effective_to",
      "insurance_tertiary_carrier_name",
      "insurance_tertiary_subscriber_id",
      "insurance_tertiary_subscriber_name",
      "insurance_tertiary_group_name",
      "insurance_tertiary_group_id",
      "insurance_tertiary_relation_to_insured",
      "insurance_tertiary_effective_from",
      "insurance_tertiary_effective_to",
      "emergency_contact_1_name",
      "emergency_contact_1_email_address",
      "emergency_contact_1_relationship",
      "emergency_contact_1_address_line_1",
      "emergency_contact_1_address_line_2",
      "emergency_contact_1_city",
      "emergency_contact_1_state",
      "emergency_contact_1_zip",
      "emergency_contact_1_phone",
      "emergency_contact_2_name",
      "emergency_contact_2_email_address",
      "emergency_contact_2_relationship",
      "emergency_contact_2_address_line_1",
      "emergency_contact_2_address_line_2",
      "emergency_contact_2_city",
      "emergency_contact_2_state",
      "emergency_contact_2_zip",
      "emergency_contact_2_phone",
      "system_information_original_data_source",
      "system_information_import_notes",
      "system_information_import_date",
      "system_information_prn",
      "system_information_chart_number",
      "system_information_system_id",
    ],
    client_medications: [
      "id",
      "start_date",
      "stop_date",
      "medication",
      "comments",
      "status",
      "last_updated_date",
      "last_updated_by",
      "client_id_id",
    ],
    client_svs_home: [
      "id",
      "current_residence_description",
      "location_if_no_housing",
      "slept_in_emergency_shelter",
      "housing_risk",
      "client_id_id",
    ],
    client_financial_security: [
      "id",
      "difficulty_paying_bills",
      "income_covers_expenses",
      "skip_meals_due_to_finance",
      "calworks_benefits",
      "social_security_disability_insurance",
      "general_assistance",
      "calfresh_benefits",
      "wic_benefits",
      "unemployment_benefits",
      "state_disability_insurance_benefits",
      "rental_assistance_benefits",
      "financial_security_risk",
      "client_id_id",
    ],
  },
};
