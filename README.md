<!-- This README file is going to be the one displayed on the Grafana.com website for your plugin. Uncomment and replace the content here before publishing.

Remove any remaining comments before publishing as these may be displayed on Grafana.com -->

# Ant-EditableProTable-Panel

koudai-monster pikapika pikachu

a panel plugin based on pro-component/EditableProTable and a crud api standard.

## usage

### PanelSettings

**Base**

```use_data_query```:boolean
true: use grafana Datasource Query‘s result for ProTable datasource
false: use API json result for ProTable datasource

```row_key```:string
a unique key for ProTable and update/delete api
if it is a compose value, you must resolve it in your api

**Requests**

```url_list```?:string [optional]
a url for table request data  
you must implament the [API standard](#api-standard)

```url_create```?:string [optional]
a url for table row create data  
it will be used when EditableProTable request initialdata or refresh data or pagination change  
you must implament the [API standard](#api-standard)

```url_update```?:string [optional]
a url for table row update data  
it will be used when EditableProTable onSave  
you must implament the [API standard](#api-standard)

```url_delete```?:string [optional]
a url for table row delete data  
it will be used when EditableProTable onSave  
you must implament the [API standard](#api-standard)

```url_columns```?:string [optional]
when panel component mounted, it will be called to get all table column.  
there is a thing difficult to handle,when ```use_data_query:true```, panel will use grafana dataframe. but when data is empty ,i cant find any colun information for my ProTable for create params when the datasource is empty.so it must have an api to do that for this plugin .
you must implament the [API standard](#api-standard)

```add_headers```?:object [optional]
[for authorization]just like Infinity datasource's query Url. or Downgrade it is a token string

**alias**
when there is multiple panel in dashboard, the varialbe observer shuld be distinced by alias

```var_page```:string default:```page```

### DataSources support

Infinity

### Variables

table use these variables to refresh new data

```page```

### API-standard

this is a standard for this table panel plugin
the interface is minium requirement, if you have more params,define a Dashboard Variable ,and use it in your sql or url

#### list

GET
req

```ts
interface ReqParams{
  page?:number
  size?:number
}
```

res
status: 200
say it easy,your data must be an array.
you can use ```Infinity datasource```  Parsing options & Result fields / Rows/Root  to transform it to an array  
total isn't required because i cant find any total by dataframe

```ts
interface Res extends Array<Record<string,any>>{}
```

example json:

```json
{
  "code":200,
  "message":"OK",
  "data":[
    {"id":1},
    {"id":2}
  ]
}
```

#### create

POST
req
create fields is all dataIndex in columns where ```editable:true```

example json:

```json
{
  "name":"yuebuqun" // the column editable
}
```

res
status: 200/others

when 200 table will refresh an show success message
other time show error message

example json: 

```json
{
  "code":200,
  "message":"OK"
}
```

#### update

POST
req
create fields is all dataIndex in columns where ```editable:true```

example json:

```json
{
  "id":1, // rowkey
  "name":"yuebuqun" // the column editable
}
```

res
status: 200/others

when 200 table will refresh an show success message
other time show error message

example json:

```json
{
  "code":200,
  "message":"OK"
}
```

#### delete

POST
req

``` ts
// pseudo code
interface{
  [$rowKey]:any // rowKey in panel option [PanelSettings]
}
```

example json:

```json
{
  "id":1, // rowkey
}
```

res
status: 200/others

when 200 table will refresh an show success message
other time show error message

example json: 

```json
{
  "code":200,
  "message":"OK"
}
```

#### columns

GET

res: json
[Columns](https://procomponents.ant.design/components/table#columns-%E5%88%97%E5%AE%9A%E4%B9%89)

example json: 

```json
{
  "code":200,
  "message":"OK",
  "columns":[
    {"title":"ID","dataIndex":"id"},
    {"title":"Name","dataIndex":"name","editable":true}
  ]
}
```

### Data Query instead of list API

....
