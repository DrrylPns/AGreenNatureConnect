import { Label } from "@/app/components/Ui/label";
import { Input } from "@/app/components/Ui/Input";
import { Textarea } from "@/app/components/Ui/textarea";
import { Button } from "@/components/ui/button";
//import { useSession } from "next-auth/react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

export default function Component() {
  //const { data: session } = useSession();

  return (
    <main className="h-[100vh] flex items-center justify-center">
      <Card className="w-full max-w-2xl mx-auto">
        <div className="space-y-2 text-center p-3">
          <h1 className="text-3xl font-bold">Join Our Urban Community</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Fill out the form below to get involved.
          </p>
        </div>
        <form className="space-y-4 p-3">
          <div className="space-y-2">
            <Label htmlFor="Community Name">Urban Community Name</Label>
            <Input
              id="Urban Community Name"
              placeholder="Enter your Urban Community Name"
              required
            />
          </div>
          <div className="space-y-2">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a Barangay" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Barangay</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a Area" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Area</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="House/Blk">House/Blk no.</Label>
            <Input id="House/Blk" placeholder="Enter your House/Blk" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="Street">Street name</Label>
            <Input id="Street" placeholder="Enter your Street" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="Postal Code<">Postal Code</Label>
            <Input
              id="Postal Code<"
              placeholder="Enter your Postal Code<"
              required
              type="number"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Full Address</Label>
            <Input
              id="address"
              placeholder="Enter your Full address"
              required
              type="email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="Enter your email"
              required
              type="email"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">Form</Label>
            <Input id="picture" type="file" />
          </div>
          <Button className="w-full" type="submit">
            Submit
          </Button>
        </form>
      </Card>
    </main>
  );
}
