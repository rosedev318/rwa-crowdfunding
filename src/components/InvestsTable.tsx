"use client";

import { Investment } from "@/store/types";
import { Table } from "flowbite-react";

export default function InvestsTable({invests}: {invests: Investment[]}) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell>Property Title</Table.HeadCell>
          <Table.HeadCell>Property Description</Table.HeadCell>
          <Table.HeadCell>Amount</Table.HeadCell>
          <Table.HeadCell>Profit</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {invests.length > 0 ? invests.map((i: Investment) =>
            <Table.Row key={i.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {i.property?.title}
              </Table.Cell>
              <Table.Cell>{i.property?.description}</Table.Cell>
              <Table.Cell>${i.amount.toLocaleString()}</Table.Cell>
              <Table.Cell>${(i.amount * Number(process.env.NEXT_PUBLIC_PROFIT_RATE)).toLocaleString()}</Table.Cell>
            </Table.Row>) :
            <Table.Row>
              <Table.Cell colSpan={4} align="center">No Records</Table.Cell>
            </Table.Row>
          }
        </Table.Body>
      </Table>
    </div>
  );
}
