import React, { useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/system";
import BasicTable from "../../components/react-table/BasicTable";
import { format } from "date-fns";
import { Link, useParams , useLocation} from "react-router-dom";

const CustomTab = styled(Tab)(({ theme }) => ({
  "&.Mui-selected": {
    color: "#5BC4BF",
  },
  color: "#1A1F25",
  textTransform: "none",
}));

const CustomTabList = styled(TabList)(({ theme }) => ({
  ".MuiTabs-indicator": {
    backgroundColor: "#5BC4BF",
  },
}));

const pageIndexMapping = {
  "referrals": "1",
  "programs": "2",
  "navigations": "3"
}

function AssignmentAndReferrals() {
  const { clientId } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tabParam = queryParams.get('tab');
  const [value, setValue] = React.useState(pageIndexMapping[tabParam]);

  const handleChange = (event, newValue) => {
    setValue(newValue);

  };

  const columns = useMemo(
    () => [
      {
        Header: "Referral to",
        accessor: "referral_to",
        align: "left",
      },
      {
        Header: "Date Referred",
        accessor: "submitted_date",
        align: "center",
        headerAlign: "center",
        render: (row) => {
          return row?.submitted_date
            ? format(new Date(row.submitted_date), "MM-dd-yyyy")
            : "";
        },
      },
      {
        Header: "Referred by",
        accessor: "referred_by",
        align: "left",
      },
      {
        Header: "View referral",
        accessor: "view_referral",
        align: "left",
      },
      {
        Header: "Referral Comments",
        accessor: "comments",
        align: "left",
      },
      {
        Header: "Status",
        accessor: "status",
        align: "center",
      },
      {
        Header: "Progress Comments",
        accessor: "progress_comments",
        align: "left",
      },
      {
        Header: "Date Closed",
        accessor: "closed_date",
        align: "center",
      },
      {
        Header: "Closed by",
        accessor: "closed_by",
        align: "left",
      },
    ],
    []
  );

  const data = [
    {
      id: 1,
      client_name: "John Doe",
      referral_to: "Dr. Smith",
      dob: "1990-05-15",
      activity: "Therapy",
      referred_by: "Dr.Johnson",
      submitted_date: "2024-06-16",
      submitted_time: "08:30:00",
      comments: null,
    },
    {
      id: 2,
      client_name: "Jon Snow",
      referral_to: "Dr. Stark",
      dob: "1990-05-15",
      activity: "Therapy",
      referred_by: "Dr. Tully",
      submitted_date: "2024-06-16",
      submitted_time: "08:30:00",
      comments: null,
    },
    {
      id: 3,
      client_name: "Robb Stark",
      referral_to: "Dr. Storm",
      dob: "1990-05-15",
      activity: "Therapy",
      referred_by: "Dr. Bond",
      submitted_date: "2024-06-16",
      submitted_time: "08:30:00",
      comments: null,
    },
    {
      id: 4,
      client_name: "Jamie",
      referral_to: "Dr. Lannister",
      dob: "1990-05-15",
      activity: "Therapy",
      referred_by: "Dr. Baretheon",
      submitted_date: "2024-06-16",
      submitted_time: "08:30:00",
      comments: null,
    },
    {
      id: 5,
      client_name: "Harry Potter",
      referral_to: null,
      dob: "1980-07-31",
      activity: null,
      referred_by: "Ron Weasley",
      submitted_date: "2024-06-18",
      submitted_time: "10:00:00",
      comments: null,
    },
    {
      id: 6,
      client_name: "Harry Potter",
      referral_to: null,
      dob: "1980-07-31",
      activity: null,
      referred_by: "Ron Weasley",
      submitted_date: "2024-06-18",
      submitted_time: "10:00:00",
      comments: null,
    },
  ];

  return (
    <div className="mx-6 grid gap-y-6">
      <div className="text-[#1A1F25] text-2xl">Assignment & Referrals</div>

      <TabContext value={value}>
        <Box
          className="bg-white border border-[#DBE0E5] rounded-[6px]"
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            padding: "0px 15px",
          }}
        >
          <CustomTabList
            onChange={handleChange}
            aria-label="lab API tabs example"
          >
            <CustomTab label="Referrals" value="1" disableRipple />
            <CustomTab label="Programs" value="2" disableRipple />
            <CustomTab label="Navigation" value="3" disableRipple />
          </CustomTabList>
        </Box>
      </TabContext>
      {value === "1" && (
        <div className="bg-white border border-[#DBE0E5] rounded-[6px]">
          <div className="flex justify-between items-center my-4 px-4">
            <span className="font-medium text-xl">Referrals</span>
            <Link to={`/referral/add/${clientId}`}>
              <button className="bg-[#5BC4BF] px-3 py-2 flex justify-center items-center gap-x-2 text-white text-base">
                <AddIcon />
                <span>New Referral</span>
              </button>
            </Link>
          </div>

          <BasicTable type="referralsPage" columns={columns} data={data} />
        </div>
      )}
      {value === "2" && (
        <div className="bg-white border border-[#DBE0E5] rounded-[6px]">
          <div className="flex justify-between items-center my-4 px-4">
            <span className="font-medium text-xl">Programs</span>
            <Link to={`/program/add/${clientId}`}>
              <button className="bg-[#5BC4BF] px-3 py-2 flex justify-center items-center gap-x-2 text-white text-base">
                <AddIcon />
                <span>New Program</span>
              </button>
            </Link>
          </div>

          <BasicTable type="referralsPage" columns={columns} data={data} />
        </div>
      )}
      {value === "3" && (
        <div className="bg-white border border-[#DBE0E5] rounded-[6px]">
          <div className="flex justify-between items-center my-4 px-4">
            <span className="font-medium text-xl">Navigation</span>
            <Link to={`/navigation/add/${clientId}`}>
              <button className="bg-[#5BC4BF] px-3 py-2 flex justify-center items-center gap-x-2 text-white text-base">
                <AddIcon />
                <span>New Navigator</span>
              </button>
            </Link>
          </div>

          <BasicTable type="referralsPage" columns={columns} data={data} />
        </div>
      )}
    </div>
  );
}

export default AssignmentAndReferrals;
