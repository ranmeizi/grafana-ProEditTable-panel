import { locationService } from "@grafana/runtime";

/**
 * 修改变量，触发dashboard局部刷新
 * @param key 变量名
 * @param value 变量值
 */
export function updateVariable(key: string, value: any) {
    locationService.partial({
        [`var-${key}`]: value
    }, true)
}

/**
 * 刷新页面
 */
export function refresh() {
    locationService.reload()
}

/**
 * 获取url 参数
 */
export function getParam(key: string) {
    // Get the current URL
    const currentUrl = window.location.href;

    // Create a new URL object
    const url = new URL(currentUrl);

    // Get the search parameters from the URL
    const searchParams = new URLSearchParams(url.search);

    // Get the value of a specific parameter
    const paramValue = searchParams.get(key);

    return paramValue
}
