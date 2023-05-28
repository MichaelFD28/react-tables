import { useEffect, useState } from "react";
import { ApiPaginatedResponse } from "../models/apiResponse";
import { UserDetails } from "../models/mockData";

const userDetails: UserDetails[] = [
  {
    userId: "1",
    firstName: "Abigail",
    lastName: "Anderson",
    followers: 237,
    dateOfBirth: new Date("05/27/1997"),
    accountCreated: new Date("11/11/2015"),
    lastLoggedIn: new Date("05/27/2023"),
    accountType: "Professional",
  },
  {
    userId: "2",
    firstName: "Bradley",
    lastName: "Byron",
    followers: 526,
    dateOfBirth: new Date("07/30/1999"),
    accountCreated: new Date("02/12/2013"),
    lastLoggedIn: new Date("05/27/2023"),
    accountType: "Professional",
  },
  {
    userId: "3",
    firstName: "Courtney",
    lastName: "Collins",
    followers: 112,
    dateOfBirth: new Date("03/13/1998"),
    accountCreated: new Date("04/25/2019"),
    lastLoggedIn: new Date("05/27/2023"),
    accountType: "Amateur",
  },
  {
    userId: "4",
    firstName: "Damian",
    lastName: "Driscoll",
    followers: 6,
    dateOfBirth: new Date("04/21/1964"),
    accountCreated: new Date("04/25/2019"),
    lastLoggedIn: new Date("05/27/2023"),
    accountType: "Amateur",
  },
];

export const useMockUserDetails = () => {
  const [data, setData] = useState<ApiPaginatedResponse<UserDetails[]> | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      // simulate api call delay of 1 second
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setData({
        items: userDetails,
        totalCount: userDetails.length,
        totalPages: 1,
        pageNumber: 1,
        pageSize: userDetails.length,
        hasNextPage: false,
        hasPreviousPage: false,
      });
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return {
    mockTableData: data,
    isLoadingMockTableData: isLoading,
  };
};
