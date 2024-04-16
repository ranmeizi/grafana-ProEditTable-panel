/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { GrafanaTheme2, PanelProps } from '@grafana/data';
import { EditableProTable, ProColumnType } from '@ant-design/pro-components';
import { ConfigProvider, theme, Pagination, message, Button } from 'antd';
import { expandColumn } from 'utils/expandColumn';
import { getParam, refresh, updateVariable } from 'utils';
import { useVariables } from 'utils/useVariables';
import type { AppOptions } from 'types';
import useRequest, { Res, useDataSource } from './useRequest';
import { getTheme, useStyles2 } from '@grafana/ui';
import { css } from '@emotion/css';

interface Props extends PanelProps<AppOptions> { }

const ThemeProvider: React.FC<PropsWithChildren<Props>> = (props) => {

    const grafana_theme = getTheme()

    // url_param
    const url_dark_theme = getParam('theme')

    let is_dark = grafana_theme.isDark

    if (url_dark_theme) {
        is_dark = url_dark_theme === 'dark'
    }

    // 主题
    const themeConfig = {
        token: {
            colorPrimary: is_dark ? 'red' : '#1677ff',
            borderRadius: 4,
        },
        algorithm: is_dark ? [theme.darkAlgorithm, theme.compactAlgorithm] : [theme.compactAlgorithm],
    };
    return <ConfigProvider theme={themeConfig}>{props.children}</ConfigProvider>
}

// 样式
const getStyles = (theme: GrafanaTheme2) => css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '.ant-pagination': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        ".ant-pagination-options": {
            display: 'none'
        }
    },
})

// Panel
export const ProTablePanel: React.FC<Props> = (props) => {

    const rootCls = useStyles2(getStyles)

    const { options, id, height } = props

    const rowKey = options.row_key || 'id'
    const pageKey = options.var_page

    const [COL, setCOL] = useState<Array<ProColumnType & {}>>([])
    const [dataSource, setDataSource, getData] = useDataSource(props)

    const request = useRequest(id, options)

    // dashboard variables
    let vars = useVariables()

    useEffect(() => {
        init()
    }, [])

    useEffect(() => {
        getData(vars[pageKey], vars.size)
    }, [vars[pageKey]])

    async function init() {
        if (!options.url_columns) {
            return
        }

        try {
            // 获取 columns 数据
            const res = await request.get<Res>(options.url_columns)

            if (res.data.code === 200) {
                setCOL(res.data.data)
            }
        } catch { }

    }

    // 新建
    async function onCreate(row: any) {
        if (!options.url_create) {
            return
        }
        // 删除逐渐
        delete row[rowKey];

        const res = await request.post(options.url_create, row)
        if (res.data.code === 200) {
            message.success(res.data.msg)
        } else {
            message.error(res.data.msg)
        }
    }

    // 更新
    async function onUpdate(row: any) {
        if (!options.url_update) {
            return
        }
        const res = await request.post(options.url_update, row)

        if (res.data.code === 200) {
            message.success(res.data.msg)
        } else {
            message.error(res.data.msg)
        }
    }

    // 删除
    async function onDelete(row: any) {
        if (!options.url_delete) {
            return
        }

        const res = await request.post(options.url_delete, { [rowKey]: row[rowKey] })

        if (res.data.code === 200) {
            message.success(res.data.msg)
        } else {
            message.error(res.data.msg)
        }
    }

    function withOperate(columns: any[]) {
        return columns.concat({
            title: '操作',
            valueType: 'option',
            width: 200,
            render: (text: any, record: any, _: any, action: any) => [
                <Button
                    type='link'
                    key="editable"
                    disabled={!options.url_update}
                    onClick={() => {
                        action?.startEditable?.(record.id);
                    }}
                >
                    编辑
                </Button>,
                <Button
                    type='link'
                    key="delete"
                    disabled={!options.url_delete}
                    onClick={() => {
                        onDelete(record)
                    }}
                >
                    删除
                </Button>,
            ]
        })
    }

    const columns = expandColumn(COL || [], [withOperate])

    return <ThemeProvider {...props}>
        <div className={rootCls} style={{ height: height + 'px', overflow: 'scroll' }}>
            <EditableProTable
                style={{ height: `${height - 40}px` }}
                scroll={{ y: height - 125 }}
                rowKey={rowKey}
                recordCreatorProps={{
                    disabled: !options.url_create,
                    record: () => ({ [rowKey]: ` ` }),
                }}
                search={false}
                options={false}
                columns={columns}
                value={dataSource}
                onChange={v => setDataSource(v as any)}
                manualRequest
                editable={{
                    async onSave(key: any, row: any, originRow: any, newLine?: any) {
                        if (String(key) === ' ') {
                            await onCreate(row)
                        } else {
                            await onUpdate(row)
                        }
                        refresh()
                    }
                }}
                pagination={false}
            />
            <Pagination current={vars[pageKey]} total={9999} simple onChange={(page) => {
                updateVariable(pageKey, page)
            }} />
        </div>
    </ThemeProvider>
};
