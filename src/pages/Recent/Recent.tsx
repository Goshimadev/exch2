import React, { ReactNode, useEffect, useState } from "react";
import { Box, Center } from "@mantine/core";
import ActionButton from "~/components/ActionButton/ActionButton";
import Button from "~/components/Button/Button";
import GradientBackgroundContainer from "~/components/GradientBackgroundContainer/GradientBackgroundContainer";
import RecentHistoryTable from "~/components/RecentHistoryTable/RecentHistoryTable";
import RecentOngoingTable from "~/components/RecentOngoingTable/RecentOngoingTable";
import Tabs from "~/components/Tabs/Tabs";
import { HistoryTableData, OngoingTableData } from "~/data/recentPage";
import styles from "./Recent.module.scss";
import AllSwapTable from "~/components/AllSwapTable/AllSwapTable";
import useWindowDimensions from "~/hooks/useWindowDimesnsion";
import MainLayout from "~/components/MainLayout/MainLayout";
import {
  IFullfillmentEvent,
  IFullfillmentResult,
} from "~/interfaces/IOfferdata";
import { MAX_BLOCKS_TO_QUERY, MAX_ITERATIONS } from "~/Context/Constants";
import { AppContext } from "~/Context/AppContext";
import { CurrencyEnum } from "~/enums/CurrencyEnum";
import { StatusEnum } from "~/enums/StatusEnum";
import { ethers } from "ethers";
import SatoshiToBtcConverter from "~/utils/SatoshiToBtcConverter";
import { TimestampfromNow } from "~/utils/TimeConverter";
import ExchangeOfferDrawer from "~/components/ExchangeOfferDrawer/ExchangeOfferDrawer";
import getTableData from "~/components/ExchangePrepareTableData/GetTableData";
type Props = {};

const Recent = (props: Props) => {
  return (
    <MainLayout
      title="Recents"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
    >
      <Tabs
        tabs={[
          { label: "My Swaps", value: "my-swaps" },
          { label: "All Swaps", value: "all-swaps" },
        ]}
        panels={[
          {
            value: "my-swaps",
            children: <MySwaps />,
          },
          {
            value: "all-swaps",
            children: <AllSwaps />,
          },
        ]}
      />
    </MainLayout>
  );
};

export default Recent;

function MySwaps() {
  const context = React.useContext(AppContext);
  if (context === null) {
    return <>Loading...</>;
  }

  const { listenedOngoinMySwapData, setlistenedOngoinMySwapData } = context;
  const {
    listenedOngoinMySwapOnGoingDataByNonEvent,
    setlistenedOngoinMySwapOnGoingDataByNonEvent,
    refreshOffersListKey,
    setRefreshOffersListKey,
    account,
    contract,
  } = context;

  const [isMoreOngoingLoading, setMoreOngoingDataLoading] = useState(false);
  const [isMoreHistoryLoading, setMoreHistoryLoading] = useState(false);

  const [rowOfferId, setRowOfferId] = useState<number | null>(null);
  const [rowFullFillmentId, setRowFullFillmentId] = useState<
    string | undefined
  >();

  const loadMoreOngoing = () => {
    setMoreOngoingDataLoading(true);

    setTimeout(() => {
      setMoreOngoingDataLoading(false);
    }, 2000);
  };
  const loadMoreHistory = () => {
    setMoreHistoryLoading(true);
    setTimeout(() => {
      setMoreHistoryLoading(false);
    }, 2000);
  };

  const handleSubmitPaymentProof = (
    fullfillmentRequestId: string | undefined,
    offerId: number
  ) => {
    setRowFullFillmentId(fullfillmentRequestId);
    setRowOfferId(offerId);
    //getTableData()
  };

  // const OngoingTableData2 = listenedOngoinMySwapData?.offers.map(
  const OngoingTableData2 = listenedOngoinMySwapOnGoingDataByNonEvent.map(
    (value, key) => {
      // let fulfillmentBy: string = value?.offerDetailsInJson.fulfillmentBy;
      let row = {
        orderNumber: value.offerDetailsInJson.offerId.toString(),
        planningToSell: {
          amount: Number(
            ethers.utils.formatEther(value.offerDetailsInJson.offerQuantity)
          ),
          type: CurrencyEnum.ETH,
        },
        planningToBuy: {
          amount: Number(
            Number(
              SatoshiToBtcConverter(value.offerDetailsInJson.satoshisToReceive)
            ).toFixed(4)
          ),
          type: CurrencyEnum.BTC,
        },
        rateInBTC: Number(
          Number(
            Number(
              SatoshiToBtcConverter(value.offerDetailsInJson.satoshisToReceive)
            ) /
              Number(
                ethers.utils.formatEther(value.offerDetailsInJson.offerQuantity)
              )
          ).toFixed(4)
        ),
        progress: value.offerDetailsInJson.progress, //TimestampTofromNow(value?.offersFullfillmentJson.expiryTime),
        offerType: value.offerDetailsInJson.offerType,
        fullfillmentRequestId: value.offerDetailsInJson.fullfillmentRequestId,
        offerId: value.offerDetailsInJson.offerId,
      };
      // console.log(row);
      return row;
    }
  );

  return (
    <div className={styles.panelCont}>
      <GradientBackgroundContainer colorLeft="#FFD57243">
        <Box p={"lg"} className={styles.box}>
          <div className={styles.recentTable}>
            <RecentOngoingTable
              tableCaption="Ongoing"
              cols={[
                "# of order",
                "Planning to sell",
                "Planning to buy",
                "Price per ETH in BTC",
                "Progress",
                "Actions",
              ]}
              data={OngoingTableData2}
              handleSubmitPaymentProof={handleSubmitPaymentProof}
            />
          </div>
          <div className={styles.recentMobileTable}>
            <RecentOngoingTable
              tableCaption="Ongoing"
              cols={["Sell", "Buy", "Progress", ""]}
              data={OngoingTableData}
              mobile={true}
              handleSubmitPaymentProof={handleSubmitPaymentProof}
            />
          </div>
          <br />
          <Center>
            <ActionButton
              variant={"transparent"}
              loading={isMoreOngoingLoading}
              onClick={loadMoreOngoing}
            >
              Load more
            </ActionButton>
          </Center>
        </Box>
        <ExchangeOfferDrawer
          onClose={() => {
            setRowOfferId(null);
          }}
          isOpened={rowOfferId !== null ? true : false}
          rowOfferId={rowOfferId}
          account={account}
          rowFullFillmentId={rowFullFillmentId}
          contract={contract}
          refreshOffersListKey={refreshOffersListKey}
          setRefreshOffersListKey={setRefreshOffersListKey}
        />
      </GradientBackgroundContainer>
      <GradientBackgroundContainer colorLeft="#FFD57243">
        <Box p={"lg"} className={styles.box}>
          <div className={styles.historyTable}>
            <RecentHistoryTable
              tableCaption="History"
              cols={[
                "# of order",
                "Planning to sell",
                "Planning to buy",
                "Price per ETH in BTC",
                "Date",
                "Status",
              ]}
              data={HistoryTableData}
            />
          </div>
          <div className={styles.mobileHistoryTable}>
            <RecentHistoryTable
              tableCaption="History"
              cols={["# of order", "Date", "More Details"]}
              mobile={true}
              data={HistoryTableData}
            />
          </div>
          <br />
          <Center>
            <ActionButton
              variant={"transparent"}
              loading={isMoreHistoryLoading}
              onClick={loadMoreHistory}
            >
              Load more
            </ActionButton>{" "}
          </Center>
        </Box>
      </GradientBackgroundContainer>
    </div>
  );
}

function AllSwaps() {
  const { mobileView } = useWindowDimensions();
  const [isMoreSwapsLoading, setMoreSwapsLoading] = useState(false);
  const [swapData, setSwapData] = useState(HistoryTableData);
  const loadMoreSwaps = () => {
    setMoreSwapsLoading(true);
    setTimeout(() => {
      setSwapData([...swapData, ...HistoryTableData]);
      setMoreSwapsLoading(false);
    }, 2000);
  };
  return (
    <GradientBackgroundContainer colorLeft="#FFD57243">
      <Box p={"lg"} className={styles.box}>
        <AllSwapTable
          data={swapData}
          cols={
            mobileView
              ? ["# of order", "Date", "More Details"]
              : [
                  "# of order",
                  "Planning to sell",
                  "Planning to buy",
                  "Price per ETH in BTC",
                  "Date",
                  "Status",
                ]
          }
          tableCaption="All Swaps"
        />
        <br />
        <Center>
          <ActionButton
            variant={"transparent"}
            loading={isMoreSwapsLoading}
            onClick={loadMoreSwaps}
          >
            Load more
          </ActionButton>{" "}
        </Center>
      </Box>
    </GradientBackgroundContainer>
  );
}
