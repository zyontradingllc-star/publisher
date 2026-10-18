export type RightsStatus = "copyright" | "public-domain";
export type MonetizationMode = "external" | "storefront";

export type FileMeta = {
  name: string;
  size: number;
  type: string;
};

export type PublishDraft = {
  title: string;
  subtitle: string;
  firstName: string;
  lastName: string;
  description: string;
  rights: RightsStatus;
  keywords: string[];
  monetization: MonetizationMode;
  externalUrl: string;
  manuscript: FileMeta | null;
  cover: FileMeta | null;
  activated: boolean;
};

export const emptyPublishDraft = (): PublishDraft => ({
  title: "",
  subtitle: "",
  firstName: "",
  lastName: "",
  description: "",
  rights: "copyright",
  keywords: [],
  monetization: "storefront",
  externalUrl: "",
  manuscript: null,
  cover: null,
  activated: false,
});

export const DESCRIPTION_LIMIT = 4000;
export const PUBLISH_STORAGE_KEY = "authorspilot-publish-draft";
