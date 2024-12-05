import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const [longUrl, setLongUrl] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (longUrl) navigate(`/auth?createNew=${longUrl}`);
  };
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-center my-10 font-extrabold text-3xl sm:text-6xl sm:my-16 lg:text-7xl">
        The only URL Shortener you&apos;ll ever need! 👇{" "}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row sm:h-14 w-full md:w-2/4 gap-2  "
      >
        <Input
          type="url"
          className="h-full flex-1 py-4 px-4"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <Button className="h-full" type="submit" variant="destructive">
          Shorten!
        </Button>
      </form>
      <img
        src="./banner.jpeg"
        alt="banner"
        className="w-full  my-11 md:px-11"
      />

      <Accordion type="single" collapsible className="w-3/4">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            {" "}
            What is a URL shortener, and why is it useful?
          </AccordionTrigger>
          <AccordionContent>
            A URL shortener converts long web links into shorter,
            easier-to-share links, saving space and enhancing user experience,
            especially on platforms with character limits like Twitter.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            {" "}
            How does the URL shortening process work?
          </AccordionTrigger>
          <AccordionContent>
            The system generates a unique identifier for the original URL and
            maps it to the shortened link. When clicked, the short link
            redirects users to the original URL.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            {" "}
            Is it possible to customize a shortened URL
          </AccordionTrigger>
          <AccordionContent>
            Many URL shorteners allow users to create custom short links with
            personalized text for better branding.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger> Are shortened URLs permanent?</AccordionTrigger>
          <AccordionContent>
            This depends on the service. Some offer permanent links, while
            others may expire after a certain period or based on usage.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
