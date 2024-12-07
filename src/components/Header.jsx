import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LinkIcon, LogOutIcon } from "lucide-react";
import { useUrlState } from "@/contexts/UrlContext";
import useFetch from "@/hooks/useFetch";
import { logout } from "@/db/apiAuth";
import { BarLoader } from "react-spinners";

export default function Header() {
  const navigate = useNavigate();
  const { user, fetchUser } = useUrlState();
  const { loading, fn: fnLogout } = useFetch(logout);
  return (
    <>
      <nav className="py-4 px-8  flex justify-between items-center">
        <Link to="/">
          <img src="/logo.png" alt="" className="h-16" />
        </Link>
        {!user ? (
          <Button onClick={() => navigate("/auth")}>Login</Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
              <Avatar>
                <AvatarImage
                  src={user?.user_metadata?.profile_pic}
                  className="object-contain"
                />
                <AvatarFallback>RC</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{user?.user_metadata?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/dashboard" className="flex">
                  <LinkIcon className="mr-2 h-4 w-4" />
                  My Links
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-500"
                onClick={() => {
                  fnLogout().then(() => {
                    fetchUser();
                    navigate("/");
                  });
                }}
              >
                <LogOutIcon className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </nav>
      {loading && <BarLoader className="mb-4" width={"100%"} color="36d7b7" />}
    </>
  );
}
