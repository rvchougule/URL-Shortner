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

export default function Header() {
  const navigate = useNavigate();
  const user = false;
  return (
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
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>RC</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Rohan Chougule</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LinkIcon className="mr-2 h-4 w-4" />
              My Links
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">
              <LogOutIcon className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </nav>
  );
}
