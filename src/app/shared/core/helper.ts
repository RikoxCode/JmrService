import { log } from "console";



const _helper = {
    /**
     * This function is used to sleep the execution of the code for a given time
     * 
     * @param ms 
     * @returns 
     */
    sleep: (ms: number) => new Promise(resolve => setTimeout(resolve, ms)),

    /**
     * This function is used to log usefull stuff to the console
     * 
     * @param msg
     * @param type
     */
    _l: (msg: string, type: string = 'log') => {

        const str = `%c ${msg} `
        const time = new Date().toLocaleTimeString()
        const styles = `color: #fff; background-color: #000; padding: 2px 5px; border-radius: 5px;`
        const logMsg = `${time} | log event from autologger - ${str}`
        const logStyles = `${styles}`

        switch (type) {
            case 'log':
                console.log(logMsg, logStyles)
                break;
            case 'error':
                console.error(logMsg, logStyles)
                break;
            case 'warn':
                console.warn(logMsg, logStyles)
                break;
            case 'info':
                console.log(logMsg, logStyles)
                break;
            default:
                console.log(logMsg, logStyles)
                break;
        }        
    }

};

export default _helper;