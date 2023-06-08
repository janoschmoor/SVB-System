import { EvaluateInput } from "./InputField";

export const CompileForm = (settings: {
    changesOnly?: boolean,
    isSearch: boolean,
    formId: string | number,
}) => {
    const inputGroupList: HTMLCollection = document.getElementsByClassName("INPUTGROUP");
    const formMap = new Map();
    for (let i = 0; i < inputGroupList.length; i++) {
        const element = inputGroupList[i] as HTMLDivElement;
        const list = formMap.get(element.dataset.formid)
        if (!list) {
            formMap.set(element.dataset.formid, [element])
        } else {
            formMap.set(element.dataset.formid, [...list, element])
        }
    }
    var obj: any = {}
    formMap.forEach((input: Array<any>, key: string) => {
        if (!settings.formId || settings.formId == key) {
            input.forEach((el: any, index: number) => {
                if ((settings.changesOnly && el.dataset.haschange == "true") || !settings.changesOnly) {
                    if (!settings.isSearch) {
                        obj[el.dataset.key] = EvaluateInput({
                            type: el.dataset.type,
                            hasChange: el.dataset.haschange,
                            value: el.dataset.value,
                            text: el.dataset.text,
                            key: el.dataset.key,
                        })
                    } else {
                        obj[el.dataset.key] = {
                            value: EvaluateInput({
                                type: el.dataset.type,
                                hasChange: el.dataset.haschange,
                                value: el.dataset.value,
                                text: el.dataset.text,
                                key: el.dataset.key,
                            }),
                            text: el.dataset.text
                        }
                    }
                }
            })
        }
    })
    return obj;
}