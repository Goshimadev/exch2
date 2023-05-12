import { TableProps } from "@mantine/core";
import { useState } from "react";
import { CurrencyEnum } from "~/enums/CurrencyEnum";
import { IPlanning } from "~/interfaces/IPlanning";
import { getIconFromCurrencyType } from "~/utils/getIconFromCurrencyType";
import ActionButton from "../ActionButton/ActionButton";
import ImageIcon from "../ImageIcon/ImageIcon";
import Table from "../Table/Table";
import ViewOrderDrawer from "../ViewOrderDrawer/ViewOrderDrawer";
import styles from "./RecentOngoingTable.module.scss";
import SeeMoreButton from "../SeeMoreButton/SeeMoreButton";

export interface ITableRow {
  orderNumber: string | number;
  planningToSell: IPlanning;
  planningToBuy: IPlanning;
  rateInBTC: number;
  progress: string;
  offerType: string;
  fullfillmentRequestId: string | undefined;
  offerId: number;
}

interface Props extends TableProps {
  tableCaption?: string;
  cols: string[];
  data: ITableRow[];
  mobile?: boolean;
  handleSubmitPaymentProof: (
    fullfillmentRequestId: string | undefined,
    offerId: number
  ) => void;
}

const RecentOngoingTable = ({
  tableCaption,
  cols,
  data,
  mobile,
  handleSubmitPaymentProof,
}: Props) => {
  const [isViewOrderDrawerOpen, setViewOrderDrawerOpen] = useState(false);

  const tableData = !mobile
    ? data.map((row) => [
        row.orderNumber,
        <div className={styles.planningCell}>
          {row.planningToSell.amount}{" "}
          <ImageIcon image={getIconFromCurrencyType(row.planningToSell.type)} />{" "}
          {row.planningToSell.type}
        </div>,
        <div className={styles.planningCell}>
          {row.planningToBuy.amount}{" "}
          <ImageIcon image={getIconFromCurrencyType(row.planningToBuy.type)} />{" "}
          {row.planningToBuy.type}
        </div>,
        <div className={styles.planningCell}>
          {row.rateInBTC}{" "}
          <ImageIcon image={getIconFromCurrencyType(CurrencyEnum.BTC)} />{" "}
          {CurrencyEnum.BTC}
        </div>,
        row.progress,
        <div className={styles.actionsCell}>
          {row.offerType == "my_order" ? (
            <>
              <ActionButton
                size="compact"
                variant={"default"}
                onClick={() => {
                  handleSubmitPaymentProof(
                    row.fullfillmentRequestId,
                    row.offerId
                  );
                }}
              >
                Submit Payment Proof
              </ActionButton>
            </>
          ) : (
            <>
              <ActionButton
                size="compact"
                variant={"default"}
                onClick={() => {}}
              >
                Cancel
              </ActionButton>
              <ActionButton
                size="compact"
                variant={"primary"}
                onClick={() => setViewOrderDrawerOpen(true)}
              >
                View
              </ActionButton>
            </>
          )}
        </div>,
      ])
    : data.map((row) => [
        <div className={styles.planningCell}>
          {row.planningToSell.amount}{" "}
          <ImageIcon image={getIconFromCurrencyType(row.planningToSell.type)} />{" "}
          {row.planningToSell.type}
        </div>,
        <div className={styles.planningCell}>
          {row.planningToBuy.amount}{" "}
          <ImageIcon image={getIconFromCurrencyType(row.planningToBuy.type)} />{" "}
          {row.planningToBuy.type}
        </div>,

        row.progress.substring(0, row.progress.indexOf(" ")).toLowerCase() ===
        "submit"
          ? "Done"
          : row.progress.substring(0, row.progress.indexOf(" ")),
        <div className={styles.actionsCell}>
          <SeeMoreButton
            buttonText=""
            onClick={(e) => {
              setViewOrderDrawerOpen(true);
            }}
          />
        </div>,
      ]);

  return (
    <>
      <ViewOrderDrawer
        isOpened={isViewOrderDrawerOpen}
        onClose={() => setViewOrderDrawerOpen(false)}
      />

      <Table
        showAddOfferButton={false}
        horizontalSpacing={mobile ? "xs" : "md"}
        verticalSpacing={"md"}
        tableCaption={tableCaption}
        cols={cols}
        data={tableData}
      />
    </>
  );
};

export default RecentOngoingTable;
