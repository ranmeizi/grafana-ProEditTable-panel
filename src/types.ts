export type AppOptions = {
  config?: string;
  http_add_parts: HttpAddParts[];
} & AliasOptions;

export enum EnumParts {
  Headers = 0,
  UrlParams = 1,
  BodyJson = 2,
}

export type HttpAddParts = {
  type: EnumParts;
  key: string;
  value: string;
};

type AliasOptions = {
  var_page: string;
  var_size: string;
};
