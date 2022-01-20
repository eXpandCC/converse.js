import { html } from "lit";
import { api } from  '@converse/headless/core';
import * as moment from 'moment';


export default (o) => 
{
    const isLang = api.settings.get('i18n');
    moment.locale(isLang);
    let datestring = (isLang == 'es' ) ? 
                      moment(o.time, 'YYYY-MM-DDTHH:mm:ssZ').format('dddd, D MMMM YYYY') : 
                      moment(o.time, 'YYYY-MM-DDTHH:mm:ssZ').format('dddd, MMMM Do YYYY') ;
     
    return html`
        <div class="message date-separator" data-isodate="${o.time}">
            <hr class="separator"/>
            <time class="separator-text" datetime="${o.time}"><span>${datestring}</span></time>
        </div>
    `;
}
