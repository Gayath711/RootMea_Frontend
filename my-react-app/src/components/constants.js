export const serverAddress = "http://127.0.0.1:8000/"

export const COLUMNS = [
    {
        Header: 'Client',
        accessor: row => `${row.first_name}, ${row.last_name}`,
        width: 150,
    },
    {
        Header: 'DOB',
        accessor: 'date_of_birth',
        width: 130,
    },
    {
        Header: 'Gender',
        accessor: 'sex',
        width: 50,
    },
    {
        Header: 'Phone',
        accessor: 'mobile_number',
        width: 50,
    },
    {
        Header: 'Date Assigned',
        accessor: 'date_assigned',
        width: 130,
    },
    {
        Header: 'Program',
        accessor: 'program',
        width: 50,
    },
    // {
    //     Header: 'Status',
    //     accessor: 'status',
    // },
    // {
    //     Header: 'HMIS ID',
    //     accessor: 'hmis_id',
    // },
    // {
    //     Header: 'Housing Status',
    //     accessor: 'housing_status',
    // },
    // {
    //     Header: 'CE Application Exper Date',
    //     accessor: 'ce_application_date ',
    // },
    // {
    //     Header: 'Social Risk Score: Housing',
    //     accessor: 'social_risk_score_housing',
    // },
    // {
    //     Header: 'Latest Housing Status Update',
    //     accessor: 'latest_housing_status',
    // },
    // {
    //     Header: 'Staff Signed to Client',
    //     accessor: 'staff_signed_to_client',
    // },
    // {
    //     Header: 'Last Reviewed',
    //     accessor: 'last_reviewed',
    // },
    // {
    //     Header: 'Latest Encounter Date',
    //     accessor: 'latest_encounter_date',
    // },
    // {
    //     Header: 'Latest Encounter Note [Summary Field]',
    //     accessor: 'latest_encounter_note',
    // },
    // {
    //     Header: 'Client Profile',
    //     accessor: 'clientProfile',
    // },
    // {
    //     Header: 'Client Chart',
    //     accessor: 'clientChart',
    // },
    // {
    //     Header: 'New Encounter Note',
    //     accessor: 'newEncounterNote',
    // },
];