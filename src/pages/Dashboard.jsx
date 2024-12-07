import { BarLoader } from "react-spinners";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Filter } from "lucide-react";
import { useUrlState } from "@/contexts/UrlContext";
import useFetch from "@/hooks/useFetch";
import { getUrls } from "@/db/apiUrl";
import { getClicksForUrls } from "@/db/apiClicks";
import Error from "@/components/Error";
import LinkCard from "@/components/LinkCard";
import { CreateLink } from "@/components/CreateLink";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  const { user } = useUrlState();
  const {
    loading,
    error,
    data: urls,
    fn: fnUrls,
  } = useFetch(getUrls, user?.id);

  const {
    loading: loadingClicks,
    error: errorClicks,
    data: clicks,
    fn: fnClicks,
  } = useFetch(
    getClicksForUrls,
    urls?.map((url) => url.id)
  );

  useEffect(() => {
    fnUrls();
  }, []);

  useEffect(() => {
    if (urls?.length) fnClicks();
  }, [urls?.length]);

  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8">
      {(loading || loadingClicks) && (
        <BarLoader className="mb-4" width={"100%"} color="36d7b7" />
      )}
      <div className="grid grid-cols-2 gap-2">
        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urls?.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{clicks?.length}</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-between">
        <h1 className="text-4xl font-extrabold">My Links</h1>
        {/* <Button>Create Links</Button> */}
        <CreateLink />
      </div>

      <div className="relative">
        <Input
          type="text"
          placeholder="Filter Links... "
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Filter className="absolute top-2 right-2 p-1" />
      </div>
      {error ? <Error message={error.message} /> : ""}

      {(filteredUrls || []).map((url, i) => {
        return <LinkCard key={i} url={url} fetchUrls={fnUrls} />;
      })}
    </div>
  );
}
