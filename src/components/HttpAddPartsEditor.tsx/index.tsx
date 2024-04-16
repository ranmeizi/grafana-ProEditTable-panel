import React, { useMemo, useState } from "react";
import { TabContent, TabsBar, Tab, useStyles2, Button, Input } from "@grafana/ui";
import { EnumParts, HttpAddParts } from '../../types'
import { css } from "@emotion/css";
import { GrafanaTheme2 } from "@grafana/data";
import { Row, Col } from "antd";

let TABS = ['Headers', 'UrlParams', "BodyJson"]

// 样式
const getStyles = (theme: GrafanaTheme2) => css({
    '.type-list__row': {
        width: '100%',
        ".ant-col": {
            padding: '4px'
        },
        "&.title": {
            display: 'flex',
            alignItems: 'center',
            background: theme.colors.background.secondary
        }
    },
})

export default function HttpAddPartsEditor(props: any) {
    const [active, setActive] = useState(0)

    const rootCls = useStyles2(getStyles)

    // 分类列表
    const tabList = useMemo(() => {
        const value: HttpAddParts[] = props.value || []
        const res: HttpAddParts[][] = [[], [], []]
        for (let item of value) {
            res[item.type].push(item)
        }
        return res
    }, [props.value])

    function handleOnChange(type: EnumParts, value: HttpAddParts[]) {
        const val: HttpAddParts[] = props.value || []
        const other = val.filter(item => item.type !== type)
        props.onChange([...other, ...value])
    }

    return <div className={rootCls}>
        <TabsBar>
            {TABS.map((title, index) => {
                return <Tab key={index} label={title} active={index === active} onChangeTab={() => setActive(index)} />;
            })}
        </TabsBar>
        <TabContent>
            {active === 0 && <TypeList type={0} value={tabList[0]} onChange={(value: any) => handleOnChange(0, value)} />}
            {active === 1 && <TypeList type={1} value={tabList[1]} onChange={(value: any) => handleOnChange(1, value)} />}
            {active === 2 && <TypeList type={2} value={tabList[2]} onChange={(value: any) => handleOnChange(2, value)} />}
        </TabContent>
    </div>
}

type EditListProps = {
    type: EnumParts,
    value: HttpAddParts[],
    onChange: (value: HttpAddParts[]) => void
}

// 编辑列表
function TypeList(props: EditListProps) {
    function handleRowChange(index: number, value?: HttpAddParts) {
        if (!value) {
            // 删除
            props.value.splice(index, 1)
        } else {
            props.value.splice(index, 1, value)
        }
        props.onChange([...props.value])
    }
    return <Row>
        <Row className="type-list__row title">
            <Col span={10}>Key</Col>
            <Col span={10}>Value</Col>
        </Row>
        {props.value.map((item, index) => <EditRow key={index} value={item} onChange={(value: any) => handleRowChange(index, value)}></EditRow>)}
        <Button variant='secondary' fullWidth onClick={() => {
            props.onChange([...props.value, { key: '', value: '', type: props.type }])
        }}>
            Add {EnumParts[props.type]}
        </Button>
    </Row>
}

type EditRowProps = {
    value: HttpAddParts,
    onChange: (value?: HttpAddParts) => void
}
type FixEvent = React.FormEvent<HTMLInputElement> & { target: { value: any } }

// 行编辑
function EditRow({ value, onChange }: EditRowProps) {
    return <Row align='middle' className="type-list__row">
        <Col span={10}><Input value={value.key} onChange={(e: FixEvent) => onChange({ ...value, key: e.target.value })} /></Col>
        <Col span={10}><Input value={value.value} onChange={(e: FixEvent) => onChange({ ...value, value: e.target.value })} /></Col>
        <Col span={4}><Button fullWidth icon='trash-alt' variant='destructive' onClick={() => onChange()}></Button></Col>
    </Row>
}
