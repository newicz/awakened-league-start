type BuildList = {
    [key: string]: Build
}

type Build = {
    name: string
    ascendancy: string
    steps: Array<Step>
    uid: string
}

type Step = {
    level: number,
    skillTree: string,
    sockets: Array<Array>,
    purchases: Array<Array>,
    tips: Array<string>
}