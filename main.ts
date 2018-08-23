//%color=#04B404 icon="\uf18c" block="TDS"
namespace tds_meter {
    let numbersize: number[]

    function getMedian(bArray: number[]): number {
        let bTab: number[]
        let iFilterLen = bArray.length
        let bTemp = 0
        for (let i = 0; i < iFilterLen; i++) {
            bTab[i] = bArray[i]
        }
        for (let i = 0; i < iFilterLen - 1; i++) {
            for (let j = 0; j < iFilterLen - i - 1; j++) {
                if (bTab[j] > bTab[j + 1]) {
                    bTemp = bTab[j]
                    bTab[j] = bTab[j + 1]
                    bTab[j + 1] = bTemp
                }
            }
        }
        if ((iFilterLen & 1) > 0)
            bTemp = bTab[(iFilterLen - 1) / 2]
        else
            bTemp = (bTab[iFilterLen / 2] + bTab[iFilterLen / 2 - 1]) / 2
        return bTemp
    }

    /**
     * TDS meter reading
     * @param t temperture; eg: 25, 20, 30
     */
    //%block="reading (ppm) %pinarg|temperture %t"
    //%pinarg.fieldEditor="gridpicker" pinarg.fieldOptions.columns=5
    export function reading(pinarg: AnalogPin, t: number): number {

    }
}