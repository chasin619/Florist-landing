import React from "react";
import { Flex, Grid, Text } from "@radix-ui/themes";

import { PricingCard } from "@/components/pricingCard";
import { pricingPlans } from "@/utils/constants";
import { useRouter } from "next/navigation";

const Pricing = () => {
  const { push } = useRouter()
  return (
    <section>
      <Flex
        justify="between"
        maxWidth="1380px"
        direction="column"
        mx="auto"
        px="6"
        py="8"
        gap="6"
      >
        <Flex justify="center" align="center" direction="column">
          <Text
            className="text-primaryGray !tracking-[.4px]"
            as="p"
            size={{ md: "8", initial: "7" }}
          >
            <Text className="text-green">SIMPLIFY</Text> YOUR BUSINESS WITH US
          </Text>
          <Text as="p" size="5" color="gray" mt="4">
            Try for free, and explore all the tools you need to make your
            business easier, faster
          </Text>
        </Flex>
        <Grid
          gap="6"
          columns={{ xs: "1", sm: "2", md: "3" }}
          justify="center"
          mx="auto"
          maxWidth="1400px"
          mt="5"
        >
          {pricingPlans.map((plan, index) => (
            <PricingCard plan={plan} key={index} handlePlanSelect={() => push(`/register?planName=${plan.name}`)} />
          ))}
        </Grid>
      </Flex>
    </section>
  );
};

export default Pricing;
