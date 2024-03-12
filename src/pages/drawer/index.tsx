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
            <DrawerHeader className="flex gap-1 flex-col items-center ">
              <DrawerTitle className="w-56 text-xl text-left text-gray-100/55" > {gift.name.toUpperCase()} </DrawerTitle>
              <DrawerDescription className="w-56 text-left mb-4 ">
                <div key={gift.id} className="mt-auto text-xl font-normal text-white tracking-wider">
                  {formatMoney(gift.price)}
                </div>
              </DrawerDescription>
              <img className="w-56 mb-4 rounded-3xl" src={img}></img>
              {/* <pre className="mb-4 mt-6 max-w-80 overflow-auto rounded-lg border py-4 dark:bg-zinc-900">
                <code className="relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">{qrCodePix.payload()}</code>
              </pre> */}
              <Button className="w-56 text-white border-solid border-2" variant="ghost" onClick={copCodePix}>
                <MdOutlineContentCopy className="mr-2 " /> Copiar codigo PIX
              </Button>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose>
                <Button className="w-56  text-white" variant="ghost">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>

        </DrawerContent>
      </Drawer >

    </>
  )
}