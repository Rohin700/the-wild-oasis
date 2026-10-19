import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import useRecentStays from "./useRecentStays";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isGettingBookingsAfterDate, bookingsAfterDate } = useRecentBookings();
  const { isGettingStaysAfterDate, confirmedStays, numDays } = useRecentStays();
  const { cabins, isLoading: isLoadingCabins } = useCabins();

  if (isGettingBookingsAfterDate || isGettingStaysAfterDate || isLoadingCabins)
    return <Spinner />;

  console.log("confirmStays", confirmedStays);

  return (
    <StyledDashboardLayout>
      <Stats
        bookingsAfterDate={bookingsAfterDate}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookingsAfterDate} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
