import Layout from "../../../../Dashboard/DashboardLayout";
import { FaUsers, FaMoneyBill, FaChartLine, FaTasks } from "react-icons/fa";
import TableOne from "../../DashboardPartials/TableOne/page";
import JobTable from "../../DashboardPartials/JobTables/page";
import SubscriptionTable from '../../DashboardPartials/SubscriptionTable/page'

// Define the types for the colors and the icon component
interface CardProps {
  color: "bg-gray-500" | "bg-orange-500" | "bg-blue-500" | "bg-slate-500";
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  percentage: number;
}

const Card: React.FC<CardProps> = ({
  color,
  title,
  icon: Icon,
  percentage,
}) => (
  <div
    className={`${color} text-white p-6 rounded-lg flex items-center space-x-4`}
  >
    <Icon className="text-3xl" />
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl">{percentage}%</p>
    </div>
  </div>
);

const Page: React.FC = () => {
  return (
    <Layout>
      <div className="p-6">
        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card
            color="bg-gray-500"
            title="Total Users"
            icon={FaUsers}
            percentage={75}
          />
          <Card
            color="bg-orange-500"
            title="Revenue"
            icon={FaMoneyBill}
            percentage={50}
          />
          <Card
            color="bg-blue-500"
            title="Growth"
            icon={FaChartLine}
            percentage={80}
          />
          <Card
            color="bg-slate-500"
            title="Tasks Completed"
            icon={FaTasks}
            percentage={65}
          />
        </div>

        {/* Tables Section */}
        <div className="">
          <div className="">
            <TableOne />
          </div>
          <div className="mt-5">
            <JobTable />
          </div>
          <div className="mt-5">
            <SubscriptionTable />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Page;
