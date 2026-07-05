import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

const ComparisonSection = () => {
  const table_content = [
    {
      name: "Built for solo founders",
      sentraea: "✓",
      generic_tools: "✕",
      ai_copilots: "~",
      startup_books: "✕",
    },
    {
      name: "Stage-gated progression",
      sentraea: "✓",
      generic_tools: "✕",
      ai_copilots: "✕",
      startup_books: "✕",
    },
    {
      name: "Requires evidence before advancing",
      sentraea: "✓",
      generic_tools: "✕",
      ai_copilots: "✕",
      startup_books: "✕",
    },
    {
      name: "Tells you what to do next",
      sentraea: "✓",
      generic_tools: "✕",
      ai_copilots: "~",
      startup_books: "~",
    },
    {
      name: "Filters market noise & competitor signals",
      sentraea: "✓",
      generic_tools: "✕",
      ai_copilots: "~",
      startup_books: "✕",
    },
    {
      name: "Decision history tracking",
      sentraea: "✓",
      generic_tools: "~",
      ai_copilots: "✕",
      startup_books: "✕",
    },
    {
      name: "Pre-revenue optimised",
      sentraea: "✓",
      generic_tools: "✕",
      ai_copilots: "✕",
      startup_books: "~",
    },
  ];
  return (
    <div className="px-10 py-10 flex flex-col gap-10 min-h-screen justify-center">
      <div>
        <p className="uppercase font-number tracking-[0.08rem] text-muted-foreground">
          Why Sentraea is different
        </p>
        <h2 className="font-heading text-4xl md:text-6xl font-semibold">
          Built for one person. <br />
          <span className="text-primary">Not a team, not a platform.</span>
        </h2>
      </div>
      <Card className="px-0 py-1">
        <Table className="rounded-sm ">
          <TableHeader className="bg-black text-white">
            <TableRow>
              <TableHead className="text-white  uppercase font-number text-xl ">
                Feature
              </TableHead>
              <TableHead className="text-white uppercase font-number text-xl text-center">
                Sentraea
              </TableHead>
              <TableHead className="text-white uppercase font-number text-xl text-center">
                Generic Tools
              </TableHead>
              <TableHead className="text-white uppercase font-number text-xl text-center">
                AI Co-pilots
              </TableHead>
              <TableHead className="text-white uppercase font-number text-xl text-center">
                Startup Books
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-none">
            {table_content.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell className="text-xl font-me">
                    <p>{item.name}</p>
                  </TableCell>
                  <TableCell className="text-green-400 text-2xl bg-primary/5 text-center">
                    <p>{item.sentraea}</p>
                  </TableCell>
                  <TableCell className="text-red-400 text-2xl text-center">
                    <p>{item.generic_tools}</p>
                  </TableCell>
                  <TableCell className="text-red-400 text-2xl text-center">
                    <p>{item.ai_copilots}</p>
                  </TableCell>
                  <TableCell className="text-red-400 text-2xl text-center">
                    <p>{item.startup_books}</p>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default ComparisonSection;
