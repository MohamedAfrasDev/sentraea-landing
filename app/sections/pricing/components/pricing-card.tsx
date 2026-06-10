import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import React from "react";

interface PricingCardProps {
  name: string;
  value: string;
  yearlyValue: string;
  subTitle: string;
  featured: boolean;
  features: string[];
  btnText: string;
  variant: string;
  className?: string;
}
const PricingCard = ({
  name,
  value,
  yearlyValue,
  subTitle,
  featured,
  features,
  btnText,
  variant,
  className,
}: PricingCardProps) => {
  return (
    <Card
      key={name}
      className={cn(
        "px-5 py-5 text-start rounded-lg justify-between bg-card/60",
        featured && "scale-106 bg-primary",
        className,
      )}
    >
      <div>
        <div className=" justify-between items-end w-full gap-10">
          <div className="flex justify-between">
            <h2
              className={cn(
                "text-3xl font-semibold tracking-tight  font-heading",
                featured && "text-white",
              )}
            >
              {name}
            </h2>

            {featured && (
              <Badge className="px-3 py-3 rounded-sm text-md bg-white text-black  font-number">
                Most Popular
              </Badge>
            )}
          </div>
          <div className="mt-2">
            <h3
              className={cn(
                "text-3xl font-number font-semibold tracking-tighter",
                featured && "text-white",
              )}
            >
              ${value}
              <span
                className={cn(
                  "text-xl font-normal text-muted-foreground",
                  featured && "text-white",
                )}
              >
                /mo
              </span>
            </h3>
          </div>
        </div>

        <p
          className={cn(
            "text-lg leading-[20px] tracking-tighter text-muted-foreground mt-3",
            featured && "text-white",
          )}
        >
          {subTitle}
        </p>
      </div>
      <div>
        {features.map((feature, index) => (
          <div
            key={index}
            className={cn(
              "flex items-center justify-between mt-4",
              featured && "text-white",
            )}
          >
            <p
              className={cn(
                "text-base leading-[20px] tracking-tighter text-muted-foreground",
                featured && "text-white",
              )}
            >
              {feature}
            </p>
            <Check className="w-5 h-5 text-primary" />
          </div>
        ))}
      </div>

      {featured && (
        <Button
          className={cn(
            "w-full mt-5",
            featured && "bg-white text-primary shadow-none hover:bg-white/80",
          )}
          variant={"outline"}
        >
          {btnText}
        </Button>
      )}
      {!featured && (
        <Button
          className={cn(
            "w-full mt-5",
            featured && "bg-white text-primary hover:bg-white/80",
          )}
          variant={variant as any}
        >
          {btnText}
        </Button>
      )}
    </Card>
  );
};

export default PricingCard;
