import { __ } from 'i18n';
import { _converse, api } from '@converse/headless/core';
import { getHeadingDropdownItem, getHeadingStandaloneButton } from 'plugins/chatview/utils.js';
import { html } from "lit";
import { renderAvatar } from 'shared/directives/avatar.js';
import { until } from 'lit/directives/until.js';

async function getStandaloneButtons (promise) {
    const heading_btns = await promise;
    const standalone_btns = heading_btns.filter(b => b.standalone);
    return standalone_btns.map(b => getHeadingStandaloneButton(b))
}

async function getDropdownButtons (promise) {
    const heading_btns = await promise;
    const dropdown_btns = heading_btns.filter(b => !b.standalone);
    return dropdown_btns.map(b => getHeadingDropdownItem(b));
}

export default (o) => {
    const vcard = o.model?.vcard;
    const vcard_json = vcard ? vcard.toJSON() : {};
    const i18n_profile = __("The User's Profile Image");
    const avatar_data = Object.assign(
        {
            'alt_text': i18n_profile,
            'extra_classes': '',
            'height': 40,
            'width': 40
        },
        vcard_json
    );
    const avatar = html`<span class="mr-2">${renderAvatar(avatar_data)}</span>`;
    const display_name = o.model.getDisplayName();

    const tpl_dropdown_btns = () => getDropdownButtons(o.heading_buttons_promise)
        .then(btns => btns.length ? html`<converse-dropdown class="dropleft" color="var(--chat-head-text-color)" .items=${btns}></converse-dropdown>` : '');

    const tpl_standalone_btns = () => getStandaloneButtons(o.heading_buttons_promise)
        .then(btns => btns.reverse().map(b => until(b, '')));

    const show_avatar = api.settings.get('show_avatar');

    const statusLabel = o.status ? o['label_' + o.status] : '';

    return html`
        <div class="chatbox-title ${ o.status ? '' :  "chatbox-title--no-desc"}">
            <div class="chatbox-title--row">
                ${ (!_converse.api.settings.get("singleton")) ?  html`<converse-controlbox-navback jid="${o.jid}"></converse-controlbox-navback>` : '' }
                ${ (o.type !== _converse.HEADLINES_TYPE && show_avatar) ? html`<a class="show-msg-author-modal" @click=${o.showUserDetailsModal}>${ avatar }</a>` : '' }
                <div class="chatbox-title__text" title="${o.jid}">
                    ${ (o.type !== _converse.HEADLINES_TYPE && show_avatar) ? html`<a class="user show-msg-author-modal" @click=${o.showUserDetailsModal}>${ display_name }</a>` : html`<label class="chatbox-title__display_name">${display_name}</label>` }
                </div>
            </div>
            <div class="chatbox-title__buttons row no-gutters">
                ${ until(tpl_dropdown_btns(), '') }
                ${ until(tpl_standalone_btns(), '') }
            </div>
        </div>
        ${ statusLabel ? html`<p class="chat-head__desc">${ statusLabel }</p>` : '' }
    `;
}
