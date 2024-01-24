import React from 'react'
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";

const SubscriptionOverview = () => {
  const list = [
    {
      title: "Trash Tier",
      img: "/images/fruit-1.jpeg",
      price: "$5.50",
    },
    {
      title: "Tangerine",
      img: "/images/fruit-2.jpeg",
      price: "$3.00",
    },
    {
      title: "Landfill Tier",
      img: "/images/fruit-3.jpeg",
      price: "$10.00",
    },
  ]

  return (
    <div className="w-full" style={{height: "89.5vh"}}> {/* slighted hard coded height*/}
      
      <div className='m-8'>
        <h1 className="text-2xl font-medium mb-2 ">Subscription</h1>
        <div className='flex flex-row items-center m-8'>
          {/* 3 tiers -> 1) trash 2) Co 3) Landfill*/}
          {list.map((item, index) => (
          <Card shadow="sm" className="mr-4" key={index} isPressable onPress={() => console.log("item pressed")}>
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={item.title}
                className="w-full object-cover h-[140px]"
                src={item.img}
              />
            </CardBody>
            <CardFooter className="text-small justify-between">
              <b>{item.title}</b>
              <p className="text-default-500">{item.price}</p>
            </CardFooter>
          </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SubscriptionOverview