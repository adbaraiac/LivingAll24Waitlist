import type { Metadata } from "next";
import { AddFriend } from "@/components/AddFriend";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: `Add me on ${site.name}`,
  description: "Open the link on your iPhone to add your friend in the app.",
};

/** Friend links (/add/?c=CODE) land here and open the app. */
export default function AddFriendPage() {
  return <AddFriend />;
}
