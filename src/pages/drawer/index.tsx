import * as React from "react"
import { Minus, Plus } from "lucide-react"

import { Button } from "next/components/ui/button"
import { MdOutlineContentCopy } from "react-icons/md";
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


export function DrawerDemo() {

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Faça seu pagamento para os noivos</DrawerTitle>
            <pre className="mb-4 mt-6 overflow-auto rounded-lg border py-4 dark:bg-zinc-900">
              <MdOutlineContentCopy onClick={() => { navigator.clipboard.writeText('') }}></MdOutlineContentCopy>
              <code className="relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">00020126330014BR.GOV.BCB.PIX0111091096789055204000053039865802BR5922Rhuan Carlos Zucarelli6009SAO PAULO62140510ddLFQmn3G26304B886</code>
            </pre>
            <DrawerDescription> Lembrando que o valor depositado é para ajudar na compra de eletrodomesticos, enxoval entre outros.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer >
  )
}