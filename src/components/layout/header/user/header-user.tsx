"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../_ui/avatar";
import { TypographyH1, TypographyMuted } from "../../../common/typography/typography";
import { UserGraphQL } from "@/src/types/pages/user/user";

type UserHeaderProps = {
  user: UserGraphQL
}

export default function UserHeader({ user }: UserHeaderProps) {
  return (
    <section className="flex items-center gap-4">
      <Avatar className="w-32 h-32">
        <AvatarImage src={user.avatar.url} alt={`Avatar de ${user.name}`} />
        <AvatarFallback>{user.name}</AvatarFallback>
      </Avatar>
      <div>
        <TypographyH1 className="border-none">{user.name}</TypographyH1>
        <TypographyMuted>
          @{user.username} - Membro desde{" "}
          {new Date(user.createdAt).toLocaleDateString("en-us", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
          .
        </TypographyMuted>
      </div>
    </section>
  );
}
