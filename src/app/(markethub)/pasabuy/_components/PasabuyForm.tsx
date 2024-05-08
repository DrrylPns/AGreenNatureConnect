"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { Label } from "@/app/components/Ui/label";
import { Input } from "@/app/components/Ui/Input";
import { Textarea } from "@/app/components/Ui/textarea";
import { Button } from "@/components/ui/button";
import { PasabuySchema, PasabuyType } from "@/lib/validations/pasabuy";
import { toast } from "@/lib/hooks/use-toast";
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
import { User } from "@prisma/client";
import { useForm } from "react-hook-form";
import { getCommunitiesWithoutSession } from "../../../../../actions/community";
import { useQuery } from "@tanstack/react-query";

interface Props {
  user: User;
}

export const PasabuyForm = ({ user }: Props) => {
  const [area, setArea] = useState("");
  const [formStep, setFormStep] = useState(1);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [formUrl, setFormUrl] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  //const { data: session } = useSession();

  const form = useForm<PasabuyType>({
    resolver: zodResolver(PasabuySchema),
  });

  const imageIsEmpty = imageUrl.length === 0;
  const formUrlIsEmpty = formUrl.length === 0;
  const areaIsEmpty = area.length === 0;

  const { data: communities } = useQuery({
    queryKey: ["communities"],
    queryFn: async () => await getCommunitiesWithoutSession(),
  });

  function onSubmit(values: PasabuyType) {}

  return (
    <main className="h-[100vh] flex items-center justify-center">
      <Card className="w-full max-w-2xl mx-auto">
        <div className="space-y-2 text-center p-2">
          <h1 className="text-3xl font-bold">Pasabuy Form</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Fill out the form below to get involved.
          </p>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-5">
          <div className="space-y-2">
            <Label htmlFor="Barangay">Urban Farm Community</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Area" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Communities</SelectLabel>
                  {communities?.map((community, i) => (
                    <SelectItem key={i} value={community.name}>
                      {community.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="Barangay">Barangay</Label>
            <Input
              disabled={true}
              value={user?.barangay as string}
              id="Barangay"
              required
            />
          </div>
          <div className="grid grid-cols-1">
            <h1 className="ml-1 text-sm font-medium">Area</h1>
            <Select value={area} onValueChange={setArea}>
              <SelectTrigger className="">
                <SelectValue placeholder="Select an area" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Areas</SelectLabel>
                  <>
                    <SelectItem value="Pagkabuhay Road">
                      Pagkabuhay Road
                    </SelectItem>
                    <SelectItem value="Sinforosa">Sinforosa</SelectItem>
                    <SelectItem value="Urbano">Urbano</SelectItem>
                    <SelectItem value="Sementeryo">Sementeryo</SelectItem>
                    <SelectItem value="Alipio">Alipio</SelectItem>
                    <SelectItem value="Goodwill 2">Goodwill 2</SelectItem>
                    <SelectItem value="Goodwill Town Homes">
                      Goodwill Town Homes
                    </SelectItem>
                    <SelectItem value="Biglang-awa">Biglang-awa</SelectItem>
                    <SelectItem value="625">625</SelectItem>
                    <SelectItem value="Wings Sampalokan">
                      Wings Sampalokan
                    </SelectItem>
                    <SelectItem value="Blas Roque">Blas Roque</SelectItem>
                    <SelectItem value="Celina Drive">Celina Drive</SelectItem>
                    <SelectItem value="Tolentino">Tolentino</SelectItem>
                    <SelectItem value="615">615</SelectItem>
                    <SelectItem value="Callejon">Callejon</SelectItem>
                    <SelectItem value="Quirino Highway">
                      Quirino Highway
                    </SelectItem>
                    <SelectItem value="Ngi Yaw (604)">Ngi Yaw (604)</SelectItem>
                    <SelectItem value="Carreon">Carreon</SelectItem>
                    <SelectItem value="Goldhill">Goldhill</SelectItem>
                    <SelectItem value="Sinagtala">Sinagtala</SelectItem>
                    <SelectItem value="Kingspoint Subdivision">
                      Kingspoint Subdivision
                    </SelectItem>
                    <SelectItem value="Alipio Compound">
                      Alipio Compound
                    </SelectItem>
                    <SelectItem value="Oro Compound">Oro Compound</SelectItem>
                    <SelectItem value="Uping">Uping</SelectItem>
                    <SelectItem value="Pinera">Pinera</SelectItem>
                    <SelectItem value="Quirino Highway">San Pedro 9</SelectItem>
                    <SelectItem value="Maloles Compound">
                      Maloles Compound
                    </SelectItem>
                    <SelectItem value="Babina Compound">
                      Babina Compound
                    </SelectItem>
                    <SelectItem value="Unang Tangke">Unang Tangke</SelectItem>
                    <SelectItem value="Daniac">Daniac</SelectItem>
                    <SelectItem value="Kasiyahan">Kasiyahan</SelectItem>
                    <SelectItem value="Enclave">Enclave</SelectItem>
                    <SelectItem value="Grand Villas">Grand Villas</SelectItem>
                    <SelectItem value="Dupax">Dupax</SelectItem>
                    <SelectItem value="Wings">Wings</SelectItem>
                    <SelectItem value="Santos Compound">
                      Santos Compound
                    </SelectItem>
                    <SelectItem value="Camp Grezar">Camp Grezar</SelectItem>
                    <SelectItem value="Franco">Franco</SelectItem>
                    <SelectItem value="Katipunan Kaliwa">
                      Katipunan Kaliwa
                    </SelectItem>
                    <SelectItem value="Coronel Compound">
                      Coronel Compound
                    </SelectItem>
                    <SelectItem value="Mantikaan">Mantikaan</SelectItem>
                    <SelectItem value="Likas">Likas</SelectItem>
                    <SelectItem value="Don Julio Gregorio">
                      Don Julio Gregorio
                    </SelectItem>
                    <SelectItem value="Richland V">Richland V</SelectItem>
                    <SelectItem value="Marides">Marides</SelectItem>
                    <SelectItem value="Abbey Road">Abbey Road</SelectItem>
                    <SelectItem value="Manggahan">Manggahan</SelectItem>
                    <SelectItem value="RD 1-4">RD 1-4</SelectItem>
                    <SelectItem value="R7">R7</SelectItem>
                    <SelectItem value="Narra">Narra</SelectItem>
                    <SelectItem value="Progressive Phase 1">
                      Progressive Phase 1
                    </SelectItem>
                    <SelectItem value="Progressive Phase 2">
                      Progressive Phase 2
                    </SelectItem>
                    <SelectItem value="Progressive Phase 3">
                      Progressive Phase 3
                    </SelectItem>
                    <SelectItem value="De Asis Compound">
                      De Asis Compound
                    </SelectItem>
                    <SelectItem value="Ibayo II (Taas, Baba)">
                      Ibayo II (Taas, Baba)
                    </SelectItem>
                    <SelectItem value="Maligay">Maligay</SelectItem>
                    <SelectItem value="Ibayo I (Leon Cleofas St.)">
                      Ibayo I (Leon Cleofas St.)
                    </SelectItem>
                    <SelectItem value="Karaan">Karaan</SelectItem>
                    <SelectItem value="St. Michael">St. Michael</SelectItem>
                    <SelectItem value="Urcia">Urcia</SelectItem>
                    <SelectItem value="Magno">Magno</SelectItem>
                    <SelectItem value="Bernarty">Bernarty</SelectItem>
                    <SelectItem value="Seminaryo">Seminaryo</SelectItem>
                    <SelectItem value="Remarville Ave.">
                      Remarville Avenue
                    </SelectItem>
                    <SelectItem value="Zodiac">Zodiac</SelectItem>
                    <SelectItem value="Apollo">Apollo</SelectItem>
                    <SelectItem value="Old Paliguan">Old Paliguan</SelectItem>
                    <SelectItem value="Gawad Kalinga">Gawad Kalinga</SelectItem>
                    <SelectItem value="Remarville Subdivision">
                      Remarville Subdivision
                    </SelectItem>
                    <SelectItem value="Mangilog Compound">
                      Mangilog Compound
                    </SelectItem>
                    <SelectItem value="Mangilog Compound">
                      Princess Homes
                    </SelectItem>
                  </>
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
};
