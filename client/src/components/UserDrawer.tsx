import * as React from "react";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { Bar, BarChart, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { UserRound } from "lucide-react";
import { useAuth } from "@/context/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function UserDrawer() {
  const { authenticatedUser,logout } = useAuth();
  const user = authenticatedUser;

  const navigate = useNavigate();

  const handleLogout=()=>{
    logout()
    navigate('/login')
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="bg-neutral-800 hover:bg-neutral-700 p-4 rounded-lg">
          <UserRound size={20} />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-neutral-900 text-neutral-100 border-none rounded-lg p-4 shadow-lg">
        <div className="mx-auto w-full max-w-sm">
          {/* Drawer Header */}
          <DrawerHeader className="border-b border-neutral-800 pb-4 mb-4">
            <DrawerTitle className="text-xl font-semibold">
              Profile Info
            </DrawerTitle>
            <DrawerDescription className="text-sm text-neutral-400">
              <p className="mt-2">Username: {user?.name || "N/A"}</p>
              <p>Email: {user?.email || "N/A"}</p>
            </DrawerDescription>
          </DrawerHeader>

          {/* Footer with Close Button */}
          <DrawerFooter className="mt-auto border-t border-neutral-800 pt-4">
            <DrawerClose asChild>
              <Button
                variant="default"
                className="w-full bg-neutral-700 hover:bg-neutral-600"
              >
                Close
              </Button>
            </DrawerClose>
            <Button
              variant="destructive"
              className="w-full "
              onClick={handleLogout}
            >
              Logout
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
