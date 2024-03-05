import { useState, useMemo } from 'react';
import { useTable } from 'react-table';

import { COLUMNS } from '../constants';
import '../css/mypanel.module.css'

const PriorityList = (id) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };
    const [data, setData] = useState([{
        "id": 10, "first_name": "Myra", "middle_name": "B", "last_name": "Williams", "nickname_preferred_name": "Myra", "preferred_pronouns": "She/Her", "email_address": "Myra@roots.org", "mobile_number": 755068929, "home_phone": "512-210-1007", "work_phone": "512-100-2007", "best_way_to_contact": "Mobile", "primary_phone": "Mobile", "comfortable_language": "English", "other_language": "Spanish", "date_of_birth": "1989-06-01", "age": 35, "sex": "Female", "social_security_number": null, "us_armed_forces": "Veteran", "describe_the_place_you_live": "Coach Surfing", "race": "Black", "other_race": null, "ethnicity": "Hispanic", "gender_identity": "Female", "other_gender_identity": null, "sexual_orientation": "Heterosexual", "other_sexual_orientation": null, "mailing_address_line_1_address_n_usual_location": "1241 5th Avenue", "mailing_address_line_2_address_n_usual_location": "Apt 11", "city_address_n_usual_location": "Oakland", "state_address_n_usual_location": "CA", "zip_address_n_usual_location": "94621", "where_can_we_usually_find_you_if_different_from_mailing_address": null, "preferred_pharmacy_name": "CVS", "preferred_pharmacy_location": "Leesburg", "preferred_pharmacy_phone": "229-814-1010", "insurance_primary_carrier_name": "Oakland Health Insurance", "insurance_primary_subscriber_id": "123463", "insurance_primary_subscriber_name": "Myra Williams", "insurance_primary_group_name": "ABC130", "insurance_primary_group_id": "97451", "insurance_primary_relation_to_insured": "Self", "insurance_primary_effective_from": "2023-01-01", "insurance_primary_effective_to": "2023-12-31", "insurance_secondary_carrier_name": "Oakland Health Insurance", "insurance_secondary_subscriber_id": "123463", "insurance_secondary_subscriber_name": "Myra Williams", "insurance_secondary_group_name": "ABC130", "insurance_secondary_group_id": "97451", "insurance_secondary_relation_to_insured": "Self", "insurance_secondary_effective_from": "2023-01-01", "insurance_secondary_effective_to": "2023-12-21", "insurance_tertiary_carrier_name": "Oakland Health Insurance", "insurance_tertiary_subscriber_id": "123463", "insurance_tertiary_subscriber_name": "Myra Williams", "insurance_tertiary_group_name": "ABC130", "insurance_tertiary_group_id": "97451", "insurance_tertiary_relation_to_insured": "Self", "insurance_tertiary_effective_from": "2023-01-01", "insurance_tertiary_effective_to": "2023-12-21", "emergency_contact_1_name": "Emer1", "emergency_contact_1_email_address": "Emer@abc.com", "emergency_contact_1_relationship": "Friend", "emergency_contact_1_address_line_1": "19 7th Ave", "emergency_contact_1_address_line_2": "Apt 11", "emergency_contact_1_city": "Oakland", "emergency_contact_1_state": "CA", "emergency_contact_1_zip": "94621", "emergency_contact_1_phone": 99806684, "emergency_contact_2_name": "Emer2", "emergency_contact_2_email_address": "Emer2@abc.com", "emergency_contact_2_relationship": "Friend", "emergency_contact_2_address_line_1": "19 7th Ave", "emergency_contact_2_address_line_2": "Apt 11", "emergency_contact_2_city": "Oakland", "emergency_contact_2_state": "CA", "emergency_contact_2_zip": "94621", "emergency_contact_2_phone": 99806684, "system_information_original_data_source": "Practice Fusion", "system_information_import_notes": "Imported", "system_information_import_date": "2023-10-10", "system_information_prn": "12352", "system_information_chart_number": "96726", "system_information_system_id": "3092",
        "status": "Engaged", "hmis_id": 1234678, "housing_status": "Unhold", "ce_application_date": "9/20/2022", "social_risk_score_housing": "high", "latest_housing_status": 3818, "staff_signed_to_client": "Engaged", "last_reviewed": "8/14/2023", "latest_encounter_date": "8/14/2023", "latest_encounter_note": "Followed up regarding survey", "date_assigned": "2022-01-16", "program": "ECM"
    }, {
        "id": 11, "first_name": "Lucas", "middle_name": "C", "last_name": "Turner", "nickname_preferred_name": "Lucas", "preferred_pronouns": "He/His", "email_address": "Lucas@roots.org", "mobile_number": 220912475, "home_phone": "512-210-1008", "work_phone": "512-100-2008", "best_way_to_contact": "Mobile", "primary_phone": "Mobile", "comfortable_language": "English", "other_language": "Spanish", "date_of_birth": "1934-03-14", "age": 90, "sex": "Male", "social_security_number": null, "us_armed_forces": "Veteran", "describe_the_place_you_live": "House or Apartment", "race": "Black", "other_race": null, "ethnicity": "Hispanic", "gender_identity": "Male", "other_gender_identity": null, "sexual_orientation": "Heterosexual", "other_sexual_orientation": null, "mailing_address_line_1_address_n_usual_location": "1242 5th Avenue", "mailing_address_line_2_address_n_usual_location": "Apt 12", "city_address_n_usual_location": "Oakland", "state_address_n_usual_location": "CA", "zip_address_n_usual_location": "94621", "where_can_we_usually_find_you_if_different_from_mailing_address": null, "preferred_pharmacy_name": "Oakland Pharmacy", "preferred_pharmacy_location": "Leesburg", "preferred_pharmacy_phone": "229-814-1011", "insurance_primary_carrier_name": "Alameda Alliance", "insurance_primary_subscriber_id": "123464", "insurance_primary_subscriber_name": "Lucas Turner", "insurance_primary_group_name": "ABC131", "insurance_primary_group_id": "97451", "insurance_primary_relation_to_insured": "Self", "insurance_primary_effective_from": "2023-01-01", "insurance_primary_effective_to": "2023-12-31", "insurance_secondary_carrier_name": "Alameda Alliance", "insurance_secondary_subscriber_id": "123464", "insurance_secondary_subscriber_name": "Lucas Turner", "insurance_secondary_group_name": "ABC131", "insurance_secondary_group_id": "97451", "insurance_secondary_relation_to_insured": "Self", "insurance_secondary_effective_from": "2023-01-01", "insurance_secondary_effective_to": "2023-12-21", "insurance_tertiary_carrier_name": "Alameda Alliance", "insurance_tertiary_subscriber_id": "123464", "insurance_tertiary_subscriber_name": "Lucas Turner", "insurance_tertiary_group_name": "ABC131", "insurance_tertiary_group_id": "97451", "insurance_tertiary_relation_to_insured": "Self", "insurance_tertiary_effective_from": "2023-01-01", "insurance_tertiary_effective_to": "2023-12-21", "emergency_contact_1_name": "Emer1", "emergency_contact_1_email_address": "Emer@abc.com", "emergency_contact_1_relationship": "Friend", "emergency_contact_1_address_line_1": "20 7th Ave", "emergency_contact_1_address_line_2": "Apt 12", "emergency_contact_1_city": "Oakland", "emergency_contact_1_state": "CA", "emergency_contact_1_zip": "94621", "emergency_contact_1_phone": 99806685, "emergency_contact_2_name": "Emer2", "emergency_contact_2_email_address": "Emer2@abc.com", "emergency_contact_2_relationship": "Friend", "emergency_contact_2_address_line_1": "20 7th Ave", "emergency_contact_2_address_line_2": "Apt 12", "emergency_contact_2_city": "Oakland", "emergency_contact_2_state": "CA", "emergency_contact_2_zip": "94621", "emergency_contact_2_phone": 99806685, "system_information_original_data_source": "Practice Fusion", "system_information_import_notes": "Imported", "system_information_import_date": "2023-10-10", "system_information_prn": "12353", "system_information_chart_number": "96717", "system_information_system_id": "3093",
        "status": "Engaged", "hmis_id": 1234678, "housing_status": "Unhold", "ce_application_date": "9/20/2022", "social_risk_score_housing": "high", "latest_housing_status": 3818, "staff_signed_to_client": "Engaged", "last_reviewed": "8/14/2023", "latest_encounter_date": "8/14/2023", "latest_encounter_note": "Followed up regarding survey", "date_assigned": "2022-01-16", "program": "ECM"
    }, {
        "id": 11, "first_name": "Lucas", "middle_name": "C", "last_name": "Turner", "nickname_preferred_name": "Lucas", "preferred_pronouns": "He/His", "email_address": "Lucas@roots.org", "mobile_number": 220912475, "home_phone": "512-210-1008", "work_phone": "512-100-2008", "best_way_to_contact": "Mobile", "primary_phone": "Mobile", "comfortable_language": "English", "other_language": "Spanish", "date_of_birth": "1934-03-14", "age": 90, "sex": "Male", "social_security_number": null, "us_armed_forces": "Veteran", "describe_the_place_you_live": "House or Apartment", "race": "Black", "other_race": null, "ethnicity": "Hispanic", "gender_identity": "Male", "other_gender_identity": null, "sexual_orientation": "Heterosexual", "other_sexual_orientation": null, "mailing_address_line_1_address_n_usual_location": "1242 5th Avenue", "mailing_address_line_2_address_n_usual_location": "Apt 12", "city_address_n_usual_location": "Oakland", "state_address_n_usual_location": "CA", "zip_address_n_usual_location": "94621", "where_can_we_usually_find_you_if_different_from_mailing_address": null, "preferred_pharmacy_name": "Oakland Pharmacy", "preferred_pharmacy_location": "Leesburg", "preferred_pharmacy_phone": "229-814-1011", "insurance_primary_carrier_name": "Alameda Alliance", "insurance_primary_subscriber_id": "123464", "insurance_primary_subscriber_name": "Lucas Turner", "insurance_primary_group_name": "ABC131", "insurance_primary_group_id": "97451", "insurance_primary_relation_to_insured": "Self", "insurance_primary_effective_from": "2023-01-01", "insurance_primary_effective_to": "2023-12-31", "insurance_secondary_carrier_name": "Alameda Alliance", "insurance_secondary_subscriber_id": "123464", "insurance_secondary_subscriber_name": "Lucas Turner", "insurance_secondary_group_name": "ABC131", "insurance_secondary_group_id": "97451", "insurance_secondary_relation_to_insured": "Self", "insurance_secondary_effective_from": "2023-01-01", "insurance_secondary_effective_to": "2023-12-21", "insurance_tertiary_carrier_name": "Alameda Alliance", "insurance_tertiary_subscriber_id": "123464", "insurance_tertiary_subscriber_name": "Lucas Turner", "insurance_tertiary_group_name": "ABC131", "insurance_tertiary_group_id": "97451", "insurance_tertiary_relation_to_insured": "Self", "insurance_tertiary_effective_from": "2023-01-01", "insurance_tertiary_effective_to": "2023-12-21", "emergency_contact_1_name": "Emer1", "emergency_contact_1_email_address": "Emer@abc.com", "emergency_contact_1_relationship": "Friend", "emergency_contact_1_address_line_1": "20 7th Ave", "emergency_contact_1_address_line_2": "Apt 12", "emergency_contact_1_city": "Oakland", "emergency_contact_1_state": "CA", "emergency_contact_1_zip": "94621", "emergency_contact_1_phone": 99806685, "emergency_contact_2_name": "Emer2", "emergency_contact_2_email_address": "Emer2@abc.com", "emergency_contact_2_relationship": "Friend", "emergency_contact_2_address_line_1": "20 7th Ave", "emergency_contact_2_address_line_2": "Apt 12", "emergency_contact_2_city": "Oakland", "emergency_contact_2_state": "CA", "emergency_contact_2_zip": "94621", "emergency_contact_2_phone": 99806685, "system_information_original_data_source": "Practice Fusion", "system_information_import_notes": "Imported", "system_information_import_date": "2023-10-10", "system_information_prn": "12353", "system_information_chart_number": "96717", "system_information_system_id": "3093",
        "status": "Engaged", "hmis_id": 1234678, "housing_status": "Unhold", "ce_application_date": "9/20/2022", "social_risk_score_housing": "high", "latest_housing_status": 3818, "staff_signed_to_client": "Engaged", "last_reviewed": "8/14/2023", "latest_encounter_date": "8/14/2023", "latest_encounter_note": "Followed up regarding survey", "date_assigned": "2022-01-16", "program": "Diabetes"
    }, {
        "id": 11, "first_name": "Lucas", "middle_name": "C", "last_name": "Turner", "nickname_preferred_name": "Lucas", "preferred_pronouns": "He/His", "email_address": "Lucas@roots.org", "mobile_number": 220912475, "home_phone": "512-210-1008", "work_phone": "512-100-2008", "best_way_to_contact": "Mobile", "primary_phone": "Mobile", "comfortable_language": "English", "other_language": "Spanish", "date_of_birth": "1934-03-14", "age": 90, "sex": "Male", "social_security_number": null, "us_armed_forces": "Veteran", "describe_the_place_you_live": "House or Apartment", "race": "Black", "other_race": null, "ethnicity": "Hispanic", "gender_identity": "Male", "other_gender_identity": null, "sexual_orientation": "Heterosexual", "other_sexual_orientation": null, "mailing_address_line_1_address_n_usual_location": "1242 5th Avenue", "mailing_address_line_2_address_n_usual_location": "Apt 12", "city_address_n_usual_location": "Oakland", "state_address_n_usual_location": "CA", "zip_address_n_usual_location": "94621", "where_can_we_usually_find_you_if_different_from_mailing_address": null, "preferred_pharmacy_name": "Oakland Pharmacy", "preferred_pharmacy_location": "Leesburg", "preferred_pharmacy_phone": "229-814-1011", "insurance_primary_carrier_name": "Alameda Alliance", "insurance_primary_subscriber_id": "123464", "insurance_primary_subscriber_name": "Lucas Turner", "insurance_primary_group_name": "ABC131", "insurance_primary_group_id": "97451", "insurance_primary_relation_to_insured": "Self", "insurance_primary_effective_from": "2023-01-01", "insurance_primary_effective_to": "2023-12-31", "insurance_secondary_carrier_name": "Alameda Alliance", "insurance_secondary_subscriber_id": "123464", "insurance_secondary_subscriber_name": "Lucas Turner", "insurance_secondary_group_name": "ABC131", "insurance_secondary_group_id": "97451", "insurance_secondary_relation_to_insured": "Self", "insurance_secondary_effective_from": "2023-01-01", "insurance_secondary_effective_to": "2023-12-21", "insurance_tertiary_carrier_name": "Alameda Alliance", "insurance_tertiary_subscriber_id": "123464", "insurance_tertiary_subscriber_name": "Lucas Turner", "insurance_tertiary_group_name": "ABC131", "insurance_tertiary_group_id": "97451", "insurance_tertiary_relation_to_insured": "Self", "insurance_tertiary_effective_from": "2023-01-01", "insurance_tertiary_effective_to": "2023-12-21", "emergency_contact_1_name": "Emer1", "emergency_contact_1_email_address": "Emer@abc.com", "emergency_contact_1_relationship": "Friend", "emergency_contact_1_address_line_1": "20 7th Ave", "emergency_contact_1_address_line_2": "Apt 12", "emergency_contact_1_city": "Oakland", "emergency_contact_1_state": "CA", "emergency_contact_1_zip": "94621", "emergency_contact_1_phone": 99806685, "emergency_contact_2_name": "Emer2", "emergency_contact_2_email_address": "Emer2@abc.com", "emergency_contact_2_relationship": "Friend", "emergency_contact_2_address_line_1": "20 7th Ave", "emergency_contact_2_address_line_2": "Apt 12", "emergency_contact_2_city": "Oakland", "emergency_contact_2_state": "CA", "emergency_contact_2_zip": "94621", "emergency_contact_2_phone": 99806685, "system_information_original_data_source": "Practice Fusion", "system_information_import_notes": "Imported", "system_information_import_date": "2023-10-10", "system_information_prn": "12353", "system_information_chart_number": "96717", "system_information_system_id": "3093",
        "status": "Engaged", "hmis_id": 1234678, "housing_status": "Unhold", "ce_application_date": "9/20/2022", "social_risk_score_housing": "high", "latest_housing_status": 3818, "staff_signed_to_client": "Engaged", "last_reviewed": "8/14/2023", "latest_encounter_date": "8/14/2023", "latest_encounter_note": "Followed up regarding survey", "date_assigned": "2022-01-16", "program": "Diabetes"
    }, {
        "id": 11, "first_name": "Lucas", "middle_name": "C", "last_name": "Turner", "nickname_preferred_name": "Lucas", "preferred_pronouns": "He/His", "email_address": "Lucas@roots.org", "mobile_number": 220912475, "home_phone": "512-210-1008", "work_phone": "512-100-2008", "best_way_to_contact": "Mobile", "primary_phone": "Mobile", "comfortable_language": "English", "other_language": "Spanish", "date_of_birth": "1934-03-14", "age": 90, "sex": "Male", "social_security_number": null, "us_armed_forces": "Veteran", "describe_the_place_you_live": "House or Apartment", "race": "Black", "other_race": null, "ethnicity": "Hispanic", "gender_identity": "Male", "other_gender_identity": null, "sexual_orientation": "Heterosexual", "other_sexual_orientation": null, "mailing_address_line_1_address_n_usual_location": "1242 5th Avenue", "mailing_address_line_2_address_n_usual_location": "Apt 12", "city_address_n_usual_location": "Oakland", "state_address_n_usual_location": "CA", "zip_address_n_usual_location": "94621", "where_can_we_usually_find_you_if_different_from_mailing_address": null, "preferred_pharmacy_name": "Oakland Pharmacy", "preferred_pharmacy_location": "Leesburg", "preferred_pharmacy_phone": "229-814-1011", "insurance_primary_carrier_name": "Alameda Alliance", "insurance_primary_subscriber_id": "123464", "insurance_primary_subscriber_name": "Lucas Turner", "insurance_primary_group_name": "ABC131", "insurance_primary_group_id": "97451", "insurance_primary_relation_to_insured": "Self", "insurance_primary_effective_from": "2023-01-01", "insurance_primary_effective_to": "2023-12-31", "insurance_secondary_carrier_name": "Alameda Alliance", "insurance_secondary_subscriber_id": "123464", "insurance_secondary_subscriber_name": "Lucas Turner", "insurance_secondary_group_name": "ABC131", "insurance_secondary_group_id": "97451", "insurance_secondary_relation_to_insured": "Self", "insurance_secondary_effective_from": "2023-01-01", "insurance_secondary_effective_to": "2023-12-21", "insurance_tertiary_carrier_name": "Alameda Alliance", "insurance_tertiary_subscriber_id": "123464", "insurance_tertiary_subscriber_name": "Lucas Turner", "insurance_tertiary_group_name": "ABC131", "insurance_tertiary_group_id": "97451", "insurance_tertiary_relation_to_insured": "Self", "insurance_tertiary_effective_from": "2023-01-01", "insurance_tertiary_effective_to": "2023-12-21", "emergency_contact_1_name": "Emer1", "emergency_contact_1_email_address": "Emer@abc.com", "emergency_contact_1_relationship": "Friend", "emergency_contact_1_address_line_1": "20 7th Ave", "emergency_contact_1_address_line_2": "Apt 12", "emergency_contact_1_city": "Oakland", "emergency_contact_1_state": "CA", "emergency_contact_1_zip": "94621", "emergency_contact_1_phone": 99806685, "emergency_contact_2_name": "Emer2", "emergency_contact_2_email_address": "Emer2@abc.com", "emergency_contact_2_relationship": "Friend", "emergency_contact_2_address_line_1": "20 7th Ave", "emergency_contact_2_address_line_2": "Apt 12", "emergency_contact_2_city": "Oakland", "emergency_contact_2_state": "CA", "emergency_contact_2_zip": "94621", "emergency_contact_2_phone": 99806685, "system_information_original_data_source": "Practice Fusion", "system_information_import_notes": "Imported", "system_information_import_date": "2023-10-10", "system_information_prn": "12353", "system_information_chart_number": "96717", "system_information_system_id": "3093",
        "status": "Engaged", "hmis_id": 1234678, "housing_status": "Unhold", "ce_application_date": "9/20/2022", "social_risk_score_housing": "high", "latest_housing_status": 3818, "staff_signed_to_client": "Engaged", "last_reviewed": "8/14/2023", "latest_encounter_date": "8/14/2023", "latest_encounter_note": "Followed up regarding survey", "date_assigned": "2022-01-16", "program": "STOMP"
    }, {
        "id": 11, "first_name": "Lucas", "middle_name": "C", "last_name": "Turner", "nickname_preferred_name": "Lucas", "preferred_pronouns": "He/His", "email_address": "Lucas@roots.org", "mobile_number": 220912475, "home_phone": "512-210-1008", "work_phone": "512-100-2008", "best_way_to_contact": "Mobile", "primary_phone": "Mobile", "comfortable_language": "English", "other_language": "Spanish", "date_of_birth": "1934-03-14", "age": 90, "sex": "Male", "social_security_number": null, "us_armed_forces": "Veteran", "describe_the_place_you_live": "House or Apartment", "race": "Black", "other_race": null, "ethnicity": "Hispanic", "gender_identity": "Male", "other_gender_identity": null, "sexual_orientation": "Heterosexual", "other_sexual_orientation": null, "mailing_address_line_1_address_n_usual_location": "1242 5th Avenue", "mailing_address_line_2_address_n_usual_location": "Apt 12", "city_address_n_usual_location": "Oakland", "state_address_n_usual_location": "CA", "zip_address_n_usual_location": "94621", "where_can_we_usually_find_you_if_different_from_mailing_address": null, "preferred_pharmacy_name": "Oakland Pharmacy", "preferred_pharmacy_location": "Leesburg", "preferred_pharmacy_phone": "229-814-1011", "insurance_primary_carrier_name": "Alameda Alliance", "insurance_primary_subscriber_id": "123464", "insurance_primary_subscriber_name": "Lucas Turner", "insurance_primary_group_name": "ABC131", "insurance_primary_group_id": "97451", "insurance_primary_relation_to_insured": "Self", "insurance_primary_effective_from": "2023-01-01", "insurance_primary_effective_to": "2023-12-31", "insurance_secondary_carrier_name": "Alameda Alliance", "insurance_secondary_subscriber_id": "123464", "insurance_secondary_subscriber_name": "Lucas Turner", "insurance_secondary_group_name": "ABC131", "insurance_secondary_group_id": "97451", "insurance_secondary_relation_to_insured": "Self", "insurance_secondary_effective_from": "2023-01-01", "insurance_secondary_effective_to": "2023-12-21", "insurance_tertiary_carrier_name": "Alameda Alliance", "insurance_tertiary_subscriber_id": "123464", "insurance_tertiary_subscriber_name": "Lucas Turner", "insurance_tertiary_group_name": "ABC131", "insurance_tertiary_group_id": "97451", "insurance_tertiary_relation_to_insured": "Self", "insurance_tertiary_effective_from": "2023-01-01", "insurance_tertiary_effective_to": "2023-12-21", "emergency_contact_1_name": "Emer1", "emergency_contact_1_email_address": "Emer@abc.com", "emergency_contact_1_relationship": "Friend", "emergency_contact_1_address_line_1": "20 7th Ave", "emergency_contact_1_address_line_2": "Apt 12", "emergency_contact_1_city": "Oakland", "emergency_contact_1_state": "CA", "emergency_contact_1_zip": "94621", "emergency_contact_1_phone": 99806685, "emergency_contact_2_name": "Emer2", "emergency_contact_2_email_address": "Emer2@abc.com", "emergency_contact_2_relationship": "Friend", "emergency_contact_2_address_line_1": "20 7th Ave", "emergency_contact_2_address_line_2": "Apt 12", "emergency_contact_2_city": "Oakland", "emergency_contact_2_state": "CA", "emergency_contact_2_zip": "94621", "emergency_contact_2_phone": 99806685, "system_information_original_data_source": "Practice Fusion", "system_information_import_notes": "Imported", "system_information_import_date": "2023-10-10", "system_information_prn": "12353", "system_information_chart_number": "96717", "system_information_system_id": "3093",
        "status": "Engaged", "hmis_id": 1234678, "housing_status": "Unhold", "ce_application_date": "9/20/2022", "social_risk_score_housing": "high", "latest_housing_status": 3818, "staff_signed_to_client": "Engaged", "last_reviewed": "8/14/2023", "latest_encounter_date": "8/14/2023", "latest_encounter_note": "Followed up regarding survey", "date_assigned": "2022-01-16", "program": "STOMP"
    }, {
        "id": 11, "first_name": "Lucas", "middle_name": "C", "last_name": "Turner", "nickname_preferred_name": "Lucas", "preferred_pronouns": "He/His", "email_address": "Lucas@roots.org", "mobile_number": 220912475, "home_phone": "512-210-1008", "work_phone": "512-100-2008", "best_way_to_contact": "Mobile", "primary_phone": "Mobile", "comfortable_language": "English", "other_language": "Spanish", "date_of_birth": "1934-03-14", "age": 90, "sex": "Male", "social_security_number": null, "us_armed_forces": "Veteran", "describe_the_place_you_live": "House or Apartment", "race": "Black", "other_race": null, "ethnicity": "Hispanic", "gender_identity": "Male", "other_gender_identity": null, "sexual_orientation": "Heterosexual", "other_sexual_orientation": null, "mailing_address_line_1_address_n_usual_location": "1242 5th Avenue", "mailing_address_line_2_address_n_usual_location": "Apt 12", "city_address_n_usual_location": "Oakland", "state_address_n_usual_location": "CA", "zip_address_n_usual_location": "94621", "where_can_we_usually_find_you_if_different_from_mailing_address": null, "preferred_pharmacy_name": "Oakland Pharmacy", "preferred_pharmacy_location": "Leesburg", "preferred_pharmacy_phone": "229-814-1011", "insurance_primary_carrier_name": "Alameda Alliance", "insurance_primary_subscriber_id": "123464", "insurance_primary_subscriber_name": "Lucas Turner", "insurance_primary_group_name": "ABC131", "insurance_primary_group_id": "97451", "insurance_primary_relation_to_insured": "Self", "insurance_primary_effective_from": "2023-01-01", "insurance_primary_effective_to": "2023-12-31", "insurance_secondary_carrier_name": "Alameda Alliance", "insurance_secondary_subscriber_id": "123464", "insurance_secondary_subscriber_name": "Lucas Turner", "insurance_secondary_group_name": "ABC131", "insurance_secondary_group_id": "97451", "insurance_secondary_relation_to_insured": "Self", "insurance_secondary_effective_from": "2023-01-01", "insurance_secondary_effective_to": "2023-12-21", "insurance_tertiary_carrier_name": "Alameda Alliance", "insurance_tertiary_subscriber_id": "123464", "insurance_tertiary_subscriber_name": "Lucas Turner", "insurance_tertiary_group_name": "ABC131", "insurance_tertiary_group_id": "97451", "insurance_tertiary_relation_to_insured": "Self", "insurance_tertiary_effective_from": "2023-01-01", "insurance_tertiary_effective_to": "2023-12-21", "emergency_contact_1_name": "Emer1", "emergency_contact_1_email_address": "Emer@abc.com", "emergency_contact_1_relationship": "Friend", "emergency_contact_1_address_line_1": "20 7th Ave", "emergency_contact_1_address_line_2": "Apt 12", "emergency_contact_1_city": "Oakland", "emergency_contact_1_state": "CA", "emergency_contact_1_zip": "94621", "emergency_contact_1_phone": 99806685, "emergency_contact_2_name": "Emer2", "emergency_contact_2_email_address": "Emer2@abc.com", "emergency_contact_2_relationship": "Friend", "emergency_contact_2_address_line_1": "20 7th Ave", "emergency_contact_2_address_line_2": "Apt 12", "emergency_contact_2_city": "Oakland", "emergency_contact_2_state": "CA", "emergency_contact_2_zip": "94621", "emergency_contact_2_phone": 99806685, "system_information_original_data_source": "Practice Fusion", "system_information_import_notes": "Imported", "system_information_import_date": "2023-10-10", "system_information_prn": "12353", "system_information_chart_number": "96717", "system_information_system_id": "3093",
        "status": "Engaged", "hmis_id": 1234678, "housing_status": "Unhold", "ce_application_date": "9/20/2022", "social_risk_score_housing": "high", "latest_housing_status": 3818, "staff_signed_to_client": "Engaged", "last_reviewed": "8/14/2023", "latest_encounter_date": "8/14/2023", "latest_encounter_note": "Followed up regarding survey", "date_assigned": "2022-01-16", "program": "ECM"
    }
    ]);
    const columns = useMemo(() => COLUMNS, []);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data });

    return (
        <div className="border border-gray-300  bg-gray-50" id={`accordian-${id}`}>
            <div
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={toggleAccordion}
            >
                <div>
                    <h2 className="text-lg font-medium">Priority List</h2>

                    {/* <p>Kindly provide complete and valid information for the Contact Information section.</p> */}
                </div>
                <svg
                    className={`w-6 h-6 transition-transform transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                    width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="13.2988" cy="12.5" r="12.5" transform="rotate(-180 13.2988 12.5)" fill="#28293B" />
                    <path d="M5.51785 16.0377C5.51279 16.2498 5.57946 16.4582 5.7087 16.6337C5.83794 16.8093 6.02336 16.9433 6.23901 17.0172C6.45466 17.0911 6.68988 17.1012 6.91204 17.0461C7.1342 16.991 7.33212 16.8734 7.47847 16.7096L13.2806 10.4628L19.0806 16.7096C19.1709 16.8229 19.2854 16.9177 19.4173 16.9882C19.5491 17.0587 19.6953 17.1034 19.8467 17.1194C19.9981 17.1353 20.1514 17.1223 20.2971 17.0811C20.4428 17.0399 20.5777 16.9714 20.6934 16.8798C20.809 16.7883 20.9028 16.6757 20.9691 16.5492C21.0354 16.4226 21.0726 16.2848 21.0785 16.1444C21.0844 16.0039 21.0589 15.8639 21.0033 15.733C20.9478 15.6021 20.8636 15.4832 20.7559 15.3837L14.1215 8.23166C14.0176 8.11934 13.8886 8.02915 13.7432 7.96731C13.5978 7.90547 13.4396 7.87344 13.2795 7.87344C13.1195 7.87344 12.9612 7.90547 12.8159 7.96731C12.6705 8.02915 12.5414 8.11934 12.4375 8.23166L5.79666 15.3837C5.62267 15.5644 5.52401 15.7961 5.51785 16.0377Z" fill="white" />

                </svg>
            </div>
            {
                isOpen && (
                    <div className='flex flex-col px-3 mt-2'>
                        <div className="rounded-sm p-4" >
                            {/* <table {...getTableProps()} className="">
                                <thead>
                                    {headerGroups.map((headerGroup) => (
                                        <tr {...headerGroup.getHeaderGroupProps()} >
                                            {headerGroup.headers.map((column) => (
                                                <th {...column.getHeaderProps()} style={{ padding: '20px', minWidth: column.width }}>
                                                    {column.render('Header')}
                                                </th>
                                            ))}
                                            <th style={{ minWidth: '130px' }}>
                                                Client Profile
                                            </th>
                                            <th style={{ minWidth: '130px' }}>
                                                Client Chart
                                            </th>
                                            <th style={{ minWidth: '130px' }}>
                                                Encounter Note
                                            </th>
                                        </tr>
                                    ))}

                                </thead>
                                <tbody {...getTableBodyProps()}>
                                    {rows.map((row) => {
                                        prepareRow(row);
                                        return (
                                            <tr {...row.getRowProps()}>
                                                {row.cells.map((cell) => {
                                                    return (
                                                        <td {...cell.getCellProps()} style={{ padding: '15px 20px' }}>
                                                            {cell.render('Cell')}
                                                        </td>
                                                    );
                                                })}
                                                <td className='text-center'>
                                                    <img src="./client-profile.png" className="size-6 rounded-full" style={{ display: 'block', margin: '0 auto' }} />
                                                </td>
                                                <td className='text-center'>
                                                    <img src="./client-chart.png" className="size-6" alt="client-chart" style={{ display: 'block', margin: '0 auto' }} />
                                                </td>
                                                <td className='text-center'>
                                                    <img src="./encounter-notes.png" className="size-6" alt="client-chart" style={{ display: 'block', margin: '0 auto' }} />
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table> */}
                        </div>
                    </div >
                )
            }
        </div>
    );
}

export default PriorityList;