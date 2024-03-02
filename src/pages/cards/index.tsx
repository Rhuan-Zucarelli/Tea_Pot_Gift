import { GiftType } from "@prisma/client";
import { Button } from "next/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "next/components/ui/card";
import { api } from "next/utils/api";
import { useState } from "react";

export default function Cards() {
  const createGift = api.gift.create.useMutation();
  const gifts = api.gift.get.useQuery();

  const [form, setForm] = useState({
    name: "",
    price: 0,
    bought: false,
    type: GiftType.PHYSICAL,
    photoUrl: "",
  });

  return (
    <Card>
      <CardHeader>

        <CardTitle>Card Title</CardTitle>

        <input
          placeholder="photoUrl"
          value={form.photoUrl}
          onChange={(e) => setForm({ ...form, photoUrl: e.target.value })}
        />
        <CardDescription>Card Description</CardDescription>

      </CardHeader>

      <CardContent>
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
      </CardContent>

      <CardFooter>

        <Button onClick={() => createGift.mutate(form)}>
          Criar presente
        </Button>

        <div className="mt-5">
          {gifts.data?.map((gift) => <div>{gift.name}</div>)}
        </div>

      </CardFooter>

    </Card>

  )
}


