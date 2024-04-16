export type AppOptions = BaseOptions & RequestsOptions & AliasOptions

type BaseOptions = {
  use_data_query: boolean,
  row_key: string,
}

type RequestsOptions = {
  url_list?: string,
  url_create?: string,
  url_update?: string,
  url_delete?: string,
  url_columns?: string,
  http_add_parts: HttpAddParts[]
}

export enum EnumParts {
  Headers = 0,
  UrlParams = 1,
  BodyJson = 2
}

export type HttpAddParts = {
  type: EnumParts,
  key: string,
  value: string
}

type AliasOptions = {
  var_page: string,
  var_size: string
}
