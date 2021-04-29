import { Observable, interval } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export class HtmlHelper {

    static elementIsFocusable(ele: HTMLElement): boolean {
        return ele.getAttribute("tabindex") != null;
    }

    static getWidthSensor(
        element: HTMLElement,
        periodicityInMiliSeconds: number = 2000
    ): Observable<number> {
        let oldWidth = element.clientWidth;
        return interval(periodicityInMiliSeconds).pipe(
            filter(
                ignore => {
                    if (Math.abs(oldWidth - element.clientWidth) > 2) {
                        oldWidth = element.clientWidth;
                        return true;
                    }
                    return false;
                }
            ),
            map(
                ignore => element.clientWidth
            )
        );
    }

    static getHeightSensor(
        element: HTMLElement,
        periodicityInMiliSeconds: number = 2000
    ): Observable<number> {
        let oldHeight = element.clientHeight;
        return interval(periodicityInMiliSeconds).pipe(
            filter(
                ignore => {
                    if (Math.abs(oldHeight - element.clientHeight) > 2) {
                        oldHeight = element.clientHeight;
                        return true;
                    }
                    return false;
                }
            ),
            map(
                ignore => element.clientWidth
            )
        );
    }
}