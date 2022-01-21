import { __ } from 'i18n';
import { html } from "lit";

export default  (o) => {
    const i18n_toggle = __('Internal chat');
    return html`<a id="toggle-controlbox" class="toggle-controlbox " @click=${o.onClick}><span class="toggle-feedback">${i18n_toggle}</span></a>`;
}
