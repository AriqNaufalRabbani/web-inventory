import { PaymentsOverview } from "@/components/Charts/payments-overview";
import { UsedDevices } from "@/components/Charts/used-devices";
import { WeeksProfit } from "@/components/Charts/weeks-profit";
import { TopChannels } from "@/components/Tables/top-channels";
import { TopChannelsSkeleton } from "@/components/Tables/top-channels/skeleton";
import { createTimeFrameExtractor } from "@/utils/timeframe-extractor";
import { Suspense } from "react";
import { ChatsCard } from "./_components/chats-card";
import { OverviewCardsGroup } from "./_components/overview-cards";
import { OverviewCardsSkeleton } from "./_components/overview-cards/skeleton";
import { RegionLabels } from "./_components/region-labels";

import StatsCards from "@/components/Cards/StatsCards";
import LowStockTable from "@/components/Cards/LowStockTable";
import RecentActivity from "@/components/Cards/RecentActivity";
import SimpleChart from "@/components/Cards/SimpleChart";

type PropsType = {
  searchParams: Promise<{
    selected_time_frame?: string;
  }>;
};

import {
  statsData,
  chartData,
  lowStockData,
  activityData,
} from "@/data/Dummy";
import ProfessionalChart from "@/components/Charts/ProfessionalChart";

export default async function dashboard({ searchParams }: PropsType) {
  const { selected_time_frame } = await searchParams;
  const extractTimeFrame = createTimeFrameExtractor(selected_time_frame);

  return (
    <>
      <Suspense fallback={<OverviewCardsSkeleton />}>
        {/* <OverviewCardsGroup /> */}
        <div className="p-8 space-y-8">

          {/* Stats */}
          <StatsCards data={statsData} />

          {/* Chart */}
          {/* <SimpleChart data={chartData} /> */}
          <ProfessionalChart data={chartData} />

          {/* Two Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <LowStockTable items={lowStockData} />
            <RecentActivity logs={activityData} />
          </div>

        </div>
      </Suspense>



      {/* <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
        <PaymentsOverview
          className="col-span-12 xl:col-span-7"
          key={extractTimeFrame("payments_overview")}
          timeFrame={extractTimeFrame("payments_overview")?.split(":")[1]}
        />

        <WeeksProfit
          key={extractTimeFrame("weeks_profit")}
          timeFrame={extractTimeFrame("weeks_profit")?.split(":")[1]}
          className="col-span-12 xl:col-span-5"
        />

        <UsedDevices
          className="col-span-12 xl:col-span-5"
          key={extractTimeFrame("used_devices")}
          timeFrame={extractTimeFrame("used_devices")?.split(":")[1]}
        />

        <RegionLabels />

        <div className="col-span-12 grid xl:col-span-8">
          <Suspense fallback={<TopChannelsSkeleton />}>
            <TopChannels />
          </Suspense>
        </div>

        <Suspense fallback={null}>
          <ChatsCard />
        </Suspense>
      </div> */}
    </>
  );
}
