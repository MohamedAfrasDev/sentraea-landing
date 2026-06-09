import { Card } from "@/components/ui/card";
import React from "react";

const BGCardText = ({
  text,
  source,
  style,
}: {
  text: string;
  source: string;
  style?: React.CSSProperties;
}) => {
  return (
    <Card
      style={style}
      className="px-3 py-3 max-w-sm backdrop-blur-2xl gap-0 absolute shadow-2xl shadow-gray-800/10 "
    >
      <p className="text-md">{text}</p>
      <h2 className="mt-2 text-muted-foreground">{source}</h2>
    </Card>
  );
};

export default BGCardText;
