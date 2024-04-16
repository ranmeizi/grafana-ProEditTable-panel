import { useMemo, useState } from "react";
import { AppOptions, HttpAddParts } from "types";
import axios, { AxiosInstance } from 'axios'
import { PanelProps } from '@grafana/data'

const instances: Record<string, AxiosInstance> = {}

/**
 * 响应体
 */
export type Res<T = any> = {
    code: string | number,
    message: string,
    data: T
}

/**
 * 使用请求拦截
 */
export default function useRequest(panelId: number, { http_add_parts }: AppOptions) {
    // 分类列表
    const [headers, params, datas] = useMemo(() => {
        const value: HttpAddParts[] = http_add_parts || []
        const res: HttpAddParts[][] = [[], [], []]
        for (let item of value) {
            res[item.type].push(item)
        }
        return res
    }, [http_add_parts])

    if (!instances[panelId]) {
        let instance = axios.create()
        instances[panelId] = instance
        instance.interceptors.request.use(function (config) {
            for (let header of headers) {
                config.headers[header.key] = header.value
            }

            for (let param of params) {
                config.params[param.key] = param.value
            }

            for (let data of datas) {
                config.data[data.key] = data.value
            }
            return config
        })
    }

    return instances[panelId]
}

type UseDataOptions = {
    id: PanelProps['id'],
    options: AppOptions,
    data: PanelProps['data']
}

export function useDataSource({ id, options, data }: UseDataOptions) {
    const [dataSource, setDataSource] = useState<Array<Record<string, any>>>([])

    async function getData(page: number, size: number) {
        const action = options.use_data_query ? getDataFromDataFrame(data) : getDataFromUrl({ id, options, page, size, data })

        const list = await action

        setDataSource(list)
    }

    return [dataSource, setDataSource, getData] as const
}

async function getDataFromUrl({ id, options, page, size }: UseDataOptions & { page: number, size: number }): Promise<Array<Record<string, any>>> {
    if (!options.url_list) {
        return []
    }
    const request = instances[id]
    const res = await request.get<Res>(options.url_list, {
        params: {
            page_num: page,
            page_size: size
        }
    })

    return res.data.data.record
}

async function getDataFromDataFrame(data: UseDataOptions['data']): Promise<Array<Record<string, any>>> {
    const query = data.series.find(item => item.name === 'query')

    if (!query) {
        return []
    }

    let list = Array<any>(query.fields[0].values.length).fill(1).map(_ => ({} as Record<string, any>))

    for (let field of query.fields) {
        for (let i = 0; i < list.length; i++) {
            //@ts-ignore 不知道为啥，可能是类型错了，也可能版本不对
            const v = field.values.buffer[i];
            list[i][field.name] = v
        }
    }
    console.log('getDataFromDataFrame',list)

    return list
}
