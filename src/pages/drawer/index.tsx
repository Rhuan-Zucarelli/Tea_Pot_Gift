import * as React from "react"

import { useState, useEffect } from "react"
import { Button } from "next/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "next/components/ui/drawer"
import { fips } from "crypto"
import { api } from "next/utils/api"
import { Gift } from "@prisma/client"
import { QrCodePix } from 'qrcode-pix';
import { MdOutlineContentCopy } from "react-icons/md";
import { SonnerDemo } from "../sonner"
import { Toaster, toast } from "sonner"


export function DrawerDemo({ gift }: { gift: Gift }) {

  const [img, setImg] = useState('')

  const formatMoney = (value: number) =>
    Number.isInteger(value)
      ? Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value / 100)
      : "...";

  const qrCodePix = QrCodePix({
    version: '01',
    key: '09109678905', //or any PIX key
    name: 'Rhuan Carlos Zucarelli',
    city: 'SAO PAULO',
    message: 'Pay me :)',
    cep: '99999999',
    value: gift.price / 100,
  });

  const getQRcode = async () => {
    const base64 = await qrCodePix.base64()
    setImg(base64)
  }

  useEffect(() => {
    getQRcode()
  }, [])

  const copCodePix = () => {
    navigator.clipboard.writeText(qrCodePix.payload())
    toast("Codigo copiado com sucesso", {
      description: "Obrigado por seu dinheiro $$$$$$$$$$$$$",
    })
  }

  return (
    <>

      <Drawer >
        <DrawerTrigger asChild>
          <Button size={'lg'}>Comprar</Button>
        </DrawerTrigger>
        <DrawerContent>

          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Lorem, ipsum dolor sit amet consectetur </DrawerTitle>
              <img src={img}></img>
              <Button onClick={copCodePix}>
                <MdOutlineContentCopy /> copiarrrrrr
              </Button>
              <pre className="mb-4 mt-6 overflow-auto rounded-lg border py-4 dark:bg-zinc-900">
                <code className="relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">{qrCodePix.payload()}</code>
              </pre>
              <DrawerDescription>
                <div key={gift.id} className="mt-auto text-xl font-bold tracking-tighter">
                  {formatMoney(gift.price)}
                </div>
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="ghost">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>

        </DrawerContent>
      </Drawer >

    </>
  )
}