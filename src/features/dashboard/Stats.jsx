import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookingsAfterDate, confirmedStays, numDays, cabinCount }) {
  const numBookings = bookingsAfterDate.length;

  const sales = bookingsAfterDate.reduce(
    (acc, curr) => acc + curr.totalPrice,
    0,
  );

  const checkins = confirmedStays.length;

  const occupancyRate = confirmedStays.reduce(
    (acc, curr) => acc + curr.numNights / (numDays * cabinCount),
    0,
  );

  return (
    <>
      <Stat
        title="Booking"
        icon={<HiOutlineBriefcase />}
        color="blue"
        value={numBookings}
      />

      <Stat
        title="Sales"
        icon={<HiOutlineBanknotes />}
        color="green"
        value={formatCurrency(sales)}
      />

      <Stat
        title="Check ins"
        icon={<HiOutlineCalendarDays />}
        color="indigo"
        value={checkins}
      />

      <Stat
        title="Occupancy Rates"
        icon={<HiOutlineChartBar />}
        color="yellow"
        value={Math.round(occupancyRate * 100) + "%"}
      />
    </>
  );
}

export default Stats;
