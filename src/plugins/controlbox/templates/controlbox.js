import { html } from 'lit';
import { _converse, api } from "@converse/headless/core";

export default o => {
    const show_chat_group_controlbox = api.settings.get('show_chat_group_controlbox');
    return html`
        <div class="flyout box-flyout">
            <converse-dragresize></converse-dragresize>
            <div class="chat-head controlbox-head">
                ${o.sticky_controlbox
                    ? ''
                    : html`
                        <a class="chatbox-btn close-chatbox-button fa fa-times" @click=${o.close}></a>
                    `}
            </div>
            <div class="controlbox-panes">
                <div class="controlbox-pane">
                    ${o.connected
                        ? html`
                            <converse-user-profile></converse-user-profile>
                            <converse-headlines-panel class="controlbox-section"></converse-headlines-panel>
                            <div id="chatrooms" class="controlbox-section">
                                ${ show_chat_group_controlbox ? html`<converse-rooms-list></converse-rooms-list>` : ''}
                                <converse-bookmarks></converse-bookmarks>
                            </div>
                            ${ api.settings.get("authentication") === _converse.ANONYMOUS ? '' :
                                html`<div id="converse-roster" class="controlbox-section"><converse-roster></converse-roster></div>`
                            }`
                        : o['active-form'] === 'register'
                            ? html`<converse-register-panel></converse-register-panel>`
                            : html`<converse-login-panel></converse-login-panel>`
                    }
                </div>
            </div>
        </div>
    `
}

