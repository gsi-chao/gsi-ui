export {ProgressLabel} from "./ProgressLabel";


/*
*use example
* define
    let segments:ISegment[] = [
                {
                    key: 'first',
                    type: 'first',
                    label: 'Hola Mundo',
                    amount: 10
                },
                {
                    key: 'last',
                    type: 'last',
                    label: 'Soy yo',
                    amount: 5
                }
            ]
        ;

   inside de render return
   <ProgressLabel total={15} segments={segments}/>
 */