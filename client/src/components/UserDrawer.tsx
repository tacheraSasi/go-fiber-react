import * as React from "react"
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons"
import { Bar, BarChart, ResponsiveContainer } from "recharts"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { UserRound } from "lucide-react"
import { useAuth } from "@/context/AuthProvider"

export default function UserDrawer() {
    const { authenticatedUser } = useAuth() 
    const user = authenticatedUser

  return (
    <Drawer >
      <DrawerTrigger asChild>
        <Button className="bg-neutral-700 hover:bg-neutral-600"><UserRound /></Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Profile Info</DrawerTitle>
            <DrawerDescription>
                <p>Username: {user?.name}</p>
                <p>Email: {user?.email}</p>
            </DrawerDescription>
          </DrawerHeader>
          
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="default">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
