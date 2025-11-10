import { env } from "@/env";
import { Client } from "@notionhq/client";

export const notion = new Client({
  auth: env.NOTION_TOKEN,
});
