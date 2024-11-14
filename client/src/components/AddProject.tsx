import {useState} from "react";
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
import { PlusCircleIcon, UserRound } from "lucide-react";
import { useAuth } from "@/context/AuthProvider";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function AddProject() {
  const [progress, setProgress] = useState("50")
  const { authenticatedUser } = useAuth();
  const user = authenticatedUser;

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="bg-neutral-800 hover:bg-neutral-700 p-4 rounded-lg">
          <PlusCircleIcon size={20} /> Add Project
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-neutral-900 text-neutral-100 border-none rounded-lg p-4 shadow-lg">
        <div className="mx-auto w-full max-w-sm">
          {/* Drawer Header */}
          <DrawerHeader className="border-b border-neutral-800 pb-4 mb-4">
            <DrawerTitle className="text-xl font-semibold">
              Add a Project
            </DrawerTitle>
            <DrawerDescription className="text-sm text-neutral-400">
              <form action="">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-neutral-300"
                    >
                      Project Title
                    </Label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="text"
                        className="bg-neutral-800 border-neutral-700 text-neutral-100 pl-10 placeholder-neutral-500 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-neutral-300"
                    >
                      Project Description
                    </Label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="text"
                        className="bg-neutral-800 border-neutral-700 text-neutral-100 pl-10 placeholder-neutral-500 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="Progress"
                      className="text-sm font-medium text-neutral-300"
                    >
                      Progress {progress}%
                    </Label>
                    <div className="relative">
                      <Input
                        id="Progress"
                        type="range"
                        value={progress}
                        onChange={(e)=>{setProgress(e.target.value)}}
                        className="bg-neutral-800 border-neutral-700 text-neutral-100 pl-10 placeholder-neutral-500 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-neutral-300"
                    >
                      Github URL
                    </Label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="text"
                        className="bg-neutral-800 border-neutral-700 text-neutral-100 pl-10 placeholder-neutral-500 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </DrawerDescription>
          </DrawerHeader>

          {/* Footer with Close Button */}
          <DrawerFooter className="mt-auto border-t border-neutral-800 pt-4">
            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md transition-colors"
            >
              Sign In
            </Button>
            <DrawerClose asChild>
              <Button
                variant="default"
                className="w-full bg-neutral-700 hover:bg-neutral-600"
              >
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
