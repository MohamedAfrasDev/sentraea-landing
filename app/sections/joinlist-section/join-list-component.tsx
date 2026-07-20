"use client";
import JoinWaitlistDialog from "@/app/components/join-waitlist-dialog";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import React, { useState } from "react";

const JoinListComponent = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <JoinWaitlistDialog open={open} setOpen={setOpen} />
      <div className="px-10 flex flex-col justify-center items-center gap-2">
        <h2 className="text-3xl font-medium tracking-tight">
          Join <span className="font-semibold">34</span> others on the waitlist
        </h2>
        <Button className={"text-xl px-5 py-5"} onClick={() => setOpen(true)}>
          Reserve My Spot <ArrowRightIcon />
        </Button>
      </div>
    </>
  );
};

export default JoinListComponent;
