import { Tab, TabContent, TabsBar, useStyles2 } from '@grafana/ui';
import React, { useState } from 'react';
import JsonEditor from './Tabs/JsonEditor';
import FragmentEditor from './Tabs/FragmentEditor';
import { GrafanaTheme2 } from '@grafana/data';
import { css } from '@emotion/css';

let TABS = ['简化配置', '原始JSON'];

// 样式
const getStyles = (theme: GrafanaTheme2) =>
  css({
    height: '600px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  });

export default function SchemaEditor({ value, onChange }: any) {
  const rootCls = useStyles2(getStyles);

  const [active, setActive] = useState(1);

  function onJsonChange(jsonStr: string): boolean {
    try {
      JSON.parse(jsonStr);

      onChange(jsonStr);

      return true;
    } catch {
      return false;
    }
  }

  return (
    <div className={rootCls}>
      <TabsBar>
        {TABS.map((title, index) => {
          return <Tab key={index} label={title} active={index === active} onChangeTab={() => setActive(index)} />;
        })}
      </TabsBar>
      <TabContent style={{ flex: 1, overflow: 'hidden' }}>
        {active === 0 && <FragmentEditor value={value} onChange={onJsonChange} />}
        {active === 1 && <JsonEditor value={value} onChange={onJsonChange} />}
      </TabContent>
    </div>
  );
}
