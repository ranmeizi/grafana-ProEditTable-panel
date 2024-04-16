import { getTemplateSrv } from "@grafana/runtime";

export function useVariables() {
    const vars: Record<string, any> = {}

    getTemplateSrv().getVariables().forEach((v: any) => {
        vars[v.id] = v.current.value
    })

    return vars
}
