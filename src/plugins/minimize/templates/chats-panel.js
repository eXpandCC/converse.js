import { html } from "lit";
import { __ } from 'i18n';

export default (o) =>{
    return html`<div id="minimized-chats" class="${o.chats.length ? '' : 'hidden'}">
        <a id="toggle-minimized-chats" class="row no-gutters hidden" @click=${o.toggle}>
            ${o.num_minimized} ${__('Minimized')}
            <span class="unread-message-count ${!o.num_unread ? 'unread-message-count-hidden' : ''}" href="#">${o.num_unread}</span>
        </a>
        <div class="flyout minimized-chats-flyout row no-gutters ${o.collapsed ? 'hidden' : ''}">
            ${o.chats.map(chat =>
                html`<converse-minimized-chat
                        class="minimize-chats-toggle"
                        .model=${chat}
                        title=${chat.get('nickname')}
                        type=${chat.get('type')}
                        num_unread=${chat.get('num_unread')}></converse-minimized-chat>`)}
        </div>
    </div>`};
