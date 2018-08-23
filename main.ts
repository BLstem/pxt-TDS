//%color=#04B404 icon="\uf18c" block="TDS"
namespace tds_meter {
    function getMedian(bArray: number[]): number {
        let bTab: number[] = []
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
        let coeff = 1 + 0.02 * (t - 25)
        let analogValue: number[] = []
        for (let k = 0; k < 30; k++) {
            analogValue[k] = pins.analogReadPin(pinarg)
            basic.pause(40)
        }
        let voltage = getMedian(analogValue) * 5 / 1024
        let compensationVolatge = voltage / coeff
        let tdsValue = (133.42 * compensationVolatge * compensationVolatge * compensationVolatge - 255.86 * compensationVolatge * compensationVolatge + 857.39 * compensationVolatge) * 0.5
        return tdsValue
    }
}