import { useState } from "react";
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
import { useAuth } from "@/context/AuthProvider";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "@/hooks/use-toast";
import { api } from "@/lib/utils";
import { Project as P } from "./RecentProjects";

interface ProjectProps{
  project:P
}

export default function Project({project}:ProjectProps) {
  const [progress, setProgress] = useState(project.progress);
  const [title, setTitle] = useState(project.title);
  const [desc, setDesc] = useState(project.desc);
  const [githubURL, setGithubURL] = useState(project.githubURL);
  const { authenticatedUser } = useAuth();
  const user = authenticatedUser;
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(e.target);
    try {
      const response = await api.put(
        `/project/edit?id=${project.id}`,
        {
          progress,
          title,
          desc,
          githubURL,
          owner:user?.email
        },
        {
          headers:{"Content-Type":"application/json"}
        }
        
      )
      console.log(response)
      if (response.data.message == "success"){
        
        toast({
          variant: "default",
          title: "Project edited Successful!",
          description:  "You have successfully edited a PROJECT.",
        })
      }
    } catch (error) {
      
    }
    
  };
  return (
    <Drawer>
      <DrawerTrigger asChild>
      <li className="flex justify-between items-center cursor-pointer">
        <div>
          <p className="text-neutral-300 font-medium">
            {project.title}
          </p>
          <p className="text-neutral-500 text-sm">
            Owner: {project.owner}
          </p>
        </div>
        <p className="text-green-400 font-semibold">{project.createdAt}</p>
      </li>
      </DrawerTrigger>
      <DrawerContent className="bg-neutral-900 text-neutral-100 border-none rounded-lg p-4 shadow-lg">
        <div className="mx-auto w-full max-w-sm">
          {/* Drawer Header */}
          <DrawerHeader className="border-b border-neutral-800 pb-4 mb-4">
            <DrawerTitle className="text-xl font-semibold">
              Edit Project
            </DrawerTitle>
            <DrawerDescription className="text-sm text-neutral-400">
              <form
                method="post"
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
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
                        required
                        placeholder="Write the project title here "
                        value={title}
                        onChange={(e) => {
                          setTitle(e.target.value);
                        }}
                        className="bg-neutral-800 border-neutral-700 text-neutral-100  placeholder-neutral-500 focus:ring-green-500 focus:border-green-500"
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
                        placeholder="Write the project description here"
                        value={desc}
                        onChange={(e) => {
                          setDesc(e.target.value);
                        }}
                        className="bg-neutral-800 border-neutral-700 text-neutral-100  placeholder-neutral-500 focus:ring-green-500 focus:border-green-500"
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
                        placeholder="Write the github URL of the project"
                        value={githubURL}
                        onChange={(e) => {
                          setGithubURL(e.target.value);
                        }}
                        className="bg-neutral-800 border-neutral-700 text-neutral-100  placeholder-neutral-500 focus:ring-green-500 focus:border-green-500"
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
                        onChange={(e) => {
                          setProgress(e.target.value);
                        }}
                        className="bg-neutral-800 border-neutral-700 text-neutral-100  placeholder-neutral-500 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </div>
                  
                </div>
                <Button
                  type="submit"
                  className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md transition-colors"
                >
                  Save
                </Button>
              </form>
            </DrawerDescription>
          </DrawerHeader>

          {/* Footer with Close Button */}
          <DrawerFooter className="mt-auto border-t border-neutral-800 pt-4">
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
