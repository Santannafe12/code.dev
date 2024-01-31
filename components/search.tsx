import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";

export default function Search() {
    return (
        <form className="relative w-80">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
            <Input className="pl-10" placeholder="Buscar publicações..." type="search" />
        </form>
    )
}