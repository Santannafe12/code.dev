import { ElementNode } from "@graphcms/rich-text-types";

export type RichText = {
  content: {
    raw: {
      children: ElementNode[];
    };
  };
};
