import { Button } from "next/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { GiftType, Gift } from "@prisma/client";
import { api } from "next/utils/api";
import { useState } from "react";
import Cards from "./cards";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "next/components/ui/card";
import { z } from "zod";
import { DrawerDemo } from "./drawer";
import { Drawer, DrawerTrigger } from "next/components/ui/drawer";
import { SonnerDemo } from "./sonner";


export default function Home() {
  const createGift = api.gift.create.useMutation();
  const gifts = api.gift.get.useQuery();

  const [form, setForm] = useState({
    name: "",
    price: 0,
    bought: false,
    type: GiftType.PHYSICAL,
    photoUrl: "",
  });

  const formatMoney = (value: number) =>
    Number.isInteger(value)
      ? Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value / 100)
      : "...";

  return (
    <>
      <Head>
        <title>Cha de panela</title>
        <meta name="description" content="Cha de panela do Rhuan" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col bg-rose-200">
        {/* <div className="mx-auto flex flex-col">
          <input
            placeholder="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            placeholder="price"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: Number(e.target.value) })
            }
          />
          <input
            placeholder="photoUrl"
            value={form.photoUrl}
            onChange={(e) => setForm({ ...form, photoUrl: e.target.value })}
          />
          <Button onClick={() => createGift.mutate(form)}>
            Criar presente
          </Button>
        </div> */}

        <div className="m-5 flex flex-wrap justify-center gap-4">
          {gifts.data?.map((gift) => (
            <Card key={gift.id} className="w-96 flex flex-col font-bold text-xl">
              <CardHeader>{gift.name}</CardHeader>
              <CardDescription>{gift.descripton}</CardDescription>
              <img className="m-auto size-full" src={gift.photoUrl} alt={gift.name} />
              <CardFooter className="mt-6 flex justify-between">
                <div className="mt-auto text-xl font-bold tracking-tighter">
                  {formatMoney(gift.price)}
                </div>
                <DrawerDemo gift={gift} />
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

    </>
  );
}
